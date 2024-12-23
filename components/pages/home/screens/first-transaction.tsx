"use client"

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'
import { StoryHeader } from '@/components/core/header'

interface TransactionDetails {
  type: string
  amount: string
  hash: string
  sourceAddress: string
  gasFee: string
}

interface FirstTransactionProps {
  date: string
  details: TransactionDetails
}

export function FirstTransaction({ 
  date, 
  details 
}: FirstTransactionProps) {
  return (
    <BaseScene backgroundImage="/backgrounds/home-bg.png">
      <div className="w-full space-y-2 text-muted">
        <StoryHeader
          title="FIRST TRANSACTION"
          chip={` Date: ${date}`}
          chipDisplay="chip"
        />

        <motion.div
          className="bg-white rounded-2xl py-4 space-y-4 border-black border text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-medium px-4 pb-4 border-b border-black">
            Transaction Details
          </h2>
          <div className="space-y-3 text-xs px-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span>{details.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span>{details.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction Hash</span>
              <span>{details.hash}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Source Address</span>
              <span>{details.sourceAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gas Fee</span>
              <span>{details.gasFee}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </BaseScene>
  );
}

