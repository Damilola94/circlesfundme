"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppStoreIcon, PlayStoreIcon } from "@/public/assets/icons";

export default function CompanyLicense() {
  return (
    <section className="w-full bg-primary py-14 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto text-center space-y-8 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-outfit">
          A Licensed & Registered Digital  
          <span className="block">Financial Cooperative Society</span>
        </h2>

        <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto font-outfit leading-relaxed">
          Managed by <span className="font-semibold text-white">
            Circlesfundme Capital Partners Ltd
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
          <Link
            href="https://play.google.com/store/apps/details?id=com.circlesfundme"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 px-10 py-4 flex items-center gap-3 rounded-full font-medium shadow-md"
            >
              <PlayStoreIcon />
              Get it on Play Store
            </Button>
          </Link>

          <Link
            href="https://apps.apple.com/ng/app/circlesfundme/id6752893435"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 px-10 py-4 flex items-center gap-3 rounded-full font-medium shadow-md"
            >
              <AppStoreIcon />
              Download on App Store
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
