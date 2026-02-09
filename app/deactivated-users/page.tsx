"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Pagination from "@/components/ui/pagination"
import useGetQuery from "@/hooks/useGetQuery"
import moment from "moment"
import TabsSearchHeader from "@/components/ui/tabs-search-header"
import { formatFullName } from "@/lib/utils"
import { DeactivationTabs, getStatusBadge } from "./types"

export default function DeactivationRequestsPage() {
  const [selectedTab, setSelectedTab] = useState<string | number>("pending")
  const [searchInput, setSearchInput] = useState("")

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const currentStatus = DeactivationTabs.find(
    (tab) => tab.id === selectedTab
  )?.status

  const { data, status } = useGetQuery({
    endpoint: "adminusermanagement/deactivation-requests",
    pQuery: {
      Status: currentStatus,
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    queryKey: [
      "deactivation-requests",
      currentStatus,
      pageNumber,
      pageSize,
    ],
    auth: true,
  })

  const requests = useMemo(() => {
    if (status === "success" && data?.isSuccess) {
      return data.data ?? []
    }
    return []
  }, [data, status])

  const metaData = data?.metaData ?? {
    totalCount: 0,
    pageSize,
    currentPage: pageNumber,
  }

  const handleTabChange = (tabId: string | number) => {
    setSelectedTab(tabId)
    setPageNumber(1)
  }

  const isLoading = status === "loading"
  const isError =
    status === "error" || (status === "success" && data && !data.isSuccess)

  return (
    <div className="overflow-x-auto 1140:overflow-visible flex-1 space-y-6 p-6">
      <TabsSearchHeader
        tabs={DeactivationTabs}
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
        searchTerm={searchInput}
        onSearchChange={setSearchInput}
        onFilterClick={() => { }}
        isLoading={isLoading}
      />

      <div className="grid grid-cols-6 gap-4 px-6 py-3 text-sm font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit w-full min-w-[800px]">
        <div>User Name</div>
        <div>Email</div>
        <div>Status</div>
        <div>Requested Date</div>
        <div>Reason</div>
        <div></div>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span className="text-gray-500">Loading requests...</span>
          </div>
        ) : requests.length > 0 ? (
          requests.map((request: any) => (
            <Card key={request.id} className="shadow-sm bg-white min-w-[800px]">
              <CardContent className="p-6">
                <div className="grid grid-cols-6 gap-4 items-center font-outfit">
                  <div className="font-medium text-gray-900">
                    {formatFullName(request.userName)}
                  </div>

                  <div className="text-sm text-gray-600 max-w-[200px] truncate">
                    {request.userEmail.toLowerCase()}
                  </div>

                  <div>
                    <span
                      className={`px-2.5 py-1.5 rounded-full text-xs font-medium ${getStatusBadge(
                        request.status
                      )}`}
                    >
                      {
                        DeactivationTabs.find(
                          (t) => t.status === request.status
                        )?.label
                      }
                    </span>
                  </div>

                  <div className="text-sm text-gray-600">
                    {moment(request.createdDate).format("MMM D, YYYY")}
                  </div>

                  <div className="text-sm text-gray-600 truncate">
                    {request.reason || "--"}
                  </div>

                  <Link href={`/deactivated-users/${request.id}`}>
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
            No deactivation requests found.
          </p>
        )}
      </div>

      {!isLoading && !isError && (
        <Pagination
          current={metaData.currentPage}
          onPageChange={setPageNumber}
          onRowChange={(size) => {
            setPageSize(size)
            setPageNumber(1)
          }}
          pageSize={metaData.pageSize}
          total={metaData.totalCount}
        />
      )}
    </div>
  )
}
