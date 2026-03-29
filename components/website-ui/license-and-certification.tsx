"use client";

import { CardContent } from "@/components/ui/card";
import {
    SecurityIcon,
    FlexiblePlanIcon,
    MoneyIcon,
    PhoneIcon,
} from "@/public/assets/icons";

export default function WhyChooseUsSection() {
    const features = [
        {
            icon: <SecurityIcon />,
            title: "Asset-backed finance platform",
            description:
                "Advanced security, identity verification, and encrypted transactions keep your money and data safe.",
        },
        {
            icon: <FlexiblePlanIcon />,
            title: "Registered Digital Cooperative Society",
            description:
                "Save your way with weekly, monthly, or goal-based contribution plans that fit your lifestyle.",
        },
        {
            icon: <PhoneIcon />,
            title: "FCCPC-approved Digital Lender",
            description:
                "We are FCCPC-approved, ensuring our lending operations are transparent, regulated, and trustworthy.",
        },
        {
            icon: <MoneyIcon />,
            title: "DUNS Registered Business",
            description:
                "DUNS registered business, giving us a verified global identity and increasing trust with partners and users.",
        },
    ];

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 animate-fade-in">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 font-outfit">
                        Our Current Position
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-2 
              hover:cursor-pointer animate-scale-in ${index === 0 ? "" : "border-l-[1px] border-l-[#E5E7EB]"
                                }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <CardContent className="p-6">
                                <div className="flex justify-start mb-4">
                                    <div className="p-2 border border-[#00A86B] bg-primary-50 rounded-xl">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3 font-outfit">
                                    {feature.title}
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed font-outfit">
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