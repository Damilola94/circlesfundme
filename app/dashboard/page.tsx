"use client";

import { useState } from "react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Mail, Bell } from "lucide-react";
import {
  UserIcon,
  LoanIcon,
  KYCIcon,
  OverdueIcon,
} from "@/public/assets/icons";

export default function Dashboard() {
  const [selected, setSelected] = useState("");
  const kycQueue = [
    { name: "Angelina Jolie", time: "20 mins", avatar: "/placeholder.svg" },
    { name: "Angelina Jolie", time: "20 mins", avatar: "/placeholder.svg" },
    { name: "Angelina Jolie", time: "20 mins", avatar: "/placeholder.svg" },
  ];

  const recentInflow = [
    { name: "Subscription Charge", amount: "₦5,000" },
    { name: "Service Charge", amount: "₦5,000" },
    { name: "Penalty Charge", amount: "₦5,000" },
    { name: "Loan Repayment", amount: "₦5,000" },
    { name: "Loan Management Fee", amount: "₦5,000" },
    { name: "Contribution", amount: "₦5,000" },
  ];

  const recentOutflow = [
    { name: "Loan Payment", amount: "₦58,678.90" },
    { name: "Withdrawal", amount: "₦58,678.90" },
  ];

  const totalInflow = 10000;
  const totalOutflow = 100000000;

  const loanRequests = [
    {
      name: "Angelina Jolie",
      amount: "₦10,000,000",
      time: "Monthly",
      avatar: "/placeholder.svg",
    },
    {
      name: "Angelina Jolie",
      amount: "₦500,000",
      time: "Monthly",
      avatar: "/placeholder.svg",
    },
    {
      name: "Angelina Jolie",
      amount: "₦1,000,000",
      time: "Monthly",
      avatar: "/placeholder.svg",
    },
  ];

  const subParameters = [
    { label: "Interest Rate", value: 5, unit: "%" },
    { label: "Service Charge", value: 5, unit: "%" },
    { label: "Penalty Charge", value: 20, unit: "%" },
  ];

  const paymentMonitoring: {
    label: string;
    badge: string;
    variant: "default" | "success" | "warning" | "destructive" | "secondary";
  }[] = [
    {
      label: "Overdue 30+ Days",
      badge: "Apply Penalty",
      variant: "destructive",
    },
    { label: "Overdue 1 week", badge: "REMINDER", variant: "default" },
    { label: "Due Today", badge: "Send Notice", variant: "secondary" },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Pending KYC"
          value="10"
          icon={<KYCIcon stroke="#00A86B" />}
        />
        <StatsCard
          title="Active Loans"
          value="450"
          icon={<LoanIcon stroke="#00A86B" />}
        />
        <StatsCard
          title="Overdue Payments"
          value="4"
          icon={<OverdueIcon stroke="#00A86B" />}
        />
        <StatsCard
          title="Total Users"
          value="642"
          icon={<UserIcon stroke="#00A86B" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">KYC Review Queue</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className=" text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full"
            >
              View All
            </Button>
          </CardHeader>
          <hr className="border-gray-200 mb-2" />
          <CardContent className="space-y-4">
            {kycQueue.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between space-y-5"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <p className="text-sm font-medium font-outfit">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 font-outfit">
                      {item.time}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#00A86B26] text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full"
                >
                  View Profile
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Loan Requests</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className=" text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full"
            >
              View All
            </Button>
          </CardHeader>
          <hr className="border-gray-200 mb-2" />
          <CardContent className="space-y-4">
            {loanRequests.map((item, index) => (
              <div key={index} className="flex justify-between space-y-5">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <p className="text-sm font-medium font-outfit">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 font-outfit">
                      {item.time}
                    </p>
                  </div>
                </div>

                <p className="text-lg font-outfit font-medium">{item.amount}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#00A86B26] text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full"
                >
                  View Request
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <CardContent className="space-y-6 p-0">
            {recentInflow.map((item, index) => (
              <div key={index} className="flex justify-between space-y-4 px-6">
                <p className="text-sm font-outfit font-medium">{item.name}</p>
                <p className="text-sm font-outfit font-medium">{item.amount}</p>
              </div>
            ))}
            <div className="flex justify-between font-outfit font-semibold border-t p-4">
              <p className="text-sm">TOTAL</p>
              <p className="text-sm">{`₦${totalInflow.toLocaleString()}`}</p>
            </div>
          </CardContent>
        </Card>

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
          <CardContent className="space-y-6 p-0">
            {recentOutflow.map((item, index) => (
              <div key={index} className="space-y-4 px-6 flex justify-between">
                <p className="text-sm font-outfit font-medium">{item.name}</p>
                <p className="text-sm font-outfit font-medium">{item.amount}</p>
              </div>
            ))}
            <div className="flex justify-between font-outfit font-semibold border-t p-4">
              <p className="text-sm">TOTAL</p>
              <p className="text-sm">
              <p className="text-sm">{`₦${totalOutflow.toLocaleString()}`}</p>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Subscription Parameters</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className=" text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full"
            >
              Edit
            </Button>
          </CardHeader>
          <hr className="border-gray-200 mb-2" />
          <CardContent className="space-y-4">
            {subParameters.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-outfit">{item.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium font-outfit">
                    {item.value}
                  </span>
                  <span className="text-sm text-gray-500 font-outfit">
                    {item.unit}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Payment Monitoring</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className=" text-primary-600  rounded-full"
              disabled
            ></Button>
          </CardHeader>
          <hr className="border-gray-200 mb-2" />
          <CardContent className="space-y-4">
            {paymentMonitoring.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-outfit">{item.label}</span>
                <Badge variant={item.variant}>{item.badge}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Bulk Communication</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-600  rounded-full"
              disabled
            ></Button>
          </CardHeader>
          <hr className="border-gray-200 mb-2" />
          <CardContent className="space-y-4">
            <div>
              <Select
                label="Message Type"
                options={[
                  { value: "payment-reminder", label: "Payment Reminder" },
                  { value: "payment-reminder", label: "Contribution Reminder" },
                  { value: "payment-reminder", label: "Loan Reminder" },
                ]}
                className="mt-1"
                value={selected}
                onChange={setSelected}
              />
            </div>
            <div>
              <Select
                label="Target Group"
                options={[
                  { value: "all-users", label: "All Users" },
                  { value: "all-users", label: "Pending Users" },
                  { value: "all-users", label: "Active Users" },
                ]}
                className="mt-1"
                value={selected}
                onChange={setSelected}
              />
            </div>
            <div className="flex justify-between space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full w-full text-[10px]"
                leftIcon={<Mail className="h-4 w-4 text-primary-600" />}
              >
                Send SMS
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-primary-600 hover:bg-[#00A86B26] hover:text-primary-900 rounded-full w-full text-[10px]"
                leftIcon={<Bell className="h-4 w-4 text-primary-600" />}
              >
                Send Notification
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
