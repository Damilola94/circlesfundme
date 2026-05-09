export interface ParamConfig {
  label: string;
  key: string;
  unit: string;
}

export interface Subscription {
  id: string;
  title: string;
  description: string;
  type: "regular" | "asset";
  isActive: boolean;

  values: {
    [key: string]: string;
  };

  paramsConfig: ParamConfig[];
}

export interface ApiSavingsScheme {
  id: string;
  name: string;
  description: string;
  schemeType: number;
  interestRatePerAnnumPercent: number;

  immatureWithdrawalPenaltyPercent: number;
  immatureWithdrawalPenaltyCap: number;
  paystackFeeCap: number;

  isActive: boolean;
}

export const transformSavingsApiToSubscriptions = (
  apiData: ApiSavingsScheme[]
): Subscription[] => {
  return apiData.map((scheme) => ({
    id: scheme.id,
    title: scheme.name,
    description: scheme.description,
    type: "regular",
    isActive: scheme.isActive,

    values: {
      interestRate: scheme.interestRatePerAnnumPercent.toString(),

      schemeType: scheme.schemeType.toString(),

      immatureWithdrawalPenaltyPercent:
        scheme.immatureWithdrawalPenaltyPercent.toString(),

      immatureWithdrawalPenaltyCap:
        scheme.immatureWithdrawalPenaltyCap.toString(),

      paystackFeeCap: scheme.paystackFeeCap.toString(),
    },

    paramsConfig: [
      {
        label: "Interest Rate (p.a)",
        key: "interestRate",
        unit: "%",
      },

      {
        label: "Withdrawal Penalty",
        key: "immatureWithdrawalPenaltyPercent",
        unit: "%",
      },

      {
        label: "Penalty Cap",
        key: "immatureWithdrawalPenaltyCap",
        unit: "₦",
      },

      {
        label: "Paystack Fee Cap",
        key: "paystackFeeCap",
        unit: "₦",
      },
    ],
  }));
};

export const transformSavingsToApiPayload = (
  subscription: Subscription
) => {
  return {
    name: subscription.title,

    description: subscription.description,

    schemeType: Number(
      subscription.values.schemeType
    ),

    interestRatePerAnnumPercent: Number(
      subscription.values.interestRate
    ),

    immatureWithdrawalPenaltyPercent: Number(
      subscription.values
        .immatureWithdrawalPenaltyPercent
    ),

    immatureWithdrawalPenaltyCap: Number(
      subscription.values
        .immatureWithdrawalPenaltyCap
    ),

    paystackFeeCap: Number(
      subscription.values.paystackFeeCap
    ),

    isActive: subscription.isActive,
  };
};