"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation } from "./navigation";
import Image from "next/image";
import { LogoutIcon } from "@/public/assets/icons";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex h-screen w-64 flex-col bg-primary-900">
      <div className="flex h-16 items-center px-6">
        <Image
          src="/assets/images/logo-white.png"
          alt="logo"
          width={200}
          height={100}
        />
      </div>
      <nav className="flex-1 space-y-4 pl-4 py-4">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
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
            >
              <div className="mr-5 h-5 w-5 flex-shrink-0 -mt-2">
                {item.icon(isActive, "group-hover:stroke-primary-900")}
              </div>
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="pl-4 py-4">
        <Link href={`/login`}>
          <button className="group flex w-full items-center px-4 py-3 text-sm font-medium rounded-l-2xl text-white hover:bg-white hover:text-primary-900 transition-colors font-outfit">
            <LogoutIcon
              className="group-hover:stroke-primary-900"
              stroke={"#ffffff"}
            />
            <span className="mr-3" />
            Log Out
          </button>
        </Link>
      </div>
    </div>
  );
}
