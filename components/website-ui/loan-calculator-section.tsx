"use client";

import Image from "next/image";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatAmount } from "@/lib/utils";
import handleFetch from "@/services/api/handleFetch";
import { useMutation } from "react-query";
import { Loader } from "../ui/Loader";
import { toast } from "react-toastify";
import useGetQuery from "@/hooks/useGetQuery";

const trustedLogos = [
  { name: "Zenith Bank", src: "/assets/images/partners/partner-1.png" },
  { name: "Leadway Insurance", src: "/assets/images/partners/partner-2.png" },
  { name: "BRISCOE", src: "/assets/images/partners/partner-3.png" },
  { name: "NURTW", src: "/assets/images/partners/partner-4.png" },
  { name: "Rosaki", src: "/assets/images/partners/partner-5.png" },
];
export default function LoanCalculatorSection() {
  const [scheme, setScheme] = useState("");
  const [income, setIncome] = useState("");
  const [contribution, setContribution] = useState("");
  const [assetCost, setAssetCost] = useState("");
  const [vehicleBreakdown, setVehicleBreakdown] = useState<any>({
    costOfVehicle: "",
    extraEngine: "",
    extraTyre: "",
    insurance: "",
    processingFee: "",
    totalAssetValue: "",
    downPayment: "",
    loanManagementFee: "",
    minimumWeeklyContribution: "",
    preLoanServiceCharge: "",
    postLoanWeeklyContribution: "",
    eligibleLoan: "",
  });
  const [regularBreakdown, setRegularBreakdown] = useState<any>({
    principalLoan: "",
    principalLoanDescription: "",
    loanManagementFee: "",
    loanManagementFeeDescription: "",
    eligibleLoan: "",
    eligibleLoanDescription: "",
    serviceCharge: "",
  });

  const isAssetFinance = scheme === "Auto Financing Contribution";
  const incomeValue = parseFloat(income.replace(/,/g, ""));
  const contributionValue = parseFloat(contribution.replace(/,/g, ""));
  const assetCostValue =   parseFloat(assetCost.replace(/,/g, ""));

  const maxPercentage = scheme === "Weekly Contribution Scheme" ? 0.2 : 0.3;
  const isValidContribution = contributionValue <= maxPercentage * incomeValue;
  const vehicleEligibleLoan =
    parseFloat(vehicleBreakdown.eligibleLoan.replace(/,/g, "")) +
    parseFloat(vehicleBreakdown.loanManagementFee.replace(/,/g, ""));
  const serviceChargePerMonth = vehicleEligibleLoan * 0.0005; 
  const totalInterestOver48Months = serviceChargePerMonth * 48;

  const totalWithInterest = vehicleEligibleLoan + totalInterestOver48Months;

  const formattedVehicleTotal = formatAmount(totalWithInterest, "N");

  const { data } = useGetQuery({
    endpoint: "contributionschemes",
    extra: "mini",
    queryKey: ["contributionschemes-mini"],
  });

  const selectedSchemeId = data?.data?.find(
    (item: { name: string; id: string }) =>
      item.name.toLowerCase().includes(scheme.toLowerCase())
  )?.id;

  const breakdownMutation = useMutation({
    mutationFn: (body: any) =>
      handleFetch({
        endpoint: "contributionschemes/auto-finance-breakdown",
        method: "POST",
        body,
      }),
    onSuccess: (res: any) => {
      if (res?.status === 200) {
        const breakdown = res?.data;
        setVehicleBreakdown({
          costOfVehicle: breakdown.costOfVehicle,
          extraEngine: breakdown.extraEngine,
          extraTyre: breakdown.extraTyre,
          insurance: breakdown.insurance,
          processingFee: breakdown.processingFee,
          totalAssetValue: breakdown.totalAssetValue,
          downPayment: breakdown.downPayment,
          loanManagementFee: breakdown.loanManagementFee,
          minimumWeeklyContribution: breakdown.minimumWeeklyContribution,
          preLoanServiceCharge: breakdown.preLoanServiceCharge,
          postLoanWeeklyContribution: breakdown.postLoanWeeklyContribution,
          eligibleLoan: breakdown.eligibleLoan,
        });
      }
    },
    onError: (err: { statusCode: string; message: string }) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

  const regualarBreakdownMutation = useMutation({
    mutationFn: (body: any) =>
      handleFetch({
        endpoint: "contributionschemes/regular-finance-breakdown",
        method: "POST",
        body,
      }),
    onSuccess: (res: any) => {
      const breakdown = res?.data;
      setRegularBreakdown({
        principalLoan: breakdown.principalLoan,
        principalLoanDescription: breakdown.principalLoanDescription,
        loanManagementFee: breakdown.loanManagementFee,
        loanManagementFeeDescription: breakdown.loanManagementFeeDescription,
        eligibleLoan: breakdown.eligibleLoan,
        eligibleLoanDescription: breakdown.eligibleLoanDescription,
        serviceCharge: breakdown.serviceCharge,
      });
    },
    onError: (err: { statusCode: string; message: string }) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

  const handleAutoSubmit = () => {
    if (assetCostValue) {
      breakdownMutation.mutate({
        costOfVehicle: assetCostValue,
      });
    }
  };

  const handleRegularSubmit = () => {
    if (contribution) {
      regualarBreakdownMutation.mutate({
        contributionSchemeId: selectedSchemeId,
        amount: contributionValue,
      });
    }
  };

  const { isLoading } = breakdownMutation;
  const { isLoading: regularIsLoading } = regualarBreakdownMutation;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-base  mb-6 font-semibold font-outfit">
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
            <p className="text-accent-500 font-medium mb-1 font-outfit">
              About Us{" "}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold font-outfit text-gray-900 leading-tight">
              Our Loans Will Make Your{" "}
              <span className="text-primary">Dreams Come True</span>
            </h2>
            <div className="space-y-4 text-gray-600 font-outfit">
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

          <section className="">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-2xl font-bold font-outfit text-gray-900 leading-tight">
                  Calculate Your <span className="text-primary">Loan</span>
                </h2>
              </div>
              <Card className="bg-red- border shadow-md">
                <CardContent className="p-8 space-y-6">
                  <Select
                    label="Contribution Scheme"
                    value={scheme}
                    onChange={setScheme}
                    options={[
                      {
                        label: "Weekly Contribution Scheme",
                        value: "Weekly Contribution Scheme",
                      },
                      {
                        label: "Monthly Contribution Scheme",
                        value: "Monthly Contribution Scheme",
                      },
                      { label: "Auto Financing Contribution", value: "Auto Financing Contribution" },
                    ]}
                  />

                  {isAssetFinance ? (
                    <>
                      <Input
                        type="money"
                        label="Cost of Vehicle (₦)"
                        value={assetCost}
                        onChange={(e) => setAssetCost(e.target.value)}
                        placeholder="Enter amount"
                      />
                      {vehicleBreakdown.costOfVehicle && (
                        <div className="bg-gray-100 p-4 rounded space-y-2 font-outfit ">
                          <div className="flex justify-between">
                            <span>Extra Engine:</span>
                            <span className="font-outfit font-semibold">
                              ₦{vehicleBreakdown.extraEngine}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Extra Tyre:</span>
                            <span className="font-outfit font-semibold">
                              ₦{vehicleBreakdown.extraTyre}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Insurance:</span>
                            <span className="font-outfit font-semibold">
                              ₦{vehicleBreakdown.insurance}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Processing Fee:</span>
                            <span className="font-outfit font-semibold">
                              ₦{vehicleBreakdown.processingFee}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>
                              User Contribution{" "}
                              <span className="text-sm">(Down Payment):</span>
                            </span>
                            <span className="font-outfit font-semibold">
                              ₦{vehicleBreakdown.downPayment}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Eligible Loan:</span>
                            <span className="font-outfit font-semibold">
                              ₦{vehicleBreakdown.eligibleLoan}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Loan Mgt. Fee (4 years):</span>
                            <span className="font-outfit font-semibold">
                              ₦{vehicleBreakdown.loanManagementFee}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pre-Loan Service Charge:</span>
                            <span className="font-outfit font-semibold">
                              ₦{vehicleBreakdown.preLoanServiceCharge}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Post-Loan Weekly Repayment:</span>
                            <span className="font-outfit font-semibold">
                              ₦{vehicleBreakdown.postLoanWeeklyContribution}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Repayment:</span>
                            <span className="font-outfit font-semibold">
                              ₦{formattedVehicleTotal}
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <Input
                        type="money"
                        label={`${
                          scheme.includes("Weekly")
                            ? "Weekly Sales Revenue"
                            : "Monthly Income"
                        } `}
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        placeholder="Enter amount"
                      />
                      <Input
                        type="money"
                        label={`${
                          scheme.includes("Weekly") ? "Weekly" : "Monthly"
                        } Contribution`}
                        value={contribution}
                        onChange={(e) => setContribution(e.target.value)}
                        placeholder="Enter amount"
                      />
                      {regularBreakdown.principalLoan && (
                        <div className="bg-gray-100 p-4 rounded-2xl space-y-2 font-outfit">
                          <div className="flex justify-between">
                            <span>Principal Loan:</span>
                            <span className="font-outfit font-semibold">
                              {regularBreakdown.principalLoan}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Loan Mgt. Fee (6%):</span>
                            <span className="font-outfit font-semibold">
                              {regularBreakdown.loanManagementFee}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Repayment Duration:</span>
                            <span className="font-outfit font-semibold">
                              {`${
                                scheme.includes("Weekly")
                                  ? "52 weeks/1 yr"
                                  : "12 months/1yr"
                              } `}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Eligible Loan:</span>
                            <span className="font-outfit font-semibold">
                              {regularBreakdown.eligibleLoan}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Service Charge:</span>
                            <span className="font-outfit font-semibold">
                              {regularBreakdown.serviceCharge}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Repayment:</span>
                            <span className="font-outfit font-semibold">
                              {regularBreakdown.principalLoan}
                            </span>
                          </div>
                        </div>
                      )}

                      {!isValidContribution && !!contribution && (
                        <p className="text-red-500 text-sm">
                          You cannot contribute more than {maxPercentage * 100}%
                          of your income.
                        </p>
                      )}
                    </>
                  )}

                  <Button
                    className="w-full mt-4"
                    onClick={
                      isAssetFinance ? handleAutoSubmit : handleRegularSubmit
                    }
                  >
                    Calculate
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
      {isLoading && <Loader />}
      {regularIsLoading && <Loader />}
    </section>
  );
}
