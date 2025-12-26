"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import { formatCurrency, formatDate, formatFullName } from "@/lib/utils"
import useGetQuery from "@/hooks/useGetQuery"
import { useMutation } from "react-query"

import Pagination from "@/components/ui/pagination"
import TabsSearchHeader from "@/components/ui/tabs-search-header"
import { ConfirmationModal } from "@/components/ui/confirmation-modal"

import { User, tabs } from "./types"
import handleFetch from "@/services/api/handleFetch"

export default function WithdrawalRequests() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState<string | number>("pending")
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [users, setUsers] = useState<User[]>([])
  const [metaData, setMetaData] = useState({
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  })

  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const isPending = selectedTab === "pending"
  const isApproved = selectedTab === "approved"

  const showActions = isPending

  const { data, status, error, refetch } = useGetQuery({
    endpoint: "adminwithdrawalrequests",
    pQuery: {
      status: selectedTab,
      PageNumber: pageNumber,
      PageSize: pageSize,
      ...(searchTerm && { SearchKey: searchTerm }),
    },
    queryKey: ["withdrawal-requests", pageNumber, pageSize, selectedTab, searchTerm],
    auth: true,
  })

  useEffect(() => {
    if (status === "success") {
      if (data?.isSuccess) {
        setUsers(data.data)
        setMetaData(data.metaData)
      } else {
        toast.error(data?.message || "Failed to fetch requests.")
      }
    }

    if (status === "error") {
      toast.error("Something went wrong while fetching requests.")
    }
  }, [status, data, error])

  const actionMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      if (res?.isSuccess) {
        toast.success(res?.message || "Action completed.")
        refetch()
      } else {
        toast.error(res?.message || "Action failed.")
      }
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong.")
    },
  })

  const handleConfirmAction = () => {
    if (!selectedId || !actionType) return

    const endpoint =
      actionType === "approve"
        ? `adminwithdrawalrequests/${selectedId}/approve`
        : `adminwithdrawalrequests/${selectedId}/reject`

    actionMutation.mutate({
      endpoint,
      method: "POST",
      auth: true,
    })

    setIsActionModalOpen(false)
  }

  const openApprovalModal = (id: string) => {
    setSelectedId(id)
    setActionType("approve")
    setIsActionModalOpen(true)
  }

  const openRejectModal = (id: string) => {
    setSelectedId(id)
    setActionType("reject")
    setIsActionModalOpen(true)
  }

  const handleTabChange = (tabId: string | number) => {
    setSelectedTab(tabId)
    setPageNumber(1)
    setSearchTerm("")
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const handlePageChange = (page: number) => {
    setPageNumber(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setPageNumber(1)
  }

  const isLoading = status === "loading"
  const isError =
    status === "error" || (status === "success" && data && !data.isSuccess)

  return (
    <div className="overflow-x-auto 1140:overflow-visible flex-1 space-y-6 p-6">
      <TabsSearchHeader
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        secondaryFilter={false}
        onFilterClick={() => {}}
        isLoading={isLoading}
      />

      <div
        className={`grid gap-4 min-w-[900px] px-6 py-3 font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit ${
          showActions ? "grid-cols-7" : "grid-cols-6"
        }`}
      >
        <div>Name</div>
        <div>Date Requested</div>
        <div>Scheme</div>
        <div>Charge Amount (₦)</div>
        <div>Amount (₦)</div>

        {isApproved && <div>Total Amount (₦)</div>}
        {isPending && <div>Balance (₦)</div>}
        {showActions && <div>Actions</div>}
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : isError ? (
          <p className="text-center text-red-500 py-8">
            Failed to load requests.
          </p>
        ) : users.length > 0 ? (
          users.map((user) => (
            <Card key={user.id} className="shadow-sm bg-white min-w-[900px]">
              <CardContent className="p-6">
                <div
                  className={`grid w-full gap-4 items-center font-outfit ${
                    showActions ? "grid-cols-7" : "grid-cols-6"
                  }`}
                >
                  <span className="font-medium">
                    {formatFullName(user.requesterName)}
                  </span>

                  <span className="text-sm">
                    {formatDate(user.dateRequested)}
                  </span>

                  <span className="text-sm">{user.scheme}</span>

                  <span className="text-sm">
                    {formatCurrency(user.amountRequested)}
                  </span>

                    <span className="text-sm">
                    {formatCurrency(user.chargeAmount)}
                  </span>

                  {isApproved && (
                    <span className="text-sm">
                      {formatCurrency(user.totalAmount)}
                    </span>
                  )}

                  {isPending && (
                    <span className="text-sm">
                      {formatCurrency(user.balanceAtWithdrawal)}
                    </span>
                  )}

                  {showActions && (
                    <div className="flex gap-3">
                      <Button
                        onClick={() => openApprovalModal(user.id)}
                        className="bg-primary px-2 py-1 text-white hover:bg-green-700"
                        disabled={actionMutation.isLoading}
                      >
                        Approve
                      </Button>

                      <Button
                        onClick={() => openRejectModal(user.id)}
                        className="bg-red-600 px-2 text-white hover:bg-red-700"
                        disabled={actionMutation.isLoading}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            No withdrawal requests found.
          </p>
        )}
      </div>

      {!isLoading && !isError && (
        <Pagination
          current={metaData.currentPage}
          onPageChange={handlePageChange}
          onRowChange={handlePageSizeChange}
          pageSize={metaData.pageSize}
          total={metaData.totalCount}
        />
      )}

      <ConfirmationModal
        isOpen={isActionModalOpen}
        onOpenChange={setIsActionModalOpen}
        onConfirm={handleConfirmAction}
        title={actionType === "approve" ? "Approve Withdrawal" : "Reject Withdrawal"}
        description={
          actionType === "approve"
            ? "Are you sure you want to approve this withdrawal request?"
            : "Are you sure you want to reject this withdrawal request?"
        }
        confirmButtonText={actionType === "approve" ? "Approve" : "Reject"}
      />
    </div>
  )
}
