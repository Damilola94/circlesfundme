"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import mockData from "../../mockdata.json";
import { ArrowLeft, Filter, Search } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import { TransactionStatus } from "@/components/ui/transactionstatus";
import { TransactionType } from "@/components/ui/actiontype";
import { Input } from "@/components/ui/input";

export type StatusType =
  | "Active"
  | "Completed"
  | "Pending"
  | "Waitlisted"
  | "Successful"
  | "Failed";

export type ActionType = "Contribution" | "Withdrawal";

export default function UserProfilePage() {
  const [pageNumber, setPageNumber] = useState(2);
  const [pageSize, setPageSize] = useState(10);
  const totalElements = 95;
  const [searchTerm, setSearchTerm] = useState("");

  const communicationHistory = [
    {
      id: 1,
      date: "20/05/2025",
      action: "Contribution",
      amount: "56,678.90",
      withdrawalCharge: 10.9,
      status: "Successful",
    },
    {
      id: 2,
      date: "20/05/2025",
      action: "Withdrawal",
      amount: "56,678.90",
      withdrawalCharge: 10.9,
      status: "Failed",
    },
    {
      id: 3,
      date: "20/05/2025",
      action: "Withdrawal",
      amount: "56,678.90",
      withdrawalCharge: 10.9,
      status: "Successful",
    },
    {
      id: 4,
      date: "20/05/2025",
      action: "Contribution",
      amount: "56,678.90",
      withdrawalCharge: 10.9,
      status: "Successful",
    },
    {
      id: 5,
      date: "20/05/2025",
      action: "Withdrawal",
      amount: "56,678.90",
      withdrawalCharge: 10.9,
      status: "Failed",
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center space-x-4">
        <Link href="/kyc-reviews" className="w-10 h-10 bg-white rounded-full">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-end">
        <p className="text-lg font-outfit">Transaction History</p>
        <div className="flex items-center justify-between space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 font-outfit" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10 font-outfit"
            />
          </div>
          <Button className="bg-primary-900 hover:bg-primary-700">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 px-6 py-3 text-sm font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit">
        <div>Date</div>
        <div>Action</div>
        <div>Amount (₦)</div>
        <div>Withdrawl Charge (₦)</div>
        <div>Status</div>
      </div>

      <div className="space-y-3">
        {communicationHistory.map((item) => (
          <Card key={item.id} className="shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-5 gap-4 items-center">
                <div className="text-sm text-gray-600 font-outfit">{item.date}</div>
                <TransactionType actionType={item.action as ActionType} />
                <div className="text-sm text-gray-600 font-outfit">{item.amount}</div>
                <div className="text-sm text-gray-600 font-outfit">
                  {item.withdrawalCharge}
                </div>
                <TransactionStatus status={item.status as StatusType} />
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
    </div>
  );
}
