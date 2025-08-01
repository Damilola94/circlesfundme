"use client"
import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserProfile } from "@/components/dashboard/user-profile"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import mockData from "../mockdata.json"
import { ArrowLeft } from "lucide-react"
import Pagination from "@/components/ui/pagination"
import { TransactionStatus } from "@/components/ui/transactionstatus"

const { loan, users } = mockData 

export type StatusType = "Active" | "Completed" | "Pending" | "Waitlisted"

export default function UserProfilePage({ params }: { params: { userId: string } }) {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const totalElements = 95 
  const router = useRouter()

  const userId = params.userId 

  const currentUser = useMemo(() => {
    return users.find((u) => u.id === userId)
  }, [userId])

  const kycStatus = useMemo(() => {
    if (currentUser) {
      return currentUser.kycStatus
    }
    return "unknown" 
  }, [currentUser])

  const user = useMemo(() => {
    if (currentUser) {
      return {
        name: currentUser.name,
        email: `${currentUser.name.toLowerCase().replace(/\s/g, ".")}@example.com`, 
        phone: "+234 806 356 7865", 
        image: "/placeholder.svg?height=100&width=100",
        dateOfBirth: "30/07/1990", 
        gender: "Male", 
        scheme: currentUser.scheme,
        contribution: currentUser.contribution,
        bvn: "12345678987",  
        kycStatus: currentUser.kycStatus,
      }
    }
    return {
      name: "User Not Found",
      email: "",
      phone: "",
      image: "/placeholder.svg?height=100&width=100",
      dateOfBirth: "",
      gender: "",
      scheme: "",
      contribution: "",
      bvn: "",
      kycStatus: "unknown",
    }
  }, [currentUser])

  const handleTransHistory = async () => {
    router.push(`/user-management/${userId}/transactions`)  
  }

  // Placeholder functions for user actions
  const handleDeactivateUser = () => {
    console.log("Deactivating user:", user.name)
  }

  const handleActivateUser = () => {
    console.log("Activating user:", user.name)
  }

  const handleSendReminder = () => {
    console.log("Sending KYC reminder to user:", user.name)
  }

  const handleApproveUser = () => {
    console.log("Approving user:", user.name)
    // Implement actual approval logic here
  }

  const handleRejectUser = () => {
    console.log("Rejecting user:", user.name)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center space-x-4">
        <Link href="/user-management" className="w-10 h-10 bg-white rounded-full">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold font-outfit text-gray-900">User Management - View Profile</h1>
      </div>
      <UserProfile user={user} />
      <div className="flex justify-end">
        <Button className="bg-primary-900 hover:bg-primary-700" onClick={handleTransHistory}>
          View Transaction History
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-4 px-6 py-3 text-sm font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit">
        <div>Date Applied</div>
        <div>Status</div>
        <div>Loan Amount (₦)</div>
        <div>Amount Repaid (₦)</div>
        <div>Amount Remaining (₦)</div>
        <div className="text-right"> </div>
      </div>
      <div className="space-y-3">
        {loan.map((loanItem) => (
          <Card key={loanItem.id} className="shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="text-sm text-gray-600 font-outfit">{loanItem.dateJoined}</div>
                <div className="text-sm text-gray-600 font-outfit">
                  <TransactionStatus status={loanItem.status as StatusType} />
                </div>
                <div className="text-sm text-gray-600 font-outfit">{loanItem.loanAmount}</div>
                <div className="text-sm text-gray-600 font-outfit">{loanItem.amountRepaid}</div>
                <div className="text-sm text-gray-600 font-outfit">{loanItem.amountRemaining}</div>
                <div className="text-right">
                  <Link href={`/loan-management/1`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full w-full border-primary-900 bg-transparent"
                    >
                      View Request →
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination
        current={pageNumber}
        onPageChange={setPageNumber}
        onRowChange={setPageSize}
        pageSize={pageSize}
        total={totalElements}
      />
      <div className="flex justify-end space-x-4">
        {kycStatus === "active" && (
          <Button variant="outline" onClick={handleDeactivateUser}>
            Deactivate User
          </Button>
        )}
        {kycStatus === "deactivated" && (
          <Button className="bg-primary-900 hover:bg-primary-700" onClick={handleActivateUser}>
            Activate User
          </Button>
        )}
        {kycStatus === "pending" && (
          <>
            <Button variant="outline" onClick={handleSendReminder}>
              Send Reminder to Complete KYC
            </Button>
            <Button variant="outline" onClick={handleRejectUser}>
              Reject User
            </Button>
            <Button className="bg-primary-900 hover:bg-primary-700" onClick={handleApproveUser}>
              Approve User
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
