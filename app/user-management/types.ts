export interface User {
  userId: string;
  name: string;
  dateJoined: string;
  scheme: string;
  contribution: number;
  totalContribution: number;
  eligibleLoan: number;
  loanEligibilityAmount: number;
  totalRepaidAmount: number;
}

interface Tab {
  id: string;
  label: string;
  status: "active" | "deactivated" | "pendingKyc" | undefined;
}


export const tabs: Tab[] = [
  { id: "all-users", label: "All Users", status: undefined },
  { id: "active-users", label: "Active Users", status: "active" },
  {
    id: "deactivated-users",
    label: "Deactivated Users",
    status: "deactivated",
  },
  { id: "pending-kyc", label: "Pending KYC", status: "pendingKyc" },
];


export type ActionType = "Contribution" | "Withdrawal";

export type StatusType = "Approved" | "Pending" | "Waitlist" | "Rejected" | "Confirmed"

export type KycStatusType = "active" | "deactivated" | "pending" | "unknown"