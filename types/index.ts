export interface User {
  id: string
  name: string
  email: string
  phone: string
  image?: string
  dateOfBirth: string
  gender: string
  scheme: string
  contribution: string
  bvn: string
  status: "active" | "pending" | "rejected"
  createdAt: string
}

export interface Loan {
  id: string
  userId: string
  amount: string
  status: "active" | "pending" | "completed" | "overdue"
  scheme: "weekly" | "monthly"
  dateApplied: string
  dueDate?: string
  repaidAmount?: string
  remainingAmount?: string
}

export interface Communication {
  id: string
  title: string
  type: "sms" | "email" | "notification"
  content: string
  recipients: number
  status: "completed" | "pending" | "failed"
  createdAt: string
}

export interface Template {
  id: string
  name: string
  type: "sms" | "email" | "notification"
  content: string
  variables: string[]
  status: "active" | "inactive"
}

export interface DashboardStats {
  pendingKyc: number
  activeLoans: number
  overduePayments: number
  totalUsers: number
}
