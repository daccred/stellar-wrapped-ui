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
      className=" text-white"
    >
            <div className="w-full">
             <StoryHeader title="Total Spent on NFTs" chip="Total Spent on NFTs" chipDisplay="text"/>
        <span className="text-white text-2xl font-bold -mt-6">{`${totalSpent.toLocaleString()} USDC`}</span>
        </div>
      <div className="w-full space-y-2">
    
       
        <motion.div
          className="bg-white rounded-2xl py-4 space-y-4 border-black border text-[#0F0F0F]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-medium px-4 pb-4 border-b border-black text-[#505050]">Breakdown by Category</h3>
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="flex justify-between gap-4 items-center px-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
            >
              <span className="text-xs text-[#505050]">{category.name}</span>
              <div className="text-xs text-[#0F0F0F]">
                <span>{category.amount.toLocaleString()} USDC</span>
                <span>({category.percentage}%)</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl py-4 space-y-4 border-black border text-[#0F0F0F]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-medium px-4 pb-4 border-b border-black text-[#505050]">Best NFT Profit</h3>
          <div className="space-y-2 text-xs px-4">
            <div className="flex justify-between">
              <span className="text-[#505050]">NFT Name</span>
              <span>{bestProfit.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#505050]">Collection</span>
              <span>{bestProfit.collection}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#505050]">Purchase Price</span>
              <span>{bestProfit.purchasePrice.toLocaleString()} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#505050]">Sale Price</span>
              <span>{bestProfit.salePrice.toLocaleString()} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#505050]">Profit</span>
              <span>
                +{bestProfit.profit.toLocaleString()} USDC
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#505050]">Date of Sale</span>
              <span >{bestProfit.saleDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#505050]">Transaction Hash</span>
              <span>{bestProfit.transactionHash}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </BaseScene>
  )
}

