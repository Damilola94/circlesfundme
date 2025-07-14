import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumber = (amount: number | undefined) => {
  if (typeof amount !== "number") return "Invalid";

  return new Intl.NumberFormat("en-US").format(amount);
};