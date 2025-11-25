import {
  DashboardIcon,
  LoanIcon,
  CommunicationIcon,
  KYCIcon,
  SubscriptionIcon,
  WithdrawalIcon
} from "@/public/assets/icons";

export const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (isActive: boolean, hoverClass = "") => (
      <DashboardIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "User Management",
    href: "/user-management",
    icon: (isActive: boolean, hoverClass = "") => (
      <KYCIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "Withdrawal Requests",
    href: "/withdrawal-requests",
    icon: (isActive: boolean, hoverClass = "") => (
      <WithdrawalIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "Subscriptions",
    href: "/subscriptions",
    icon: (isActive: boolean, hoverClass = "") => (
      <SubscriptionIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "Loan Management",
    href: "/loan-management",
    icon: (isActive: boolean, hoverClass = "") => (
      <LoanIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "Communications",
    href: "/communications",
    icon: (isActive: boolean, hoverClass = "") => (
      <CommunicationIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
];
