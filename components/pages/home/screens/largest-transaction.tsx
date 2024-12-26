"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { Icons } from "@/assets/icons";
import { usePublicKey } from "@/contexts/PublicKeyContext";
import { formatDateMDY, formatDateN, formatNumber } from "@/lib/utils";


interface LargestTransactionProps {
  data: FormattedActivitySummary | null;
}

export function LargestTransaction({
  amount,
  usdcAmount,
  date,
  mostActiveDay,
}: LargestTransactionProps) {
  const { userData } = usePublicKey();
  const largestTransactionArray = JSON.parse(
    userData?.top_largest_xlm || "[]"
  )[0];

  const largestNonxlm = JSON.parse(userData?.top_largest_nonxlm || "[]")[0];

  return (
    <BaseScene
      backgroundImage="/backgrounds/dotted-yellow-bg.png"
      className="text-foreground"
      isCenter
    >
      <div className="w-full space-y-6 bg-black rounded-2xl p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="sm:text-xl font-medium">Total Transactions</h2>

          <motion.div
            className="text-6xl sm:text-[96px] font-bold font-schabo text-primary"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
          >

            {formatNumber(largestTransactionArray?.xlm_amount)} xlm

          </motion.div>

          <motion.div
            className="flex flex-col items-start gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >

            <span className="text-sm">
              {formatDateMDY(largestTransactionArray?.tx_time)}
            </span>
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <Icons.USD />
                <span className="font-semibold uppercase">
                  {formatNumber(largestNonxlm?.nonxlm_amount)}{" "}
                  {largestNonxlm?.nonxlm_asset_code}
                </span>
              </div>
              <span className="text-sm">
                {formatDateMDY(largestNonxlm?.tx_time)}

              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-[#1B1B1B] text-white space-y-4 p-4 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="sm:text-lg font-medium">
            Most Active Transaction Day
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="font-semibold">
                {formatDateN(data?.most_active_day)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Transactions</span>
              <span className="font-semibold">
                {formatNumber(data?.most_active_day_count)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Token Balance</span>
              <span className="text-muted-foreground">Token Balance</span>
              <span className="font-semibold">
                {formatNumber(data?.token_balance)?.toLocaleString()} XLM
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </BaseScene>
  );
}
