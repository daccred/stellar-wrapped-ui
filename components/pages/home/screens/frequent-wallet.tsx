"use client"

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'
import { cn } from '@/lib/utils'

interface WalletInteraction {
  address: string
  totalTransactions: number
  totalAmount: number
}

interface FrequentWalletProps {
  wallets: WalletInteraction[]
}

export function FrequentWallet({ wallets }: FrequentWalletProps) {
  return (
    <BaseScene
      backgroundImage="/backgrounds/black-grunge-bg.png"
      className=" text-white"
    >
      <div className="w-full max-w-md space-y-8 mt-16">
        <motion.h1
          className="text-4xl sm:text-[40px] font-bold font-schabo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          MOST FREQUENT WALLET <br /> INTERACTION
        </motion.h1>

        {wallets.map((wallet, index) => (
          <motion.div
            key={index}
            className="space-y-4 text-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div
              className={cn("space-y-3 pb-4", {
                "border-b-muted-foreground border-b": index === 0,
              })}
            >
              <div className="text-primary">Most Received From Wallet:</div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Wallet Address</div>
                <div className="font-semibold text-foreground">
                  {wallet.address}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Total Transactions</div>
                <div className="font-semibold text-foreground">
                  {wallet.totalTransactions}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Total Amount Sent</div>
                <div className="font-semibold text-foreground">
                  {wallet.totalAmount.toLocaleString()} USDC
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </BaseScene>
  );
}

