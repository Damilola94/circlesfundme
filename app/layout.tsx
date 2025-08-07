import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "CirclesFundMe - Your Trusted Financial Partner",
  description:
    "Get access to loans without stress. Join a trusted digital cooperative where your savings unlock opportunity, from loans to auto financing and more.",
  keywords: "loans, finance, savings, cooperative, auto finance, weekly scheme, monthly scheme",
  authors: [{ name: "CirclesFundMe" }],
  creator: "CirclesFundMe",
  publisher: "CirclesFundMe",
  metadataBase: new URL("https://circlesfundme.com"),
   icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
