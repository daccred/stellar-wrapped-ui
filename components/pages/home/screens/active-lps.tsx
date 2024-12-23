"use client"

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'
import Image from 'next/image'
import { StoryHeader } from '@/components/core/header'
import { cn } from "@/lib/utils";

interface LiquidityPool {
  name: string;
  icons: string[];
  totalStaked: {
    amount: number;
    token: string;
    profitLoss?: string;
  };
  stats: {
    fee?: string;
    apy: string;
  };
}

interface ActiveLPsProps {
  pools: LiquidityPool[];
  poolCount: number;
}

export function ActiveLPs({ pools, poolCount }: ActiveLPsProps) {
  return (
    <BaseScene className="bg-white text-muted">
      <div className="w-full">
        <StoryHeader
          title="ACTIVE LPS"
          chip={` Pools Participating: ${poolCount}`}
          chipDisplay="chip"
        />
        <div className="space-y-4">
          {pools.map((pool, index) => (
            <motion.div
              key={pool.name}
              className={cn("space-y-2 pb-4", {
                " border-b border-black ": index <= 1,
              })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {pool.icons.map((icon, i) => (
                    <Image
                      key={i}
                      src={icon}
                      alt={`logo ${index + 1}`}
                      width={24}
                      height={24}
                      className="rounded-full border-2 border-white w-6 h-6 shrink-0"
                      unoptimized
                    />
                  ))}
                </div>
                <span className="font-medium text-sm text-muted">
                  {pool.name}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-start items-start gap-1 flex-col">
                  <span className="text-muted-foreground text-xs">
                    Total Staked
                  </span>
                  <div className="flex items-center ga-1">
                    <p className="font-semibold uppercase text-muted">
                      {pool.totalStaked.amount.toLocaleString()}{" "}
                      {pool.totalStaked.token}
                    </p>
                    {pool.totalStaked.profitLoss && (
                      <div
                        className={`text-xs  py-1 px-2 rounded-full ${
                          pool.totalStaked.profitLoss.startsWith("+")
                            ? "bg-[#34C759]/10 text-[#34C759]"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {pool.totalStaked.profitLoss}
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs text-start text-muted">
                  ~15,400 USDC
                </span>
                <div className="flex justify-start gap-1 text-sm">
                  {pool.stats.fee && (
                    <div className="rounded-full py-1 px-2 border text-xs">
                      <span className="text-muted-foreground">Fee Tier</span>{" "}
                      <span>{pool.stats.fee}</span>
                    </div>
                  )}
                  <div className="rounded-full py-1 px-2 border text-xs">
                    <span className="text-muted-foreground">APY</span>{" "}
                    <span>{pool.stats.apy}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BaseScene>
  );
}

