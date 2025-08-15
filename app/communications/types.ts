export type StatusType =
  | "Active"
  | "Completed"
  | "Pending"
  | "Waitlist"
  | "Rejected"
  | "Processing"
  | "Processed"
  | "Queued";

export interface TemplateApi {
  id: string;
  name: string;
  body: string;
  channel: number;
  type: number;
}

export interface TemplatesApiResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: TemplateApi[];
  metaData: any;
}

export interface CommunicationHistoryItem {
  id: number;
  title: string;
  type: string;
  recipients: number;
  date: string;
  status: StatusType;
}

export const CHANNEL_MAP_NUMBER_TO_STRING: Record<number, string> = {
  1: "SMS",
  2: "Email",
  3: "Notification",
};

export const MESSAGE_TYPE_NUMBER_TO_API_STRING: Record<number, string> = {
  1: "LoanRepaymentReminder",
};

export const MESSAGE_TYPE_API_TO_DISPLAY: Record<string, string> = {
  LoanRepaymentReminder: "Payment Reminder",
  WelcomeMessage: "Welcome Message",
  LoanApproval: "Loan Approval",
  KYCReminder: "KYC Reminder",
};

export const MESSAGE_TYPE_DISPLAY_TO_API: Record<string, string> = {
  "Payment Reminder": "LoanRepaymentReminder",
  "Welcome Message": "WelcomeMessage",
  "Loan Approval": "LoanApproval",
  "KYC Reminder": "KYCReminder",
};


export interface Communication {
  id: string
  title: string
  body: string
  target: string
  channel: string
  status: string
  scheduledAt: string
  totalRecipients: number
}

export const communicationHistory: CommunicationHistoryItem[] = [
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
