"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Loader2 } from "lucide-react"
import Pagination from "@/components/ui/pagination"
import useGetQuery from "@/hooks/useGetQuery"
import { toast } from "react-toastify"
import { formatDate, formatCurrency, formatFullName } from "@/lib/utils"
import { User, tabs } from "./types"
import { useSearchParams } from "next/navigation"
import TabsSearchHeader from "@/components/ui/tabs-search-header"

export default function KYCReviews() {
  const [searchTerm, setSearchTerm] = useState("")
  const searchParams = useSearchParams();
  const statusParams = searchParams.get("status");

  const [selectedTab, setSelectedTab] = useState<string | number>(statusParams || "all-users");
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

  const currentTabStatus = tabs.find((tab) => tab.id === selectedTab)?.status;

  const { data, status, error, refetch } = useGetQuery({
    endpoint: "adminusermanagement/users",
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
        setMetaData({
          totalCount: 0,
          pageSize: pageSize,
          currentPage: pageNumber,
          totalPages: 1,
          hasNext: false,
          hasPrevious: false,
        })
      }
    } else if (status === "error") {
      toast.error(
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message || "Something went wrong while fetching users."
          : "Something went wrong while fetching users."
      )
      setUsers([])
      setMetaData({
        totalCount: 0,
        pageSize: pageSize,
        currentPage: pageNumber,
        totalPages: 1,
        hasNext: false,
        hasPrevious: false,
      })
    }
  }, [data, status, error, pageNumber, pageSize])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (pageNumber !== 1 && searchTerm) {
        setPageNumber(1)
      } else {
        refetch()
      }
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, pageNumber, refetch])

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
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onFilterClick={() => {}}
        isLoading={isLoading}
        secondaryFilter={true}
      />
      <div className="grid grid-cols-7 gap-4 min-w-[800px] px-6 py-3 text-sm font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit w-full">
        <div>Name</div>
        <div>Date Joined</div>
        <div>Scheme</div>
        <div>Loan-Ready Balance(₦)</div>
        <div>Eligible Loan (₦)</div>
        <div>Amount Repaid (₦)</div>
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
              {typeof error === "object" && error !== null && "message" in error
                ? (error as { message?: string }).message || "Failed to load users."
                : "Failed to load users."}
            </p>
            <Button onClick={handleRetry} variant="outline">
              Try Again
            </Button>
          </div>
        ) : users.length > 0 ? (
          users.map((user) => (
            <Card key={user.userId} className="shadow-sm bg-white min-w-[800px]">
              <CardContent className="p-6">
                <div className="grid grid-cols-7 w-full gap-4 items-center font-outfit">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">{formatFullName(user.name)}</span>
                  </div>
                  <div className="text-sm text-gray-600">{formatDate(user.dateJoined)}</div>
                  <div className="text-sm text-gray-600">{user.scheme}</div>
                  <div className="text-sm text-gray-600">{formatCurrency(user.totalContribution)}</div>
                  <div className="text-sm text-gray-600">{formatCurrency(user.eligibleLoan)}</div>
                  <div className="text-sm text-gray-600">{formatCurrency(user.totalRepaidAmount)}</div>
                  <div className="flex justify-start w-full">
                    <Link href={`/user-management/${user.userId}`}>
                      <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-2 w-fit">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">No users found for this status.</p>
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
