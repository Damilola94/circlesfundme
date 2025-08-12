import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react"

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export interface DashboardStatisticsResponse {
  isSuccess: boolean
  statusCode: string
  message: string
  data: {
    totalUsers: number
    activeLoans: number
    overduePayments: number
    pendingKyc: number
  }
  metaData: null
}

export interface User {
  userId: string
  name: string
  dateJoined: string 
  avatarUrl?: string 
}

export interface UsersApiResponse {
  isSuccess: boolean
  statusCode: string
  message: string
  data: User[]
  metaData: {
    totalCount: number
    pageSize: number
    currentPage: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

export interface InflowItem {
  id: string
  name: string // e.g., "Subscription Charge"
  amount: number
}

export interface InflowResponse {
  isSuccess: boolean
  statusCode: string
  message: string
  data: {
    items: InflowItem[]
    totalInflow: number
  }
  metaData: null
}

export interface OutflowItem {
  id: string
  name: string 
  amount: number
}

export interface OutflowResponse {
  isSuccess: boolean
  statusCode: string
  message: string
  data: {
    items: OutflowItem[]
    totalOutflow: number
  }
  metaData: null
}

export interface LoanRequestItem {
  id: string
  applicantName: string
  loanAmount: number
  applicationDate: string 
}

export interface LoanApplicationsResponse {
  isSuccess: boolean
  statusCode: string
  message: string
  data: LoanRequestItem[]
  metaData: {
    totalCount: number
    pageSize: number
    currentPage: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

export interface UserName {
  name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; time: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined
}