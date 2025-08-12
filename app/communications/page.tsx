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
import { SendIcon, SmsIcon, EmailIcon, NotificationIcon } from "@/public/assets/icons"
import useGetQuery from "@/hooks/useGetQuery"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import handleFetch from "@/services/api/handleFetch"
import { CreateEditTemplateModal, type TemplateData } from "@/components/ui/create-edit-template-modal"
import { MESSAGE_TYPE_NUMBER_TO_API_STRING, StatusType, MESSAGE_TYPE_API_TO_DISPLAY, communicationHistory, CHANNEL_MAP_NUMBER_TO_STRING } from "./types"
import { ConfirmationModal } from "@/components/ui/confirmation-modal"

export default function Communications() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessageType, setSelectedMessageType] = useState("payment-reminder")
  const [selectedMessageChannel, setSelectedMessageChannel] = useState("sms")
  const [selectedTargetGroup, setSelectedTargetGroup] = useState("all-users")
  const [messageContent, setMessageContent] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const totalElements = 95

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<TemplateData | null>(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false)
  const [templateToDeleteId, setTemplateToDeleteId] = useState<string | null>(null)

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

  const templates = useMemo(() => {
    if (templatesStatus === "success" && templatesData?.isSuccess && templatesData.data) {
      return templatesData.data.map((t: { id: any; name: any; type: string | number; body: any; channel: string | number }) => ({
        id: t.id,
        name: t.name,
        type: t.type,
        typeValue: MESSAGE_TYPE_API_TO_DISPLAY[
          typeof t.type === "number"
            ? MESSAGE_TYPE_NUMBER_TO_API_STRING[t.type] ?? ""
            : ""
        ] || "Unknown Type",
        content: t.body,
        status: "Active",
        channel: t.channel,
        channelValue: CHANNEL_MAP_NUMBER_TO_STRING[Number(t.channel)] || "Unknown Channel",
      }))
    }
    return []
  }, [templatesData, templatesStatus])

  useEffect(() => {
    if (selectedTemplateId) {
      const template = templates.find((t: { id: string }) => t.id === selectedTemplateId)
      if (template) {
        setSelectedMessageType(template.type as string)
        setSelectedMessageChannel(template.channel as string)
        setMessageContent(template.content)
      }
    } else {
    }
  }, [selectedTemplateId, templates])

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
  const handleModalSuccess = () => {
    refetchTemplates()
  }

  const isLoadingTemplates = templatesStatus === "loading" || deleteTemplateMutation.isLoading
  const isErrorTemplates =
    templatesStatus === "error" || (templatesStatus === "success" && templatesData && !templatesData.isSuccess)

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
                className="flex-col items-center justify-center rounded-md border-[1.5px] border-primary-700 space-x-2 h-18 bg-transparent"
                onClick={() => { }}
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
            <Select
              label="Select Channels"
              options={[
                { value: "email", label: "Email" },
                { value: "sms", label: "SMS" },
                { value: "notification", label: "Notification" },
              ]}
              value={selectedMessageChannel}
              onChange={setSelectedMessageChannel}
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
              <Button leftIcon={<SendIcon />} className="flex-1 bg-primary-900 hover:bg-primary-700">
                Send
              </Button>
              <Button variant="outline" className="flex-1 border-primary-700 bg-transparent">
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="h-[46rem]
 overflow-auto">
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
                  {(templatesError && typeof templatesError === "object" && "message" in templatesError ? (templatesError as any).message : undefined) || templatesData?.message || "Failed to load templates."}
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
                <div className="text-sm text-gray-600 font-outfit ">{item.title}</div>
                <div className="text-sm text-gray-600 font-outfit ">{item.type}</div>
                <div className="text-sm text-gray-600 font-outfit ">{item.recipients}</div>
                <div className="text-sm text-gray-600 font-outfit ">{item.date}</div>
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
    </div>
  )
}
