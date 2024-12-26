"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { StoryHeader } from "@/components/core/header";
import { Activity, Calendar } from "lucide-react";
import { usePublicKey } from "@/contexts/PublicKeyContext";

export function MostActiveMonth() {
  const { userData } = usePublicKey();
  const most_active_month = userData?.most_active_month || "";
  const monthly_transaction_count = userData?.most_active_month_count || 0;

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const formattedDate = formatDate(most_active_month);

  const getUniqueText = (count: number) => {
    if (count > 200000) return "Incredible! You're a crypto powerhouse! 🚀";
    if (count > 150000)
      return "Wow! Your transactions are through the roof! 📈";
    if (count > 100000) return "Amazing activity! You're on fire! 🔥";
    if (count > 50000)
      return "Fantastic! You're making waves in the crypto world! 🌊";
    return "Great job! You're building momentum! 💪";
  };

  const uniqueText = getUniqueText(monthly_transaction_count);

  return (
    <BaseScene className="bg-white text-muted items-start">
      <StoryHeader
        title="MOST ACTIVE MONTH"
        chip={uniqueText}
        chipDisplay="chip"
      />
      <div className="w-full space-y-4">
        <motion.div
          className="space-y-2 border-black/10 border-b pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-sm text-muted-foreground">Peak Performance</div>

          {/* <div className="text-xl font-semibold">{formattedDate}</div> */}
          <motion.div
            className="flex items-center space-x-2 sm:text-lg font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Calendar className="w-5 h-5 text-primary" />
            <span>{formattedDate}</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-2 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-sm text-muted-foreground">
            Monthly Transactions
          </div>

          <motion.div
            className="flex items-center space-x-2 sm:text-lg font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Activity className="w-5 h-5 text-primary" />
            <span>
              {monthly_transaction_count.toLocaleString()} Transactions
            </span>
          </motion.div>
        </motion.div>
      </div>
    </BaseScene>
  );
}
