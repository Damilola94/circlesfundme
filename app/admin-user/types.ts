export interface User {
  id: string;
  requesterName: string;
  dateRequested: string;
  scheme: string;
  amountRequested: number;
  eligibleLoan: number;
  chargeAmount: number;
  rejectionReason?: string;
  rejectedDate?: string;
  balanceAtWithdrawal: number;
  totalAmount: number;
}

interface Tab {
  id: string;
  label: string;
  status: "pending" | "approved" | "rejected";
}

export const tabs: Tab[] = [
  { id: "pending", label: "Pending Requests", status: "pending" },
  { id: "approved", label: "Approved Requests", status: "approved" },
  { id: "rejected", label: "Rejected Requests", status: "rejected" },
];

export type ActionType = "Contribution" | "Withdrawal";

export type StatusType = "Approved" | "Pending" | "Waitlist" | "Rejected" | "Confirmed"

export type KycStatusType = "active" | "deactivated" | "pending" | "unknown"