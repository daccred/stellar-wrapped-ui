"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import Image from "next/image";
import { StoryHeader } from "@/components/core/header";

interface TokenRatio {
  symbol: string;
  icon: string;
  buys: { count: number; percentage: number };
  sells: { count: number; percentage: number };
  ratio: string;
}

interface TokenBuySellRatiosProps {
  overallRatio: string;
  tokens: TokenRatio[];
}

export function TokenBuySellRatios({
  overallRatio,
  tokens,
}: TokenBuySellRatiosProps) {
  return (
    <BaseScene backgroundImage="/backgrounds/home-bg.png">
      <div className="w-full max-w-md space-y-6 text-muted">
        <StoryHeader
          title="TOKEN BUY/SELL RATIOS"
          chip={`Overall Buy/Sell Ratio: ${overallRatio} (150 buys vs. 100 sells)`}
          chipDisplay="text"
        />

        <motion.div
          className="bg-white border border-black rounded-2xl p-4 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-medium text-[#]">Top 3 Tokens by Activity</h2>
          <div className="space-y-4">
            {tokens.map((token, index) => (
              <div key={index} className="py-4 border-black border rounded-2xl">
                <div className="flex items-center justify-start gap-2 px-4 pb-4 border-b border-black">
                  <Image
                    src={token.icon}
                    alt={token.symbol}
                    width={24}
                    height={24}
                    className="rounded-full w-6 h-6 shrink-0"
                    unoptimized
                  />
                  <span className="font-semibold sm:text-base text-sm">
                    {token.symbol}
                  </span>
                </div>
                <div className="space-y-1 px-4 pt-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Buys</span>
                    <span>
                      {token.buys.count} ({token.buys.percentage}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sells</span>
                    <span>
                      {token.sells.count} ({token.sells.percentage}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ratio</span>
                    <span>{token.ratio}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </BaseScene>
  );
}
