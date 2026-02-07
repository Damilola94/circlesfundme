"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Loader2 } from "lucide-react"
import moment from "moment"
import { toast } from "react-toastify"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/ui/pagination"
import { TransactionStatus } from "@/components/ui/transactionstatus"
import TabsSearchHeader from "@/components/ui/tabs-search-header"

import useGetQuery from "@/hooks/useGetQuery"
import { formatAmount } from "@/lib/utils"
import type { StatusType } from "../types"

export default function ReferredUserActivityPage({
  params,
}: {
  params: { userId: string }
}) {
  const userId = params.userId

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedTab, setSelectedTab] = useState<"contributions" | "loans">(
    "contributions"
  )

  const handleTabChange = (tabId: string | number) => {
    setSelectedTab(tabId as "contributions" | "loans")
    setPageNumber(1)
  }

  const tabs = [
    { id: "contributions", label: "Contributions" },
    { id: "loans", label: "Loan Repayments" },
  ]

  const { data: userData, status: userStatus } = useGetQuery({
    endpoint: `users/${userId}`,
    queryKey: ["user-profile", userId],
    enabled: !!userId,
    auth: true,
  })

  const { data: contributionsData, status: contributionsStatus } = useGetQuery({
    endpoint: `referrers/my-referred-users`,
    extra: "contributions",
    pQuery: {
      UserId: userId,
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    queryKey: ["referred-contributions", userId, pageNumber, pageSize],
    enabled: !!userId && selectedTab === "contributions",
    auth: true,
  })

  const { data: loansData, status: loansStatus } = useGetQuery({
    endpoint: `referrers/my-referred-users`,
    extra: "loan-repayments",
    pQuery: {
      UserId: userId,
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    queryKey: ["referred-loans", userId, pageNumber, pageSize],
    enabled: !!userId && selectedTab === "loans",
    auth: true,
  })

  const user = useMemo(() => {
    if (userStatus === "success" && userData?.isSuccess) {
      const u = userData.data
      return {
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        phone: u.phoneNumber,
        image: u.profilePictureUrl,
        scheme: u.contributionScheme?.name ?? "N/A",
        contribution: formatAmount(u.totalContributed ?? 0, "N"),
      }
    }
    return {
      name: "User Not Found",
      email: "",
      phone: "",
      image: "",
      scheme: "N/A",
      contribution: "₦0.00",
    }
  }, [userData, userStatus])

  const contributions = useMemo(() => {
    if (contributionsStatus === "success" && contributionsData?.isSuccess) {
      return contributionsData.data.map((c: any) => ({
        id: c.id,
        dateApplied: moment(c.dateApplied).format("DD/MM/YYYY"),
        status: c.status,
        scheme: c.schemeName,
        contributionAmount: formatAmount(c.contributionAmount, "N"),
        amountSaved: formatAmount(c.amountSaved, "N"),
        nextDueDate: c.nextDueDate
          ? moment(c.nextDueDate).format("DD/MM/YYYY")
          : "-",
        commission: formatAmount(c.commission, "N"),
      }))
    }
    return []
  }, [contributionsData, contributionsStatus])

  const loans = useMemo(() => {
    if (loansStatus === "success" && loansData?.isSuccess) {
      return loansData.data.map((l: any) => ({
        id: l.id,
        dateRepaid: moment(l.dateRepaid).format("DD/MM/YYYY"),
        status: l.status,
        loanAmount: formatAmount(l.loanAmount, "N"),
        amountRepaid: formatAmount(l.amountRepaid, "N"),
        repaymentSchedule: l.repaymentSchedule,
      }))
    }
    return []
  }, [loansData, loansStatus])

  const contributionsPagination =
    contributionsData?.metaData?.pagination
  const loansPagination = loansData?.metaData?.pagination

  const totalContributions =
    contributionsPagination?.totalCount ?? 0
  const totalLoans = loansPagination?.totalCount ?? 0

  useEffect(() => {
    if (userStatus === "error") toast.error("Failed to load user profile")
    if (contributionsStatus === "error")
      toast.error("Failed to load contributions")
    if (loansStatus === "error")
      toast.error("Failed to load loan repayments")
  }, [userStatus, contributionsStatus, loansStatus])

  const isLoading = userStatus === "loading"

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/referrer-user-management">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">User Activity</h1>
      </div>

      {isLoading && (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {!isLoading && (
        <>
          <Card>
            <CardContent className="p-6 flex flex-col md:flex-row gap-6 justify-between">
              <div className="flex gap-4 items-center">
                <div className="relative h-20 w-20">
                  <Image
                    src={user.image || "/assets/images/display-photo.png"}
                    alt={user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Scheme</p>
                <p className="font-semibold">{user.scheme}</p>
                <p className="text-sm text-gray-500 mt-2">Total Contributed</p>
                <p className="font-semibold text-primary-600">
                  {user.contribution}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <TabsSearchHeader
                tabs={tabs}
                selectedTab={selectedTab}
                onTabChange={handleTabChange}
                searchTerm=""
                onSearchChange={() => {}}
                onFilterClick={() => {}}
                isLoading={isLoading}
                secondaryFilter
                className="bg-transparent"
              />
<div className="my-6"/>
              {selectedTab === "contributions" && (
                <>
                  <div className="grid grid-cols-7 py-3 border-b text-sm font-medium">
                    <div>Date Applied</div>
                    <div>Status</div>
                    <div>Scheme</div>
                    <div>Contribution</div>
                    <div>Saved</div>
                    <div>Next Due</div>
                    <div>Commission</div>
                  </div>

                  {contributions.length === 0 ? (
                    <div className="py-12 text-center text-sm text-muted-foreground">
                      No contributions found
                    </div>
                  ) : (
                    contributions.map((c:any) => (
                      <div
                        key={c.id}
                        className="grid grid-cols-7 py-4 border-b text-sm"
                      >
                        <div>{c.dateApplied}</div>
                        <TransactionStatus status={c.status as StatusType} />
                        <div>{c.scheme}</div>
                        <div>{c.contributionAmount}</div>
                        <div>{c.amountSaved}</div>
                        <div>{c.nextDueDate}</div>
                        <div className="text-primary-600">{c.commission}</div>
                      </div>
                    ))
                  )}

                  <Pagination
                    current={pageNumber}
                    pageSize={pageSize}
                    total={totalContributions}
                    onPageChange={setPageNumber}
                    onRowChange={(size) => {
                      setPageSize(size)
                      setPageNumber(1)
                    }}
                  />
                </>
              )}

              {selectedTab === "loans" && (
                <>
                  <div className="grid grid-cols-5 py-3 border-b text-sm font-medium">
                    <div>Date Repaid</div>
                    <div>Status</div>
                    <div>Loan Amount</div>
                    <div>Amount Repaid</div>
                    <div>Schedule</div>
                  </div>

                  {loans.length === 0 ? (
                    <div className="py-12 text-center text-sm text-muted-foreground">
                      No loan repayments found
                    </div>
                  ) : (
                    loans.map((l: any) => (
                      <div
                        key={l.id}
                        className="grid grid-cols-5 py-4 border-b text-sm"
                      >
                        <div>{l.dateRepaid}</div>
                        <TransactionStatus status={l.status as StatusType} />
                        <div>{l.loanAmount}</div>
                        <div>{l.amountRepaid}</div>
                        <div>{l.repaymentSchedule}</div>
                      </div>
                    ))
                  )}

                  <Pagination
                    current={pageNumber}
                    pageSize={pageSize}
                    total={totalLoans}
                    onPageChange={setPageNumber}
                    onRowChange={(size) => {
                      setPageSize(size)
                      setPageNumber(1)
                    }}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
