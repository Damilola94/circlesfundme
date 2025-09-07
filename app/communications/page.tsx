"use client"

import { useMemo, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select } from "@/components/ui/select"
import { Plus, Filter, Search, Loader2 } from "lucide-react"
import Pagination from "@/components/ui/pagination"
import { Textarea } from "@/components/ui/textarea"
import { TransactionStatus } from "@/components/ui/transactionstatus"
import { Input } from "@/components/ui/input"
import { SendIcon, SmsIcon, EmailIcon, NotificationIcon } from
  "@/public/assets/icons"
import useGetQuery from "@/hooks/useGetQuery"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import handleFetch from "@/lib/handleFetch"

import { CreateEditTemplateModal, type TemplateData } from "@/components/ui/create-edit-template-modal"
import {
  MESSAGE_TYPE_NUMBER_TO_API_STRING,
  type StatusType,
  MESSAGE_TYPE_API_TO_DISPLAY,
  CHANNEL_MAP_NUMBER_TO_STRING,
  type Communication,
} from "./types"
import { ConfirmationModal } from "@/components/ui/confirmation-modal"
import handleFetch from "@/services/api/handleFetch"

export default function Communications() {
  const [searchTerm, setSearchTerm] = useState("")
  const [messageTitle, setMessageTitle] = useState("")
  const [selectedMessageType, setSelectedMessageType] = useState("payment-reminder")
  const [selectedMessageChannel, setSelectedMessageChannel] = useState("")
  const [selectedTargetGroup, setSelectedTargetGroup] = useState("All Users")
  const [messageContent, setMessageContent] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<TemplateData | null>(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false)
  const [templateToDeleteId, setTemplateToDeleteId] = useState<string | null>(null)

  const [isSendConfirmationModalOpen, setIsSendConfirmationModalOpen] = useState(false)

  const {
    data: communicationsData,
    status: communicationsStatus,
    error: communicationsError,
    refetch: refetchCommunications,
  } = useGetQuery({
    endpoint: "admincommunications/all",
    queryKey: ["communications", searchTerm, pageNumber, pageSize],
    auth: true,
    params: {
      SearchKey: searchTerm,
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
  })

  const {
    data: templatesData,
    status: templatesStatus,
    error: templatesError,
    refetch: refetchTemplates,
  } = useGetQuery({
    endpoint: "adminmessagetemplates",
    extra: "message-templates",
    queryKey: ["message-templates"],
    auth: true,
  })

  const communicationHistory = useMemo(() => {
    if (communicationsStatus === "success" && communicationsData?.isSuccess && communicationsData.data) {
      return communicationsData.data.map((item: Communication) => ({
        id: item.id,
        title: item.title,
        body: item.body,
        target: item.target,
        channel: item.channel,
        status: item.status,
        scheduledAt: new Date(item.scheduledAt).toLocaleDateString(),
        totalRecipients: item.totalRecipients,
      }))
    }
    return []
  }, [communicationsData, communicationsStatus])

  const totalElements = useMemo(() => {
    if (communicationsStatus === "success" && communicationsData?.isSuccess) {
      return communicationsData.totalCount || communicationsData.metaData?.totalCount || 0
    }
    return 0
  }, [communicationsData, communicationsStatus])

  const templates = useMemo(() => {
    if (templatesStatus === "success" && templatesData?.isSuccess && templatesData.data) {
      return templatesData.data.map(
        (t: { id: any; name: any; type: string | number; body: any; channel: string | number }) => ({
          id: t.id,
          name: t.name,
          type: t.type,
          typeValue:
            MESSAGE_TYPE_API_TO_DISPLAY[
            typeof t.type === "number" ? (MESSAGE_TYPE_NUMBER_TO_API_STRING[t.type] ?? "") : ""
            ] || "Unknown Type",
          content: t.body,
          status: "Active",
          channel: t.channel,
          channelValue: CHANNEL_MAP_NUMBER_TO_STRING[Number(t.channel)] || "Unknown Channel",
        }),
      )
    }
    return []
  }, [templatesData, templatesStatus])
  console.log(selectedMessageChannel, "selectedMessageChannel");

  useEffect(() => {
    if (selectedTemplateId) {
      const template = templates.find((t: { id: string }) => t.id === selectedTemplateId)
      if (template) {
        setSelectedMessageType(template.type as string)
        setSelectedMessageChannel(template.channelValue as string)
        setMessageTitle(template.name as string)
        setMessageContent(template.content)
      }
    }
  }, [selectedTemplateId, templates])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      refetchCommunications()
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, refetchCommunications])

  const deleteTemplateMutation = useMutation({
    mutationFn: (id: string) =>
      handleFetch({
        endpoint: `adminmessagetemplates`,
        extra: `message-templates/${id}`,
        method: "DELETE",
        auth: true,
      }),
    onSuccess: (res: any) => {
      if (res.isSuccess) {
        toast.success("Template deleted successfully!")
        refetchTemplates()
      } else {
        toast.error(res.message || "Failed to delete template.")
      }
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong while deleting template.")
    },
  })

  const sendCommunicationMutation = useMutation({
    mutationFn: (payload: { title: string; body: string; target: string; channel: string }) =>
      handleFetch({
        endpoint: "admincommunications/send",
        method: "POST",
        body: payload,
        auth: true,
      }),
    onSuccess: (res: any) => {
      if (res.statusCode !== "200") {
        toast.error(res.message || "Failed to send communication.")
      } else {
        toast.success("Communication sent successfully!")
        setMessageTitle("")
        setMessageContent("")
        setSelectedTemplateId(null)
        refetchCommunications()
      }
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong while sending communication.")
    },
  })

  const handleAddTemplate = () => {
    setEditingTemplate(null)
    setIsModalOpen(true)
  }

  const handleEditTemplate = (template: TemplateData) => {
    setEditingTemplate(template)
    setIsModalOpen(true)
  }

  const handleDeleteTemplate = (id: string) => {
    setTemplateToDeleteId(id)
    setIsDeleteConfirmationModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (templateToDeleteId) {
      deleteTemplateMutation.mutate(templateToDeleteId)
      setTemplateToDeleteId(null)
      setIsDeleteConfirmationModalOpen(false)
    }
  }

  const handleSendClick = () => {
    if (!messageTitle.trim()) {
      toast.error("Please enter a message title.")
      return
    }
    if (!messageContent.trim()) {
      toast.error("Please enter message content.")
      return
    }
    if (selectedMessageChannel !== "email") {
      toast.error("Only email communication is currently supported.")
      return
    }
    setIsSendConfirmationModalOpen(true)
  }

  const handleConfirmSend = () => {
    const payload = {
      title: messageTitle.trim(),
      body: messageContent.trim(),
      target: selectedTargetGroup,
      channel: "Email",
    }

    sendCommunicationMutation.mutate(payload)
    setIsSendConfirmationModalOpen(false)
  }

  const handleModalSuccess = () => {
    refetchTemplates()
  }

  const isLoadingTemplates = templatesStatus === "loading" || deleteTemplateMutation.isLoading
  const isErrorTemplates =
    templatesStatus === "error" || (templatesStatus === "success" && templatesData && !templatesData.isSuccess)

  const isLoadingCommunications = communicationsStatus === "loading"
  const isErrorCommunications =
    communicationsStatus === "error" ||
    (communicationsStatus === "success" && communicationsData && !communicationsData.isSuccess)

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-lg font-normal">Bulk Communication</CardTitle>
          </CardHeader>
          <hr className="border-gray-200 mb-5" />
          <CardContent className="space-y-4">
            <Select
              label="Select Template"
              options={[
                { value: "", label: "Select a template" },
                ...templates.map((t: { id: any; name: any }) => ({ value: t.id, label: t.name })),
              ]}
              value={selectedTemplateId || ""}
              onChange={setSelectedTemplateId}
            />
            <div>
              <Input
                placeholder="Enter message title..."
                label="Message Title"
                value={messageTitle}
                onChange={(e) => setMessageTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-outfit"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="flex-col items-center justify-center rounded-md border-primary-700 space-x-2 h-18 bg-transparent"
                disabled
              >
                <SmsIcon />
                <span>SMS (Coming Soon)</span>
              </Button>
              <Button
                variant="outline"
                className="flex-col items-center justify-center rounded-md border-primary-700 space-x-2 h-18 bg-transparent"
                disabled
              >
                <NotificationIcon />
                <span>Notification (Coming Soon)</span>
              </Button>
              <Button
                variant="outline"
                className={`flex-col items-center justify-center rounded-md border-[1.5px] space-x-2 h-18 ${selectedMessageChannel === "email"
                  ? "border-primary-700 bg-primary-50"
                  : "border-primary-700 bg-transparent"
                  }`}
                onClick={() => setSelectedMessageChannel("email")}
              >
                <EmailIcon />
                <span>Email</span>
              </Button>
            </div>
            <Select
              label="Select Target Group"
              options={[
                { value: "All", label: "All Users" },
                { value: "ActiveBorrowers", label: "Active Borrowers" },
                { value: "OverdueRepaymentMembers", label: "Overdue Repayment Members" },
                { value: "PendingKYCMembers", label: "Pending KYC Members" },
              ]}
              value={selectedTargetGroup}
              onChange={setSelectedTargetGroup}
            />
            {/* <Select
              label="Select Message Type"
              options={[
                { value: "payment-reminder", label: "Payment Reminder" },
                { value: "welcome-message", label: "Welcome Message" },
                { value: "loan-approval", label: "Loan Approval" },
                { value: "kyc-reminder", label: "KYC Reminder" },
              ]}
              value={selectedMessageType}
              onChange={setSelectedMessageType}
            /> */}
            <Select
              label="Select Channels"
              options={[
                { value: "email", label: "Email" },
                { value: "sms", label: "SMS (Coming Soon)" },
                { value: "notification", label: "Notification (Coming Soon)" },
              ]}
              placeholder={selectedMessageChannel || "Select Channel"}
              value={selectedMessageChannel}
              onChange={setSelectedMessageChannel}
              disabled={selectedMessageChannel !== "email"}
            />
            <div>
              <Textarea
                placeholder="Enter your message here..."
                label="Message Content"
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
                onClick={handleSendClick}
                disabled={sendCommunicationMutation.isLoading}
              >
                {sendCommunicationMutation.isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </Button>
              <Button variant="outline" className="flex-1 border-primary-700 bg-transparent">
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="h-[45rem] overflow-auto">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center space-x-2 text-lg font-normal">Templates</CardTitle>
            <Button
              size="sm"
              variant="outline"
              className="border-transparent hover:bg-transparent text-xs text-primary-700 bg-transparent"
              onClick={handleAddTemplate}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Template
            </Button>
          </CardHeader>
          <hr className="border-gray-200 mb-5" />
          <CardContent className="space-y-4 p-2">
            {isLoadingTemplates ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span className="text-gray-500">Loading templates...</span>
              </div>
            ) : isErrorTemplates ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">
                  {(templatesError && typeof templatesError === "object" && "message" in templatesError
                    ? (templatesError as any).message
                    : undefined) ||
                    templatesData?.message ||
                    "Failed to load templates."}
                </p>
                <Button onClick={refetchTemplates} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : templates.length > 0 ? (
              templates.map((template: TemplateData) => (
                <div key={template.id} className="p-4 space-y-2 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <h4 className="font-medium font-outfit">{template.name}</h4>
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant="secondary">{template.channelValue}</Badge>
                        <Badge variant="secondary">{template.typeValue}</Badge>
                      </div>
                    </div>
                    <div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-transparent text-primary-700 w-fit"
                        onClick={() => handleEditTemplate(template)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-700 hover:bg-transparent w-fit"
                        onClick={() => template.id && handleDeleteTemplate(template.id)}
                        disabled={deleteTemplateMutation.isLoading}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="border p-3 rounded-lg">
                    <p className="text-sm text-gray-900 font-outfit">{template.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No templates found.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="overflow-x-auto 1140:overflow-visible flex-1 space-y-6 p-6">

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
        <div className="grid grid-cols-6 gap-4 min-w-[800px] px-6 py-3 text-sm font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit">
          <div>Title</div>
          <div>Channel</div>
          <div>Target</div>
          <div>Recipients</div>
          <div>Scheduled</div>
          <div>Status</div>
        </div>
        <div className="space-y-3">
          {isLoadingCommunications ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span className="text-gray-500">Loading communication history...</span>
            </div>
          ) : isErrorCommunications ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">
                {(communicationsError && typeof communicationsError === "object" && "message" in communicationsError
                  ? (communicationsError as any).message
                  : undefined) ||
                  communicationsData?.message ||
                  "Failed to load communication history."}
              </p>
              <Button onClick={refetchCommunications} variant="outline">
                Try Again
              </Button>
            </div>
          ) : communicationHistory.length > 0 ? (
            communicationHistory.map((item: any) => (
              <Card key={item.id} className="shadow-sm bg-white">
                <CardContent className="p-6">
                  <div className="grid grid-cols-6 gap-4 items-center">
                    <div className="text-sm text-gray-600 font-outfit">{item.title}</div>
                    <div className="text-sm text-gray-600 font-outfit capitalize">{item.channel}</div>
                    <div className="text-sm text-gray-600 font-outfit">{item.target}</div>
                    <div className="text-sm text-gray-600 font-outfit">{item.totalRecipients}</div>
                    <div className="text-sm text-gray-600 font-outfit">{item.scheduledAt}</div>
                    <TransactionStatus status={item.status as StatusType} />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No communication history found.</p>
          )}
        </div>
      </div>

      <Pagination
        current={pageNumber}
        onPageChange={setPageNumber}
        onRowChange={setPageSize}
        pageSize={pageSize}
        total={totalElements}
      />
      <CreateEditTemplateModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialData={editingTemplate}
        onSuccess={handleModalSuccess}
      />
      <ConfirmationModal
        isOpen={isDeleteConfirmationModalOpen}
        onOpenChange={setIsDeleteConfirmationModalOpen}
        onConfirm={handleConfirmDelete}
        title="Confirm Template Deletion"
        description="Are you sure you want to delete this template? This action cannot be undone."
        confirmButtonText="Delete Template"
      />
      <ConfirmationModal
        isOpen={isSendConfirmationModalOpen}
        onOpenChange={setIsSendConfirmationModalOpen}
        onConfirm={handleConfirmSend}
        title="Confirm Send Communication"
        description={`Are you sure you want to send "${messageTitle}" to ${selectedTargetGroup}? This will send the message to all users in the selected group.`}
        confirmButtonText="Send Communication"
        cancelButtonText="Cancel"
      />
    </div>
  )
}
