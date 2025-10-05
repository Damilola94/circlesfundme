"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Check, Loader2 } from "lucide-react"
import { useMutation } from "react-query"
import { toast } from "react-toastify";
import handleFetch from "@/services/api/handleFetch"
import { transformApiDataToSubscriptions, transformSubscriptionToApiPayload , Subscription, sortSubscriptionsByOrder} from "./types"

export default function SubscriptionCard() {
  const [subscriptionTypes, setSubscriptionTypes] = useState<Subscription[]>([])
  const [isEditing, setIsEditing] = useState<boolean[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const schemesMutation = useMutation({
    mutationFn: () =>
      handleFetch({
        endpoint: "contributionschemes",
        method: "GET",
        auth: true,
      }),
    onSuccess: (res: any) => {
      if (res?.status === 200) {
        const transformedData = transformApiDataToSubscriptions(res.data)
        const sortedSubscriptions = sortSubscriptionsByOrder(transformedData);
        setSubscriptionTypes(sortedSubscriptions)
        setIsEditing(sortedSubscriptions.map(() => false))
        setIsLoading(false)
      }
    },
    onError: (err: { statusCode: string; message: string }) => {
      toast.error(err?.message || "Failed to load contribution schemes")
      setIsLoading(false)
    },
  })

  const updateSchemeMutation = useMutation({
    mutationFn: ({ schemeId, payload }: { schemeId: string; payload: any }) =>
      handleFetch({
        endpoint: `contributionschemes/${schemeId}`,
        method: "PUT",
        body: payload,
        auth: true,
      }),
    onSuccess: (res: any) => {
      if (res?.status === 200) {
        toast.success("Scheme updated successfully")
        schemesMutation.mutate()
      }
    },
    onError: (err: { statusCode: string; message: string }) => {
      toast.error(err?.message || "Failed to update scheme")
    },
  })

  useEffect(() => {
    schemesMutation.mutate()
  }, [])

  const handleInputChange = (subIndex: number, paramKey: string, newValue: string) => {
    setSubscriptionTypes((prevSubs) => {
      const updatedSubs = [...prevSubs]
      updatedSubs[subIndex] = {
        ...updatedSubs[subIndex],
        values: {
          ...updatedSubs[subIndex].values,
          [paramKey]: newValue,
        },
      }
      return updatedSubs
    })
  }

  const toggleEditMode = (subIndex: number) => {
    setIsEditing((prev) => {
      const newEditingState = [...prev]
      newEditingState[subIndex] = !newEditingState[subIndex]
      return newEditingState
    })
  }

  const handleSaveChanges = (subIndex: number) => {
    const subscription = subscriptionTypes[subIndex]
    const payload = transformSubscriptionToApiPayload(subscription)
console.log(subscription, "subscription");

    console.log(`Saving changes for ${subscription.title}:`, payload)

    updateSchemeMutation.mutate({
      schemeId: subscription.id,
      payload: payload,
    })

    toggleEditMode(subIndex)
  }

  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading contribution schemes...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contribution Schemes</h2>
        <Button variant="outline" onClick={() => schemesMutation.mutate()} disabled={schemesMutation.isLoading}>
          {schemesMutation.isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {subscriptionTypes.map((subscription, subIndex) => (
          <Card key={subscription.id} className="h-fit">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">{subscription.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{subscription.description}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => toggleEditMode(subIndex)}>
                {isEditing[subIndex] ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Pencil className="h-4 w-4 text-gray-500" />
                )}
                <span className="sr-only">{isEditing[subIndex] ? "Save" : "Edit"}</span>
              </Button>
            </CardHeader>
            <hr className="border-gray-200 my-2" />
            <CardContent className="space-y-3">
              {subscription.paramsConfig.map((param) => (
                <div key={param.key} className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-muted-foreground font-outfit">{param.label}</span>
                  <div className="flex items-center space-x-2">
                    {isEditing[subIndex] ? (
                      <Input
                        type="text"
                        value={subscription.values[param.key] || "0"}
                        onChange={(e) => handleInputChange(subIndex, param.key, e.target.value)}
                        className="w-20 h-8 text-center"
                      />
                    ) : (
                      <span className="text-sm font-medium text-gray-900">{subscription.values[param.key] || "0"}</span>
                    )}
                    <span className="text-sm text-muted-foreground w-8 font-outfit">{param.unit}</span>
                  </div>
                </div>
              ))}
              {isEditing[subIndex] && (
                <Button
                  className="w-full mt-6"
                  onClick={() => handleSaveChanges(subIndex)}
                  disabled={updateSchemeMutation.isLoading}
                >
                  {updateSchemeMutation.isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
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
