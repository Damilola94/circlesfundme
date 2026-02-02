"use client"

import { Textarea } from "@/components/ui/textarea"
import { DialogDescription } from "@/components/ui/dialog"
import { DialogTitle } from "@/components/ui/dialog"
import { DialogHeader } from "@/components/ui/dialog"
import { DialogContent } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, CheckCircle, XCircle, RotateCcw } from "lucide-react"
import useGetQuery from "@/hooks/useGetQuery"
import { toast } from "react-toastify"
import moment from "moment"
import { useMutation } from "react-query"
import handleFetch from "@/services/api/handleFetch"
import { DeactivationActionModals } from "@/components/ui/deactivation-users-modal/deactivate-user.modal"
import { getStatusBadgeSingle } from "../types"

export default function DeactivationDetailPage({
  params,
}: {
  params: { requestId: string }
}) {
  const requestId = params.requestId

  const [adminRemarks, setAdminRemarks] = useState("")
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [showReverseModal, setShowReverseModal] = useState(false)

  const {
    data: requestData,
    status: requestStatus,
    refetch: refetchRequest,
  } = useGetQuery({
    endpoint: `adminusermanagement/deactivation-requests/${requestId}`,
    queryKey: ["deactivation-request", requestId],
    enabled: !!requestId,
    auth: true,
  })

  const {
    data: userData,
    status: userStatus,
    refetch: refetchUser,
  } = useGetQuery({
    endpoint: `adminusermanagement/users/${requestId}`,
    queryKey: ["user", requestId],
    enabled: !!requestId,
    auth: true,
  })

  const user = userData?.data || null

  const approveMutation = useMutation(handleFetch, {
    onSuccess: (res: { statusCode: string; message: string }) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Something went wrong.")
      } else {
        toast.success("Deactivation request approved successfully")
        setShowApprovalModal(false)
        setAdminRemarks("")
        refetchRequest()
      }
    },
    onError: (err: { message: string }) => {
      toast.error(err?.message || "Something went wrong.")
    },
  })

  const rejectMutation = useMutation(handleFetch, {
    onSuccess: (res: { statusCode: string; message: string }) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Something went wrong.")
      } else {
        toast.success("Deactivation request rejected successfully")
        setShowRejectionModal(false)
        setAdminRemarks("")
        refetchRequest()
      }
    },
    onError: (err: { message: string }) => {
      toast.error(err?.message || "Something went wrong.")
    },
  })

  const reverseMutation = useMutation(handleFetch, {
    onSuccess: (res: { statusCode: string; message: string }) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Something went wrong.")
      } else {
        toast.success("User reactivated successfully")
        setShowReverseModal(false)
        setAdminRemarks("")
        refetchRequest()
      }
    },
    onError: (err: { message: string }) => {
      toast.error(err?.message || "Something went wrong.")
    },
  })

  const request = useMemo(() => {
    if (requestStatus === "success" && requestData?.isSuccess) {
      return requestData.data
    }
    return null
  }, [requestData, requestStatus])

  const isLoading = requestStatus === "loading"

  
  const statusBadge = request ? getStatusBadgeSingle(request.status) : null

  const handleApprove = () => {
    approveMutation.mutate({
      endpoint: `adminusermanagement/deactivation-requests/${requestId}/approve`,
      method: "POST",
      auth: true,
      body: {
        requestId,
        adminRemarks,
      },
    })
  }

  const handleReject = () => {
    if (!adminRemarks.trim()) {
      toast.error("Please provide remarks for rejection")
      return
    }
    rejectMutation.mutate({
      endpoint: `adminusermanagement/deactivation-requests/${requestId}/reject`,
      method: "POST",
      auth: true,
      body: {
        requestId,
        adminRemarks,
      },
    })
  }

  const handleReverse = () => {
    reverseMutation.mutate({
      endpoint: `adminusermanagement/users/${request?.userId}/reverse-deactivation`,
      method: "POST",
      auth: true,
      body: {
        userId: request?.userId,
        adminRemarks,
      },
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (!request) {
    return (
      <div className="p-6 space-y-4">
        <Link href="/deactivation-requests">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <p className="text-red-700">Request not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/deactivated-users" className="w-10 h-10 bg-white rounded-full">
            <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        {statusBadge && (
          <div className={`px-3 py-1 text-sm font-medium rounded-full ${statusBadge.color}`}>
            {statusBadge.label}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {request && (
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">User Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Name</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      {request.userName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Email</p>
                    <p className="text-base text-gray-700 mt-1">{request.userEmail}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Link href={`/user-management/${request.userId}`}>
                    <Button variant="outline"  className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-3 text-xs w-full">
                      View Full User Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {request && (
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Request Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Request Date</p>
                    <p className="text-base text-gray-900 mt-1">
                      {moment(request.createdDate).format("MMM D, YYYY h:mm A")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Status</p>
                    <p className="text-base text-gray-900 mt-1">
                      {request.status === 1 ? "Pending" : request.status === 2 ? "Approved" : "Rejected"}
                    </p>
                  </div>
                </div>

                {request.reason && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Reason</p>
                    <p className="text-base text-gray-700 mt-1 p-3 bg-gray-50 rounded">
                      {request.reason}
                    </p>
                  </div>
                )}

                {request.adminRemarks && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Admin Remarks</p>
                    <p className="text-base text-gray-700 mt-1 p-3 bg-gray-50 rounded">
                      {request.adminRemarks}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          {request.status === 1 && (
            <>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 gap-2"
                      onClick={() => setShowApprovalModal(true)}
                      disabled={approveMutation.isLoading}
                    >
                      {approveMutation.isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Approving...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Approve Request
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full gap-2 bg-transparent"
                      onClick={() => setShowRejectionModal(true)}
                      disabled={rejectMutation.isLoading}
                    >
                      {rejectMutation.isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Rejecting...
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4" />
                          Reject Request
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-3 text-sm text-blue-900">
                  This request is pending your action. Choose to approve or reject.
                </CardContent>
              </Card>
            </>
          )}

          {request.status === 2 && (
            <>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <Button
                    variant="outline"
                    className="w-full gap-2 bg-transparent"
                    onClick={() => setShowReverseModal(true)}
                    disabled={reverseMutation.isLoading}
                  >
                    {reverseMutation.isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Reactivating...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="h-4 w-4" />
                        Reverse Deactivation
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-3 text-sm text-green-900">
                  This request has been approved. You can reverse the deactivation if needed.
                </CardContent>
              </Card>
            </>
          )}

          {request.status === 3 && (
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-3 text-sm text-red-900">
                This request has been rejected and cannot be modified.
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <DeactivationActionModals
        showApprovalModal={showApprovalModal}
        showRejectionModal={showRejectionModal}
        showReverseModal={showReverseModal}
        adminRemarks={adminRemarks}
        userName={request?.userName || ""}
        isApproving={approveMutation.isLoading}
        isRejecting={rejectMutation.isLoading}
        isReversing={reverseMutation.isLoading}
        onApprovalOpenChange={setShowApprovalModal}
        onRejectionOpenChange={setShowRejectionModal}
        onReverseOpenChange={setShowReverseModal}
        onRemarksChange={setAdminRemarks}
        onApprove={handleApprove}
        onReject={handleReject}
        onReverse={handleReverse}
      />
    </div>
  )
}