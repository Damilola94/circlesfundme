"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/components/dashboard/user-profile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import mockData from "../mockdata.json";
import { ArrowLeft } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import { TransactionStatus } from "@/components/ui/transactionstatus";
const { loan } = mockData;

export type StatusType = "Active" | "Completed" | "Pending" | "Waitlisted";

export default function UserProfilePage() {
  const [pageNumber, setPageNumber] = useState(2);
  const [pageSize, setPageSize] = useState(10);
  const totalElements = 95;
  const router = useRouter();

  const user = {
    name: "Olatunji Adeshina",
    email: "olatunji.adeshina@gmail.com",
    phone: "+234 806 356 7865",
    image: "/images/profile-photo.png",
    dateOfBirth: "30/07/1990",
    gender: "Male",
    scheme: "Weekly",
    contribution: "58,678.90",
    bvn: "12345678987",
  };

  const handleTransHistory = async () => {
    router.push("/kyc-reviews/1/1");
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center space-x-4">
        <Link href="/kyc-reviews" className="w-10 h-10 bg-white rounded-full">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold font-outfit text-gray-900">
          User Management - View Profile
        </h1>
      </div>

      <UserProfile user={user} />

      <div className="flex justify-end">
        <Button
          className="bg-primary-900 hover:bg-primary-700"
          onClick={handleTransHistory}
        >
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
        {loan.map((loan) => (
          <Card key={loan.id} className="shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="text-sm text-gray-600  font-outfit">
                  {loan.dateJoined}
                </div>
                <div className="text-sm text-gray-600 font-outfit">
                  <TransactionStatus status={loan.status as StatusType} />
                </div>
                <div className="text-sm text-gray-600 font-outfit">
                  {loan.loanAmount}
                </div>
                <div className="text-sm text-gray-600 font-outfit">
                  {loan.amountRepaid}
                </div>
                <div className="text-sm text-gray-600 font-outfit">
                  {loan.amountRemaining}
                </div>
                <div className="text-right">
                  <Link href={`/kyc-reviews`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full w-full border-primary-900"
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
        <Button variant="outline">Reject User</Button>
        <Button className="bg-primary-900 hover:bg-primary-700">
          Approve User
        </Button>
      </div>
    </div>
  );
}
