"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { ArrowRight } from "lucide-react";

export function Thanks() {
  const handleShare = () => {
    // Implement share functionality
    console.log("Sharing wrapped...");
  };
  return (
    <BaseScene backgroundImage="/backgrounds/dotted-yellow-bg.png" isCenter>
      <motion.div
        className="w-full space-y-6 bg-black rounded p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-[64px] font-bold font-schabo text-white leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          THANKS FOR
          <br />
          BEING PART OF
          <br />
          STELLAR
        </motion.h1>

        <motion.p
          className="text-[#6C6C6C] text-sm sm:text-base" //tertiary
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Until we meet again.
        </motion.p>

        <motion.button
          className="flex items-center gap-2 text-white text-sm font-medium transition-colors"
          onClick={handleShare}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Share Wrapped
          <span className="text-base p-2 rounded-full bg-primary text-black">
            <ArrowRight className="w-5 h-5" />
          </span>
        </motion.button>
      </motion.div>
    </BaseScene>
  );
}
