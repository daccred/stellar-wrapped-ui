import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertLumensToUSDC(lumens: number) {
  const conversionRate = 0.404691;
  const usdc = lumens * conversionRate;
  return usdc.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function truncateId(
  str: string | undefined | null
): string | undefined | null {
  if (!str || str.length <= 12) {
    return str; // If the string is null, undefined, or shorter than or equal to 12 characters, no truncation needed
  }

  const firstPart = str.slice(0, 5); // First 6 characters
  const lastPart = str.slice(-5); // Last 6 characters

  return `${firstPart}****${lastPart}`;
}

export function formatDateN(
  dateStr: string | undefined | null
): string | undefined | null {
  if (!dateStr) {
    return dateStr; // If dateStr is undefined or null, return it as is
  }

  const date = new Date(dateStr);

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    return null; // If the date is invalid, return null (or you can return undefined if you prefer)
  }

  const month = date.getMonth() + 1; // Get month (1-based)
  const day = date.getDate(); // Get day
  const year = date.getFullYear(); // Get year

  return `${month}/${day}/${year}`;
}

export function formatDateMY(
  dateStr: string | undefined | null
): string | undefined | null {
  if (!dateStr) {
    return dateStr; // If dateStr is undefined or null, return it as is
  }

  const date = new Date(dateStr);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return null; // If the date is invalid, return null
  }

  // Use Intl.DateTimeFormat to format the date as "Month YYYY"
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date); // Example: "December 2024"
}

export function formatNumber(
  num: number | undefined | null
): string | undefined | null {
  // Handle undefined or null
  if (num === undefined || num === null) {
    return "0"; // Return undefined or null as-is
  }

  // Handle negative numbers
  const isNegative = num < 0;
  if (isNegative) {
    num = -num; // Make the number positive for formatting
  }

  // Define thresholds for k, m, etc.
  const thresholds = [
    { value: 1_000_000_000, suffix: "b" }, // Billion
    { value: 1_000_000, suffix: "m" }, // Million
    { value: 1_000, suffix: "k" }, // Thousand
  ];

  // Iterate through the thresholds
  for (let i = 0; i < thresholds.length; i++) {
    const { value, suffix } = thresholds[i];
    if (num >= value) {
      const formattedNumber = (num / value).toFixed(1).replace(/\.0$/, "");
      return isNegative
        ? `-${formattedNumber}${suffix}`
        : `${formattedNumber}${suffix}`;
    }
  }

  // If the number is less than 1000, return it as-is
  return isNegative ? `-${num}` : num.toString();
}
