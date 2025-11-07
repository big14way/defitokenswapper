import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Add swap utilities here, e.g., for Uniswap quote
export async function getSwapQuote(fromToken: string, toToken: string, amount: string) {
  // Use Uniswap SDK or public API for quote
  // Placeholder
  return (parseFloat(amount) * 1.0).toString(); // Mock quote
}
