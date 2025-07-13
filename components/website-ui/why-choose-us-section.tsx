"use client";

import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  AppStoreIcon,
  SecurityIcon,
  FlexiblePlanIcon,
  MoneyIcon,
} from "@/public/assets/icons";
import PhoneIcon from "@/public/assets/icons/PhoneIcon";
export default function WhyChooseUsSection() {
  const features = [
    {
      icon: <SecurityIcon />,
      title: "Secure & Verified",
      description:
        "100% secured identity checks, encrypted payments, and facial recognition.",
    },
    {
      icon: <FlexiblePlanIcon />,
      title: "Flexible Plans",
      description: "Choose weekly, monthly, or asset-based saving schemes.",
    },
    {
      icon: <MoneyIcon />,
      title: "Auto Finance Access",
      description:
        "Save and unlock loans for vehicles, appliances, and more — on your schedule.",
    },
    {
      icon: <PhoneIcon />,
      title: "Mobile-first Experience",
      description: "Seamless interface built for modern Africa savers.",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-slide-in-left">
          <p className="text-accent-500 font-medium mb-2">Why Choose Us</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Trusted for Transparent and{" "}
              <span className="text-primary">Convenient Loans</span>
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Over the years, we have built a reputation for making the dreams
              of our members come true as we provide them with business loans
              with minimal interest rates and convenient terms of payment. We
              have also reduced difficult lump sum annual payments to simple
              weekly or monthly contributions.
            </p>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="relative z-10 ">
              <Image
                src="/assets/images/smiling-man-finger-up.png"
                alt="Happy customer giving thumbs up"
                width={400}
                height={400}
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="text-center mb-12 animate-fade-in mt-36">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Why Choose Us?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-2 
              hover:cursor-pointer animate-scale-in ${
                index === 0 ? "" : "border-l-[1px] border-l-[#9E9E9E]"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-start   mb-4">
                  <div className="p-2 border border-[#00A86B] bg-primary-50 rounded-xl">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
