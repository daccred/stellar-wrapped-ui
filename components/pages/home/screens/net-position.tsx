"use client";

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'
import { FormattedActivitySummary } from "@/types";
import { convertLumensToUSDC } from "@/lib/utils";

interface NetPositionProps {
  data: FormattedActivitySummary | null;
}

export function NetPosition({ data }: NetPositionProps) {
  const totalReceivedAmount = Number(data?.total_received_amount) || 0;
  const totalSentAmount = Number(data?.total_sent_amount) || 0;
  const netPosition = totalReceivedAmount - totalSentAmount;

  // Determine dynamic text based on netPosition
  let dynamicText = "";
  if (netPosition > 0) {
    dynamicText = "You’ve received more than you’ve sent out.";
  } else if (netPosition < 0) {
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
          className="text-4xl font-bold font-schabo px-4"
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
            <span className="text-muted-foreground font-semibold px-4">
              Sent
            </span>
            <div
              className="w-auto"
              style={{
                backgroundImage: `url('/backgrounds/yellow-figure-bg.svg')`,
                backgroundPosition: "left",
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto",
                padding: "0rem 1rem",
              }}
            >
              <h3 className="text-[63px] font-bold font-schabo w-fit leading-tight">

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
            <span className="text-muted-foreground font-semibold">
              Received
            </span>
            <h3 className="text-[63px] font-schabo font-bold leading-tight">

              {formatNumber(userData?.total_received_xlm)?.toLocaleString()} XLM

            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="px-4"
          >
            <span className="text-muted-foreground font-semibold">
              Net Position
            </span>
            <h3 className="text-[63px] font-schabo font-bold leading-tight">

              {formatNumber(userData?.net_pnl_xlm)?.toLocaleString()} XLM

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
