"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";

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
    <BaseScene className="bg-gradient-to-b from-purple-300 to-purple-200 p-6">
      <div className="w-full max-w-md space-y-6">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-black">
            UNIQUE WALLET TRANSFERS
          </h1>

          <div className="bg-yellow-300 text-black px-3 py-1 rounded-full inline-block">
            Total Unique Wallets Interacted With: {totalWallets}
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-1">
            <div className="text-gray-600">Wallets Sent To</div>
            <div className="text-xl font-medium">
              {sentWallets} Unique Wallets
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-gray-600">Wallets Received From</div>
            <div className="text-xl font-medium">
              {receivedWallets} Unique Wallets
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-4 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-medium">Breakdown</h2>
          <div className="text-sm text-gray-600">
            Top 5 Wallets You Interacted With:
          </div>
          <div className="space-y-2">
            {topWallets.map((wallet, index) => (
              <div key={wallet} className="font-mono text-sm">
                {index + 1}. {wallet}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </BaseScene>
  );
}
