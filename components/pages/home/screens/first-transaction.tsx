"use client"

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'
import { StoryHeader } from '@/components/core/header'
import { useEffect, useState } from "react";
import { usePublicKey } from "@/contexts/PublicKeyContext";

export function FirstTransaction() {
  const { userData } = usePublicKey();
  const first_txn_time = userData?.first_txn_time || "";
  const [uniqueText, setUniqueText] = useState("");

  useEffect(() => {
    const firstDate = new Date(first_txn_time);
    const dayOfYear =
      Math.floor(
        (firstDate.getTime() - new Date("2024-01-01").getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    // Early bird (January)
    if (dayOfYear <= 31) {
      setUniqueText(
        "Early bird! You started your 2024 crypto journey on day one! 🎯"
      );
    }
    // Q1 (February-March)
    else if (dayOfYear <= 90) {
      setUniqueText(
        "Q1 Pioneer! Your 2024 journey began in the first quarter. 🌱"
      );
    }
    // Q2 (April-June)
    else if (dayOfYear <= 180) {
      setUniqueText(
        "Mid-year momentum! Your crypto adventure took off in Q2 2024. ☀️"
      );
    }
    // Q3 (July-September)
    else if (dayOfYear <= 270) {
      setUniqueText(
        "Q3 Explorer! You joined the blockchain revolution this autumn. 🍂"
      );
    }
    // Q4 (October-December)
    else {
      setUniqueText(
        "Year-end warrior! You made your mark in the final quarter of 2024. 🎄"
      );
    }
  }, [first_txn_time]);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return {
      month: d.toLocaleDateString("en-US", { month: "short" }),
      day: d.getDate(),
      year: d.getFullYear(),
    };
  };

  const firstDate = formatDate(first_txn_time);

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

