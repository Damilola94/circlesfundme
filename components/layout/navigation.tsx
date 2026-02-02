import {
  DashboardIcon,
  LoanIcon,
  CommunicationIcon,
  KYCIcon,
  SubscriptionIcon,
  ReferralIcon,
  WithdrawalIcon,
  UserLockIcon,
  UserRemoveIcon,
  UserIcon,
} from "@/public/assets/icons";

type Role = "SuperAdmin" | "Admin" | "CreditRiskOfficer" | "Referrer";

type NavItem = {
  name: string;
  href: string;
  roles: Role[];
  icon: (isActive: boolean, hoverClass?: string) => JSX.Element;
};

export const navigation: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    roles: ["SuperAdmin"],
    icon: (isActive, hoverClass = "") => (
      <DashboardIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
   {
    name: "Dashboard",
    href: "/my-dashboard",
    roles: ["Referrer"],
    icon: (isActive, hoverClass = "") => (
      <DashboardIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "Referrals",
    href: "/referrer-user-management",
    roles: ["Referrer"],
    icon: (isActive, hoverClass = "") => (
      <KYCIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "User Management",
    href: "/user-management",
    roles: ["SuperAdmin", "CreditRiskOfficer"],
    icon: (isActive, hoverClass = "") => (
      <KYCIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "Deactivated Users",
    href: "/deactivated-users",
    roles: ["SuperAdmin"],
    icon: (isActive, hoverClass = "") => (
      <UserIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "Withdrawal Requests",
    href: "/withdrawal-requests",
    roles: ["SuperAdmin"],
    icon: (isActive, hoverClass = "") => (
      <WithdrawalIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "Subscriptions",
    href: "/subscriptions",
    roles: ["SuperAdmin"],
    icon: (isActive, hoverClass = "") => (
      <SubscriptionIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "Loan Management",
    href: "/loan-management",
    roles: ["SuperAdmin", "CreditRiskOfficer"],
    icon: (isActive, hoverClass = "") => (
      <LoanIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "Admin User Management",
    href: "/admin-user-management",
    roles: ["Admin"],
    icon: (isActive, hoverClass = "") => (
      <KYCIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "Communications",
    href: "/communications",
    roles: ["SuperAdmin", "Admin", "Referrer"],
    icon: (isActive, hoverClass = "") => (
      <CommunicationIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "Referrers",
    href: "/referrers",
    roles: ["SuperAdmin"],
    icon: (isActive, hoverClass = "") => (
      <ReferralIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
  {
    name: "Admin Users",
    href: "/admin-user",
    roles: ["SuperAdmin"],
    icon: (isActive, hoverClass = "") => (
      <UserLockIcon
        stroke={isActive ? "#004C42" : "#ffffff"}
        className={hoverClass}
      />
    ),
  },
];
