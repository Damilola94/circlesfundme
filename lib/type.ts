type InflowItem = {
  narration: string;
  amount: number;
};

export type InflowResponse = {
  isSuccess: boolean;
  data?: InflowItem[];
};
