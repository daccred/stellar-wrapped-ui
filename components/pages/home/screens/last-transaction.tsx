"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { StoryHeader } from "@/components/core/header";
import { useEffect, useState } from "react";

interface TransactionHistoryProps {
  last_transaction_date: string;
}

export function LastTransaction({
  last_transaction_date,
}: TransactionHistoryProps) {
  const [uniqueText, setUniqueText] = useState("");

  useEffect(() => {
    const lastDate = new Date(last_transaction_date);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      setUniqueText("Active today! Keep that momentum going! 🚀");
    } else if (diffDays <= 7) {
      setUniqueText("Recent activity this week! Stay engaged! ✨");
    } else if (diffDays <= 30) {
      setUniqueText("Last month's activity! Time to jump back in! 💫");
    } else if (diffDays <= 90) {
      setUniqueText("Been a while! The blockchain misses you! 🌟");
    } else {
      setUniqueText("Time for a comeback! The future awaits! 🏆");
    }
  }, [last_transaction_date]);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return {
      month: d.toLocaleDateString("en-US", { month: "short" }),
      day: d.getDate(),
      year: d.getFullYear(),
    };
  };

  const lastDate = formatDate(last_transaction_date);

  return (
    <BaseScene backgroundImage="/backgrounds/home-bg.png">
      <div className="w-full max-w-xl space-y-8 text-muted">
        <StoryHeader title="LAST TRANSACTION" chipDisplay="chip" />
        <div className="w-full space-y-6 bg-black rounded-2xl p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <motion.div
              className="text-6xl sm:text-[96px] font-bold font-schabo text-primary tracking-wide tabular-nums"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              <motion.span>{lastDate.day}</motion.span>
              <motion.span
                className="text-4xl sm:text-6xl font-medium ml-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {lastDate.month}, {lastDate.year}
              </motion.span>
            </motion.div>

            <motion.div
              className="sm:text-lg text-foreground font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {uniqueText}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </BaseScene>
  );
}
