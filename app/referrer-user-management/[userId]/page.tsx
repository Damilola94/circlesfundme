"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import Pagination from "@/components/ui/pagination"
import { TransactionStatus } from "@/components/ui/transactionstatus"
import useGetQuery from "@/hooks/useGetQuery"
import { toast } from "react-toastify"
import { formatAmount } from "@/lib/utils"
import moment from "moment"
import type { StatusType } from "../types"
import TabsSearchHeader from "@/components/ui/tabs-search-header"
import Image from "next/image"

export default function ReferredUserActivityPage({
  params,
}: {
  params: { userId: string }
}) {
  const router = useRouter()
  const userId = params.userId

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [selectedTab, setSelectedTab] = useState<
    "contributions" | "loans"
  >("contributions")

  const handleTabChange = (tabId: string | number) => {
    setSelectedTab(tabId as "contributions" | "loans")
    setPageNumber(1)
  }

  const tabs = [
    { id: "contributions", label: "Contributions" },
    { id: "loans", label: "Loan Repayments" },
  ]

  const {
    data: userData,
    status: userStatus,
  } = useGetQuery({
     endpoint: `users/${userId}`,
    queryKey: ["user-profile", userId],
    enabled: !!userId,
    auth: true,
  })

  const {
    data: contributionsData,
    status: contributionsStatus,
    refetch: refetchContributions,
  } = useGetQuery({
    endpoint: `referrers/my-referred-users`,
    extra: "contributions",
    pQuery: {
      UserId: userId,
      Status: "",
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    queryKey: [
      "referred-contributions",
      userId,
      pageNumber.toString(),
      pageSize.toString(),
    ],
    enabled: !!userId && selectedTab === "contributions",
    auth: true,
  })

  const {
    data: loansData,
    status: loansStatus,
  } = useGetQuery({
    endpoint: 'referrers/my-referred-users',
    extra: "loan-repayments",
    pQuery: {
      UserId: userId,
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    queryKey: [
      "referred-loans",
      userId,
      pageNumber.toString(),
      pageSize.toString(),
    ],
    enabled: !!userId && selectedTab === "loans",
    auth: true,
  })

  const user = useMemo(() => {
    if (userStatus === "success" && userData?.isSuccess && userData.data) {
      const apiUser = userData.data
      const initials = `${apiUser.firstName?.[0] ?? ""}${apiUser.lastName?.[0] ?? ""}`.toUpperCase()

      return {
        name: `${apiUser.firstName} ${apiUser.lastName}`,
        email: apiUser.email || "",
        phone: apiUser.phoneNumber || "",
        image: apiUser.profilePictureUrl,
        initials,
        scheme: apiUser.contributionScheme?.name || "N/A",
        contribution: formatAmount(apiUser.totalContributed || 0, "N"),
      }
    }

    return {
      name: "User Not Found",
      email: "",
      phone: "",
      image: "",
      initials: "UN",
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
        scheme: c.schemeName || "N/A",
        contributionAmount: formatAmount(c.contributionAmount || 0, "N"),
        amountSaved: formatAmount(c.amountSaved || 0, "N"),
        nextDueDate: c.nextDueDate
          ? moment(c.nextDueDate).format("DD/MM/YYYY")
          : "-",
        commission: formatAmount(c.commission || 0, "N"),
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
        loanAmount: formatAmount(l.loanAmount || 0, "N"),
        amountRepaid: formatAmount(l.amountRepaid || 0, "N"),
        repaymentSchedule: l.repaymentSchedule || "N/A",
      }))
    }
    return []
  }, [loansData, loansStatus])


  useEffect(() => {
    if (userStatus === "error") {
      toast.error("Failed to load user profile.")
    }
  }, [userStatus])

  useEffect(() => {
    if (contributionsStatus === "error") {
      toast.error("Failed to load contributions.")
    }
  }, [contributionsStatus])

  useEffect(() => {
    if (loansStatus === "error") {
      toast.error("Failed to load loan repayments.")
    }
  }, [loansStatus])

  const isLoading = userStatus === "loading"
  const totalContributions = contributionsData?.data?.length || 0
  const totalLoans = loansData?.data?.length || 0


  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/referrals">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Referred User Activity</h1>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {!isLoading && (
        <>
          <Card>
            <CardContent className="p-6 flex gap-6">
              <Image
                src={user.image || "/assets/images/display-photo.png"}
                alt={user.name}
                fill
                className="rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.phone}</p>

                <div className="grid grid-cols-2 gap-6 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Scheme</p>
                    <p className="font-semibold">{user.scheme}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Contributed</p>
                    <p className="font-semibold text-primary-600">
                      {user.contribution}
                    </p>
                  </div>
                </div>
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
                onSearchChange={() => { }}
                onFilterClick={() => { }}
                isLoading={isLoading}
                secondaryFilter
              />

              {selectedTab === "contributions" && (
                <>
                  {contributions.map((c: any) => (
                    <div key={c.id} className="grid grid-cols-7 py-4 border-b text-sm">
                      <div>{c.dateApplied}</div>
                      <TransactionStatus status={c.status as StatusType} />
                      <div>{c.scheme}</div>
                      <div>{c.contributionAmount}</div>
                      <div>{c.amountSaved}</div>
                      <div>{c.nextDueDate}</div>
                      <div className="text-primary-600">{c.commission}</div>
                    </div>
                  ))}

                  <Pagination
                    current={pageNumber}
                    pageSize={pageSize}
                    total={totalContributions}
                    onPageChange={setPageNumber}
                    onRowChange={setPageSize}
                  />
                </>
              )}

              {selectedTab === "loans" && (
                <>
                  {loans.map((l: any) => (
                    <div key={l.id} className="grid grid-cols-5 py-4 border-b text-sm">
                      <div>{l.dateRepaid}</div>
                      <TransactionStatus status={l.status as StatusType} />
                      <div>{l.loanAmount}</div>
                      <div>{l.amountRepaid}</div>
                      <div>{l.repaymentSchedule}</div>
                    </div>
                  ))}

                  <Pagination
                    current={pageNumber}
                    pageSize={pageSize}
                    total={totalLoans}
                    onPageChange={setPageNumber}
                    onRowChange={setPageSize}
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
