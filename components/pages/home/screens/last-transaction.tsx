"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { StoryHeader } from "@/components/core/header";
import { usePublicKey } from "@/contexts/PublicKeyContext";
import { truncateId } from "@/lib/utils";

export function LastTransaction() {
  const { userData } = usePublicKey();

  return (
    <BaseScene backgroundImage="/backgrounds/home-bg.png">
      <div className="w-full text-muted">
        <StoryHeader
          title="LAST TRANSACTION"
          chip={` Date: ${userData?.last_txn_time}`}
          chipDisplay="chip"
        />

        <motion.div
          className="bg-white rounded-2xl py-4 space-y-4 border-black border text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-medium px-4 pb-4 border-b border-black">
            Transaction Details
          </h2>
          <div className="space-y-3 text-xs px-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="capitalize">
                {userData?.last_transaction_details?.op_type_str
                  .split("_")
                  .join(" ") || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span>{userData?.last_transaction_details?.amount || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction ID</span>
              <span>{truncateId(userData?.last_transaction_details?.id)}</span>
            </div>
            <div className="hidden justify-between">
              <span className="text-muted-foreground">Asset Code</span>
              <span>
                {userData?.last_transaction_details?.asset_code || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Timestamp</span>
              <span>
                {userData?.last_transaction_details?.timestamp
                  ? new Date(
                      userData.last_transaction_details.timestamp
                    ).toLocaleString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </BaseScene>
  );
}
