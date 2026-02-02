"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

interface DeactivationActionModalsProps {
  showApprovalModal: boolean
  showRejectionModal: boolean
  showReverseModal: boolean
  adminRemarks: string
  userName: string
  isApproving: boolean
  isRejecting: boolean
  isReversing: boolean
  onApprovalOpenChange: (open: boolean) => void
  onRejectionOpenChange: (open: boolean) => void
  onReverseOpenChange: (open: boolean) => void
  onRemarksChange: (remarks: string) => void
  onApprove: () => void
  onReject: () => void
  onReverse: () => void
}

export function DeactivationActionModals({
  showApprovalModal,
  showRejectionModal,
  showReverseModal,
  adminRemarks,
  userName,
  isApproving,
  isRejecting,
  isReversing,
  onApprovalOpenChange,
  onRejectionOpenChange,
  onReverseOpenChange,
  onRemarksChange,
  onApprove,
  onReject,
  onReverse,
}: DeactivationActionModalsProps) {
  const handleCloseApproval = () => {
    onApprovalOpenChange(false)
    onRemarksChange("")
  }

  const handleCloseRejection = () => {
    onRejectionOpenChange(false)
    onRemarksChange("")
  }

  const handleCloseReverse = () => {
    onReverseOpenChange(false)
    onRemarksChange("")
  }

  return (
    <>
      <Dialog open={showApprovalModal} onOpenChange={onApprovalOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Approve Deactivation Request</DialogTitle>
            <DialogDescription>
              Add optional remarks before approving this request
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Admin Remarks (Optional)</label>
              <Textarea
                placeholder="Enter admin remarks..."
                value={adminRemarks}
                onChange={(e) => onRemarksChange(e.target.value)}
                className="mt-1 min-h-24"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCloseApproval}>
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={onApprove}
                disabled={isApproving}
              >
                {isApproving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Approving...
                  </>
                ) : (
                  "Approve"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRejectionModal} onOpenChange={onRejectionOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Deactivation Request</DialogTitle>
            <DialogDescription>
              Please provide remarks explaining the rejection
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Admin Remarks</label>
              <Textarea
                placeholder="Enter reason for rejection..."
                value={adminRemarks}
                onChange={(e) => onRemarksChange(e.target.value)}
                className="mt-1 min-h-24"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCloseRejection}>
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={onReject}
                disabled={isRejecting}
              >
                {isRejecting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Rejecting...
                  </>
                ) : (
                  "Reject"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showReverseModal} onOpenChange={onReverseOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reverse User Deactivation</DialogTitle>
            <DialogDescription>
              Reactivate {userName} and restore their account access
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Admin Remarks (Optional)</label>
              <Textarea
                placeholder="Enter admin remarks..."
                value={adminRemarks}
                onChange={(e) => onRemarksChange(e.target.value)}
                className="mt-1 min-h-24"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCloseReverse}>
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={onReverse}
                disabled={isReversing}
              >
                {isReversing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Reactivating...
                  </>
                ) : (
                  "Reactivate User"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}