"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AppStoreIcon, PlayStoreIcon } from "@/public/assets/icons";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const schemes = [
    { name: "Weekly Contribution Scheme", href: "/schemes/weekly" },
    { name: "Monthly Contribution Scheme", href: "/schemes/monthly" },
    { name: "Auto Finance Contribution Scheme", href: "/schemes/auto-finance" },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/images/logo.png"
                alt="logo"
                width={200}
                height={80}
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-5">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors font-outfit"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors font-outfit"
            >
              About Us
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors font-outfit">
                Contribution Schemes
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {schemes.map((scheme) => (
                  <DropdownMenuItem key={scheme.name}>
                    <Link href={scheme.href} className="w-full font-outfit">
                      {scheme.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors font-outfit"
            >
              Contact Us
            </Link>
          </nav>
          <div className="hidden md:flex items-center space-x-3">
            <Button
              className="w-full bg-primary-350  rounded-full hover:bg-primary/90 text-white"
            >
              <PlayStoreIcon color="#FFFFFF" />
              Playstore
            </Button>
            <Button
              className="w-full bg-primary-350  rounded-full hover:bg-primary/90 text-white"
            >
              <AppStoreIcon color="#FFFFFF" />
              Appstore
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary block px-3 py-2 text-base font-medium font-outfit"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary block px-3 py-2 text-base font-medium font-outfit"
              >
                About Us
              </Link>
              <div className="px-3 py-2">
                <div className="text-gray-700 font-medium mb-2 font-outfit">Contribution Schemes</div>
                {schemes.map((scheme) => (
                  <Link
                    key={scheme.name}
                    href={scheme.href}
                    className="text-gray-600 hover:text-primary block px-3 py-1 text-sm font-outfit"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {scheme.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary block px-3 py-2 text-base font-medium font-outfit"
              >
                Contact Us
              </Link>
              <div className="px-3 py-2 space-x-2">
                <Button className="bg-primary-350 rounded-full hover:bg-primary/90 text-white">
                  <PlayStoreIcon color="#FFFFFF" />
                  Google Playstore
                </Button>
                <Button className="bg-primary-350  rounded-full hover:bg-primary/90 text-white">
                  <AppStoreIcon color="#FFFFFF" />
                  App Store
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
