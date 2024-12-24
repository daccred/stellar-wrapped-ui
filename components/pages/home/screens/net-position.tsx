"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { usePublicKey } from "@/contexts/PublicKeyContext";

interface NetPositionProps {
  sent: number;
  received: number;
  netPosition: number;
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

export function NetPosition({ sent, received, netPosition }: NetPositionProps) {
  const { userData } = usePublicKey();
  return (
    <BaseScene
      backgroundImage="/backgrounds/dotted-bg.png"
      className=" text-black"
    >
      <div className="relative w-full max-w-md space-y-8 mt-16">
        <motion.h2
          className="text-4xl font-bold font-schabo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          NET SENT VS. RECEIVED
        </motion.h2>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[#505050]">Sent</span>
            <h3 className="text-[63px] font-bold font-schabo">
              {userData?.total_sent_amount?.toLocaleString()} USDC
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-[#505050]">Received</span>
            <h3 className="text-[63px] font-schabo font-bold">
              {userData?.total_received_amount?.toLocaleString()} USDC
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-[#505050]">Net Position</span>
            <h3 className="text-[63px] font-schabo font-bold">
              {formatNumber(userData?.net_pnl)?.toLocaleString()} USDC
            </h3>
          </motion.div>
        </div>

        <motion.p
          className="text-[#505050] text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          You&apos;ve sent out more than you&apos;ve received, primarily through
          swaps and NFT purchases.
        </motion.p>
      </div>
    </BaseScene>
  );
}
