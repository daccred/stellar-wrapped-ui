"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";

interface RepeatInteractionsProps {
  data: {
    walletAddress: string;
    walletEngagements: string;
    contractAddress: string;
    contractEngagements: string;
    dapp: string;
    dappEngagements: string;
    totalInteractions: string;
  };
}

export function RepeatInteractions({ data }: RepeatInteractionsProps) {
  return (
    <BaseScene backgroundImage="/backgrounds/black-grunge-bg.png">
      <div className="w-full max-w-md space-y-6">
        <motion.h1
          className="text-4xl sm:text-[40px] font-bold font-schabo text-white mb-2 sm:mb-4 mt-16"
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          REPEAT INTERACTIONS
        </motion.h1>

        <motion.div
          className="space-y-6 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-primary font-medium">
            Top 3 Repeated Interactions
          </div>

          <div className="space-y-2">
            <div className="text-muted-foreground">Wallet Address</div>
            <div className="text-foreground font-medium">
              {data.walletAddress}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-muted-foreground">Engagements</div>
            <div className="text-foreground font-medium">
              {data.walletEngagements}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-muted-foreground">
              Soroban Contract Address
            </div>
            <div className="text-foreground font-medium">
              {data.contractAddress}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-muted-foreground">Engagements</div>
            <div className="text-foreground font-medium">
              {data.contractEngagements}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-muted-foreground">dApp: OpenSea</div>
            <div className="text-foreground font-medium">
              {data.dappEngagements}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-muted-foreground">
              Total Repeat Interactions
            </div>
            <div className="text-foreground font-medium">
              {data.totalInteractions}
            </div>
          </div>
        </motion.div>
      </div>
    </BaseScene>
  );
}
