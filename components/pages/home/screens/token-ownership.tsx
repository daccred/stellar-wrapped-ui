"use client"

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'
import Image from 'next/image'

interface TokenBalance {
  symbol: string
  percentage: number
  amount: string
  value: string
  icon: string
  color: string
}

interface TokenOwnershipProps {
  tokens: TokenBalance[]
}

export function TokenOwnership({ tokens }: TokenOwnershipProps) {
  return (
    <BaseScene
      backgroundImage="/backgrounds/black-grunge-bg.png"
      className=" text-white"
    >
      <div className="w-full max-w-md space-y-10">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h1
            className="text-4xl sm:text-[40px] font-bold font-schabo text-current mb-2 sm:mb-4 mt-16"
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            TOKEN OWNERSHIP
            <br />
            PERCENTAGES
          </motion.h1>

          <p className="text-sm text-primary font-medium">
            Portfolio Composition
          </p>
        </motion.div>

        <div className="space-y-6">
          {tokens.map((token, index) => (
            <motion.div
              key={token.symbol}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: token.color }}
              >
                <Image
                  src={token.icon}
                  alt={token.symbol}
                  width={24}
                  height={24}
                  className="rounded-full bg-zinc-100 text-xs shrink-0 w-6 h-6"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center text-foreground">
                  <span className="font-medium">
                    {token.symbol}: {token.percentage}%
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  ({token.amount} = {token.value})
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BaseScene>
  );
}

