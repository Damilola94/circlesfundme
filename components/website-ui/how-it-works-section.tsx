"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title:
        "Join CirclesFundMe Cooperative Society and choose the service package that meets your needs.",
    },
    {
      number: "02",
      title:
        "Save weekly or monthly in line with the savings amount of your chosen service package.",
    },
    {
      number: "03",
      title:
        "Get a loan that matches your chosen service package and savings amount.",
    },
    {
      number: "04",
      title:
        "Pay back conveniently over the applicable time period, at a low interest rate.",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative animate-slide-in-left">
            <div className="relative overflow-hidden">
              <div className="relative z-10">
                <Image
                  src="/assets/images/product-one.png"
                  alt="CirclesFundMe mobile app interface"
                  width={500}
                  height={500}
                  className="mx-auto"
                />
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            </div>
          </div>

          <div className="space-y-8 animate-slide-in-right">
            <div className="text-center lg:text-left">
              <p className="text-accent-500 font-medium mb-2">How It Works</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                How CirclesFundme Works
              </h2>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-[#F9FAFB] border-l-4 border-l-primary border-t-0 border-r-0 border-b-0  hover:shadow-md transition-shadow duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="text-primary rounded-full flex items-center justify-center text-base font-bold">
                          {step.number}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {step.title}
                      </p>
                    </div>
                  </CardContent>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
