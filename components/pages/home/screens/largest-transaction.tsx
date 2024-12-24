"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { Icons } from "@/assets/icons";
import { usePublicKey } from "@/contexts/PublicKeyContext";

interface LargestTransactionProps {
  amount: number;
  usdcAmount: number;
  date: string;
  mostActiveDay: {
    date: string;
    totalTransactions: number;
    totalVolume: number;
  };
}
function formatDate(
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

export function LargestTransaction({
  amount,
  usdcAmount,
  date,
  mostActiveDay,
}: LargestTransactionProps) {
  const { userData } = usePublicKey();
  return (
    <BaseScene
      backgroundImage="/backgrounds/dotted-yellow-bg.png"
      className="text-[#CCCCCC]"
      isCenter
    >
      <div className="w-full space-y-6 bg-black rounded-2xl p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-medium">Your Largest Transaction</h2>

          <motion.div
            className="text-[96px] font-bold font-schabo text-[#FDDA24]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
          >
            ${amount.toLocaleString()}
          </motion.div>

          <motion.div
            className="flex flex-col items-start gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-1">
              <Icons.USD />
              <span className="font-semibold uppercase">{usdcAmount} USDC</span>
            </div>
            <span className="text-sm">{date}</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-[#1B1B1B] text-white space-y-4 p-4 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-medium">Most Active Transaction Day</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#505050]">Date</span>
              <span className="font-semibold">
                {formatDate(userData?.most_active_day)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#505050]">Total Transactions</span>
              <span className="font-semibold">
                {userData?.most_active_day_count}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#505050]">Total Volume</span>
              <span className="font-semibold">
                {mostActiveDay.totalVolume.toLocaleString()} USDC
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </BaseScene>
  );
}
