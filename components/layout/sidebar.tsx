"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigation } from "./navigation"
import Image from "next/image"
import { LogoutIcon } from "@/public/assets/icons"
import { logout } from "@/services/auth"
import { Menu, X } from "lucide-react"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Toggle button - visible only on <860px */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 z-50 text-primary-900 860:hidden"
      >
        {isOpen ? <X size={28} className="text-white"/> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 flex-col bg-primary-900 transform transition-transform duration-300 860:translate-x-0 860:relative 860:flex",
          isOpen ? "translate-x-0 flex" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center px-6 pl-14 860:pl-6">
          <Image
            src="/assets/images/logo-white.png"
            alt="logo"
            width={200}
            height={100}
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-4 pl-4 py-4">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-l-2xl transition-colors space-y-6 font-outfit",
                  isActive
                    ? "bg-[#F5F5F5] text-primary-900"
                    : "text-white hover:bg-white hover:text-primary-900"
                )}
                onClick={() => setIsOpen(false)} // close sidebar when navigating
              >
                <div className="mr-5 h-5 w-5 flex-shrink-0 -mt-2">
                  {item.icon(isActive, "group-hover:stroke-primary-900")}
                </div>
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="pl-4 py-4">
          <Link
            href={`/login`}
            onClick={() => {
              logout()
              setIsOpen(false)
            }}
          >
            <button className="group flex w-full items-center px-4 py-3 text-sm font-medium rounded-l-2xl text-white transition-colors font-outfit">
              <LogoutIcon stroke={"#ffffff"} />
              <span className="mr-3" />
              Log Out
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
