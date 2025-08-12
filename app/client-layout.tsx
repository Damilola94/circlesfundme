"use client";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { noLayoutRoutes } from "@/lib/utils";
import { usePathname } from "next/navigation";
import type React from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import ProtectedWrapper from "./protectedwrapper";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNoLayout = noLayoutRoutes.includes(pathname);

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ProtectedWrapper>
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
        </ProtectedWrapper>

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
    </CookiesProvider>
  );
}

export default ClientLayout;
