// types.ts

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
  values: { [key: string]: string };
  paramsConfig: ParamConfig[];
}

export interface ApiSavingsScheme {
  id: string;
  name: string;
  description: string;
  schemeType: number;
  interestRatePerAnnumPercent: number;
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

    values: {
      interestRate: scheme.interestRatePerAnnumPercent.toString(),
      schemeType: scheme.schemeType.toString(),
    },

    paramsConfig: [
      {
        label: "Interest Rate (p.a)",
        key: "interestRate",
        unit: "%",
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
    schemeType: Number(subscription.values.schemeType),
    interestRatePerAnnumPercent: Number(
      subscription.values.interestRate
    ),
  };
};