"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Plus, Filter, Search } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import { Textarea } from "@/components/ui/textarea";

import { TransactionStatus } from "@/components/ui/transactionstatus";
import { Input } from "@/components/ui/input";
import {
  SendIcon,
  SmsIcon,
  EmailIcon,
  NotificationIcon,
} from "@/public/assets/icons";

export type StatusType =
  | "Active"
  | "Completed"
  | "Pending"
  | "Waitlisted"
  | "Rejected";

export default function Communications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessageType, setSelectedMessageType] =
    useState("payment-reminder");
  const [selectedTargetGroup, setSelectedTargetGroup] = useState("all-users");
  const [messageContent, setMessageContent] = useState("");
  const [pageNumber, setPageNumber] = useState(2);
  const [pageSize, setPageSize] = useState(10);
  const totalElements = 95;

  const templates = [
    {
      id: 1,
      name: "Loan Payment Reminder",
      type: "SMS",
      content: `Dear [Name], 
        your loan payment of ₦[Amount] is due on [Date]. Please make payment to avoid penalties.`,
      status: "Active",
    },
    {
      id: 2,
      name: "Loan Payment Reminder",
      type: "Email",
      content:
        "Dear [Name], this is a friendly reminder that your loan payment is due soon.",
      status: "Active",
    },
    {
      id: 3,
      name: "Loan Payment Reminder",
      type: "Notification",
      content:
        "Your loan payment is due. Click to view details and make payment.",
      status: "Active",
    },
  ];

  const communicationHistory = [
    {
      id: 1,
      title: "Payment Reminder",
      type: "SMS",
      recipients: 642,
      date: "20/05/2025",
      status: "Completed",
    },
    {
      id: 2,
      title: "Welcome Message",
      type: "Notification",
      recipients: 50,
      date: "20/05/2025",
      status: "Pending",
    },
    {
      id: 3,
      title: "Payment Reminder",
      type: "Email",
      recipients: 86,
      date: "20/05/2025",
      status: "Completed",
    },
    {
      id: 4,
      title: "Welcome Message",
      type: "SMS",
      recipients: 642,
      date: "20/05/2025",
      status: "Completed",
    },
  ];

  const handleSendMessage = (type: string) => {
    alert(`Sending ${type} to ${selectedTargetGroup}`);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-lg font-normal">
              Bulk Communication
            </CardTitle>
          </CardHeader>
          <hr className="border-gray-200 mb-5" />
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="flex-col items-center justify-center rounded-md  border-primary-700 space-x-2 h-18"
                onClick={() => handleSendMessage("SMS")}
              >
                <SmsIcon />
                <span>SMS</span>
              </Button>
              <Button
                variant="outline"
                className="flex-col items-center justify-center rounded-md  border-primary-700 space-x-2 h-18"
                onClick={() => handleSendMessage("Notification")}
              >
                <NotificationIcon />

                <span>Notification</span>
              </Button>
              <Button
                variant="outline"
                className="flex-col items-center justify-center rounded-md  border-primary-700 space-x-2 h-18"
                onClick={() => handleSendMessage("Email")}
              >
                <EmailIcon />
                <span>Email</span>
              </Button>
            </div>

            <Select
              label="Select Target Group"
              options={[
                { value: "all-users", label: "All Users" },
                { value: "active-borrowers", label: "Active Borrowers" },
                { value: "overdue-payments", label: "Overdue Payments" },
                { value: "pending-kyc", label: "Pending KYC" },
              ]}
              value={selectedTargetGroup}
              onChange={setSelectedTargetGroup}
            />

            <Select
              label="Select Message Type"
              options={[
                { value: "payment-reminder", label: "Payment Reminder" },
                { value: "welcome-message", label: "Welcome Message" },
                { value: "loan-approval", label: "Loan Approval" },
                { value: "kyc-reminder", label: "KYC Reminder" },
              ]}
              value={selectedMessageType}
              onChange={setSelectedMessageType}
            />

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2 ">
                Message Content
              </label>
              <Textarea
                placeholder="Enter your message here..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-outfit"
                required
              />
            </div>

            <div className="ml-auto flex space-x-2 w-fit items-center">
              <Button
                leftIcon={<SendIcon />}
                className="flex-1 bg-primary-900 hover:bg-primary-700"
              >
                Send
              </Button>
              <Button variant="outline" className="flex-1 border-primary-700">
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center space-x-2 text-lg font-normal">
              Templates
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              className="border-transparent hover:bg-transparent text-xs text-primary-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Template
            </Button>
          </CardHeader>
          <hr className="border-gray-200 mb-5" />
          <CardContent className="space-y-4 p-2">
            {templates.map((template) => (
              <div key={template.id} className=" p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <h4 className="font-medium font-outfit">{template.name}</h4>
                    <div className="flex space-x-2">
                      <Badge variant="secondary">{template.type}</Badge>
                    </div>
                  </div>
                  <div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-transparent text-primary-700 w-fit"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-700 hover:bg-transparent w-fit"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="border p-3 rounded-lg">
                  <p className="text-sm text-gray-900 font-outfit">{template.content}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-end">
        <p className="text-lg font-outfit">Communication History</p>
        <div className="flex items-center justify-between space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10"
            />
          </div>
          <Button className="bg-primary-900 hover:bg-primary-700">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 px-6 py-3 text-sm font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit">
        <div>Title</div>
        <div>Type</div>
        <div>Recipients</div>
        <div>Date</div>
        <div>Status</div>
      </div>

      <div className="space-y-3">
        {communicationHistory.map((item) => (
          <Card key={item.id} className="shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-5 gap-4 items-center">
                <div className="text-sm text-gray-600 font-outfit ">
                  {item.title}
                </div>
                <div className="text-sm text-gray-600 font-outfit ">
                  {item.type}
                </div>
                <div className="text-sm text-gray-600 font-outfit ">
                  {item.recipients}
                </div>
                <div className="text-sm text-gray-600 font-outfit ">
                  {item.date}
                </div>
                <TransactionStatus status={item.status as StatusType} />
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
    </div>
  );
}
