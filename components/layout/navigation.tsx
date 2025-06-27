import {
    DashboardIcon,
    LoanIcon,
    CommunicationIcon,
    KYCIcon,
    SubscriptionIcon,
  } from "@/public/assets/icons";
  
  export const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: (isActive: boolean) => (
        <DashboardIcon stroke={isActive ? "#004C42" : "#ffffff"} />
      ),
    },
    {
      name: "KYC Reviews",
      href: "/kyc-reviews",
      icon: (isActive: boolean) => (
        <KYCIcon stroke={isActive ? "#004C42" : "#ffffff"} />
      ),
    },
    {
      name: "Subscriptions",
      href: "/subscriptions",
      icon: (isActive: boolean) => (
        <SubscriptionIcon stroke={isActive ? "#004C42" : "#ffffff"} />
      ),
    },
    {
      name: "Loan Management",
      href: "/loan-management",
      icon: (isActive: boolean) => (
        <LoanIcon stroke={isActive ? "#004C42" : "#ffffff"} />
      ),
    },
    {
      name: "Communications",
      href: "/communications",
      icon: (isActive: boolean) => (
        <CommunicationIcon stroke={isActive ? "#004C42" : "#ffffff"} />
      ),
    },
  ];
  