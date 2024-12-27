"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { BaseScene } from "./base-scene";
import { StoryHeader } from "@/components/core/header";
import { usePublicKey } from "@/contexts/PublicKeyContext";
import { formatDateMY, truncateId } from "@/lib/utils";

export function UniqueWalletTransfers() {
  const { userData } = usePublicKey();
  const count = useMotionValue(0);
  const unique_wallet_transfers = userData?.unique_wallet_interactions || 0;

  useEffect(() => {
    const animation = animate(count, unique_wallet_transfers, { duration: 2 });
    return animation.stop;
  }, [count, unique_wallet_transfers]);

  const formatAmount = (amount: number) => {
    return amount?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  return (
    <BaseScene
      backgroundImage="/backgrounds/purple-bg.png"
      className="text-muted"
    >
      <div className="w-full">
        <StoryHeader
          title="WALLET ACTIVITY INSIGHTS"
          chip={`Total Unique Wallets Interacted With: ${userData?.unique_wallet_interactions}`}
          chipDisplay="chip"
        />
        <div className="space-y-5">
          {/* Largest XLM Transaction */}
          <motion.div
            className="space-y-2.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="font-bold text-sm sm:text-base">
              Largest XLM Transaction:
            </div>
            <div className="space-y-2 capitalize">
              <div className="space-y-1 flex flex-col">
                <span className="text-muted-foreground text-xs">Amount</span>
                <span className="font-medium text-sm sm:text-base">
                  {formatAmount(
                    userData?.top_largest_xlm?.[0]?.xlm_amount || 0
                  )}{" "}
                  XLM
                </span>
              </div>
              <div className="space-y-1 flex flex-col">
                <span className="text-muted-foreground text-xs">Type</span>
                <span className="font-medium text-sm sm:text-base">
                  {userData?.top_largest_xlm?.[0]?.xlm_op_type_str
                    .split("_")
                    .join(" ")}
                </span>
              </div>
              <div className="space-y-1 flex flex-col">
                <span className="text-muted-foreground text-xs">Date</span>
                <span className="font-medium text-sm sm:text-base">
                  {formatDateMY(userData?.top_largest_xlm?.[0]?.tx_time)}
                </span>
              </div>
              <div className="space-y-1 hidden flex-col">
                <span className="text-muted-foreground text-xs">TX ID</span>
                <span className="font-medium text-sm sm:text-base">
                  {truncateId(userData?.top_largest_xlm?.[0]?.tx_id)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Largest Non-XLM Transaction */}
          <motion.div
            className="space-y-2.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="font-bold text-sm sm:text-base">
              Largest Non-XLM Transaction:
            </div>
            <div className="space-y-2 capitalize">
              <div className="space-y-1 flex flex-col">
                <span className="text-muted-foreground text-xs">Amount</span>
                <span className="font-medium text-sm sm:text-base">
                  {formatAmount(
                    userData?.top_largest_nonxlm?.[0]?.nonxlm_amount || 0
                  )}{" "}
                  {userData?.top_largest_nonxlm?.[0]?.nonxlm_asset_code}
                </span>
              </div>
              <div className="space-y-1 flex flex-col">
                <span className="text-muted-foreground text-xs">Type</span>
                <span className="font-medium text-sm sm:text-base">
                  {userData?.top_largest_nonxlm?.[0]?.nonxlm_op_type_str}
                </span>
              </div>
              <div className="space-y-1 flex flex-col">
                <span className="text-muted-foreground text-xs">Date</span>
                <span className="font-medium text-sm sm:text-base">
                  {formatDateMY(userData?.top_largest_nonxlm?.[0]?.tx_time)}
                </span>
              </div>
              <div className="space-y-1 hidden flex-col">
                <span className="text-muted-foreground text-xs">TX ID</span>
                <span className="font-medium text-sm sm:text-base">
                  {truncateId(userData?.top_largest_nonxlm?.[0]?.tx_id)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </BaseScene>
  );
}

