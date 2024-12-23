"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";

interface StakingToken {
  symbol: string;
  staked: number;
  rewards: {
    amount: number;
    apy: string;
  };
}

interface StakingRewardsProps {
  totalStaked: number;
  tokens: StakingToken[];
  totalRewardsEarned: number;
}

export function StakingRewards({
  totalStaked,
  tokens,
  totalRewardsEarned,
}: StakingRewardsProps) {
  return (
    <BaseScene backgroundImage="/backgrounds/black-grunge-bg.png">
      <div className="w-full space-y-6">
        <motion.h1
          className="text-4xl sm:text-[40px] font-bold font-schabo text-white mb-2 sm:mb-4 mt-16"
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          STAKING REWARDS
        </motion.h1>

        <div className="w-full max-w-md space-y-8">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-muted-foreground">Total Staked Assets</div>
            <div className="text-2xl text-foreground font-bold">
              {totalStaked.toLocaleString()} USDC
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {tokens.map((token, index) => (
              <div key={index} className="text-sm grid grid-cols-2 gap-2">
                <span className="text-muted-foreground">{token.symbol}</span>
                <span className="text-muted-foreground">Rewards Earned</span>
                <span className="text-foreground">
                  {token.staked.toLocaleString()} USDC
                </span>
                <span className="text-green-400">
                  {token.rewards.amount.toLocaleString()} USDC (
                  {token.rewards.apy} APR)
                </span>
              </div>
            ))}

            <div className="space-y-2">
              <div className="text-muted-foreground">Total Rewards Earned</div>
              <div className="text-green-400 ">
                {totalRewardsEarned.toLocaleString()} USDC
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </BaseScene>
  );
}
