interface Tab {
  id: string;
  label: string;
  status: "active" | "deactivated" | "pendingKyc" | undefined;
}

export type ActionType = "Contribution" | "Withdrawal";

export type StatusType =
  | "Approved"
  | "Pending"
  | "Waitlist"
  | "Rejected"
  | "Confirmed";

export type KycStatusType = "active" | "deactivated" | "pending" | "unknown";

export type User = {
  userId: string;
  name: string;
  dateJoined: string;
  scheme: string;
  gender: string;
  contribution: number;
  totalContribution: number;
  contributionAmountToQualifyForLoan: number;
  eligibleLoan: number;
  totalRepaidAmount: number;
};

export type SchemeMode = "Both" | "SavingsOnly" | "FullScheme" | undefined;

export const schemeTabs: { id: SchemeMode; label: string }[] = [
  { id: undefined, label: "All Users" },
  { id: "SavingsOnly", label: "Savings Only" },
  { id: "FullScheme", label: "Full Scheme" },
];

export type SavingsSubTab = "all" | "FlexSavings" | "LockSavings";

export const savingsSubTabs: { id: SavingsSubTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "FlexSavings", label: "Savings Flex" },
  { id: "LockSavings", label: "Savings Lock" },
];

export type StatusTab = {
  id: string;
  label: string;
  status?: string;
};

export const tabs: StatusTab[] = [
  { id: "all-users", label: "All Onbaorded Users", status: undefined },
  { id: "active", label: "Active Users", status: "active" },
  { id: "pending", label: "Pending KYC Approvals", status: "pendingKyc" },
  { id: "deactivated", label: "Deactivated Users", status: "deactivated" },
];

export type DateFilterMode = "daily" | "monthly";

export type FilterState = {
  email: string;
  dateMode: DateFilterMode;
  fromDate: string;
  toDate: string;
  month: string;
};
