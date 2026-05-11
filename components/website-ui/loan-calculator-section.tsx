"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import handleFetch from "@/services/api/handleFetch";
import { useMutation, useQuery } from "react-query";
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

const SAVINGS_FREQUENCY_OPTIONS = [
  { label: "Daily", value: "Daily" },
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
  { label: "Lump sum (one-time saving)", value: "Lump sum (one-time saving)" },
];

const SAVINGS_DURATION_OPTIONS = [
  { label: "30 days", months: 1 },
  { label: "90 days", months: 3 },
  { label: "180 days", months: 6 },
  { label: "270 days", months: 9 },
  { label: "365 days", months: 12 },
];

type SavingsSchemeItem = {
  id: string;
  name: string;
  description: string;
  interestRatePerAnnumPercent: number;
};

type ProjectionData = {
  savingAmount: number;
  totalSavings: number;
  interestRatePerAnnumPercent: number;
  interestValue: number;
  totalFutureValue: number;
  commencementDate: string;
  maturityDate: string;
  durationInMonths: number;
  frequency: string;
};

const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

type CalculatorTab = "loan" | "savings";

export default function LoanCalculatorSection() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>("loan");

  const [scheme, setScheme] = useState("");
  const [income, setIncome] = useState("");
  const [contribution, setContribution] = useState("");
  const [assetCost, setAssetCost] = useState("");
  const [vehicleBreakdown, setVehicleBreakdown] = useState<any>({});
  const [regularBreakdown, setRegularBreakdown] = useState<any>({});

  const [savingsSchemeId, setSavingsSchemeId] = useState("");
  const [savingsFrequency, setSavingsFrequency] = useState("");
  const [savingsAmount, setSavingsAmount] = useState("");
  const [savingsDuration, setSavingsDuration] = useState("");
  const [projection, setProjection] = useState<ProjectionData | null>(null);

  const isAssetFinance = scheme === "Auto Financing Contribution";
  const isTricycleFinance = scheme === "Tricycle Financing Contribution";
  const incomeValue = parseFloat(income.replace(/,/g, ""));
  const contributionValue = parseFloat(contribution.replace(/,/g, ""));
  const assetCostValue = parseFloat(assetCost.replace(/,/g, ""));
  const maxPercentage = scheme === "Weekly Contribution Scheme" ? 0.2 : 0.3;
  const isValidContribution = contributionValue <= maxPercentage * incomeValue;

  const { data: loanSchemesData } = useGetQuery({
    endpoint: "contributionschemes",
    extra: "mini",
    queryKey: ["contributionschemes-mini"],
  });

  const selectedLoanSchemeId = loanSchemesData?.data?.find(
    (item: { name: string; id: string }) =>
      item.name.toLowerCase().includes(scheme.toLowerCase())
  )?.id;

  const { data: savingsSchemesData, isLoading: schemesLoading } = useQuery(
    ["savings-schemes-mini"],
    () => handleFetch({ endpoint: "savings/schemes/mini" }),
    { staleTime: 15 * 60 * 1000 }
  );

  const savingsSchemes: SavingsSchemeItem[] = savingsSchemesData?.data ?? [];

  useEffect(() => {
    if (savingsSchemes.length === 1 && !savingsSchemeId) {
      setSavingsSchemeId(savingsSchemes[0].id);
    }
  }, [savingsSchemes]);

  const savingsAmountNum = parseFloat(savingsAmount.replace(/,/g, "")) || 0;

  const selectedDurationMonths =
    SAVINGS_DURATION_OPTIONS.find((d) => d.label === savingsDuration)?.months ??
    0;

  const breakdownMutation = useMutation({
    mutationFn: (body: any) =>
      handleFetch({
        endpoint: isAssetFinance
          ? "contributionschemes/auto-finance-breakdown"
          : "contributionschemes/tricycle-finance-breakdown",
        method: "POST",
        body,
      }),

    onSuccess: (res: any) => {
      if (res?.status === 200) {
        const b = res?.data;

        setVehicleBreakdown({
          costOfVehicle: b.costOfVehicle,
          extraEngine: b.extraEngine,
          extraTyre: b.extraTyre,
          insurance: b.insurance,
          processingFee: b.processingFee,
          totalAssetValue: b.totalAssetValue,
          downPayment: b.downPayment,
          loanProtectionFund: b.loanProtectionFund || 0,
          loanManagementFee: b.loanManagementFee,
          minimumWeeklyContribution: b.minimumWeeklyContribution,
          preLoanServiceCharge: b.preLoanServiceCharge,
          postLoanWeeklyContribution: b.postLoanWeeklyContribution,
          eligibleLoan: b.eligibleLoan,
          totalRepayment: b.totalRepayment,
        });
      }
    },

    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

  const regularBreakdownMutation = useMutation({
    mutationFn: (body: any) =>
      handleFetch({
        endpoint: "contributionschemes/regular-finance-breakdown",
        method: "POST",
        body,
      }),

    onSuccess: (res: any) => {
      const b = res?.data;

      setRegularBreakdown({
        principalLoan: b.principalLoan,
        loanManagementFee: b.loanManagementFee,
        eligibleLoan: b.eligibleLoan,
        eligibleLoanAfterInsurance: b.eligibleLoanAfterInsurance,
        preLoanServiceCharge: b.preLoanServiceCharge,
        insurance: b.insurance,
        loanProtectionFund: b.loanProtectionFund,
        processingFee: b.processingFee,
        postLoanServiceCharge: b.postLoanServiceCharge,
        totalRepayment: b.totalRepayment,
        repaymentTerm: b.repaymentTerm,
      });
    },

    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

  const projectionMutation = useMutation(
    (body: {
      savingsSchemeId: string;
      frequency: string;
      contributionAmount: number;
      durationInMonths: number;
    }) =>
      handleFetch({
        endpoint: "savings/schemes/projection",
        method: "POST",
        body,
      }),
    {
      onSuccess: (res: any) => {
        if (res?.statusCode !== "200" && res?.status !== 200) {
          toast.error(res?.message || "Projection failed");
          setProjection(null);
          return;
        }
        setProjection(res?.data ?? null);
      },
      onError: (err: any) => {
        toast.error(err?.message || "Something went wrong.");
        setProjection(null);
      },
    }
  );

  const handleAutoSubmit = () => {
    if (assetCostValue) {
      breakdownMutation.mutate({ costOfVehicle: assetCostValue });
    }
  };

  const handleRegularSubmit = () => {
    if (contribution) {
      regularBreakdownMutation.mutate({
        contributionSchemeId: selectedLoanSchemeId,
        amount: contributionValue,
      });
    }
  };

  const handleSavingsCalculate = () => {
    if (
      !savingsSchemeId ||
      !savingsFrequency ||
      savingsAmountNum <= 0 ||
      selectedDurationMonths <= 0
    ) {
      toast.error("Please fill in all savings fields.");
      return;
    }
    projectionMutation.mutate({
      savingsSchemeId,
      frequency: savingsFrequency,
      contributionAmount: savingsAmountNum,
      durationInMonths: selectedDurationMonths,
    });
  };

  const isLoading =
    breakdownMutation.isLoading || regularBreakdownMutation.isLoading;

  return (
    <section className="py-16">
      {isLoading && <Loader />}
      {projectionMutation.isLoading && <Loader />}
      {schemesLoading && <Loader />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-base mb-6 font-semibold font-outfit">
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

        <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 animate-slide-in-left">
            <p className="text-accent-500 font-medium mb-1 font-outfit">
              About Us
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

          <section>
            <div className="max-w-4xl mx-auto px-4">
              <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab("loan")}
                  className={`flex-1 py-3 text-sm font-outfit font-semibold transition-colors ${
                    activeTab === "loan"
                      ? "bg-primary text-white"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                Loan Calculator
                </button>
                <button
                  onClick={() => setActiveTab("savings")}
                  className={`flex-1 py-3 text-sm font-outfit font-semibold transition-colors ${
                    activeTab === "savings"
                      ? "bg-primary text-white"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  Savings Calculator
                </button>
              </div>

              <Card className="bg-gray border shadow-md">
                <CardContent className="p-8 space-y-6">
                  {activeTab === "loan" && (
                    <>
                      <div className="text-center mb-2">
                        <h2 className="text-2xl font-bold font-outfit text-gray-900">
                          Calculate Your{" "}
                          <span className="text-primary">Loan</span>
                        </h2>
                      </div>

                      <Select
                        label="Contribution Scheme"
                        value={scheme}
                        onChange={setScheme}
                        options={[
                          {
                            label: "Daily Contribution Scheme",
                            value: "Daily Contribution Scheme",
                          },
                          {
                            label: "Weekly Contribution Scheme",
                            value: "Weekly Contribution Scheme",
                          },
                          {
                            label: "Monthly Contribution Scheme",
                            value: "Monthly Contribution Scheme",
                          },
                          {
                            label: "Auto Financing Contribution",
                            value: "Auto Financing Contribution",
                          },
                          {
                            label: "Tricycle Financing Contribution",
                            value: "Tricycle Financing Contribution",
                          },
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
                            <BreakdownTable
                              rows={[
                                // {
                                //   label: "Extra Engine",
                                //   value: `₦${vehicleBreakdown.extraEngine}`,
                                // },
                                // {
                                //   label: "Extra Tyre",
                                //   value: `₦${vehicleBreakdown.extraTyre}`,
                                // },
                                {
                                  label: "Insurance",
                                  value: `₦${vehicleBreakdown.insurance}`,
                                },
                                {
                                  label: "Processing Fee",
                                  value: `₦${vehicleBreakdown.processingFee}`,
                                },
                                {
                                  label: "Loan Protection Fund",
                                  value: `₦${vehicleBreakdown.loanProtectionFund}`,
                                },
                                {
                                  label: "Loan Mgt. Fee (4 years)",
                                  value: `₦${vehicleBreakdown.loanManagementFee}`,
                                },
                                {
                                  label: "User Contribution (Down Payment)",
                                  value: `₦${vehicleBreakdown.downPayment}`,
                                },
                                {
                                  label: "Eligible Loan (90%)",
                                  value: `₦${vehicleBreakdown.eligibleLoan}`,
                                },
                                {
                                  label: "Pre-Loan Service Charge",
                                  value: `₦${vehicleBreakdown.preLoanServiceCharge}`,
                                },
                                {
                                  label: "Post-Loan Weekly Repayment",
                                  value: `₦${vehicleBreakdown.postLoanWeeklyContribution}`,
                                },
                                {
                                  label: "Total Repayment",
                                  value: `₦${vehicleBreakdown.totalRepayment}`,
                                  highlight: true,
                                },
                              ]}
                            />
                          )}
                        </>
                      ) : isTricycleFinance ? (
                        <>
                          <Input
                            type="money"
                            label="Cost of Tricycle (₦)"
                            value={assetCost}
                            onChange={(e) => setAssetCost(e.target.value)}
                            placeholder="Enter amount"
                          />
                          {vehicleBreakdown.costOfVehicle && (
                            <BreakdownTable
                              rows={[
                                {
                                  label: "Insurance",
                                  value: `₦${vehicleBreakdown.insurance}`,
                                },
                                {
                                  label: "Loan Mgt. Fee (2 years)",
                                  value: `₦${vehicleBreakdown.loanManagementFee}`,
                                },
                                {
                                  label: "Loan Protection Fund",
                                  value: `₦${vehicleBreakdown.loanProtectionFund}`,
                                },
                                {
                                  label: "Processing Fee",
                                  value: `₦${vehicleBreakdown.processingFee}`,
                                },
                                {
                                  label: "User Contribution (Down Payment)",
                                  value: `₦${vehicleBreakdown.downPayment}`,
                                },
                                {
                                  label: "Eligible Loan",
                                  value: `₦${vehicleBreakdown.eligibleLoan}`,
                                },
                                {
                                  label: "Pre-Loan Service Charge",
                                  value: `₦${vehicleBreakdown.preLoanServiceCharge}`,
                                },
                                {
                                  label: "Post-Loan Weekly Repayment",
                                  value: `₦${vehicleBreakdown.postLoanWeeklyContribution}`,
                                },
                                {
                                  label: "Total Repayment",
                                  value: `₦${vehicleBreakdown.totalRepayment}`,
                                  highlight: true,
                                },
                              ]}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          <Input
                            type="money"
                            label={
                              scheme.includes("Daily")
                                ? "Daily Sales Revenue"
                                : scheme.includes("Weekly")
                                ? "Weekly Sales Revenue"
                                : "Monthly Income"
                            }
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                            placeholder="Enter amount"
                          />
                          <Input
                            type="money"
                            label={
                              scheme.includes("Daily")
                                ? "Daily Contribution"
                                : scheme.includes("Weekly")
                                ? "Weekly Contribution"
                                : "Monthly Contribution"
                            }
                            value={contribution}
                            onChange={(e) => setContribution(e.target.value)}
                            placeholder="Enter amount"
                          />
                          {!isValidContribution && !!contribution && (
                            <p className="text-red-500 text-sm font-outfit">
                              You cannot contribute more than{" "}
                              {maxPercentage * 100}% of your income.
                            </p>
                          )}
                          {regularBreakdown.principalLoan && (
                            <BreakdownTable
                              rows={[
                                {
                                  label: "Principal Loan",
                                  value: regularBreakdown.principalLoan,
                                },
                                {
                                  label: "Loan Mgt. Fee (6%)",
                                  value: regularBreakdown.loanManagementFee,
                                },
                                {
                                  label: "Insurance Fee",
                                  value: regularBreakdown.insurance,
                                },
                                {
                                  label: "Processing Fee",
                                  value: regularBreakdown.processingFee,
                                },
                                {
                                  label: "Loan Protection Fund",
                                  value: regularBreakdown.loanProtectionFund,
                                },
                                {
                                  label: "Eligible Loan",
                                  value:
                                    regularBreakdown.eligibleLoanAfterInsurance,
                                },
                                {
                                  label: "Repayment Duration",
                                  value: scheme.includes("Daily")
                                    ? "365 days"
                                    : scheme.includes("Weekly")
                                    ? "52 weeks"
                                    : "12 months",
                                },
                                {
                                  label: "Pre-Loan Service Charge",
                                  value: regularBreakdown.preLoanServiceCharge,
                                },
                                {
                                  label: "Post-Loan Service Charge",
                                  value: regularBreakdown.postLoanServiceCharge,
                                },
                                {
                                  label: "Total Repayment",
                                  value:
                                    regularBreakdown.totalRepayment || "₦0.00",
                                  highlight: true,
                                },
                                {
                                  label: "Repayment Term",
                                  value:
                                    regularBreakdown.repaymentTerm || "₦0.00",
                                },
                              ]}
                            />
                          )}
                        </>
                      )}

                      <Button
                        className="w-full mt-4"
                        onClick={
                          isTricycleFinance || isAssetFinance
                            ? handleAutoSubmit
                            : handleRegularSubmit
                        }
                      >
                        Calculate
                      </Button>
                    </>
                  )}

                  {activeTab === "savings" && (
                    <>
                      <div className="text-center mb-2">
                        <h2 className="text-2xl font-bold font-outfit text-gray-900">
                          Calculate Your{" "}
                          <span className="text-primary">Savings</span>
                        </h2>
                        <p className="text-sm text-gray-500 font-outfit mt-1">
                          See how much your savings will grow over time.
                        </p>
                      </div>

                      {savingsSchemes.length > 1 && (
                        <div className="space-y-2">
                          <p className="text-sm font-outfit font-medium text-gray-700">
                            Select Savings Category
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {savingsSchemes.map((s) => (
                              <button
                                key={s.id}
                                onClick={() => setSavingsSchemeId(s.id)}
                                className={`text-left p-4 rounded-xl border-2 transition-all font-outfit ${
                                  savingsSchemeId === s.id
                                    ? "border-primary bg-primary/5"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <p className="text-sm font-semibold text-gray-900">
                                    {s.name}
                                  </p>
                                  <div
                                    className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                                      savingsSchemeId === s.id
                                        ? "border-primary"
                                        : "border-gray-300"
                                    }`}
                                  >
                                    {savingsSchemeId === s.id && (
                                      <div className="w-2 h-2 rounded-full bg-primary" />
                                    )}
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {s.description}
                                </p>
                                <p className="text-xs font-semibold text-primary mt-2">
                                  {s.interestRatePerAnnumPercent}% p.a.
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Single scheme — show as badge */}
                      {savingsSchemes.length === 1 && savingsSchemes[0] && (
                        <div className="border-2 border-primary bg-primary/5 rounded-xl p-4 font-outfit">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold text-gray-900">
                              {savingsSchemes[0].name}
                            </p>
                            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                              {savingsSchemes[0].interestRatePerAnnumPercent}%
                              p.a.
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {savingsSchemes[0].description}
                          </p>
                        </div>
                      )}

                      <Select
                        label="Savings Frequency"
                        value={savingsFrequency}
                        onChange={setSavingsFrequency}
                        options={SAVINGS_FREQUENCY_OPTIONS}
                      />

                      <Input
                        type="money"
                        label={`${
                          savingsFrequency === "Lump sum (one-time saving)"
                            ? "Lump Sum Amount"
                            : savingsFrequency
                            ? `${savingsFrequency} Savings Amount`
                            : "Savings Amount"
                        } (₦)`}
                        value={savingsAmount}
                        onChange={(e) => setSavingsAmount(e.target.value)}
                        placeholder="Enter amount"
                      />

                      <Select
                        label="Saving Duration"
                        value={savingsDuration}
                        onChange={setSavingsDuration}
                        options={SAVINGS_DURATION_OPTIONS.map((d) => ({
                          label: d.label,
                          value: d.label,
                        }))}
                      />

                      {projection && (
                        <div className="bg-gray-50 rounded-2xl p-5 space-y-3 font-outfit text-sm border border-gray-100">
                          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                            <span className="text-gray-500">Saving Amount</span>
                            <span className="font-semibold text-gray-900">
                              {formatNaira(projection.savingAmount)}/
                              {savingsFrequency?.toLowerCase() || "period"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Total Savings</span>
                            <span className="font-semibold text-gray-900">
                              {formatNaira(projection.totalSavings)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Interest Rate</span>
                            <span className="font-semibold text-gray-900">
                              {projection.interestRatePerAnnumPercent}% per
                              annum
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">
                              Interest Earned
                            </span>
                            <span className="font-semibold text-green-600">
                              +{formatNaira(projection.interestValue)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                            <span className="text-gray-700 font-semibold">
                              Total Future Value
                            </span>
                            <span className="font-bold text-primary text-base">
                              {formatNaira(projection.totalFutureValue)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1">
                            <span className="text-xs text-gray-400">
                              Start Date
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(projection.commencementDate)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">
                              Maturity Date
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(projection.maturityDate)}
                            </span>
                          </div>
                        </div>
                      )}

                      <Button
                        className="w-full mt-4"
                        onClick={handleSavingsCalculate}
                        disabled={projectionMutation.isLoading}
                      >
                        {projectionMutation.isLoading
                          ? "Calculating..."
                          : "Calculate Savings"}
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

function BreakdownTable({
  rows,
}: {
  rows: { label: string; value: string; highlight?: boolean }[];
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-2xl space-y-2 font-outfit text-sm">
      {rows.map((row, i) => (
        <div
          key={i}
          className={`flex justify-between ${
            row.highlight
              ? "border-t border-gray-200 pt-2 mt-1 font-semibold text-primary"
              : ""
          }`}
        >
          <span className={row.highlight ? "text-gray-800" : "text-gray-600"}>
            {row.label}
          </span>
          <span className="font-semibold">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
