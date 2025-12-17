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
                Get Access to Loans{" "}
                <span className="text-primary-350">Without Stress</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg font-outfit">
                Join a trusted digital cooperative where your savings unlock
                opportunity, from loans to auto financing and more.
              </p>
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
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-primary/10 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
