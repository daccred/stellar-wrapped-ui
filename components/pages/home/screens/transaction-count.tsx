"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { usePublicKey } from "@/contexts/PublicKeyContext";

interface TransactionCategory {
  name: string;
  count: number;
}

interface TransactionCountProps {
  totalCount: number;
  dateRange: string;
  categories: TransactionCategory[];
}

function formatDate(
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

function formatNumber(
  num: number | undefined | null
): string | undefined | null {
  // Handle undefined or null
  if (num === undefined || num === null) {
    return num; // Return undefined or null as-is
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

export function TransactionCount({
  totalCount,
  dateRange,
  categories,
}: TransactionCountProps) {
  const { userData } = usePublicKey();

  const updatedCategories = [
    {
      name: "Received Amount",
      value: formatNumber(userData?.total_received_amount),
    },
    { name: "Sent Amount", value: formatNumber(userData?.total_sent_amount) },
    {
      name: "Buying Amount",
      value: formatNumber(userData?.total_buying_amount),
    },
    {
      name: "Sold Amount",
      value: formatNumber(userData?.total_selling_amount),
    },
  ];
  return (
    <BaseScene
      backgroundImage="/backgrounds/dotted-yellow-bg.png"
      className="text-[#CCCCCC]"
      isCenter
    >
      <div className="w-full space-y-6 bg-black rounded-2xl p-4">
        <motion.div
          className="space-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-base font-semibold">Total Transaction Count</h2>

          <motion.div
            className="text-7xl sm:text-[96px] font-bold font-schabo text-[#FDDA24]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
          >
            {formatNumber(userData?.total_transactions)}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm"
          >
            {formatDate(userData?.first_transaction_date)} -{" "}
            {formatDate(userData?.last_transaction_date)}
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-[#1B1B1B] border-white py-4 space-y-4 text-white border rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-base font-medium pb-4 border-b px-4 border-white">
            Total Transactions by Category
          </h3>
          <div className="space-y-3 px-4">
            {updatedCategories.map((category, index) => (
              <motion.div
                key={category.name}
                className="flex justify-between items-center text-xs"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <span className="text-[#505050]">{category.name}</span>
                <span className="font-semibold">{category.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </BaseScene>
  );
}
