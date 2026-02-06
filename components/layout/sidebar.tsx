"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { useCookies } from "react-cookie";

import { cn } from "@/lib/utils";
import { navigation, NavItem } from "./navigation";
import { LogoutIcon } from "@/public/assets/icons";
import { logout } from "@/services/auth";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const [cookies] = useCookies(["data"]);

  const userRole = cookies?.data?.role;

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(userRole)
  );

  const renderNavItem = (item: NavItem) => {
    if (item.children) {
      const isDropdownOpen = openDropdown === item.name;

      return (
        <div key={item.name}>
          <button
            onClick={() =>
              setOpenDropdown(isDropdownOpen ? null : item.name)
            }
            className="group flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-white hover:bg-white hover:text-primary-900 rounded-l-2xl "
          >
            <div className="flex items-center">
              <div className="mr-5 h-5 w-5">
                {item.icon?.(false, "group-hover:stroke-primary-900")}
              </div>
              {item.name}
            </div>

            <ChevronDown
              className={cn(
                "transition-transform",
                isDropdownOpen && "rotate-180"
              )}
              size={18}
            />
          </button>

          {isDropdownOpen && (
            <div className="ml-6 space-y-2 mt-2">
              {item.children.map((child) => {
                const isActive =
                  pathname === child.href ||
                  (child.href !== "/" &&
                    pathname.startsWith(child.href!));

                return (
                  <Link
                    key={child.name}
                    href={child.href!}
                    className={cn(
                      "group flex items-center px-4 py-2 text-sm rounded-l-2xl",
                      isActive
                        ? "bg-[#F5F5F5] text-primary-900"
                        : "text-white hover:bg-white hover:text-primary-900"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="mr-4 h-5 w-5">
                      {child.icon?.(
                        isActive,
                        "group-hover:stroke-primary-900"
                      )}
                    </div>
                    {child.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    const isActive =
      pathname === item.href ||
      (item.href !== "/" && pathname.startsWith(item.href!));

    return (
      <Link
        key={item.name}
        href={item.href!}
        className={cn(
          "group flex items-center px-4 py-3 text-sm font-medium rounded-l-2xl transition-colors font-outfit",
          isActive
            ? "bg-[#F5F5F5] text-primary-900"
            : "text-white hover:bg-white hover:text-primary-900"
        )}
        onClick={() => setIsOpen(false)}
      >
        <div className="mr-5 h-5 w-5 flex-shrink-0">
          {item.icon?.(isActive, "group-hover:stroke-primary-900")}
        </div>
        {item.name}
      </Link>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 z-50 text-primary-900 860:hidden"
      >
        {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} />}
      </button>

      <div
        className={cn(
          "fixed top-0 left-0 z-40 w-64 flex flex-col bg-primary-900 h-screen overflow-y-auto transform transition-transform duration-300 860:translate-x-0 860:relative",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >

        <div className="flex h-16 items-center px-6 pl-14 860:pl-6 py-10">
          <Image
            src="/assets/images/logo-white.png"
            alt="logo"
            width={200}
            height={100}
          />
        </div>

        <nav className="flex-1 space-y-4 pl-4 py-4">
          {filteredNavigation.map(renderNavItem)}

          <div>
            <Link
              href="/login"
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
            >
              <button className="group flex w-full items-center px-4 py-3 text-sm font-medium rounded-l-2xl text-white font-outfit">
                <LogoutIcon stroke="#ffffff" />
                <span className="ml-3">Log Out</span>
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
