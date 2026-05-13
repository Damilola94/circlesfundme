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
  email: string;
  dateJoined: string;
  scheme: string;
  schemeMode: number;
  gender: string;

  // ── Loan fields ───────────────────────────────
  contribution: number;
  totalContribution: number;
  contributionAmountToQualifyForLoan: number;
  eligibleLoan: number;
  totalRepaidAmount: number;

  // ── Savings fields ────────────────────────────
  savingsSchemeName: string;
  savingsSchemeType: number;
  proposedSavingsAmount: number;
  savingsFrequency: number;
  interestRatePerAnnum: number;
  savingsBalance: number;
  accruedInterest: number;
  totalInterestCredited: number;
  totalFutureValue: number;
  savingsDurationInMonths: number;

  isActive: boolean;
};

// ✅ Single SchemeMode type — string-based to match API
export type SchemeMode = "SavingsOnly" | "FullScheme" | "Both" | undefined;

export const schemeTabs: { id: SchemeMode; label: string }[] = [
  { id: undefined, label: "All Users" },
  { id: "SavingsOnly", label: "Savings Only" },
  { id: "FullScheme", label: "Full Scheme" },
];

// ✅ isSavingsMode helper — true when schemeMode is savings-related
export const isSavingsSchemeMode = (mode: SchemeMode): boolean =>
  mode === "SavingsOnly";

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
  { id: "all-users", label: "All Onboarded Users", status: undefined },
  { id: "active", label: "Active Users", status: "active" },
  { id: "pending", label: "Pending KYC", status: "pendingKyc" },
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

// ── Frequency label map ───────────────────────────────────────
export const FREQUENCY_LABELS: Record<number, string> = {
  1: "Daily",
  2: "Weekly",
  3: "Monthly",
  4: "Lump Sum",
};