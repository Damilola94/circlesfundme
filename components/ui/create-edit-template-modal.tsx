"use client"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "react-toastify"
import { useMutation } from "react-query"
import handleFetch from "@/services/api/handleFetch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

const CHANNEL_MAP_NUMBER_TO_STRING: Record<number, string> = {
  1: "SMS",
  2: "Email",
  3: "Notification",
}

const CHANNEL_MAP_STRING_TO_NUMBER: Record<string, number> = {
  SMS: 1,
  Email: 2,
  Notification: 3,
}

const MESSAGE_TYPE_API_TO_DISPLAY: Record<string, string> = {
  LoanRepaymentReminder: "Payment Reminder",
  WelcomeMessage: "Welcome Message",
  LoanApproval: "Loan Approval",
  KYCReminder: "KYC Reminder",
}

const MESSAGE_TYPE_DISPLAY_TO_API: Record<string, string> = {
  "Payment Reminder": "LoanRepaymentReminder",
  "Welcome Message": "WelcomeMessage",
  "Loan Approval": "LoanApproval",
  "KYC Reminder": "KYCReminder",
}

const MESSAGE_TYPE_NUMBER_TO_API_STRING: Record<number, string> = {
  1: "LoanRepaymentReminder",
  2: "WelcomeMessage",
  3: "LoanApproval",
  4: "KYCReminder",
}

export interface TemplateData {
  id?: string
  name: string
  content: string 
  channel: number
  type: number
  typeValue: string
  channelValue: string
}

interface CreateEditTemplateModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  initialData?: TemplateData | null
  onSuccess: () => void
}

const formSchema = z.object({
  name: z.string().min(1, "Template name is required"),
  content: z.string().min(1, "Message content is required"), 
  channel: z.string().min(1, "Channel is required"),
  type: z.string().min(1, "Message type is required"),
})

type FormValues = z.infer<typeof formSchema>

export function CreateEditTemplateModal({
  isOpen,
  onOpenChange,
  initialData,
  onSuccess,
}: CreateEditTemplateModalProps) {
  const isEditing = !!initialData?.id
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      content: initialData?.content || "", 
      channel: initialData?.channel ? CHANNEL_MAP_NUMBER_TO_STRING[initialData.channel] : "",
      type: initialData?.type
        ? MESSAGE_TYPE_API_TO_DISPLAY[MESSAGE_TYPE_NUMBER_TO_API_STRING[initialData.type] || ""] || ""
        : "",
    },
  })

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: initialData?.name || "",
        content: initialData?.content || "",
        channel: initialData?.channel ? CHANNEL_MAP_NUMBER_TO_STRING[initialData.channel] : "",
        type: initialData?.type
          ? MESSAGE_TYPE_API_TO_DISPLAY[MESSAGE_TYPE_NUMBER_TO_API_STRING[initialData.type] || ""] || ""
          : "",
      })
    }
  }, [isOpen, initialData, form])

  const createUpdateMutation = useMutation({
    mutationFn: (values: FormValues) => {
      const apiBody = {
        name: values.name,
        body: values.content, 
        channel: CHANNEL_MAP_STRING_TO_NUMBER[values.channel],
        type: MESSAGE_TYPE_DISPLAY_TO_API[values.type],
      }

      if (isEditing && initialData?.id) {
        return handleFetch({
          endpoint: `adminmessagetemplates/message-templates/${initialData.id}`,
          method: "PUT",
          body: apiBody,
          auth: true,
        })
      } else {
        return handleFetch({
          endpoint: "adminmessagetemplates/message-templates",
          method: "POST",
          body: apiBody,
          auth: true,
        })
      }
    },
    onSuccess: (res: any) => {
      if (res.isSuccess) {
        toast.success(isEditing ? "Template updated successfully!" : "Template created successfully!")
        onSuccess()
        onOpenChange(false)
      } else {
        toast.error(res.message || "Operation failed.")
      }
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong.")
    },
  })

  const onSubmit = (values: FormValues) => {
    createUpdateMutation.mutate(values)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Template" : "Create New Template"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "You can edit the details of your message template."
              : "You can create a new message template."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-2">
          <div className="">
            <Input
              label="Name"
              id="name"
              {...form.register("name")}
              className=""
              disabled={createUpdateMutation.isLoading}
            />
            {form.formState.errors.name && (
              <p className="col-span-4 text-right text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="items-center gap-4">
            <Select
              label="Channel"
              options={Object.values(CHANNEL_MAP_NUMBER_TO_STRING).map((channel) => ({
                value: channel,
                label: channel,
              }))}
              value={form.watch("channel")}
              onChange={(value) => form.setValue("channel", value, { shouldValidate: true })}
              className="col-span-3"
              disabled={createUpdateMutation.isLoading}
            />
            {form.formState.errors.channel && (
              <p className="col-span-4 text-right text-sm text-red-500">{form.formState.errors.channel.message}</p>
            )}
          </div>
          <div className="">
            <Select
              label="Type"
              options={Object.values(MESSAGE_TYPE_API_TO_DISPLAY).map((type) => ({ value: type, label: type }))}
              value={form.watch("type")}
              onChange={(value) => form.setValue("type", value, { shouldValidate: true })}
              className=""
              disabled={createUpdateMutation.isLoading}
            />
            {form.formState.errors.type && (
              <p className="col-span-4 text-right text-sm text-red-500">{form.formState.errors.type.message}</p>
            )}
          </div>
          <div className="">
            <Textarea
              id="content" 
              label="Content"
              {...form.register("content")} 
              className=" h-24 w-full"
              disabled={createUpdateMutation.isLoading}
            />
            {form.formState.errors.content && (
              <p className="col-span-4 text-right text-sm text-red-500">{form.formState.errors.content.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={createUpdateMutation.isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={createUpdateMutation.isLoading}>
              {createUpdateMutation.isLoading
                ? isEditing
                  ? "Saving..."
                  : "Creating..."
                : isEditing
                  ? "Save Changes"
                  : "Create Template"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
