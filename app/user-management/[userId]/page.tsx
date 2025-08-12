"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserProfile } from "@/components/dashboard/user-profile"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import mockData from "../mockdata.json"
import { ArrowLeft, Loader2 } from "lucide-react"
import Pagination from "@/components/ui/pagination"
import { TransactionStatus } from "@/components/ui/transactionstatus"
import useGetQuery from "@/hooks/useGetQuery"
import { toast } from "react-toastify"

const { loan } = mockData

export type StatusType =
  | "Approved"
  | "Pending"
  | "Waitlisted"
  | "Rejected"

export type KycStatusType = "active" | "deactivated" | "pending" | "unknown"

export default function UserProfilePage({ params }: { params: { userId: string } }) {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
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

  const user = useMemo(() => {
    if (userStatus === "success" && userData?.isSuccess && userData.data) {
      const apiUser = userData.data
      let kycStatus: KycStatusType = "unknown"

      if (apiUser.onboardingStatus === "Complete") {
        kycStatus = "active"
      } else if (apiUser.onboardingStatus === "Incomplete") {
        kycStatus = "pending"
      }

      return {
        name: `${apiUser.firstName} ${apiUser.lastName}`,
        email: apiUser.email || "",
        phone: apiUser.phoneNumber || "",
        image: apiUser.profilePictureUrl || "/placeholder.svg?height=100&width=100",
        dateOfBirth: apiUser.dateOfBirth
          ? new Date(apiUser.dateOfBirth).toLocaleDateString("en-US")
          : "",
        gender: apiUser.gender || "",
        scheme: apiUser.contributionScheme?.name || "N/A",
        contribution: new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(apiUser.contributionAmount || 0),
        bvn: apiUser.bvn || "",
        kycStatus,
        document: (apiUser.userDocuments || []).map((doc: any, index: number) => ({
          id: index + 1,
          name: doc.documentType || "Unknown Document",
          date: "", 
          size: "", 
          iconSrc: doc.documentUrl.endsWith(".pdf")
            ? "/pdf-icon.png"
            : "/image-icon.png",
          url: doc.documentUrl
        })),
      }
    }

    return {
      name: "User Not Found",
      email: "",
      phone: "",
      image: "/placeholder.svg?height=100&width=100",
      dateOfBirth: "",
      gender: "",
      scheme: "",
      contribution: "",
      bvn: "",
      document: [],
    }
  }, [userData, userStatus])


  const kycStatus = user.kycStatus
  console.log(user.kycStatus, "user.kycStatus");

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

  const handleTransHistory = async () => {
    router.push(`/user-management/${userId}/transactions`)
  }

  const handleDeactivateUser = () => {
    console.log("Deactivating user:", user.name)

  }
  const handleActivateUser = () => {
    console.log("Activating user:", user.name)

  }
  const handleSendReminder = () => {
    console.log("Sending KYC reminder to user:", user.name)
  }
  const handleApproveUser = () => {
    console.log("Approving user:", user.name)
  }
  const handleRejectUser = () => {
    console.log("Rejecting user:", user.name)
  }

  const isLoading = userStatus === "loading"
  const isError = userStatus === "error" || (userStatus === "success" && userData && !userData.isSuccess)

  function handleRetry() {
    refetchUser()
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center space-x-4">
        <Link href="/user-management" className="w-10 h-10 bg-white rounded-full">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold font-outfit text-gray-900">User Management - View Profile</h1>
      </div>
      <UserProfile user={user} />

      {isLoading && <div className="flex flex-1 items-center justify-center min-h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">Loading user profile...</span>
      </div>}
      {isError && <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-red-500 text-lg mb-4">
          {(userError && typeof userError === "object" && "message" in userError
            ? (userError as { message?: string }).message
            : undefined) || userData?.message || "Failed to load user profile."}
        </p>
        <Button onClick={handleRetry} variant="outline">
          Try Again
        </Button>
      </div>}
      <div className="flex justify-end">
        <Button className="bg-primary-900 hover:bg-primary-700" onClick={handleTransHistory}>
          View Transaction History
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-4 px-6 py-3 text-sm font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit">
        <div>Date Applied</div>
        <div>Status</div>
        <div>Loan Amount (₦)</div>
        <div>Amount Repaid (₦)</div>
        <div>Amount Remaining (₦)</div>
        <div className="text-right"> </div>
      </div>
      <div className="space-y-3">

        {loan.map((loanItem) => (
          <Card key={loanItem.id} className="shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="text-sm text-gray-600 font-outfit">{loanItem.dateJoined}</div>
                <div className="text-sm text-gray-600 font-outfit">
                  <TransactionStatus status={loanItem.status as StatusType} />
                </div>
                <div className="text-sm text-gray-600 font-outfit">{loanItem.loanAmount}</div>
                <div className="text-sm text-gray-600 font-outfit">{loanItem.amountRepaid}</div>
                <div className="text-sm text-gray-600 font-outfit">{loanItem.amountRemaining}</div>
                <div className="text-right">
                  <Link href={`/loan-management/1`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full w-full border-primary-900 bg-transparent"
                    >
                      View Request →
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination
        current={pageNumber}
        onPageChange={setPageNumber}
        onRowChange={setPageSize}
        pageSize={pageSize}
        total={totalElements}
      />
      <div className="flex justify-end space-x-4">
        {kycStatus === "active" && (
          <Button variant="outline" onClick={handleDeactivateUser}>
            Deactivate User
          </Button>
        )}
        {/* {kycStatus === "deactivated" && (
          <Button className="bg-primary-900 hover:bg-primary-700" onClick={handleActivateUser}>
            Activate User
          </Button>
        )} */}
        {kycStatus === "pending" && (
          <>
            <Button variant="outline" onClick={handleSendReminder}>
              Send Reminder to Complete KYC
            </Button>
            <Button variant="outline" onClick={handleRejectUser}>
              Reject User
            </Button>
            <Button className="bg-primary-900 hover:bg-primary-700" onClick={handleApproveUser}>
              Approve User
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
