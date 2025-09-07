"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Filter, Search, Loader2 } from "lucide-react"
import Pagination from "@/components/ui/pagination"
import { TransactionStatus } from "@/components/ui/transactionstatus"
import { TransactionType } from "@/components/ui/actiontype"
import useGetQuery from "@/hooks/useGetQuery"
import type { StatusType, ActionType } from "../../types"
import { formatAmount } from "@/lib/utils"
import moment from "moment-timezone"

export default function UserProfileTransaction() {
  const [pageNumber, setPageNumber] = useState(2)
  const [pageSize, setPageSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const params = useParams();
  const userId = params.userId as string;

  const {
    data: userData,
    isLoading,
    isError,
  } = useGetQuery({
    endpoint: "/adminusermanagement",
    extra: `users/${userId}/payments`,
    queryKey: ["admin-profile", userId, pageNumber.toString(), pageSize.toString()],
    auth: true,
  })

  const filteredTransactions =
    userData?.data?.filter(
      (transaction: { action: string; amount: string | string[]; status: string }) =>
        transaction.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.includes(searchTerm) ||
        transaction.status.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []


  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-white rounded-full">
          <Button onClick={() => router.back()} variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto 1140:overflow-visible flex-1 space-y-6 p-6">

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
        <div className="grid grid-cols-5 gap-4 px-6 py-3 text-sm font-medium min-w-[800px] text-gray-500 border-b-2 rounded-t-lg font-outfit">
          <div>Date</div>
          <div>Action</div>
          <div>Amount (₦)</div>
          <div>Withdrawal Charge (₦)</div>
          <div>Status</div>
        </div>
        {isLoading && <div className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2 text-lg font-outfit">Loading transaction history...</span>
          </div>
        </div>}
        {isError ? <div className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-lg font-outfit text-red-600 mb-2">Failed to load transaction history</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </div>
          </div>
        </div> :
          <div className="space-y-3">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((item: any) => (
                <Card key={item.id} className="shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-5 gap-4 items-center">
                      <div className="text-sm text-gray-600 font-outfit">{
                        moment(item.date).format("MM/DD/YYYY")}
                      </div>
                      <TransactionType actionType={item.action as ActionType} />
                      <div className="text-sm text-gray-600 font-outfit">
                        {formatAmount(item.amount, "₦")}
                      </div>
                      <div className="text-sm text-gray-600 font-outfit">{formatAmount(item.charge, "₦")}</div>
                      <TransactionStatus status={item.status as StatusType} />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 font-outfit">No transactions found</p>
              </div>
            )}
          </div>}
      </div>

      <Pagination
        current={pageNumber}
        onPageChange={setPageNumber}
        onRowChange={setPageSize}
        pageSize={pageSize}
        total={userData?.metaData?.totalCount || 0}
      />
    </div>
  )
}
