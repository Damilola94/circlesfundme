"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { AppStoreIcon, PlayStoreIcon } from "@/public/assets/icons";

export default function HeroSection() {
  return (
    <section className="bg-primary-50 py-12 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight font-outfit">
                Save Together,{" "}
                <span className="text-primary-350">Grow Together</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg font-outfit">
                Join a trusted digital cooperative where your savings unlock
                opportunity — from loans to auto financing and more. Start
                saving today and watch your future grow.
              </p>
            </div>

            <div className="flex flex-row gap-6">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary-350 font-outfit">
                  10,000+
                </p>
                <p className="text-sm text-gray-500 font-outfit">
                  Active Savers
                </p>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary-350 font-outfit">
                  ₦500M+
                </p>
                <p className="text-sm text-gray-500 font-outfit">
                  Total Savings
                </p>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary-350 font-outfit">
                  100%
                </p>
                <p className="text-sm text-gray-500 font-outfit">
                  Secure & Trusted
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://play.google.com/store/apps/details?id=com.circlesfundme"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-primary-350 rounded-full hover:bg-primary/90 text-white w-full sm:w-auto"
                >
                  <PlayStoreIcon color="#FFFFFF" />
                  Playstore
                </Button>
              </Link>
              <Link
                href="https://apps.apple.com/ng/app/circlesfundme/id6752893435"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-primary-350 rounded-full hover:bg-primary/90 text-white w-full sm:w-auto"
                >
                  <AppStoreIcon color="#FFFFFF" />
                  Appstore
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="relative z-10">
              <Image
                src="/assets/images/happy-woman.jpg"
                alt="Happy customers"
                width={400}
                height={500}
                className="rounded-lg w-full h-auto"
                priority
              />

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 w-52">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                  <span className="text-lg">🏦</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-outfit">
                    Monthly Savings
                  </p>
                  <p className="text-sm font-bold text-gray-900 font-outfit">
                    ₦25,000 saved
                  </p>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 w-48">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  <span className="text-lg">📈</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-outfit">
                    Interest Earned
                  </p>
                  <p className="text-sm font-bold text-green-600 font-outfit">
                    +12% p.a.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-primary/10 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}