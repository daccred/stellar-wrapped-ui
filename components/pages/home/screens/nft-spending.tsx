"use client"

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'
import { StoryHeader } from '@/components/core/header'

interface Category {
  name: string
  amount: number
  percentage: number
}

interface NFTProfit {
  name: string
  collection: string
  purchasePrice: number
  salePrice: number
  profit: number
  saleDate: string
  transactionHash: string
}

interface NFTSpendingProps {
  totalSpent: number
  categories: Category[]
  bestProfit: NFTProfit
}

export function NFTSpending({ 
  totalSpent, 
  categories,
  bestProfit 
}: NFTSpendingProps) {
  return (
    <BaseScene
      backgroundImage="/backgrounds/olive-grunge-bg.png"
      className="text-white"
    >
      <div className="w-full flex flex-col gap-2">
        <StoryHeader title="Total Spent on NFTs" chip="" chipDisplay="none" />
        <span className="text-xs">Total Spent on NFTs</span>
        <span className="text-white text-2xl font-bold">{`${totalSpent.toLocaleString()} USDC`}</span>
      </div>
      <div className="w-full space-y-2 mt-6">
        <motion.div
          className="bg-white rounded-2xl py-4 space-y-4 border-black border text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-medium px-4 pb-4 border-b border-black text-muted-foreground">
            Breakdown by Category
          </h3>
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="flex justify-between gap-4 items-center px-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <span className="text-xs text-muted-foreground">
                {category.name}
              </span>
              <div className="text-xs text-muted">
                <span>{category.amount.toLocaleString()} USDC</span>
                <span>({category.percentage}%)</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl py-4 space-y-4 border-black border text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-medium px-4 pb-4 border-b border-black text-muted-foreground">
            Best NFT Profit
          </h3>
          <div className="space-y-2 text-xs px-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">NFT Name</span>
              <span>{bestProfit.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Collection</span>
              <span>{bestProfit.collection}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Purchase Price</span>
              <span>{bestProfit.purchasePrice.toLocaleString()} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sale Price</span>
              <span>{bestProfit.salePrice.toLocaleString()} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Profit</span>
              <span>+{bestProfit.profit.toLocaleString()} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date of Sale</span>
              <span>{bestProfit.saleDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction Hash</span>
              <span>{bestProfit.transactionHash}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </BaseScene>
  );
}

