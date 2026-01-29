"use client"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { CheckCircle, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"

interface ReferrerCreatedModalProps {
  open: boolean
  onClose: () => void
  fullName: string
  email: string
  referralCode: string
}

export function ReferrerCreatedModal({
  open,
  onClose,
  fullName,
  email,
  referralCode,
}: ReferrerCreatedModalProps) {
    
  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralCode)
    toast.success("Referral code copied")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-xl">
        <div className="flex justify-center">
          <CheckCircle className="h-24 w-24 text-green-600" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-center">
          Referrer created
        </h2>

        <div className="mt-6 space-y-4 text-sm">
          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium text-gray-600">Full Name:</span>
            <span className="col-span-2 text-gray-900">{fullName}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium text-gray-600">Email Address:</span>
            <span className="col-span-2 text-gray-900">{email}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-center">
            <span className="font-medium text-gray-600">Referral Code:</span>
            <div className="col-span-2 flex items-center gap-2">
              <span className="font-mono text-gray-900">
                {referralCode}
              </span>
              <button
                onClick={handleCopy}
                className="text-gray-500 hover:text-gray-800"
                title="Copy referral code"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>

        <Button className="mt-6 w-full" onClick={onClose}>
          Done
        </Button>
      </DialogContent>
    </Dialog>
  )
}
