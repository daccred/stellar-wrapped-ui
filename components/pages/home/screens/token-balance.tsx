"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { StoryHeader } from "@/components/core/header";
import { Activity, Coins } from "lucide-react";
import Image from "next/image";

interface TokenStatsProps {
  token_balance: number;
  total_interaction_count: number;
}

export function TokenStats({
  token_balance,
  total_interaction_count,
}: TokenStatsProps) {
  const formatBalance = (balance: number) => {
    return balance.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <BaseScene backgroundImage="/backgrounds/black-grunge-bg.png">
      <div className="w-full max-w-xl space-y-8 text-muted">
        <StoryHeader title="YOUR ACTIVITY" chipDisplay="chip" />
        <div className="w-full space-y-6">
          {/* Token Balance Card */}
          <motion.div
            className="w-full bg-white/5 bg-opacity-60 backdrop-blur-sm rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <h2 className="sm:text-lg font-bold text-primary flex items-center gap-2">
                <Coins className="w-6 h-6" />
                Token Balance
              </h2>

              <div className="text-4xl font-bold text-foreground">
                {formatBalance(token_balance)}
              </div>
            </div>
          </motion.div>

          {/* Interaction Count Card */}
          <motion.div
            className="w-full bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="space-y-4">
              <h2 className="sm:text-lg font-bold text-primary flex items-center gap-2">
                <Activity className="w-6 h-6" />
                Total Interactions
              </h2>

              <div className="text-2xl font-bold text-foreground">
                {total_interaction_count.toLocaleString()}
              </div>

              <div className="bg-yellow-400/20 rounded-full px-4 py-2 inline-block text-sm">
                <span className="text-yellow-400 font-medium">
                  You're a DEX/DeFi Power User! 🚀
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </BaseScene>
  );
}
