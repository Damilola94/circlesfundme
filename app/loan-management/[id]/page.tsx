"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TransactionStatus } from "@/components/ui/transactionstatus"
import { ConfirmationModal } from "@/components/ui/confirmation-modal"
import { ReasonModal } from "@/components/ui/reason-modal"
import useGetQuery from "@/hooks/useGetQuery"
import { formatAmount } from "@/lib/utils"
import { useMutation } from "react-query"
import handleFetch from "@/services/api/handleFetch"
import { toast } from "react-toastify"

export type StatusType = "Active" | "Completed" | "Pending" | "Waitlisted" | "Rejected"

export default function LoanDetails({ params }: { params: { id: string } }) {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)

  const {
    data: loanDetailsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetQuery({
    endpoint: `loanapplications/${params.id}`,
    pQuery: {
      loanApplicationId: params.id,
    },
    queryKey: ["loan-details", params.id],
    auth: true,
  })

  const rejectMutation = useMutation({
    mutationFn: ({ id, rejectionReason }: { id: string; rejectionReason: string }) =>
      handleFetch({
        endpoint: "loanapplications",
        extra: "reject",
        method: "POST",
        auth: true,
        body: { id, rejectionReason },
      }),
    onSuccess: (response) => {
      if (response.statusCode == "400") {
        toast.error(response.message || "Failed to reject loan")
        return
      }
      toast.success("Loan rejected successfully")
      setIsRejectModalOpen(false)
      refetch()
    },
    onError: (response: { message: string }) => {
      console.log(response)
      if (response) {
        toast.error(response.message || "Failed to reject loan")
      }
    },
  })

  const waitlistMutation = useMutation({
    mutationFn: (id: string) =>
      handleFetch({
        endpoint: "loanapplications",
        extra: "waitlist",
        method: "POST",
        auth: true,
        body: { id },
      }),
    onSuccess: (response) => {
      if (response.statusCode !== "200") {
        toast.error(response.message || "Failed to waitlist loan")
        return
      }
      toast.success("Loan waitlisted successfully")
      setIsWaitlistModalOpen(false)
      refetch()
    },
    onError: (err: { statusCode: string; message: string }) => {
      if (err.statusCode !== "400") {
        toast.error(err.message || "Failed to waitlist loan")
      }
    },
  })

  const approveMutation = useMutation({
    mutationFn: (loanApplicationId: string) =>
      handleFetch({
        endpoint: "loanapplications/approve",
        method: "POST",
        auth: true,
        body: { loanApplicationId },
      }),
    onSuccess: (response) => {
      if (response.statusCode == "400") {
        toast.error(response.message || "Failed to approve loan")
        return
      }
      toast.success("Loan approved successfully")
      setIsApproveModalOpen(false)
      refetch()
    },
    onError: (response: { message: string }) => {
      console.log(response)
      if (response) {
        toast.error(response.message || "Failed to approve loan")
      }
    },
  })

  const handleRejectLoan = (rejectionReason: string) => {
    rejectMutation.mutate({ id: params.id, rejectionReason })
  }

  const handleWaitlistLoan = () => {
    waitlistMutation.mutate(params.id)
  }

  const handleApproveLoan = () => {
    approveMutation.mutate(params.id)
  }

  const loanData = loanDetailsResponse?.data

  const accountInfo = [
    { label: "Full Name", value: loanData?.fullname },
    { label: "Account Number", value: loanData?.accountNumber },
    { label: "Bank", value: loanData?.bank },
    { label: "Scheme", value: loanData?.scheme },
    {
      label: "Weekly Income",
      value: `${formatAmount(loanData?.incomeAmount, "₦")}`,
    },
    {
      label: "Weekly Contribution",
      value: `${formatAmount(loanData?.contributionAmount, "₦")}`,
    },
    {
      label: "Total Contribution",
      value: `${formatAmount(loanData?.totalContribution, "₦")}`,
    },
    { label: "BVN", value: loanData?.bvn },
  ]

  const loanRequestDetails = [
    {
      label: "Requested Loan Amount",
      value: `${formatAmount(loanData?.requestedAmount, "₦")}`,
    },
    { label: "Subscription Scheme", value: loanData?.scheme },
    { label: "Loan Management Fee", value: `${formatAmount(loanData?.loanManagementFee, "₦")}` },
    {
      label: "Repayment Term",
      value: `${formatAmount(loanData?.repaymentTerm, "₦")} Weeks`,
    },
    { label: "Eligibilty Status", value: loanData?.isEligible ? "Eligible" : "Not Eligible" },
    { label: "Default Penalty", value: loanData?.defaultPenalty || "N/A" },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center space-x-4">
        <Link href="/loan-management" className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold font-outfit">Loan Request Details</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-normal">Account Information</CardTitle>
          </CardHeader>
          <hr className="border-gray-200 mb-5" />
          {isLoading && <div className="flex-1 space-y-6 p-6 text-center text-gray-600">Loading loan details...</div>}
          {isError || !accountInfo ? (
            <div className="flex-1 space-y-6 p-6 text-center text-gray-600">
              Failed to load loan details or loan not found.
            </div>
          ) : (
            <CardContent className="space-y-3">
              {accountInfo.map((item) => (
                <div key={item.label} className="flex justify-between text-sm pb-5">
                  <span className="text-gray-600 font-outfit">{item.label}</span>
                  <span className="font-medium font-outfit">{item.value}</span>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-normal">Loan Request Details</CardTitle>
          </CardHeader>
          <hr className="border-gray-200 mb-5" />
          {isLoading && <div className="flex-1 space-y-6 p-6 text-center text-gray-600">Loading loan details...</div>}
          {isError || !loanDetailsResponse?.data ? (
            <div className="flex-1 space-y-6 p-6 text-center text-gray-600">
              {" "}
              Failed to load loan details or loan not found.
            </div>
          ) : (
            <CardContent className="space-y-3">
              {loanRequestDetails.map((item) => (
                <div key={item.label} className="flex justify-between text-sm pb-5 font-outfit">
                  <span className="text-gray-600 font-outfit">{item.label}</span>
                  <span className="font-medium font-outfit">{item.value}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-2">
                <span className="text-gray-600 font-outfit">Loan Status</span>
                <TransactionStatus status={loanData?.status} />
              </div>
              {loanData?.status !== "Active" && (
                <div className="flex justify-between space-x-4 pt-6">
                  {loanData?.status === "Waitlist" && (
                      <Button
                        className="bg-primary-900 hover:bg-primary-700 w-full"
                        onClick={() => setIsApproveModalOpen(true)}
                        disabled={approveMutation.isLoading}
                      >
                        {approveMutation.isLoading ? "Approving..." : "Approve"}
                      </Button>
                  )}
                  {loanData?.status === "Pending" && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setIsWaitlistModalOpen(true)}
                        disabled={waitlistMutation.isLoading}
                      >
                        {waitlistMutation.isLoading ? "Processing..." : "Waitlisted"}
                      </Button>
                      <Button
                        className="bg-red-800 hover:bg-red-600 w-full"
                        onClick={() => setIsRejectModalOpen(true)}
                        disabled={rejectMutation.isLoading}
                      >
                        {rejectMutation.isLoading ? "Rejecting..." : "Reject"}
                      </Button>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      </div>

      <ReasonModal
        isOpen={isRejectModalOpen}
        onOpenChange={setIsRejectModalOpen}
        onConfirm={handleRejectLoan}
        title="Reject Loan Application"
        description={`Are you sure you want to reject this loan application for ${loanData?.fullname}? Please provide a reason for rejection.`}
        confirmButtonText="Reject Loan"
        isLoading={rejectMutation.isLoading}
      />

      <ConfirmationModal
        isOpen={isWaitlistModalOpen}
        onOpenChange={setIsWaitlistModalOpen}
        onConfirm={handleWaitlistLoan}
        title="Waitlist Loan Application"
        description={`Are you sure you want to waitlist this loan application for ${loanData?.fullname}? This will move the application to the waitlist.`}
        confirmButtonText="Waitlist Application"
      />

      <ConfirmationModal
        isOpen={isApproveModalOpen}
        onOpenChange={setIsApproveModalOpen}
        onConfirm={handleApproveLoan}
        title="Approve Loan Application"
        description={`Are you sure you want to approve this loan application for ${loanData?.fullname}? This will process the loan for ${formatAmount(loanData?.requestedAmount, "₦")}.`}
        confirmButtonText="Approve Loan"
      />
    </div>
  )
}
