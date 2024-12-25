"use client"

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'
import { StoryHeader } from '@/components/core/header'
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

interface FirstTransactionProps {
  first_transaction_date: string;
}

export function FirstTransaction({
  first_transaction_date,
}: FirstTransactionProps) {
  const [uniqueText, setUniqueText] = useState("");

  useEffect(() => {
    const firstDate = new Date(first_transaction_date);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - firstDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) {
      setUniqueText("Your blockchain journey begins! Ready for takeoff! 🚀");
    } else if (diffDays <= 30) {
      setUniqueText(
        "The start of something big! Your crypto adventure is underway! 🌟"
      );
    } else if (diffDays <= 180) {
      setUniqueText("Remember this day? It's when your crypto story began! 💫");
    } else if (diffDays <= 365) {
      setUniqueText(
        "From this moment, you became part of the blockchain revolution! 🚀"
      );
    } else {
      setUniqueText(
        "One year ago, your crypto journey began! What a first year it's been! 🎉"
      );
    }
  }, [first_transaction_date]);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return {
      month: d.toLocaleDateString("en-US", { month: "short" }),
      day: d.getDate(),
      year: d.getFullYear(),
    };
  };

  const firstDate = formatDate(first_transaction_date);

  return (
    <BaseScene backgroundImage="/backgrounds/home-bg.png">
      <div className="w-full max-w-xl space-y-8 text-muted">
        <StoryHeader title="FIRST TRANSACTION" chipDisplay="chip" />
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
              <motion.span>{firstDate.day}</motion.span>
              <motion.span
                className="text-4xl sm:text-6xl font-medium ml-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {firstDate.month}, {firstDate.year}
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

