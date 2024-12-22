"use client"

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'

interface NetPositionProps {
  sent: number
  received: number
  netPosition: number
}

export function NetPosition({ sent, received, netPosition }: NetPositionProps) {
  return (
    <BaseScene 
      backgroundImage="/backgrounds/dotted-bg.png" 
      className=" text-black">
      <div className="relative w-full max-w-md space-y-8 mt-16">
        <motion.h2
          className="text-4xl font-bold font-schabo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          NET SENT VS. RECEIVED
        </motion.h2>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[#505050]">Sent</span>
            <h3 className="text-[63px] font-bold font-schabo">
              {sent.toLocaleString()} USDC
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-[#505050]">Received</span>
            <h3 className="text-[63px] font-schabo font-bold">
              {received.toLocaleString()} USDC
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-[#505050]">Net Position</span>
            <h3 className="text-[63px] font-schabo font-bold">
              {netPosition.toLocaleString()} USDC
            </h3>
          </motion.div>
        </div>

        <motion.p
          className="text-[#505050] text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          You&apos;ve sent out more than you&apos;ve received, primarily through swaps and NFT purchases.
        </motion.p>
      </div>
    </BaseScene>
  )
}

