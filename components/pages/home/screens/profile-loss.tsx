"use client"

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { cn, convertLumensToUSDC } from "@/lib/utils";
import { usePublicKey } from "@/contexts/PublicKeyContext";

export function ProfitLoss() {
  const { userData } = usePublicKey();

  const balanceDiff = userData?.balance_diff || 0;
  const totalBalance = userData?.starting_balance || 0;
  const absValue = Math.abs(balanceDiff);
  const isSpent = balanceDiff < 0;
  const isZero = balanceDiff === 0;

  const getUniqueText = () => {
    if (isZero) {
      return "Your balance is holding steady. Ready for your next move?";
    }
    if (isSpent) {
      const percentSpent = (absValue / totalBalance) * 100;
      if (percentSpent > 50) {
        return "Whoa, big spender! Time to plan your next income boost?";
      } else if (percentSpent > 25) {
        return "You've been busy! How about focusing on some earnings next?";
      } else {
        return "A little spending here and there. Keep an eye on that balance!";
      }
    } else {
      const percentGained = (absValue / totalBalance) * 100;
      if (percentGained > 50) {
        return "Incredible gains! You're on fire! 🔥";
      } else if (percentGained > 25) {
        return "Solid growth! Keep up the great work!";
      } else {
        return "Nice increase! Every bit counts towards your goals.";
      }
    }
  };
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
              "text-5xl sm:text-[96px] font-bold font-schabo text-primary tracking-wide tabular-nums",
              {
                "text-[#34C759]": !isSpent && !isZero,
                "text-primary": isZero,
                "text-red-500": isSpent,
              }
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
              {!isSpent && !isZero ? (
                <TrendingUp className="w-10 h-10 mr-2" />
              ) : isZero ? (
                <Minus className="w-10 h-10 mr-2" />
              ) : (
                <TrendingDown className="w-10 h-10 mr-2" />
              )}
              <span>{absValue}</span>
            </motion.span>
            <motion.span
              className="text-3xl sm:text-6xl font-medium ml-2 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              XLM
            </motion.span>
          </motion.div>

          <motion.div
            className="text-sm sm:text-base text-foreground font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {getUniqueText()}
          </motion.div>
        </motion.div>
      </div>
    </BaseScene>
  );
}

