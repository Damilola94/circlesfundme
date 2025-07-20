"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TransactionStatus } from "@/components/ui/transactionstatus";

export type StatusType =
  | "Active"
  | "Completed"
  | "Pending"
  | "Waitlisted"
  | "Rejected";

export default function LoanDetails({ params }: { params: { id: string } }) {
  const loanData = {
    accountInfo: {
      fullName: "Olatunji Adeshina",
      accountNumber: "9012345678",
      bank: "WEMA Bank",
      scheme: "Weekly",
      weeklyIncome: "40,000.00",
      weeklyContribution: "20,000.00",
      totalContribution: "58,678.90",
      bvn: "12345678987",
    },
    loanRequest: {
      requestedAmount: "91,000,000.00",
      subscriptionScheme: "Weekly",
      loanManagementFee: "6%",
      repaymentTerm: "52 Weeks",
      repaymentPlan: "13,500/wk",
      defaultPenalty: "+25% of repayment",
      minimumContribution: "Completed",
    },
  };

  const accountInfo = [
    { label: "Full Name", value: loanData.accountInfo.fullName },
    { label: "Account Number", value: loanData.accountInfo.accountNumber },
    { label: "Bank", value: loanData.accountInfo.bank },
    { label: "Scheme", value: loanData.accountInfo.scheme },
    { label: "Weekly Income", value: `₦${loanData.accountInfo.weeklyIncome}` },
    {
      label: "Weekly Contribution",
      value: `₦${loanData.accountInfo.weeklyContribution}`,
    },
    {
      label: "Total Contribution",
      value: `₦${loanData.accountInfo.totalContribution}`,
    },
    { label: "BVN", value: loanData.accountInfo.bvn },
  ];

  const loanRequestDetails = [
    {
      label: "Requested Loan Amount",
      value: `₦${loanData.loanRequest.requestedAmount}`,
    },
    {
      label: "Subscription Scheme",
      value: loanData.loanRequest.subscriptionScheme,
    },
    {
      label: "Loan Management Fee",
      value: loanData.loanRequest.loanManagementFee,
    },
    { label: "Repayment Term", value: loanData.loanRequest.repaymentTerm },
    { label: "Repayment Plan", value: loanData.loanRequest.repaymentPlan },
    { label: "Default Penalty", value: loanData.loanRequest.defaultPenalty },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center space-x-4">
        <Link href="/loan-management" className="w-10 h-10 bg-white rounded-full">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold font-outfit">Loan Request Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-normal">
              Account Information
            </CardTitle>
          </CardHeader>
          <hr className="border-gray-200 mb-5" />
          <CardContent className="space-y-3">
            {accountInfo.map((item) => (
              <div
                key={item.label}
                className="flex justify-between text-sm pb-5"
              >
                <span className="text-gray-600 font-outfit">{item.label}</span>
                <span className="font-medium font-outfit">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-normal">
              Loan Request Details
            </CardTitle>
          </CardHeader>
          <hr className="border-gray-200 mb-5" />
          <CardContent className="space-y-3">
            {loanRequestDetails.map((item) => (
              <div
                key={item.label}
                className="flex justify-between text-sm pb-5 font-outfit"
              >
                <span className="text-gray-600 font-outfit">{item.label}</span>
                <span className="font-medium font-outfit">{item.value}</span>
              </div>
            ))}

            <div className="flex justify-between text-sm pt-2">
              <span className="text-gray-600">Minimum Contribution Amount</span>
              <TransactionStatus
                status={loanData.loanRequest.minimumContribution as StatusType}
              />
            </div>

            <div className="flex justify-between space-x-4 pt-6">
              <Button className="bg-primary-900 hover:bg-primary-700 w-full">
                Approve Loan
              </Button>
              <Button className="bg-red-800 hover:bg-red-600  w-full">
                Reject Loan{" "}
              </Button>
              <Button variant="outline" className=" w-full">
                Waitlist Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
