"use client"

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'

interface Milestone {
  name: string
  date: string
  details?: string
}

interface TimeOnChainProps {
  activationDate: string
  totalTime: string
  milestones: Milestone[]
}

export function TimeOnChain({ 
  activationDate, 
  totalTime,
  milestones 
}: TimeOnChainProps) {
  return (
    <BaseScene className="bg-white">
      <div className="w-full space-y-6 text-[#0F0F0F]">
      <motion.h1
        className="text-4xl sm:text-[40px] font-bold font-schabo text-current mb-2 sm:mb-4 mt-16"
        initial={{ x: 1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
          TIME ON THE CHAIN
        </motion.h1>

        <motion.div
          className="space-y-2 border-black border-b pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-sm text-[#505050]">Wallet Activation Date</div>
          <div className="text-xl font-semibold">{activationDate}</div>
        </motion.div>

        <motion.div
          className="space-y-2 border-black border-b pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
            <div className="text-sm text-[#505050]">Total Time Active</div>
          <div className="text-xl font-semibold">{totalTime}</div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl py-4 space-y-4 border-black border text-[#0F0F0F]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-medium text-sm px-4 pb-4 border-b border-black">Milestones</h2>
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.name}
              className="flex justify-between items-start text-xs px-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (index * 0.1) }}
            >
            <span className="text-[#505050]">{milestone.name}</span>
              <div className='flex flex-col justify-end items-end gap-1'>
                <span className="text-right">{milestone.date}</span>
                {milestone.details && (
                  <span>{milestone.details}</span>
                )}
              </div>
             
            </motion.div>
          ))}
        </motion.div>
      </div>
    </BaseScene>
  )
}

