"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Check, Loader2 } from "lucide-react"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import handleFetch from "@/services/api/handleFetch"

import {
  Subscription,
  transformSavingsApiToSubscriptions,
  transformSavingsToApiPayload,
} from "./types"

export default function SubscriptionCard() {
  const [subscriptionTypes, setSubscriptionTypes] = useState<Subscription[]>([])
  const [isEditing, setIsEditing] = useState<boolean[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const schemesMutation = useMutation({
    mutationFn: () =>
      handleFetch({
        endpoint: "adminsavingsschemes",
        method: "GET",
        auth: true,
      }),

    onSuccess: (res: any) => {
      if (res?.status === 200) {
        const transformed = transformSavingsApiToSubscriptions(res.data)

        setSubscriptionTypes(transformed)
        setIsEditing(transformed.map(() => false))
      }
      setIsLoading(false)
    },

    onError: (err: any) => {
      toast.error(err?.message || "Failed to load savings schemes")
      setIsLoading(false)
    },
  })

  const updateSchemeMutation = useMutation({
    mutationFn: ({ schemeId, payload }: any) =>
      handleFetch({
        endpoint: `adminsavingsschemes/${schemeId}`,
        method: "PUT",
        body: payload,
        auth: true,
      }),

    onSuccess: () => {
      toast.success("Scheme updated successfully")
      schemesMutation.mutate()
    },

    onError: (err: any) => {
      toast.error(err?.message || "Failed to update scheme")
    },
  })

  useEffect(() => {
    schemesMutation.mutate()
  }, [])

  const handleInputChange = (
    subIndex: number,
    key: string,
    value: string
  ) => {
    setSubscriptionTypes((prev) => {
      const updated = [...prev]
      updated[subIndex] = {
        ...updated[subIndex],
        values: {
          ...updated[subIndex].values,
          [key]: value,
        },
      }
      return updated
    })
  }

  const toggleEditMode = (index: number) => {
    setIsEditing((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }

  const handleSaveChanges = (index: number) => {
    const sub = subscriptionTypes[index]

    const payload = transformSavingsToApiPayload(sub)

    updateSchemeMutation.mutate({
      schemeId: sub.id,
      payload,
    })

    toggleEditMode(index)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-6 w-6 mr-2" />
        Loading savings schemes...
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Savings Schemes</h2>

        <Button
          variant="outline"
          onClick={() => schemesMutation.mutate()}
        >
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {subscriptionTypes.map((sub, index) => (
          <Card key={sub.id}>
            <CardHeader className="flex flex-row justify-between">
              <div>
                <CardTitle className="text-lg">{sub.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {sub.description}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleEditMode(index)}
              >
                {isEditing[index] ? <Check /> : <Pencil />}
              </Button>
            </CardHeader>

            <CardContent className="space-y-3">
              {sub.paramsConfig.map((param) => (
                <div key={param.key} className="flex justify-between">
                  <span>{param.label}</span>

                  {isEditing[index] ? (
                    <Input
                      className="w-20 text-center"
                      value={sub.values[param.key] || ""}
                      onChange={(e) =>
                        handleInputChange(index, param.key, e.target.value)
                      }
                    />
                  ) : (
                    <span>
                      {sub.values[param.key]} {param.unit}
                    </span>
                  )}
                </div>
              ))}

              {isEditing[index] && (
                <Button
                  className="w-full mt-4"
                  onClick={() => handleSaveChanges(index)}
                >
                  {updateSchemeMutation.isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}