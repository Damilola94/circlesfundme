"use client"

import { Key, } from "react"
import { StatsCard } from "@/components/dashboard/stats-card"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { UserIcon, LoanIcon, KYCIcon, OverdueIcon } from "@/public/assets/icons"
import { useRouter } from "next/navigation"
import useGetQuery from "@/hooks/useGetQuery"
import "react-toastify/dist/ReactToastify.css"
import moment from "moment";

import { formatAmount, getTotalInflow, getTotalOutflow } from "@/lib/utils"

export default function Dashboard() {
  const router = useRouter()

  const {
    data: metricsData,
    status: metricsStatus,
  } = useGetQuery({
    endpoint: "admindashboard/statistics",
    queryKey: ["dashboard-statistics"],
    auth: true,
  })

  const {
    data: pendingKycData,
    status: pendingKycStatus,
  } = useGetQuery({
    endpoint: "adminusermanagement/users",
    pQuery: { Status: "PendingKYC", PageNumber: 1, PageSize: 3 },
    queryKey: ["pending-kyc-users"],
    auth: true,
  })

  const {
    data: inflowData,
    status: inflowStatus,
  } = useGetQuery({
    endpoint: "admindashboard/inflows",
    queryKey: ["recent-inflow"],
    auth: true,
  })

  const {
    data: outflowData,
    status: outflowStatus,
  } = useGetQuery({
    endpoint: "admindashboard/outflows",
    queryKey: ["recent-outflow"],
    auth: true,
  })

  const {
    data: loanRequestsData,
    status: loanRequestsStatus,
  } = useGetQuery({
    endpoint: "loanapplications",
    pQuery: { Status: "Pending", PageNumber: 1, PageSize: 5 },
    queryKey: ["pending-loan-requests"],
    auth: true,
  })

  const kycQueue = pendingKycData?.isSuccess
    ? pendingKycData.data.map((user: { name: any; dateJoined: string; avatarUrl: any }) => ({
      name: user.name,
      time: moment(user.dateJoined).format("MM/DD/YYYY"),
      avatar: user.avatarUrl,
    }))
    : []

  const recentInflow = inflowData?.isSuccess
    ? inflowData?.data?.map((item: { narration: any; amount: number }) => ({
      narration: item.narration,
      amount: (item.amount),
    }))
    : []

  const totalInflow = getTotalInflow(inflowData);

  const recentOutflow = outflowData?.isSuccess
    ? outflowData?.data?.map((item: { narration: any; amount: number }) => ({
      narration: item.narration,
      amount: (item.amount),
    }))
    : []

  const totalOutflow = getTotalOutflow(outflowData);

  const loanRequests = loanRequestsData?.isSuccess
    ? loanRequestsData.data.map((item: { applicantDetail: { firstName: string, lastName: string, imageUrl: string }; requestedAmount: number; dateApplied: string, }) => ({
      name: `${item.applicantDetail.firstName} ${item.applicantDetail.lastName}`,
      amount: formatAmount(item.requestedAmount, "₦"),
      time: moment(item.dateApplied).format("MM/DD/YYYY"),
      avatar: item.applicantDetail.imageUrl
    }))
    : []

  const handleKYCReviewViewAll = () => {
    router.push(`/user-management?status=pending-kyc`)
  }
  const handleKYCReview = (userId: string) => {
    router.push(`/user-management/${userId}`)
  }
  const handleLoanReviewViewAll = () => {
    router.push(`/loan-management?status=pending`)
  }
  const handleLoanReview = (loanId: string) => {
    router.push(`/loan-management/${loanId}`)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Pending KYC"
          value={
            metricsData?.data?.totalPendingKYCs?.toLocaleString() ||
            (metricsStatus === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : "N/A")
          }
          icon={<KYCIcon stroke="#00A86B" />}
        />
        <StatsCard
          title="Active Loans"
          value={
            metricsData?.data?.totalActiveLoans?.toLocaleString() ||
            (metricsStatus === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : "N/A")
          }
          icon={<LoanIcon stroke="#00A86B" />}
        />
        <StatsCard
          title="Overdue Payments"
          value={
            metricsData?.data?.totalOverduePayments?.toLocaleString() ||
            (metricsStatus === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : "N/A")
          }
          icon={<OverdueIcon stroke="#00A86B" />}
        />
        <StatsCard
          title="Total Users"
          value={
            metricsData?.data?.totalUsers?.toLocaleString() ||
            (metricsStatus === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : "N/A")
          }
          icon={<UserIcon stroke="#00A86B" />}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Pending KYC</CardTitle>
            <Button
              onClick={handleKYCReviewViewAll}
              variant="ghost"
              size="sm"
              className=" text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full"
            >
              View All
            </Button>
          </CardHeader>
          <hr className="border-gray-200 mb-2" />
          <CardContent className="space-y-4">
            {pendingKycStatus === "loading" ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span className="text-gray-500">Loading pending KYC...</span>
              </div>
            ) : pendingKycStatus === "error" || !pendingKycData?.isSuccess ? (
              <div className="text-center py-4 text-red-500">Failed to load pending KYC users.</div>
            ) : kycQueue.length > 0 ? (
              kycQueue.map((item: { avatar: string; name: string; time: string }, index: any) => (
                <div key={index} className="flex items-center justify-between space-y-5">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.avatar || "/assets/images/display-photo.png"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium font-outfit">{item.name}</p>
                      <p className="text-xs text-gray-500 font-outfit">{item.time}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleKYCReview(pendingKycData.data[index].userId)}
                    variant="outline"
                    className="border-[#00A86B26] text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full"
                  >
                    View Profile
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">No pending KYC users.</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Loan Requests</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLoanReviewViewAll}
              className=" text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full"
            >
              View All
            </Button>
          </CardHeader>
          <hr className="border-gray-200 mb-2" />
          <CardContent className="space-y-4">
            {loanRequestsStatus === "loading" ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span className="text-gray-500">Loading loan requests...</span>
              </div>
            ) : loanRequestsStatus === "error" || !loanRequestsData?.isSuccess ? (
              <div className="text-center py-4 text-red-500">Failed to load loan requests.</div>
            ) : loanRequests.length > 0 ? (
              loanRequests.map((item: { avatar: string, name: string, time: string, amount: string }, index: any) => (
                <div key={index} className="flex justify-between space-y-5">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.avatar || "/assets/images/display-photo.png"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium font-outfit">{item.name}</p>
                      <p className="text-xs text-gray-500 font-outfit">{item.time}</p>
                    </div>
                  </div>
                  <p className="text-lg font-outfit font-medium">{item.amount}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleLoanReview(loanRequestsData.data[index].id)}
                    className="border-[#00A86B26] text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full"
                  >
                    View Request
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">No pending loan requests.</div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inflow */}
        <Card className="h-fit p-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Inflow</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full"
            >
              Today
            </Button>
          </CardHeader>
          <hr className="border-gray-200 mb-2" />
          {/* Wrap CardContent in a scrollable container */}
          <CardContent className="p-0">
            <div className="max-h-64 overflow-y-auto space-y-6">
              {inflowStatus === "loading" ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span className="text-gray-500">Loading inflow...</span>
                </div>
              ) : inflowStatus === "error" || !inflowData?.isSuccess ? (
                <div className="text-center py-4 text-red-500">
                  Failed to load recent inflow.
                </div>
              ) : recentInflow?.length > 0 ? (
                recentInflow?.map(
                  (item: { narration: string; amount: string }, index: Key) => (
                    <div
                      key={index}
                      className="flex justify-between space-y-4 px-6"
                    >
                      <p className="text-sm font-outfit font-medium">
                        {item.narration}
                      </p>
                      <p className="text-sm font-outfit font-medium">
                        {formatAmount(item.amount, "N")}
                      </p>
                    </div>
                  )
                )
              ) : (
                <div className="text-center py-4 text-gray-500">No recent inflow.</div>
              )}
            </div>
            <div className="flex justify-between font-outfit font-semibold border-t p-4">
              <p className="text-sm">TOTAL</p>
              <p className="text-sm">{formatAmount(totalInflow, "N")}</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Outflow */}
        <Card className="h-fit p-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Outflow</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full"
            >
              Today
            </Button>
          </CardHeader>
          <hr className="border-gray-200 mb-2" />
          <CardContent className="p-0">
            <div className="max-h-64 overflow-y-auto space-y-6">
              {outflowStatus === "loading" ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span className="text-gray-500">Loading outflow...</span>
                </div>
              ) : outflowStatus === "error" || !outflowData?.isSuccess ? (
                <div className="text-center py-4 text-red-500">
                  Failed to load recent outflow.
                </div>
              ) : recentOutflow?.length > 0 ? (
                recentOutflow?.map(
                  (item: { narration: string; amount: string }, index: any) => (
                    <div
                      key={index}
                      className="space-y-4 px-6 flex justify-between"
                    >
                      <p className="text-sm font-outfit font-medium">
                        {item.narration}
                      </p>
                      <p className="text-sm font-outfit font-medium">
                        {formatAmount(item.amount, "N")}
                      </p>
                    </div>
                  )
                )
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No recent outflow.
                </div>
              )}
            </div>
            <div className="flex justify-between font-outfit font-semibold border-t p-4">
              <p className="text-sm">TOTAL</p>
              <p className="text-sm">{formatAmount(totalOutflow, "N")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
