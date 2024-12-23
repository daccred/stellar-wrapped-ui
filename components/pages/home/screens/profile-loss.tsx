"use client"

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'
import Image from 'next/image'

interface Token {
  symbol: string
  icon: string
  amount: number
  percentageChange: number
  quantity: number
}

interface ProfitLossProps {
  overallPnl: number
  topPerformers: Token[]
  worstPerformers: Token[]
}

export function ProfitLoss({ 
  overallPnl, 
  topPerformers, 
  worstPerformers 
}: ProfitLossProps) {
  return (
    <BaseScene
      backgroundImage="/backgrounds/black-grunge-bg.png"
      className="text-white"
    >
      <div className="w-full max-w-md space-y-8">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h1
            className="text-4xl sm:text-[40px] font-bold font-schabo text-current mb-2 sm:mb-4 mt-16"
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            P&L (PROFIT & LOSS)
          </motion.h1>

          <div className="flex items-center gap-2">
            <div className="text-muted-foreground">Overall P&L</div>
            <div
              className={`text-sm sm:text-base font-medium rounded-full p-1 ${
                overallPnl >= 0
                  ? "bg-[#34C759]/10 text-[#34C759]"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {overallPnl >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(overallPnl).toLocaleString()} USDC
            </div>
          </div>
        </motion.div>

        <div className="text-sm space-y-6">
          <motion.div
            className="space-y-4 border-b-muted-foreground "
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-medium text-primary">Top Performing Tokens</h2>
            {topPerformers.map((token, index) => (
              <div key={index} className="flex items-center gap-3">
                <Image
                  src={token.icon}
                  alt={token.symbol}
                  width={24}
                  height={24}
                  className="rounded-full bg-zinc-100 text-xs shrink-0 w-6 h-6"
                  unoptimized
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span>{token.symbol}</span>
                    <span className="text-foreground">
                      +{token.amount.toLocaleString()} USDC
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ({token.percentageChange}% price increase,{" "}
                    {token.quantity.toLocaleString()} {token.symbol} held)
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="text-sm space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className=" font-medium text-primary">
              Worst Performing Tokens
            </h2>
            {worstPerformers.map((token, index) => (
              <div key={index} className="flex items-center gap-3">
                <Image
                  src={token.icon}
                  alt={token.symbol}
                  width={24}
                  height={24}
                  className="rounded-full bg-zinc-100 text-xs shrink-0 w-6 h-6"
                  unoptimized
                />
                <div className="flex-1">
                  <span>{token.symbol}</span>
                  <div className="text-sm text-[#FF3B30]">
                    ({token.amount.toLocaleString()} USDC{" "}
                    {Math.abs(token.percentageChange)}% price decrease,{" "}
                    {token.quantity.toLocaleString()} {token.symbol} held)
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </BaseScene>
  );
}

