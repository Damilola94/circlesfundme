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
import { formatDate, formatCurrency } from "@/lib/utils"
import { User, tabs } from "./types"
import { useSearchParams } from "next/navigation"

export default function KYCReviews() {
  const [searchTerm, setSearchTerm] = useState("")
  const searchParams = useSearchParams();
  const statusParams = searchParams.get("status");

  const [selectedTab, setSelectedTab] = useState(statusParams || "onboarded-users");
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

  const currentTabStatus = tabs.find((tab) => tab.id === selectedTab)?.status || "active"

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

  const handleTabChange = (tabId: string) => {
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
    <div className="flex-1 space-y-6 p-6">
      <div className="flex justify-between items-end border-b-2">
        <div className="flex space-x-1 bg-gray-100 rounded-lg w-fit justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-medium transition-colors font-outfit disabled:opacity-50 ${selectedTab === tab.id
                ? "border-b-2 border-primary-700 text-primary-700"
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
              onChange={(e) => handleSearchChange(e.target.value)}
              disabled={isLoading}
              className="w-64 pl-10"
            />
          </div>
          <Button className="bg-primary-900 hover:bg-primary-700" disabled={isLoading}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-4 px-6 py-3 text-sm font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit">
        <div>Name</div>
        <div>Date Joined</div>
        <div>Scheme</div>
        <div>Contribution(₦)</div>
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
            <Card key={user.userId} className="shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="grid grid-cols-7 gap-4 items-center font-outfit">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">{formatDate(user.dateJoined)}</div>
                  <div className="text-sm text-gray-600">{user.scheme}</div>
                  <div className="text-sm text-gray-600">{formatCurrency(user.totalContribution)}</div>
                  <div className="text-sm text-gray-600">{formatCurrency(user.eligibleLoan)}</div>
                  <div className="text-sm text-gray-600">{formatCurrency(user.totalRepaidAmount)}</div>
                  <div className="flex justify-end">
                    <Link href={`/user-management/${user.userId}`}>
                      <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-4">
                        View Profile →
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
          current={metaData.currentPage}
          onPageChange={handlePageChange}
          onRowChange={handlePageSizeChange}
          pageSize={metaData.pageSize}
          total={metaData.totalCount}
        />
      )}
    </div>
  )
}
