"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface DeleteReferrerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  referrerName: string
  isDeleting?: boolean
}

export function DeleteReferrerModal({
  open,
  onOpenChange,
  onConfirm,
  referrerName,
  isDeleting = false,
}: DeleteReferrerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete Referrer</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-semibold text-gray-900">{referrerName}</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
