"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function WhatWeProvideSection() {
  const services = [
    {
      title: "Auto Finance",
      description:
        "Get financing 100 times your weekly/monthly savings. Get your back loan in one year period.",
      image: "/assets/images/auto-finance-scheme.jpg",
      href: "/schemes/auto-finance",
    },
    {
      title: "Weekly Scheme",
      description: "Save and secure your future and earn amazing returns.",
      image: "/assets/images/weekly-finance.jpg",
      href: "/schemes/weekly",
    },
    {
      title: "Monthly Scheme",
      description:
        "Make your life easy, contribute weekly or monthly and get a lump sum of money as payout.",
      image: "/assets/images/monthly-finance.jpg",
      href: "/schemes/monthly",
    },
  ];

  return (
    <section className="py-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-accent-500 font-medium mb-2">What We Provide</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Low Interest Loans, Auto Finance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link href={service.href} key={index} className="group">
              <Card
                className="overflow-hidden border-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-96">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

                  {/* Text Overlay */}
                  <div className="absolute bottom-0 z-20 p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-200">{service.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
