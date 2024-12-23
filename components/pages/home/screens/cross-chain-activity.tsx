"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import Image from "next/image";

interface Chain {
  name: string;
  percentage: number;
  icon: string;
}

interface CrossChainTransfer {
  from: {
    name: string;
    icon: string;
  };
  to: {
    name: string;
    icon: string;
  };
  amount: string;
  value: string;
}

interface CrossChainActivityProps {
  chains: Chain[];
  transfers: CrossChainTransfer[];
}

export function CrossChainActivity({
  chains,
  transfers,
}: CrossChainActivityProps) {
  return (
    <BaseScene backgroundImage="/backgrounds/purple-bg.png">
      <div className="w-full space-y-4">
        <motion.h1
          className="text-4xl sm:text-[40px] font-bold font-schabo text-muted mb-2 sm:mb-4 mt-16"
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          CROSS-CHAIN ACTIVITY
        </motion.h1>

        <motion.div
          className="space-y-4 text-sm sm:text-base border-b border-black pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-muted font-semibold">Chains Interacted With:</p>
          {chains.map((chain, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Image
                src={chain.icon}
                alt={chain.name}
                width={24}
                height={24}
                unoptimized
                className="w-6 h-6 shrink-0 text-xs bg-zinc-100 rounded-full"
              />
              <div className="flex flex-col items-start gap-1">
                <span className="font-medium text-muted">{chain.name}</span>
                <span className="text-sm text-muted-foreground">
                  {chain.percentage}%
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.h2
          className="font-semibold text-sm sm:text-base text-muted"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Top Cross-Chain Transfers
        </motion.h2>

        <motion.div
          className="space-y-6 text-sm sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {transfers.map((transfer, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start gap-4">
                <div className="flex items-center shrink-0">
                  <Image
                    src={transfer.from.icon}
                    alt={transfer.from.name}
                    width={40}
                    height={40}
                    className="w-6 h-6 shrink-0 text-xs bg-zinc-100 rounded-full"
                    unoptimized
                  />
                  <Image
                    src={transfer.to.icon}
                    alt={transfer.to.name}
                    width={40}
                    height={40}
                    className="-ml-2 w-6 h-6 shrink-0 text-xs bg-zinc-100 rounded-full"
                    unoptimized
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center font-semibold gap-2 text-muted">
                    <span>{transfer.from.name}</span>
                    <span>→</span>
                    <span>{transfer.to.name}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {transfer.amount} ({transfer.value})
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </BaseScene>
  );
}
