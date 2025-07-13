"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import Image from "next/image";

export default function LoanCalculatorSection() {
  const [selected, setSelected] = useState("");

  const trustedLogos = [
    { name: "Zenith Bank", src: "/assets/images/partners/partner-1.png" },
    { name: "Leadway Insurance", src: "/assets/images/partners/partner-2.png" },
    { name: "BRISCOE", src: "/assets/images/partners/partner-3.png" },
    { name: "NURTW", src: "/assets/images/partners/partner-4.png" },
    { name: "Rosaki", src: "/assets/images/partners/partner-5.png" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-base  mb-6 font-bold">
            Trusted by Reputable Institutions That Believe in Financial Access
          </p>
          <div className="flex flex-wrap justify-center items-center gap-32 opacity-60">
            {trustedLogos.map((logo, index) => (
              <div
                key={index}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.name}
                  width={80}
                  height={60}
                  className="h-14 w-auto"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-in-left">
          <p className="text-accent-500 font-medium mb-1">About Us  </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Our Loans Will Make Your{" "}
              <span className="text-primary">Dreams Come True</span>
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                At CirclesFundMe, we provide you with smart and reliable
                pathways to achieve better results with your money. Join us
                today with a weekly or monthly savings amount that meets your
                need.
              </p>
              <p>
                And get a lump sum payout to buy the asset you need to start the
                business of your dreams, pay your yearly bills, or cater to that
                special occasion.
              </p>
            </div>
          </div>

          <div className="animate-slide-in-right">
            <Card className="bg-primary/5 border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Calculate Your Loan
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose Loan Tenor
                    </label>
                    <Select
                      options={[
                        {
                          value: "payment-reminder",
                          label: "Payment Reminder",
                        },
                        {
                          value: "payment-reminder",
                          label: "Contribution Reminder",
                        },
                        { value: "payment-reminder", label: "Loan Reminder" },
                      ]}
                      className="mt-1"
                      value={selected}
                      onChange={setSelected}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose Savings Frequency
                    </label>
                    <Select
                      options={[
                        {
                          value: "payment-reminder",
                          label: "Payment Reminder",
                        },
                        {
                          value: "payment-reminder",
                          label: "Contribution Reminder",
                        },
                        { value: "payment-reminder", label: "Loan Reminder" },
                      ]}
                      className="mt-1"
                      value={selected}
                      onChange={setSelected}
                    />
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3">
                    Calculate Your Loan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
