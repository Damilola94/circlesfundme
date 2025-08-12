export interface User {
  userId: string;
  name: string;
  dateJoined: string;
  scheme: string;
  totalContribution: number;
  eligibleLoan: number;
  totalRepaidAmount: number;
}

interface Tab {
  id: string;
  label: string;
  status: "active" | "deactivated" | "pendingKyc";
}

export const tabs: Tab[] = [
  { id: "onboarded-users", label: "Onboarded Users", status: "active" },
  {
    id: "deactivated-users",
    label: "Deactivated Users",
    status: "deactivated",
  },
  { id: "pending-kyc", label: "Pending KYC", status: "pendingKyc" },
];

export type StatusType = "Approved" | "Pending" | "Waitlisted" | "Rejected";

export type ActionType = "Contribution" | "Withdrawal";
