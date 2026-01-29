"use client"

import { useState, } from "react"
import { StatsCard } from "@/components/dashboard/stats-card"

import { Loader2 } from "lucide-react"
import { UserIcon, LoanIcon, KYCIcon } from "@/public/assets/icons"
import useGetQuery from "@/hooks/useGetQuery"
import { formatAmount } from "@/lib/utils"

export default function Dashboard() {
  const [chargePeriod, setChargePeriod] = useState("yearly")

  const {
    data: metricsData,
    status: metricsStatus,
  } = useGetQuery({
    endpoint: "referrers",
    extra: "my-dashboard",
    queryKey: ["my-dashboard"],
    auth: true,
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <StatsCard
          title="Total Referred Users"
          value={
            formatAmount(metricsData?.data?.totalReferredUsers) ||
            (metricsStatus === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : "N/A")
          }
          icon={<LoanIcon stroke="#00A86B" />}
        />
        <StatsCard
          title="Total Approved Loans"
          value={
            formatAmount(metricsData?.data?.approvedLoanCount)  ||
            (metricsStatus === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : "N/A")
          }
          onPeriodChange={setChargePeriod}
          period={chargePeriod}
          icon={<LoanIcon stroke="#00A86B" />}
        />
        <StatsCard
          title="Total Users"
          value={
             formatAmount(metricsData?.data?.totalLoanValue)  ||
            (metricsStatus === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : "N/A")
          }
          icon={<UserIcon stroke="#00A86B" />}
        />
        <StatsCard
          title="Pending KYC"
          value={
            formatAmount(metricsData?.data?.earnedCommission) ||
            (metricsStatus === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : "N/A")
          }
          icon={<KYCIcon stroke="#00A86B" />}
        />
      </div> 
    </div>
  )
}
