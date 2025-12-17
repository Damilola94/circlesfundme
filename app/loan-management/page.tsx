"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Loader2 } from "lucide-react"
import { TransactionStatus } from "@/components/ui/transactionstatus"
import Pagination from "@/components/ui/pagination"
import useGetQuery from "@/hooks/useGetQuery"
import TabsSearchHeader from "@/components/ui/tabs-search-header"

export type StatusType = "Approved" | "Pending" | "Rejected" | "Waitlist"

export default function LoanManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | number>("all-loans")
  const [schemeFilter, setSchemeFilter] = useState<string | number>("all-scheme")
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const statusTabs = [
    { id: "all-loans", label: "All Loans" },
    { id: "approved", label: "Approved" },
    { id: "pending", label: "Pending" },
    { id: "rejected", label: "Rejected" },
    { id: "waitlist", label: "Waitlisted" },
  ]

  const schemeTabs = [
    { id: "all-scheme", label: "All Scheme" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "autofinance", label: "AutoFinance" },
  ]

  const {
    data: loanRequestsResponse,
    isLoading: loanRequestsLoading,
    isError: loanRequestsError,
  } = useGetQuery({
    endpoint: "loanapplications",
    pQuery: {
      Status: statusFilter === "all-loans" ? undefined : statusFilter,
      SchemeType: schemeFilter === "all-scheme" ? undefined : schemeFilter,
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    queryKey: ["loan-requests", statusFilter, schemeFilter, pageNumber, pageSize],
    auth: true,
  })

  const loansToDisplay = loanRequestsResponse?.data || []
  const totalElements = loanRequestsResponse?.totalElements || 0

  const filteredLoans = loansToDisplay.filter((loan: any) => {
    const fullName = `${loan.applicantDetail?.firstName || ""} ${loan.applicantDetail?.lastName || ""}`.toLowerCase()
    const matchesSearch = fullName.includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="overflow-x-auto 1140:overflow-visible flex-1 space-y-6 p-6">

      <div className="flex-1 space-y-6 p-6 min-w-[800px] ">
        <TabsSearchHeader
          tabs={statusTabs}
          selectedTab={statusFilter}
          onTabChange={setStatusFilter}
          searchTerm={searchTerm}
          onSearchChange={() => { }}
          onFilterClick={() => { }}
          secondaryFilter={true}
          isLoading={loanRequestsLoading}
        />
        <TabsSearchHeader
          tabs={schemeTabs}
          selectedTab={schemeFilter}
          onTabChange={setSchemeFilter}
          searchTerm={searchTerm}
          onSearchChange={() => { }}
          secondaryFilter={false}
          onFilterClick={() => { }}
          isLoading={loanRequestsLoading}
        />
        <div className="grid grid-cols-7 gap-4 min-w-[800px] px-6 py-3 text-sm font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit">
          <div>Name</div>
          <div>Status</div>
          <div>Scheme</div>
          <div>Eligible Loan (₦)</div>
          <div>Amount Repaid (₦)</div>
          <div>Date Applied</div>
          <div></div>
        </div>
        {loanRequestsLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span className="text-gray-500">Loading loan requests...</span>
          </div>
        )}
        {loanRequestsError && (
          <div className="flex-1 space-y-6 p-6 text-center text-red-500">
            Failed to load loan requests. Please try again.
          </div>
        )}
        <div className="space-y-3">
          {filteredLoans.length > 0 ? (
            filteredLoans.map((loan: any) => (
              <Card key={loan.id} className="shadow-sm min-w-[800px] ">
                <CardContent className="p-6">
                  <div className="grid grid-cols-7 gap-4 items-center">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-900 font-outfit">
                        {`${loan.applicantDetail?.firstName || ""} ${loan.applicantDetail?.lastName || ""}`.trim()}
                      </span>
                    </div>
                    <div>
                      <TransactionStatus status={loan.status as StatusType} />
                    </div>
                    <div className="text-sm text-gray-600 font-outfit">{loan.scheme}</div>
                    <div className="text-sm text-gray-600 font-outfit">{formatCurrency(loan.eligibleLoanAmount)}</div>
                    <div className="text-sm text-gray-600 font-outfit">{formatCurrency(loan.amountRepaid)}</div>
                    <div className="text-sm text-gray-600 font-outfit">{formatDate(loan.dateApplied)}</div>
                    <div className="w-full">
                      <Link href={`/loan-management/${loan.id}`}>
                        <Button size="sm" className="bg-gray-900 hover:bg-gray-800 w-full text-white rounded-full px-2">
                          View Request
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">No loan requests found.</div>
          )}
        </div>
        <Pagination
          current={pageNumber}
          onPageChange={setPageNumber}
          onRowChange={setPageSize}
          pageSize={pageSize}
          total={totalElements}
        />
      </div>
    </div>

  )
}
