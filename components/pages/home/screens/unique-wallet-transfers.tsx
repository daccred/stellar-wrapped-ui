"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { BaseScene } from "./base-scene";
import { StoryHeader } from "@/components/core/header";

interface UniqueWalletTransfersProps {
  unique_wallet_transfers: number;
  total_selling_amount: number;
  total_buying_amount: number;
}

export function UniqueWalletTransfers({
  unique_wallet_transfers,
  total_selling_amount,
  total_buying_amount,
}: UniqueWalletTransfersProps) {
  const [uniqueText, setUniqueText] = useState("");
  const count = useMotionValue(0);

  useEffect(() => {
    const animation = animate(count, unique_wallet_transfers, { duration: 2 });
    return animation.stop;
  }, [count, unique_wallet_transfers]);

  useEffect(() => {
    if (total_selling_amount > total_buying_amount) {
      setUniqueText("You're quite the seller! 🚀");
    } else if (total_buying_amount > total_selling_amount) {
      setUniqueText("Looks like you're on a buying spree! 💰");
    } else {
      setUniqueText("Perfectly balanced, as all things should be. ⚖️");
    }
  }, [total_selling_amount, total_buying_amount]);

  return (
    <BaseScene
      backgroundImage="/backgrounds/purple-bg.png"
      className="text-muted"
    >
      <div className="w-full max-w-md">
        <StoryHeader
          title="UNIQUE WALLET TRANSFERS"
          chip={`Total Unique Wallets Interacted With: ${unique_wallet_transfers}`}
          chipDisplay="chip"
        />

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="space-y-1"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-muted-foreground text-xs">
              Total Selling Amount (Lumens)
            </div>
            <motion.div
              className="text-base font-medium"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {total_selling_amount.toLocaleString()} XLM
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-1"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-muted-foreground text-xs">
              Total Buying Amount (Lumens)
            </div>
            <motion.div
              className="text-base font-medium"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {total_buying_amount.toLocaleString()} XLM
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-6 text-sm font-medium text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {uniqueText}
          </motion.div>
        </motion.div>
      </div>
    </BaseScene>
  );
}

