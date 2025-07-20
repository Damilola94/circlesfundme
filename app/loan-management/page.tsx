"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import mockData from "./mockdata.json";
import { TransactionStatus } from "@/components/ui/transactionstatus";
import Pagination from "@/components/ui/pagination";
const { loans, statusTabs, schemeTabs } = mockData;

export type StatusType =
  | "Active"
  | "Completed"
  | "Pending"
  | "Waitlisted"
  | "Rejected";

export default function LoanManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all-loans");
  const [schemeFilter, setSchemeFilter] = useState("all-scheme");
  const [pageNumber, setPageNumber] = useState(2);
  const [pageSize, setPageSize] = useState(10);
  const totalElements = 95;

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch = loan.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all-loans" ||
      loan.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesScheme =
      schemeFilter === "all-scheme" ||
      loan.scheme.toLowerCase() === schemeFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesScheme;
  });

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex justify-between items-end border-b-2">
        <div className="flex space-x-1 bg-gray-100 rounded-lg w-fit justify-between">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                statusFilter === tab.id
                  ? "border-b-2 font-outfit border-primary-700 text-primary-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10"
            />
          </div>
          <Button className="bg-primary-900 hover:bg-primary-700">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-end border-b-2">
        <div className="flex space-x-1 bg-gray-100 rounded-lg w-fit justify-between">
          {schemeTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSchemeFilter(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors font-outfit ${
                schemeFilter === tab.id
                  ? "border-b-2 border-primary-700 text-primary-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 px-6 py-3 text-sm font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit">
        <div>Name</div>
        <div>Status</div>
        <div>Scheme</div>
        <div>Eligible Loan (₦)</div>
        <div>Amount Repaid (₦)</div>
        <div>Date Applied</div>
        <div></div>
      </div>

      <div className="space-y-3">
        {filteredLoans.map((loan) => (
          <Card key={loan.id} className="shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-4 items-center">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900 font-outfit">{loan.name}</span>
                </div>
                <div>
                  <TransactionStatus status={loan.status as StatusType} />
                </div>
                <div className="text-sm text-gray-600 font-outfit">{loan.scheme}</div>
                <div className="text-sm text-gray-600 font-outfit">{loan.eligibleLoan}</div>
                <div className="text-sm text-gray-600 font-outfit">{loan.amountRepaid}</div>
                <div className="text-sm text-gray-600 font-outfit">{loan.dateApplied}</div>
                <div className="w-full ">
                  <Link href={`/loan-management/${loan.id}`}>
                    <Button
                      size="sm"
                      className="bg-gray-900 hover:bg-gray-800 w-full text-white rounded-full px-2"
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
    </div>
  );
}
