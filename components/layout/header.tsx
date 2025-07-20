"use client";

import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between px-6 mb-5">
      <div className="">
        <h1 className="text-2xl font-semibold text-gray-900 font-outfit">
          Welcome back, Rotimi!
        </h1>
        <p className="text-sm text-gray-500 font-outfit">Keep track of everything here</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          {!isSearchOpen ? (
          <div className="flex items-center rounded-full  bg-white">
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
                className="w-64 pl-10 font-outfit"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setIsSearchOpen(false);
                  }
                }}
              />
            </div>
          )}
        </div>

        <button className="relative p-2 text-gray-400 hover:text-gray-500 flex items-center rounded-full  bg-white">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-outfit">
            3
          </span>
        </button>

        <div className="flex items-center space-x-2 border border-1 rounded-full p-2 border-gray-300">
          <span className="text-sm text-gray-700 font-outfit">rotimishittu@gmail.com</span>
        </div>
      </div>
    </header>
  );
}
