"use client"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import Pagination from "@/components/ui/pagination" // Assuming this path is correct
import mockData from "./mockdata.json"

// Define types for better type safety
interface User {
  id: string
  name: string
  dateJoined: string
  scheme: string
  contribution: string
  eligibleLoan: string
  amountRepaid: string
  kycStatus: "active" | "deactivated" | "pending"
}

interface Tab {
  id: string
  label: string
  status: "active" | "deactivated" | "pending"
}

const { users, tabs } = mockData as { users: User[]; tabs: Tab[] }

export default function KYCReviews() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("onboarded-users")
  const [pageNumber, setPageNumber] = useState(1) 
  const [pageSize, setPageSize] = useState(10)

  const currentTabStatus = tabs.find((tab) => tab.id === selectedTab)?.status || "active"

  const statusFilteredUsers = users.filter((user) => user.kycStatus === currentTabStatus)

  const searchedAndFilteredUsers = statusFilteredUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalElements = searchedAndFilteredUsers.length

  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedUsers = searchedAndFilteredUsers.slice(startIndex, endIndex)

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex justify-between items-end border-b-2">
        <div className="flex space-x-1 bg-gray-100 rounded-lg w-fit justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedTab(tab.id)
                setPageNumber(1) 
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors font-outfit ${
                selectedTab === tab.id
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
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPageNumber(1) 
              }}
              className="w-64 pl-10"
            />
          </div>
          <Button className="bg-primary-900 hover:bg-primary-700">
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
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map((user) => (
            <Card key={user.id} className="shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="grid grid-cols-7 gap-4 items-center font-outfit">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">{user.dateJoined}</div>
                  <div className="text-sm text-gray-600">{user.scheme}</div>
                  <div className="text-sm text-gray-600">{user.contribution}</div>
                  <div className="text-sm text-gray-600">{user.eligibleLoan}</div>
                  <div className="text-sm text-gray-600">{user.amountRepaid}</div>
                  <div className="flex justify-end">
                    <Link href={`/user-management/${user.id}`}>
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
      <Pagination
        current={pageNumber}
        onPageChange={setPageNumber}
        onRowChange={setPageSize}
        pageSize={pageSize}
        total={totalElements}
      />
    </div>
  )
}
