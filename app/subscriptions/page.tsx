"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Check } from "lucide-react" 

interface ParamConfig {
  label: string
  key: string 
  unit: string
}

interface Subscription {
  title: string
  type: "regular" | "asset" 
  values: { [key: string]: string } 
  paramsConfig: ParamConfig[] 
}

export default function SubscriptionCard() {
  const [subscriptionTypes, setSubscriptionTypes] = 
  
  useState<Subscription[]>([
    {
      title: "Weekly",
      type: "regular",
      values: {
        contributionPercentage: "20",
        eligibleLoanMultiplier: "52",
        serviceCharge: "0.0028",
        loanManagementFee: "6",
        defaultPenalty: "25",
      },
      paramsConfig: [
        { label: "Contribution %", key: "contributionPercentage", unit: "%" },
        { label: "Eligible Loan", key: "eligibleLoanMultiplier", unit: "x" },
        { label: "Service Charge", key: "serviceCharge", unit: "%" },
        { label: "Loan Management Fee", key: "loanManagementFee", unit: "%" },
        { label: "Default Penalty", key: "defaultPenalty", unit: "%" },
      ],
    },
    {
      title: "Monthly",
      type: "regular",
      values: {
        contributionPercentage: "20",
        eligibleLoanMultiplier: "12",
        serviceCharge: "0.005",
        loanManagementFee: "6",
        defaultPenalty: "25",
      },
      paramsConfig: [
        { label: "Contribution %", key: "contributionPercentage", unit: "%" },
        { label: "Eligible Loan", key: "eligibleLoanMultiplier", unit: "x" },
        { label: "Service Charge", key: "serviceCharge", unit: "%" },
        { label: "Loan Management Fee", key: "loanManagementFee", unit: "%" },
        { label: "Default Penalty", key: "defaultPenalty", unit: "%" },
      ],
    },
    {
      title: "Asset Finance",
      type: "asset",
      values: {
        requiredEquity: "10",
        loanTermWeeks: "208",
        loanManagementFeeYear: "6",
        serviceCharge: "2500",
        extraEngine: "10",
        extraTyre: "10",
        insurance: "6",
        processingFee: "0.02",
        preLoanServiceCharge: "0.05",
        postLoanWeeklyContribution: "0.025",
      },
      paramsConfig: [
        { label: "Required Equity %", key: "requiredEquity", unit: "%" },
        { label: "Loan Term (Weeks)", key: "loanTermWeeks", unit: "wk" },
        { label: "Loan Management Fee / year", key: "loanManagementFeeYear", unit: "%" },
        { label: "Service Charge", key: "serviceCharge", unit: "₦" },
        { label: "Extra Engine", key: "extraEngine", unit: "%" },
        { label: "Extra Tyre", key: "extraTyre", unit: "%" },
        { label: "Insurance", key: "insurance", unit: "%" },
        { label: "Processing Fee", key: "processingFee", unit: "%" },
        { label: "Pre-Loan Service Charge", key: "preLoanServiceCharge", unit: "%" },
        { label: "Post-Loan Weekly Contribution", key: "postLoanWeeklyContribution", unit: "%" },
      ],
    },
  ])

  const [isEditing, setIsEditing] = useState<boolean[]>(subscriptionTypes.map(() => false))

  const handleInputChange = (subIndex: number, paramKey: string, newValue: string) => {
    setSubscriptionTypes((prevSubs) => {
      const updatedSubs = [...prevSubs]
      updatedSubs[subIndex] = {
        ...updatedSubs[subIndex],
        values: {
          ...updatedSubs[subIndex].values,
          [paramKey]: newValue,
        },
      }
      return updatedSubs
    })
  }

  const toggleEditMode = (subIndex: number) => {
    setIsEditing((prev) => {
      const newEditingState = [...prev]
      newEditingState[subIndex] = !newEditingState[subIndex]
      return newEditingState
    })
  }

  const handleSaveChanges = (subIndex: number) => {
    console.log(`Saving changes for ${subscriptionTypes[subIndex].title}:`, subscriptionTypes[subIndex].values)
    toggleEditMode(subIndex)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {subscriptionTypes.map((subscription, subIndex) => (
          <Card key={subIndex} className="h-fit">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{subscription.title}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => toggleEditMode(subIndex)}>
                {isEditing[subIndex] ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Pencil className="h-4 w-4 text-gray-500" />
                )}
                <span className="sr-only">{isEditing[subIndex] ? "Save" : "Edit"}</span>
              </Button>
            </CardHeader>
            <hr className="border-gray-200 my-2" />
            <CardContent className="space-y-3">
              {subscription.paramsConfig.map((param) => (
                <div key={param.key} className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-muted-foreground font-outfit">{param.label}</span>
                  <div className="flex items-center space-x-2">
                    {isEditing[subIndex] ? (
                      <Input
                        type="text"
                        value={subscription.values[param.key]}
                        onChange={(e) => handleInputChange(subIndex, param.key, e.target.value)}
                        className="w-16 h-8 text-center"
                      />
                    ) : (
                      <span className="text-sm font-medium text-gray-900">{subscription.values[param.key]}</span>
                    )}
                    <span className="text-sm text-muted-foreground w-8 font-outfit">{param.unit}</span>
                  </div>
                </div>
              ))}
              {isEditing[subIndex] && (
                <Button className="w-full mt-6" onClick={() => handleSaveChanges(subIndex)}>
                  Save Changes
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
