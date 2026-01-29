import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { InflowResponse } from "./type";
import moment from "moment-timezone";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumber = (amount: number | undefined) => {
  if (typeof amount !== "number") return "Invalid";

  return new Intl.NumberFormat("en-US").format(amount);
};

export   const formatMoney = (value: string) => {
      const numericValue = value.replace(/[^0-9]/g, "");
      if (!numericValue) return "";
      return Number(numericValue).toLocaleString("en-NG");
    };
    
export const formatAmount = (
  amount: number | undefined | string,
  currency: string = "₦"
) => {  
  if (typeof amount !== "number") return `${currency}0.00`;

  const isNegative = amount < 0;
  const dividedAmount = Math.abs(amount);

  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2, 
  }).format(dividedAmount);

  return isNegative ? `(${currency}${formatted})` : `${currency}${formatted}`;
};


export const roundTo = (value: number, decimals: number) => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

  export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

 export  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
export const noLayoutRoutes = [
  "/",
  "/login",
  "/set-password",
  "/reset-password",
  "/forgot-password",
  "/reset-password",
  "/privacy-policy",
  "/terms-and-condition",
  "/about",
  "/contact",
  "/schemes/daily",
  "/schemes/weekly",
  "/schemes/monthly",
  "/schemes/auto-finance",
  "/schemes/tricycle-finance",
];

export function getTotalInflow(inflowData?: InflowResponse): number {
  if (!inflowData?.isSuccess || !Array.isArray(inflowData.data)) {
    return 0;
  }
  
  return inflowData.data.reduce((sum, item) => sum + (item.amount || 0), 0);
}

export function getTotalOutflow(inflowData?: InflowResponse): number {
  if (!inflowData?.isSuccess || !Array.isArray(inflowData.data)) {
    return 0;
  }
  
  return inflowData.data.reduce((sum, item) => sum + (item.amount || 0), 0);
}

export function formatFullName(name: string): string {
  if (!name) return "";

  return name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

export const getDateRange = (period: string) => {
  const now = moment()

  switch (period) {
    case "weekly":
      return {
        DateRangeType: "Weekly",
        StartDate: now.startOf("week").format("YYYY-MM-DD"),
        EndDate: now.endOf("week").format("YYYY-MM-DD"),
      }

    case "monthly":
      return {
        DateRangeType: "Monthly",
        StartDate: now.startOf("month").format("YYYY-MM-DD"),
        EndDate: now.endOf("month").format("YYYY-MM-DD"),
      }

    case "lastYear":
      return {
        DateRangeType: "Yearly",
        StartDate: now.subtract(1, "year").startOf("year").format("YYYY-MM-DD"),
        EndDate: now.endOf("year").format("YYYY-MM-DD"),
      }

    default:
      return {
        DateRangeType: "Yearly",
        StartDate: now.startOf("year").format("YYYY-MM-DD"),
        EndDate: now.endOf("year").format("YYYY-MM-DD"),
      }
  }
}

export const truncateText = (text: string, length = 30) =>
  text.length > length ? `${text.slice(0, length)}...` : text

export const getBalanceAfterWithdrawal = (
  balanceAtWithdrawal: number,
  totalAmount: number
) => {
  if (!balanceAtWithdrawal || balanceAtWithdrawal === 0.00) {
    return 0
  }
  return Math.max(balanceAtWithdrawal - totalAmount, 0)
}
