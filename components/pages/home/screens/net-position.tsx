"use client";

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'
import { formatNumber } from "@/lib/utils";
import { usePublicKey } from "@/contexts/PublicKeyContext";

export function NetPosition() {
  const { userData } = usePublicKey();
  const totalReceivedAmount = Number(userData?.total_received_xlm) || 0;
  const totalSentAmount = Number(userData?.total_sent_xlm) || 0;
  const netPosition = totalReceivedAmount - totalSentAmount;

  // Determine dynamic text based on netPosition
  let dynamicText = "";
  if (Number(netPosition) > 0) {
    dynamicText = "You’ve received more than you’ve sent out.";
  } else if (Number(netPosition) < 0) {
    dynamicText = "You’ve sent out more than you’ve received.";
  } else {
    dynamicText = "Your sent and received amounts are balanced.";
  }

  return (
    <BaseScene
      backgroundImage="/backgrounds/dotted-bg.png"
      className="px-0 text-black"
    >
      <div className="relative w-full max-w-md space-y-8 mt-20">
        <motion.h2
          className="text-2xl sm:text-4xl font-bold font-schabo px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          NET SENT VS. RECEIVED
        </motion.h2>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-muted-foreground sm:text-base text-sm font-medium sm:font-semibold px-4">
              Sent
            </span>
            <div
              className="w-fit"
              style={{
                backgroundImage: `url('/backgrounds/yellow-figure-bg.svg')`,
                backgroundPosition: "left",
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto",
                padding: "0rem 1rem",
              }}
            >
              <h3 className="text-4xl sm:text-[63px] font-bold font-schabo w-fit leading-tight">
                {formatNumber(userData?.total_sent_xlm)?.toLocaleString()} XLM
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className=" px-4"
          >
            <span className="text-muted-foreground sm:text-base text-sm font-medium sm:font-semibold">
              Received
            </span>
            <h3 className="text-4xl sm:text-[63px] font-schabo font-bold leading-tight">
              {formatNumber(userData?.total_received_xlm)?.toLocaleString()} XLM
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="px-4"
          >
            <span className="text-muted-foreground sm:text-base text-sm font-medium sm:font-semibold">
              Net Position
            </span>
            <h3 className="text-4xl sm:text-[63px] font-schabo font-bold leading-tight">
              {netPosition?.toLocaleString()} XLM
            </h3>
          </motion.div>
        </div>

        <motion.p
          className="text-muted-foreground text-sm sm:text-base font-medium px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {dynamicText}
        </motion.p>
      </div>
    </BaseScene>
  );
}
