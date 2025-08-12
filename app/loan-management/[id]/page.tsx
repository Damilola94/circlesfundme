"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TransactionStatus } from "@/components/ui/transactionstatus"
import useGetQuery from "@/hooks/useGetQuery"

export type StatusType =
  | "Active"
  | "Completed"
  | "Pending"
  | "Waitlisted"
  | "Rejected"

export default function LoanDetails({ params }: { params: { id: string } }) {

  const {
    data: loanDetailsResponse,
    isLoading,
    isError,
  } = useGetQuery({
    endpoint: `loanapplications/${params.id}`,
    queryKey: ["loan-details", params.id],
    auth: true,
  })

  const loanData = loanDetailsResponse?.data

  const accountInfo = [
    { label: "Full Name", value: loanData?.fullname },
    { label: "Account Number", value: loanData?.accountNumber },
    { label: "Bank", value: loanData?.bank },
    { label: "Scheme", value: loanData?.scheme },
    { label: "Weekly Income", value: `₦${loanData?.incomeAmount?.toLocaleString()}` },
    { label: "Weekly Contribution", value: `₦${loanData?.contributionAmount?.toLocaleString()}` },
    {
      label: "Total Contribution",
      value: `₦${loanData?.totalContribution?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    { label: "BVN", value: loanData?.bvn },
  ]

  const loanRequestDetails = [
    { label: "Requested Loan Amount", value: `₦${loanData?.requestedAmount?.toLocaleString()}` },
    { label: "Subscription Scheme", value: loanData?.scheme },
    { label: "Loan Management Fee", value: `${loanData?.loanManagementFee}%` },
    { label: "Repayment Term", value: `${loanData?.repaymentTerm} Weeks` },
    { label: "Repayment Plan", value: loanData?.repaymentPlan },
    { label: "Default Penalty", value: loanData?.defaultPenalty },
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
          {isError || !accountInfo ? <div className="flex-1 space-y-6 p-6 text-center text-gray-600">Failed to load loan details or loan not found.</div> : <CardContent className="space-y-3">
            {accountInfo.map((item) => (
              <div key={item.label} className="flex justify-between text-sm pb-5">
                <span className="text-gray-600 font-outfit">{item.label}</span>
                <span className="font-medium font-outfit">{item.value}</span>
              </div>
            ))}
          </CardContent>}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-normal">Loan Request Details</CardTitle>
          </CardHeader>
          <hr className="border-gray-200 mb-5" />
          {isLoading && <div className="flex-1 space-y-6 p-6 text-center text-gray-600">Loading loan details...</div>}
          {isError || !loanDetailsResponse?.data ? <div className="flex-1 space-y-6 p-6 text-center text-gray-600"> Failed to load loan details or loan not found.</div> : <CardContent className="space-y-3">
            {loanRequestDetails.map((item) => (
              <div key={item.label} className="flex justify-between text-sm pb-5 font-outfit">
                <span className="text-gray-600 font-outfit">{item.label}</span>
                <span className="font-medium font-outfit">{item.value}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm pt-2">
              <span className="text-gray-600">Minimum Contribution Amount</span>
              <TransactionStatus status={loanData?.isEligible ? "Completed" : "Pending"} />
            </div>
            <div className="flex justify-between space-x-4 pt-6">
              <Button className="bg-primary-900 hover:bg-primary-700 w-full">Approve Loan</Button>
              <Button className="bg-red-800 hover:bg-red-600 w-full">Reject Loan </Button>
              <Button variant="outline" className=" w-full bg-transparent">
                Waitlist Request
              </Button>
            </div>
          </CardContent>}
        </Card>
      </div>
    </div>
  )
}
