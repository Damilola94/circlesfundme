"use client";

import { Button } from "@/components/ui/button";
import { AppStoreIcon, PlayStoreIcon } from "@/public/assets/icons";

export default function CTASection() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 bg-primary mb-20 rounded-3xl">
      <div className="">
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-white font-outfit">
            Get Closer to the Funds You Need
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto font-outfit">
            Start saving today and unlock access to flexible, low-barrier
            financing when you need it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 flex items-center gap-2 rounded-full"
            >
              <PlayStoreIcon/>
              Google Playstore
            </Button>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 flex items-center gap-2 rounded-full"
            >
              <AppStoreIcon />
              App Store
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
