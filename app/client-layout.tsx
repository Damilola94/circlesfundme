"use client";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { usePathname } from "next/navigation";
import type React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const noLayoutRoutes = [
  "/",
  "/login",
  "/forgot-password",
  "/reset-password",
  "/about",
  "/contact",
  "/schemes/weekly",
  "/schemes/monthly",
  "/schemes/auto-finance",
];

function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNoLayout = noLayoutRoutes.includes(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      {isNoLayout ? (
        <>{children}</>
      ) : (
        <div className="flex h-screen bg-[#F5F5F5]">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <Header />
            {children}
          </main>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default ClientLayout;
