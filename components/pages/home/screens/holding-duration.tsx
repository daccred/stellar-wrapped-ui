"use client"

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'
import Image from 'next/image'
import { StoryHeader } from '@/components/core/header'

interface Token {
  symbol: string
  icon: string
  duration: number
}

interface GasFees {
  actual: number
  savings: number
  optimizations: string
}

interface HoldingDurationProps {
  averageDuration: number
  tokens: Token[]
  gasFees: GasFees
}

export function HoldingDuration({ 
  averageDuration, 
  tokens, 
  gasFees 
}: HoldingDurationProps) {
  return (
    <BaseScene 
      backgroundImage="/backgrounds/home-bg.png"
      className=""
    >
      <div className="w-full flex flex-col gap-2">
         <StoryHeader title="HOLDING DURATION" chip={`Average Holding Duration: ${averageDuration} months`} chipDisplay="chip"/>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {tokens.map((token, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={token.icon}
                  alt={token.symbol}
                  width={24}
                  height={24}
                     className="rounded-full bg-zinc-100 text-xs shrink-0 w-6 h-6"
                />
                <span className="font-semibold text-base">{token.symbol}</span>
              </div>
              <span className="text-[#0F0F0F] text-sm">{token.duration} months</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl py-4 space-y-4 border-black border mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-medium px-4 pb-4 border-b border-black">Gas Fee Savings</h2>
          <div className="space-y-3 text-xs px-4">
            <div className="flex flex-col items-start gap-1">
              <span className="text-[#505050]">Actual Gas Fees Paid</span>
              <span className='font-medium'>{gasFees.actual} USDC</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-[#505050]">Savings</span>
              <span  className='font-medium'>{gasFees.savings} USDC (~54% savings)</span>
            </div>
            <div className="flex flex-col items-start gap-1">
            <span className="text-[#505050]">Optimizations Used: </span>
            <span  className='font-medium'>{gasFees.optimizations}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </BaseScene>
  )
}

