"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserProfile } from "@/components/dashboard/user-profile"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import Pagination from "@/components/ui/pagination"
import { TransactionStatus } from "@/components/ui/transactionstatus"
import { ConfirmationModal } from "@/components/ui/confirmation-modal"
import useGetQuery from "@/hooks/useGetQuery"
import { toast } from "react-toastify"
import { formatAmount } from "@/lib/utils"
import moment from "moment"
import type { KycStatusType, StatusType } from "../types"
import { useMutation } from "react-query"
import handleFetch from "@/services/api/handleFetch"
import { useCookies } from "react-cookie"

export default function UserProfilePage({ params }: { params: { userId: string } }) {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [showActivateModal, setShowActivateModal] = useState(false)
  const totalElements = 95
  const router = useRouter()
  const userId = params.userId

  const {
    data: userData,
    status: userStatus,
    error: userError,
    refetch: refetchUser,
  } = useGetQuery({
    endpoint: `users/${userId}`,
    queryKey: ["user-profile", userId],
    enabled: !!userId,
    auth: true,
  })

  const {
    data: loanData,
    status: loanStatus,
    error: loanError,
    refetch: refetchLoans,
  } = useGetQuery({
    endpoint: `loanapplications`,
    pQuery: {
      UserId: userId,
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    queryKey: ["user-loans", userId, pageNumber.toString(), pageSize.toString()],
    enabled: !!userId,
    auth: true,
  })

  const deactivateUserMutation = useMutation(handleFetch, {
    onSuccess: (res: {
      statusCode: string
      message: string
      data: any
    }) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Something went wrong.")
      } else {
        toast.success("User deactivated successfully")
        router.push(`/user-management`)
      }
    },
    onError: (err: { statusCode?: string; message: string }) => {
      toast.error(err?.message || "Something went wrong.")
    },
  })

  const activateUserMutation = useMutation(handleFetch, {
    onSuccess: (res: {
      statusCode: string
      message: string
      data: any
    }) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Something went wrong.")
      } else {
        toast.success("User activated successfully")
        router.push(`/user-management`)
      }
    },
    onError: (err: { statusCode?: string; message: string }) => {
      toast.error(err?.message || "Something went wrong.")
    },
  })

  const sendKycReminderMutation = useMutation(handleFetch, {
    onSuccess: (res: {
      statusCode: string
      message: string
      data: any
    }) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Something went wrong.")
      } else {
        toast.success("KYC reminder sent successfully")
      }
    },
    onError: (err: { statusCode?: string; message: string }) => {
      toast.error(err?.message || "Something went wrong.")
    },
  })

  const user = useMemo(() => {
    if (userStatus === "success" && userData?.isSuccess && userData.data) {
      const apiUser = userData.data
      let kycStatus: KycStatusType = "unknown"

      if (apiUser.isActive) {
        kycStatus = "active"
      } else if (!apiUser.isActive) {
        kycStatus = "deactivated"
      }

      if (apiUser.isActive && apiUser.onboardingStatus === "Incomplete") {
        kycStatus = "pending"
      }

      return {
        name: `${apiUser.firstName} ${apiUser.lastName}`,
        email: apiUser.email || "",
        phone: apiUser.phoneNumber || "",
        image: apiUser.profilePictureUrl,
        dateOfBirth: apiUser.dateOfBirth ? moment(apiUser.dateOfBirth).format("MM/DD/YYYY") : "",
        gender: apiUser.gender || "",
        scheme: apiUser.contributionScheme?.name || "N/A",
        contribution: formatAmount(apiUser.contributionAmount || 0, "N"),
        bvn: apiUser.bvn || "N/A",
        kycStatus,
        document: (apiUser.userDocuments || []).map((doc: any, index: number) => ({
          id: index + 1,
          name: doc.documentType || "Unknown Document",
          date: "",
          size: "",
          iconSrc: doc.documentUrl.endsWith(".pdf") ? "/pdf-icon.png" : "/image-icon.png",
          url: doc.documentUrl,
        })),
      }
    }

    return {
      name: "User Not Found",
      email: "",
      phone: "",
      image: "",
      dateOfBirth: "",
      gender: "",
      scheme: "",
      contribution: "",
      bvn: "",
      document: [],
    }
  }, [userData, userStatus])

  const loans = useMemo(() => {
    if (loanStatus === "success" && loanData?.isSuccess && loanData.data) {
      return loanData.data.map((loan: any) => ({
        id: loan.id,
        dateJoined: moment(loan.dateApplied).format("MMM D, YYYY"),
        status: loan.status,
        loanAmount: formatAmount(loan.approvedAmount || loan.requestedAmount, "N"),
        amountRepaid: formatAmount(loan.amountRepaid, "N"),
        amountRemaining: formatAmount((loan.approvedAmount || loan.requestedAmount) - loan.amountRepaid, "N"),
      }))
    }
    return []
  }, [loanData, loanStatus])

  const kycStatus = user.kycStatus

  useEffect(() => {
    if (userStatus === "error") {
      const errorMessage =
        (userError && typeof userError === "object" && "message" in userError
          ? (userError as { message?: string }).message
          : undefined) || "Failed to load user profile."
      toast.error(errorMessage)
    } else if (userStatus === "success" && userData && !userData.isSuccess) {
      toast.error(userData.message || "Failed to load user profile.")
    }
  }, [userStatus, userData, userError])

  useEffect(() => {
    if (loanStatus === "error") {
      const errorMessage =
        (loanError && typeof loanError === "object" && "message" in loanError
          ? (loanError as { message?: string }).message
          : undefined) || "Failed to load loan data."
      toast.error(errorMessage)
    } else if (loanStatus === "success" && loanData && !loanData.isSuccess) {
      toast.error(loanData.message || "Failed to load loan data.")
    }
  }, [loanStatus, loanData, loanError])

  const handleTransHistory = async () => {
    router.push(`/admin-user-management/${userId}/transactions?userName=${userData.data.firstName} ${userData.data.lastName}`)
  }

  const confirmDeactivateUser = () => {
    deactivateUserMutation.mutate({
      endpoint: `adminusermanagement`,
      extra: `users/${userId}/deactivate`,
      method: "PUT",
      auth: true,
      body: {},
    })
    setShowDeactivateModal(false)
  }

   const confirmActivateUser = () => {
    activateUserMutation.mutate({
      endpoint: `adminusermanagement`,
      extra: `users/${userId}/reactivate`,
      method: "PUT",
      auth: true,
      body: {},
    })
    setShowActivateModal(false)
  }

  const handleSendReminder = () => {
    sendKycReminderMutation.mutate({
      endpoint: `adminusermanagement/send-kyc-reminder/${userId}`,
      method: "POST",
      auth: true,
    })
  }

  const isLoading = userStatus === "loading"
  const isError = userStatus === "error" || (userStatus === "success" && userData && !userData.isSuccess)
  const isLoanLoading = loanStatus === "loading"
  const isLoanError = loanStatus === "error" || (loanStatus === "success" && loanData && !loanData.isSuccess)

  function handleRetry() {
    refetchUser()
    refetchLoans()
  }

  const { isLoading: isDeactivating } = deactivateUserMutation
  const { isLoading: isActivating } = activateUserMutation
  const { isLoading: isSendingReminder } = sendKycReminderMutation

  return (
    <div className="flex-1 space-y-6 p-6">
      {(isDeactivating || isActivating || isSendingReminder) && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span className="text-gray-500">Loading</span>
        </div>
      )}
      <div className="flex items-center space-x-4">
        <Link href="/admin-user-management" className="w-10 h-10 bg-white rounded-full">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold font-outfit text-gray-900">User Management - View Profile</h1>
      </div>
      <UserProfile user={user} />

      {isLoading && (
        <div className="flex flex-1 items-center justify-center min-h-[80vh]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500">Loading user profile...</span>
        </div>
      )}
      {isError && (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-red-500 text-lg mb-4">
            {(userError && typeof userError === "object" && "message" in userError
              ? (userError as { message?: string }).message
              : undefined) ||
              userData?.message ||
              "Failed to load user profile."}
          </p>
          <Button onClick={handleRetry} variant="outline">
            Try Again
          </Button>
        </div>
      )}
      <div className="flex justify-end">
        <Button className="bg-primary-900 hover:bg-primary-700" onClick={handleTransHistory}>
          View Transaction History
        </Button>
      </div>
      <div className="overflow-x-auto 1140:overflow-visible flex-1 space-y-6 p-6">
        <div className="grid grid-cols-6 gap-4 px-6 py-3 min-w-[800px] text-sm font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit">
          <div>Date Applied</div>
          <div>Status</div>
          <div>Loan Amount (₦)</div>
          <div>Amount Repaid (₦)</div>
          <div>Amount Remaining (₦)</div>
          <div className="text-right"> </div>
        </div>

        {isLoanLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Loading loan data...</span>
          </div>
        )}

        {isLoanError && (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <p className="text-red-500 mb-4">
              {(loanError && typeof loanError === "object" && "message" in loanError
                ? (loanError as { message?: string }).message
                : undefined) ||
                loanData?.message ||
                "Failed to load loan data."}
            </p>
            <Button onClick={() => refetchLoans()} variant="outline" size="sm">
              Retry
            </Button>
          </div>
        )}

        {!isLoanLoading && !isLoanError && (
          <div className="space-y-3">
            {loans.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No loan applications found for this user.</div>
            ) : (
              loans.map((loanItem: any) => (
                <Card key={loanItem.id} className="shadow-sm bg-white min-w-[800px]">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <div className="text-sm text-gray-600 font-outfit">{loanItem.dateJoined}</div>
                      <div className="text-sm text-gray-600 font-outfit">
                        <TransactionStatus status={loanItem.status as StatusType} />
                      </div>
                      <div className="text-sm   text-gray-600 font-outfit">{loanItem.loanAmount}</div>
                      <div className="text-sm text-gray-600 font-outfit">{loanItem.amountRepaid}</div>
                      <div className="text-sm text-gray-600 font-outfit">{loanItem.amountRemaining}</div>
                      <div className="text-right">
                        <Link href={`/loan-management/${loanItem.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full w-full border-primary-900 bg-transparent px-2"
                          >
                            View Request
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      <Pagination
        current={pageNumber}
        onPageChange={setPageNumber}
        onRowChange={setPageSize}
        pageSize={pageSize}
        total={totalElements}
      />

      <div className="flex justify-end space-x-4">
        {kycStatus === "pending" && (
          <>
            <Button
              variant="outline"
              onClick={handleSendReminder}
              disabled={isSendingReminder}
            >
              {isSendingReminder ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                "KYC Reminder"
              )}
            </Button>
          </>
        )}

      </div>
      <ConfirmationModal
        isOpen={showDeactivateModal}
        onOpenChange={setShowDeactivateModal}
        onConfirm={confirmDeactivateUser}
        title="Deactivate User"
        description={`Are you sure you want to deactivate ${user.name}? This action will prevent the user from accessing their account.`}
        confirmButtonText="Deactivate"
        cancelButtonText="Cancel"
      />

      <ConfirmationModal
        isOpen={showActivateModal}
        onOpenChange={setShowActivateModal}
        onConfirm={confirmActivateUser}
        title="Activate User"
        description={`Are you sure you want to activate ${user.name}? This will restore the user's access to their account.`}
        confirmButtonText="Activate"
        cancelButtonText="Cancel"
      />
    </div>
  )
}
