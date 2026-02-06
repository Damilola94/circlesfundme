"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Pagination from "@/components/ui/pagination"
import useGetQuery from "@/hooks/useGetQuery"
import { toast } from "react-toastify"
import { formatDate, formatCurrency, formatFullName } from "@/lib/utils"
import { User, tabs } from "./types"
import { useSearchParams } from "next/navigation"
import TabsSearchHeader from "@/components/ui/tabs-search-header"

export default function KYCReviews() {
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const searchParams = useSearchParams()
  const statusParams = searchParams.get("status")

  const [selectedTab, setSelectedTab] = useState<string | number>(
    statusParams || "all-users"
  )

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

  const currentTabStatus = tabs.find(
    (tab) => tab.id === selectedTab
  )?.status

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(searchInput)
      setPageNumber(1)
    }, 600)

    return () => clearTimeout(timeout)
  }, [searchInput])

  const { data, status, error, refetch } = useGetQuery({
    endpoint: "referrers",
    extra: "my-referred-users",
    pQuery: {
      status: currentTabStatus,
      PageNumber: pageNumber,
      PageSize: pageSize,
      ...(searchTerm && { SearchKey: searchTerm }),
    },
    queryKey: ["users", currentTabStatus, pageNumber, pageSize, searchTerm],
    auth: true,
  })

  useEffect(() => {
    if (status === "success") {
      if (data?.isSuccess) {
        setUsers(data.data)
        setMetaData(data.metaData)
      } else {
        toast.error(data?.message || "Failed to fetch users.")
        setUsers([])
      }
    }

    if (status === "error") {
      toast.error(
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message ||
              "Something went wrong."
          : "Something went wrong."
      )
      setUsers([])
    }
  }, [data, status, error])

  const handleTabChange = (tabId: string | number) => {
    setUsers([])
    setSelectedTab(tabId)
    setSearchInput("")
    setSearchTerm("")
    setPageNumber(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchInput(value)
  }

  const handlePageChange = (page: number) => {
    setPageNumber(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setPageNumber(1)
  }

  const handleRetry = () => {
    refetch()
  }

  const isLoading = status === "loading"
  const isError = status === "error" || (status === "success" && data && !data.isSuccess)

  return (
    <div className="overflow-x-auto 1140:overflow-visible flex-1 space-y-6 p-6">
      <TabsSearchHeader
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
        searchTerm={searchInput}
        onSearchChange={handleSearchChange}
        onFilterClick={() => {}}
        isLoading={isLoading}
        secondaryFilter
      />

      <div className="grid grid-cols-9 gap-4 min-w-[800px] px-6 py-3 text-sm font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit w-full">
        <div>Full Name</div>
        <div>User Email</div>
        <div>Date Joined</div>
        <div>Contribution Count (₦)</div>
        <div>Loan Count (₦)</div>
        <div>Total Contribution (₦)</div>
        <div>Total Loan Value (₦)</div>
        <div></div>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span className="text-gray-500">Loading users...</span>
          </div>
        ) : isError ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">
              Failed to load users.
            </p>
            <Button onClick={handleRetry} variant="outline">
              Try Again
            </Button>
          </div>
        ) : users.length > 0 ? (
          users.map((user) => (
            <Card key={user.userId} className="shadow-sm bg-white min-w-[800px]">
              <CardContent className="p-6">
                <div className="grid grid-cols-9 w-full gap-4 items-center font-outfit">
                  <div className="font-medium text-gray-900">
                    {formatFullName(user.fullName)}
                  </div>
                  <div className=" text-gray-600 max-w-[200px] truncate text-sm">{user.email}</div>
                  <div className="text-sm text-gray-600">
                    {formatDate(user.dateJoined)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(user.contributionsCount)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(user.loansCount)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(user.totalContributed)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(user.totalLoanValue)}
                  </div>
                  <Link href={`/referrer-user-management/${user.userId}`}>
                    <Button
                      size="sm"
                      className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-3 text-xs"
                    >
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            No users found for this status.
          </p>
        )}
      </div>

      {!isLoading && !isError && (
        <Pagination
          current={metaData?.currentPage}
          onPageChange={handlePageChange}
          onRowChange={handlePageSizeChange}
          pageSize={metaData?.pageSize}
          total={metaData?.totalCount}
        />
      )}
    </div>
  )
}
