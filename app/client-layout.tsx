"use client";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { usePathname } from "next/navigation";
import type React from "react";

const noLayoutRoutes = [
  "/",
  "/login",
  "/about",
  "/contact",
  "/schemes/weekly",
  "/schemes/monthly",
  "/schemes/auto-finance",
];

function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isNoLayout = noLayoutRoutes.includes(pathname);

  if (isNoLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Header />
        {children}
      </main>
    </div>
  );
}

export default ClientLayout;
