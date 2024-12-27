"use client"

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { formatDateMY, truncateId } from "@/lib/utils";
import { usePublicKey } from "@/contexts/PublicKeyContext";
import { StoryHeader } from "@/components/core/header";

export function FrequentWallet() {
  const { userData } = usePublicKey();

  const formatAmount = (amount: number) => {
    return amount?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  return (
    <BaseScene
      backgroundImage="/backgrounds/black-grunge-bg.png"
      className="overflow-auto text-white"
    >
      {/* TOP WALLET INTERACTION */}
      <div className="w-full pb-20">
        <StoryHeader
          title=" TOP TRANSACTIONS"
          chip={`Top Interaction Count: ${userData?.top_interaction_count?.toLocaleString()}`}
          chipDisplay="chip"
        />

        <div className="space-y-5">
          <motion.div
            className="space-y-2.5 border-b pb-4 border-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="text-primary text-sm sm:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Most Frequent Interaction:
            </motion.div>
            <motion.div
              className="text-sm break-all relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {truncateId(userData?.top_interaction_wallet)
                ?.split("")
                .map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + i * 0.02,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
            </motion.div>
          </motion.div>

          {/* Top Trading Activity */}
          <motion.div
            className="space-y-2.5 border-b pb-4 border-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-primary text-sm sm:text-base">
              Top Trading Activity
            </div>
            <div className="space-y-2 text-muted-foreground text-sm capitalize">
              <div className="space-y-1 flex flex-col">
                <span className="text-muted-foreground text-sm sm:text-base">
                  Buying
                </span>
                <span className="text-foreground font-semibold">
                  {formatAmount(
                    userData?.top_nonxlm_buying?.[0]?.total_buying || 0
                  )}{" "}
                  {userData?.top_nonxlm_buying?.[0]?.code}
                </span>
              </div>
              <div className="space-y-1 flex flex-col">
                <span className="text-muted-foreground text-sm sm:text-base">
                  Selling
                </span>
                <span className="text-foreground font-semibold">
                  {formatAmount(
                    userData?.top_nonxlm_selling?.[0]?.total_selling || 0
                  )}{" "}
                  {userData?.top_nonxlm_selling?.[0]?.code}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Top Send/Receive Activity */}
          <motion.div
            className="space-y-2.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-primary text-sm sm:text-base">
              Top Send/Receive Activity
            </div>
            <div className="space-y-2 text-muted-foreground text-sm capitalize">
              <div className="space-y-1 flex flex-col">
                <span className="text-muted-foreground text-sm sm:text-base">
                  Sent
                </span>
                <span className="text-foreground font-semibold">
                  {formatAmount(
                    userData?.top_nonxlm_sent?.[0]?.total_sent || 0
                  )}{" "}
                  {userData?.top_nonxlm_sent?.[0]?.code}
                </span>
              </div>
              <div className="space-y-1 flex flex-col">
                <span className="text-muted-foreground text-sm sm:text-base">
                  Received
                </span>
                <span className="text-foreground font-semibold">
                  {formatAmount(
                    userData?.top_nonxlm_received?.[0]?.total_received || 0
                  )}{" "}
                  {userData?.top_nonxlm_received?.[0]?.code}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </BaseScene>
  );
}

