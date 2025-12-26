"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface ConfirmationModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (comment?: string) => void
  title: string
  description: string
  showCommentField?: boolean
  commentLabel?: string
  confirmButtonText?: string
  cancelButtonText?: string
}

export function ConfirmationModal({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  description,
  showCommentField = false,
  commentLabel = "Reason",
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
}: ConfirmationModalProps) {
  const [comment, setComment] = useState("")

  const handleConfirm = () => {
    onConfirm(comment)
    setComment("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {showCommentField && (
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block">
              {commentLabel}
            </label>
            <Textarea
              placeholder="Enter reason for rejection..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        )}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelButtonText}
          </Button>
          <Button onClick={handleConfirm}>{confirmButtonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
