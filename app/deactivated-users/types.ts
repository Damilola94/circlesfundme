export interface User {
  userId: string;
  name: string;
  dateJoined: string;
  scheme: string;
  contribution: number;
  totalContribution: number;
  eligibleLoan: number;
  contributionAmountToQualifyForLoan: number;
  totalRepaidAmount: number;
}

interface Tab {
  id: string;
  label: string;
  status: number
}
export const getStatusBadgeSingle = (status: number) => {
    switch (status) {
      case 1:
        return { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: "pending" }
      case 2:
        return { label: "Approved", color: "bg-green-100 text-green-800", icon: "check" }
      case 3:
        return { label: "Rejected", color: "bg-red-100 text-red-800", icon: "x" }
      default:
        return { label: "Unknown", color: "bg-gray-100 text-gray-800", icon: "unknown" }
    }
  }


export   const getStatusBadge = (status: number) => {
    switch (status) {
      case 1:
        return "bg-yellow-100 text-yellow-800"
      case 2:
        return "bg-green-100 text-green-800"
      case 3:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

export const DeactivationTabs: Tab[] = [
  { id: "pending", label: "Pending", status: 1 },
  { id: "approved", label: "Approved Users", status: 2 },
  {
    id: "rejected",
    label: "Rejected Users",
    status: 3,
  },
];


