"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Param {
  label: string;
  value: string;
  unit: string;
}

interface Subscription {
  title: string;
  params: Param[];
}

export default function SubscriptionCard() {
  const [subscriptionTypes, setSubscriptionTypes] = useState<Subscription[]>([
    {
      title: "Weekly",
      params: [
        { label: "Contribution %", value: "20", unit: "%" },
        { label: "Eligible Loan", value: "52", unit: "x" },
        { label: "Service Charge", value: "2500", unit: "₦" },
        { label: "Loan Management Fee", value: "6", unit: "%" },
        { label: "Default Penalty", value: "25", unit: "%" },
      ],
    },
    {
      title: "Monthly",
      params: [
        { label: "Contribution %", value: "20", unit: "%" },
        { label: "Eligible Loan", value: "52", unit: "x" },
        { label: "Service Charge", value: "2500", unit: "₦" },
        { label: "Loan Management Fee", value: "6", unit: "%" },
        { label: "Default Penalty", value: "25", unit: "%" },
      ],
    },
    {
      title: "Asset Finance",
      params: [
        { label: "Required Equity %", value: "10", unit: "%" },
        { label: "Loan Term (Weeks)", value: "208", unit: "wk" },
        { label: "Loan Management Fee / year", value: "6", unit: "%" },
        { label: "Service Charge", value: "2500", unit: "₦" },
        { label: "Default Penalty", value: "25", unit: "%" },
      ],
    },
  ]);

  const handleInputChange = (subIndex: number, paramIndex: number, newValue: string) => {
    const updatedSubs = [...subscriptionTypes];
    updatedSubs[subIndex].params[paramIndex].value = newValue;
    setSubscriptionTypes(updatedSubs);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {subscriptionTypes.map((subscription, subIndex) => (
          <Card key={subIndex}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{subscription.title}</CardTitle>
            </CardHeader>
            <hr className="border-gray-200 my-4" />
            <CardContent className="space-y-6">
              {subscription.params.map((param, paramIndex) => (
                <div
                  key={paramIndex}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <span className="text-sm text-muted-foreground">
                    {param.label}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      value={param.value}
                      onChange={(e) =>
                        handleInputChange(subIndex, paramIndex, e.target.value)
                      }
                      className="w-16 h-8 text-center"
                    />
                    <span className="text-sm text-muted-foreground w-8">
                      {param.unit}
                    </span>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-6">Save Changes</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
