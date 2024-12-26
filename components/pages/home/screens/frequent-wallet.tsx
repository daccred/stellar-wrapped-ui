"use client"

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { truncateId } from "@/lib/utils";

interface FrequentWalletProps {
  top_interaction_wallet: string;
}

export function FrequentWallet({
  top_interaction_wallet,
}: FrequentWalletProps) {
  return (
    <BaseScene
      backgroundImage="/backgrounds/black-grunge-bg.png"
      className=" text-white"
    >
      <div className="w-full max-w-md space-y-8 mt-16">
        <motion.h1
          className="text-4xl sm:text-[40px] font-bold font-schabo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          TOP WALLET INTERACTION
        </motion.h1>

        <div className="relative">
          <motion.div
            className="text-primary mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Most Frequent Interaction:
          </motion.div>

          <motion.div
            className=" text-base break-all relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {truncateId(top_interaction_wallet)
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
        </div>
      </div>
    </BaseScene>
  );
}

