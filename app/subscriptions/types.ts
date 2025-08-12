import { roundTo } from "@/lib/utils";

interface ParamConfig {
  label: string;
  key: string;
  unit: string;
}
export interface Subscription {
  id: string;
  title: string;
  description: string;
  type: "regular" | "asset";
  values: { [key: string]: string };
  paramsConfig: ParamConfig[];
}

interface ApiScheme {
  id: string;
  name: string;
  description: string;
  schemeType: number;
  minimumVehicleCost: number;
  contributionPercent: number;
  eligibleLoanMultiple: number;
  serviceCharge: number;
  loanManagementFeePercent: number;
  defaultPenaltyPercent: number;
  equityPercent: number;
  loanTerm: number;
  preLoanServiceChargePercent: number;
  postLoanServiceChargePercent: number;
  extraEnginePercent: number;
  extraTyrePercent: number;
  insurancePerAnnumPercent: number;
  processingFeePercent: number;
  eligibleLoanPercent: number;
  baseFee: number;
}

export const transformSubscriptionToApiPayload = (
  subscription: Subscription
): any => {
  const getSchemeTypeString = (type: string, title: string) => {
    if (type === "asset") return "AutoFinance";
    if (title.toLowerCase().includes("weekly")) return "Weekly";
    if (title.toLowerCase().includes("monthly")) return "Monthly";
    return "Weekly";
  };

  const values = subscription.values;

  return {
    contributionSchemeId: subscription.id,
    name: subscription.title.includes("Contribution")
      ? subscription.title
      : `${subscription.title} Contribution Scheme`,
    description: subscription.description,
    schemeType: getSchemeTypeString(subscription.type, subscription.title),
    minimumVehicleCost:
      subscription.type === "asset"
        ? Number.parseFloat(values.minimumVehicleCost || "0") 
        : 0,
    contributionPercent: Number.parseFloat(values.contributionPercent || "0"),
    eligibleLoanMultiple: Number.parseFloat(values.eligibleLoanMultiple || "0"),
    serviceCharge:
      subscription.type === "regular"
        ? Number.parseFloat(values.serviceCharge || "0") 
        : 0,
    loanManagementFeePercent: Number.parseFloat(
      values.loanManagementFee || values.loanManagementFeeYear || "0"
    ),
    defaultPenaltyPercent: Number.parseFloat(values.defaultPenalty || "0"),
    equityPercent: Number.parseFloat(values.requiredEquity || "0"),
    loanTerm: Number.parseFloat(values.loanTermWeeks || "0"),
    preLoanServiceChargePercent:
      Number.parseFloat(values.preLoanServiceCharge || "0"),
    postLoanServiceChargePercent:
      Number.parseFloat(values.postLoanServiceCharge || "0"),
    extraEnginePercent: Number.parseFloat(values.extraEngine || "0"),
    extraTyrePercent: Number.parseFloat(values.extraTyre || "0"),
    insurancePerAnnumPercent: Number.parseFloat(values.insurance || "0"),
    processingFeePercent: Number.parseFloat(values.processingFee || "0"),
    eligibleLoanPercent: Number.parseFloat(values.eligibleLoanPercent || "0"),
    baseFee:
      subscription.type === "asset"
        ? Number.parseFloat(values.baseFee || "0") 
        : 0,
  };
};

export const transformApiDataToSubscriptions = (
  apiData: ApiScheme[]
): Subscription[] => {
  return apiData.map((scheme) => {
    const isAssetFinance = scheme.schemeType === 3;

    if (isAssetFinance) {
      return {
        id: scheme.id,
        title: scheme.name,
        description: scheme.description,
        type: "asset",
        values: {
          minimumVehicleCost: (scheme.minimumVehicleCost / 1000000).toString(),
          requiredEquity: scheme.equityPercent.toString(),
          loanTermWeeks: scheme.loanTerm.toString(),
          loanManagementFeeYear: scheme.loanManagementFeePercent.toString(),
          baseFee: (scheme.baseFee / 1000).toString(),
          extraEngine: scheme.extraEnginePercent.toString(),
          extraTyre: scheme.extraTyrePercent.toString(),
          insurance: scheme.insurancePerAnnumPercent.toString(),
          processingFee: scheme.processingFeePercent.toString(),
          preLoanServiceCharge: scheme.preLoanServiceChargePercent.toFixed(3),
          postLoanServiceCharge: scheme.postLoanServiceChargePercent.toFixed(2),
          eligibleLoanPercent: scheme.eligibleLoanPercent.toString(),
          contributionPercent: "",
          eligibleLoanMultiple: "",
          serviceCharge: "",
          loanManagementFee: "",
          defaultPenalty: "",
        },
        paramsConfig: [
          { label: "Min Vehicle Cost", key: "minimumVehicleCost", unit: "M₦" },
          { label: "Required Equity", key: "requiredEquity", unit: "%" },
          { label: "Loan Term", key: "loanTermWeeks", unit: "wk" },
          {
            label: "Loan Mgmt Fee/Year",
            key: "loanManagementFeeYear",
            unit: "%",
          },
          { label: "Base Fee", key: "baseFee", unit: "K₦" },
          { label: "Extra Engine", key: "extraEngine", unit: "%" },
          { label: "Extra Tyre", key: "extraTyre", unit: "%" },
          { label: "Insurance/Annum", key: "insurance", unit: "%" },
          { label: "Processing Fee", key: "processingFee", unit: "%" },
          { label: "Pre-Loan Service", key: "preLoanServiceCharge", unit: "%" },
          {
            label: "Post-Loan Service",
            key: "postLoanServiceCharge",
            unit: "%",
          },
          { label: "Eligible Loan", key: "eligibleLoanPercent", unit: "%" },
        ],
      };
    } else {
      return {
        id: scheme.id,
        title: scheme.name.replace(" Contribution Scheme", ""),
        description: scheme.description,
        type: "regular",
        values: {
          contributionPercent: scheme.contributionPercent.toString(),
          eligibleLoanMultiple: scheme.eligibleLoanMultiple.toString(),
          serviceCharge: roundTo(scheme.serviceCharge, 4).toString(),
          loanManagementFee: scheme.loanManagementFeePercent.toString(),
          defaultPenalty: scheme.defaultPenaltyPercent.toString(),
          minimumVehicleCost: "",
          requiredEquity: "",
          loanTermWeeks: "",
          loanManagementFeeYear: "",
          baseFee: "",
          extraEngine: "",
          extraTyre: "",
          insurance: "",
          processingFee: "",
          preLoanServiceCharge: "",
          postLoanServiceCharge: "",
          eligibleLoanPercent: "",
        },
        paramsConfig: [
          { label: "Contribution", key: "contributionPercent", unit: "%" },
          { label: "Eligible Loan", key: "eligibleLoanMultiple", unit: "x" },
          { label: "Service Charge", key: "serviceCharge", unit: "%" },
          { label: "Loan Mgmt Fee", key: "loanManagementFee", unit: "%" },
          { label: "Default Penalty", key: "defaultPenalty", unit: "%" },
        ],
      };
    }
  });
};
