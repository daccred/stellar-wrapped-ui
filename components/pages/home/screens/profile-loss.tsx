"use client"

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'
import { TrendingDown, TrendingUp } from "lucide-react";
import { StoryHeader } from "@/components/core/header";
import { cn, convertLumensToUSDC } from "@/lib/utils";

interface ProfitLossProps {
  net_pnl: number;
}

export function ProfitLoss({ net_pnl }: ProfitLossProps) {
  const isProfitable = net_pnl >= 0;
  const absValue = Math.abs(net_pnl);

  return (
    <BaseScene
      backgroundImage="/backgrounds/dotted-yellow-bg.png"
      className="text-white"
      isCenter
    >
      <div className="w-full space-y-6 bg-black rounded-2xl p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="sm:text-xl font-medium">P&L (PROFIT & LOSS)</h2>

          <motion.div
            className={cn(
              "text-6xl sm:text-[96px] font-bold font-schabo text-primary tracking-wide tabular-nums",
              {
                "text-[#34C759]": isProfitable,
              },
              { "text-red-500": !isProfitable }
            )}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            <motion.span>
              {isProfitable ? (
                <TrendingUp className="w-6 h-6" />
              ) : (
                <TrendingDown className="w-6 h-6" />
              )}
              <span>{convertLumensToUSDC(absValue)}</span>
            </motion.span>
            <motion.span
              className="text-4xl sm:text-6xl font-medium ml-2 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              USDC
            </motion.span>
          </motion.div>

          <motion.div
            className="sm:text-lg text-foreground font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {isProfitable
              ? "Great job! Your portfolio is in the green."
              : "Keep going! Every loss is a lesson learned."}
          </motion.div>
        </motion.div>
      </div>
    </BaseScene>
  );
}

