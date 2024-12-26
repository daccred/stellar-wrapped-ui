"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { usePublicKey } from "@/contexts/PublicKeyContext";
import { formatDateMY, formatNumber } from "@/lib/utils";

interface TransactionCategory {
  name: string;
  count: number;
}

interface TransactionCountProps {
  totalCount: number;
  dateRange: string;
  categories: TransactionCategory[];
}

export function TransactionCount({
  totalCount,
  dateRange,
  categories,
}: TransactionCountProps) {
  const { userData } = usePublicKey();

  // console.log(userData?.total_sent_amount);

  const updatedCategories = [
    {
      name: "Received XLM Amount",
      value: formatNumber(userData?.total_received_xlm),
    },
    { name: "Sent XLM Amount", value: formatNumber(userData?.total_sent_xlm) },
    {
      name: "Buying XLM Amount",
      value: formatNumber(userData?.total_buying_xlm),
    },
    {
      name: "Sold XLM Amount",
      value: formatNumber(userData?.total_selling_xlm),
    },
  ];
  return (
    <BaseScene
      backgroundImage="/backgrounds/dotted-yellow-bg.png"
      className="text-foreground"
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
            className="text-7xl sm:text-[96px] font-bold font-schabo text-primary"
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
            {formatDateMY(userData?.first_txn_time)} -{" "}
            {formatDateMY(userData?.last_txn_time)}
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
                <span className="text-muted-foreground">{category?.name}</span>
                <span className="font-semibold">{category?.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </BaseScene>
  );
}
