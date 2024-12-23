"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { StoryHeader } from "@/components/core/header";

interface UniqueWalletTransfersProps {
  totalWallets: number;
  sentWallets: number;
  receivedWallets: number;
  topWallets: string[];
}

export function UniqueWalletTransfers({
  totalWallets,
  sentWallets,
  receivedWallets,
  topWallets,
}: UniqueWalletTransfersProps) {
  return (
    <BaseScene
      backgroundImage="/backgrounds/purple-bg.png"
      className="text-muted"
    >
      <div className="w-full max-w-md space-y-6">
        <StoryHeader
          title="UNIQUE WALLET TRANSFERS"
          chip={`Total Unique Wallets Interacted With: ${totalWallets}`}
          chipDisplay="chip"
        />

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs">Wallets Sent To</div>
            <div className="text-base font-medium">
              {sentWallets} Unique Wallets
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-muted-foreground text-xs">
              Wallets Received From
            </div>
            <div className="text-base font-medium">
              {receivedWallets} Unique Wallets
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white border border-black rounded-2xl py-4 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="border-b border-black px-4 pb-4 space-y-1">
            <h2 className="font-medium">Breakdown</h2>
            <span className="text-sm text-muted-foreground">
              {" "}
              Top 5 Wallets You Interacted With:
            </span>
          </div>
          <div className="space-y-2 px-4">
            {topWallets.map((wallet, index) => (
              <div key={wallet} className="text-xs">
                {index + 1}. {wallet}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </BaseScene>
  );
}
