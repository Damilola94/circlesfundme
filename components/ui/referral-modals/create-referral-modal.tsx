"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface CreateReferrerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { fullName: string; email: string }) => void
  loading?: boolean
}

export function CreateReferrerModal({
  open,
  onOpenChange,
  onSubmit,
  loading,
}: CreateReferrerModalProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = () => {
    onSubmit({ fullName, email })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle>
            Create Referrer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          <Input
            placeholder="Enter referrer full name"
            label="Full Name"
            className="w-full"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Enter referrer email address"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button
          className="mt-8 w-full rounded-full bg-black hover:bg-gray-800 text-white px-6 py-3"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Referrer"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
