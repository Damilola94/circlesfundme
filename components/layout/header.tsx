"use client"

import { useState } from "react"
import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import useGetQuery from "@/hooks/useGetQuery"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const { data: userData, isLoading, isError } = useGetQuery({
    endpoint: "/adminusermanagement/admin-profile",
    queryKey: ["admin-profile"],
    auth: true,
  })

  const displayName = isLoading
    ? "Loading..."
    : isError || !userData
      ? "Guest"
      : userData?.data.lastName

  const displayEmail = isLoading
    ? "loading@example.com"
    : isError || !userData
      ? "guest@example.com"
      : userData?.data?.email

  return (
    <header className="bg-[#F5F5F5] flex h-16 items-center justify-between px-4 sm:px-6">
      {/* Greeting */}
      <div>
        <h1 className="ml-10 860:ml-0 text-lg 860:text-2xl font-semibold text-gray-900 font-outfit">
          Welcome back, {displayName}!
        </h1>
        <p className="hidden 860:block text-sm text-gray-500 font-outfit">
          Keep track of everything here
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3 860:space-x-4">
        {/* Search */}
        <div className="relative hidden 860:block">
          {!isSearchOpen ? (
            <div className="flex items-center rounded-full bg-white">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search..."
                className="w-48 860:w-64 pl-10 font-outfit"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setIsSearchOpen(false)
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-500 flex items-center rounded-full bg-white">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-outfit">
            3
          </span>
        </button>

        {/* Email - hidden until >=860px */}
        <div className="hidden 860:flex items-center space-x-2 border rounded-full p-2 border-gray-300">
          <span className="text-sm text-gray-700 font-outfit">
            {displayEmail}
          </span>
        </div>
      </div>
    </header>
  )
}
