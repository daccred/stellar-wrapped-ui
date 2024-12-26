"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { StoryHeader } from "@/components/core/header";
import { usePublicKey } from "@/contexts/PublicKeyContext";
import { Icons } from "@/assets/icons";

export function StartingBalance() {
  const { userData } = usePublicKey();
  const startingBalance = userData?.starting_balance || 0;
  const currentBalance = userData?.token_balance || 0;
  const balanceDiff = userData?.balance_diff || 0;

  const getUniqueText = () => {
    const percentageUsed = Math.abs((balanceDiff / startingBalance) * 100);

    if (percentageUsed > 99) {
      return "Wow! You're a true crypto explorer! You've put almost your entire starting balance to work. That's some serious dedication! 🚀";
    }

    if (percentageUsed > 90) {
      return "Look at you go! You've actively managed over 90% of your initial balance. Now that's what we call being involved! 💫";
    }

    if (percentageUsed > 75) {
      return "You're not just dipping your toes - you've dove right in! Three quarters of your initial balance has been in motion. 🌊";
    }

    if (percentageUsed > 50) {
      return "Half in, half out - you've found your sweet spot balancing activity and reserves. Perfect strategy! ⚖️";
    }

    if (percentageUsed > 25) {
      return "Testing the waters? You've explored the possibilities while keeping a solid reserve. Smart thinking! 🎯";
    }

    return "Steady and stable - you've kept most of your initial balance while exploring the ecosystem. That's strategic! 🛡️";
  };

  return (
    <BaseScene backgroundImage="/backgrounds/top-protocol-bg.png" isCenter>
      <div className="w-full max-w-xl space-y-8 text-muted">
        <div className="w-full space-y-6 bg-black/20 rounded-2xl p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Icons.Coins className="w-6 h-6 text-primary" />
              <h2 className="sm:text-xl font-medium text-white">
                Initial Investment
              </h2>
            </div>

            <motion.div
              className="text-6xl sm:text-[96px] font-bold font-schabo text-primary tracking-wide tabular-nums"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              <motion.span>{startingBalance.toFixed(2)}</motion.span>
              <motion.span
                className="text-4xl sm:text-6xl font-medium ml-2 text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                XLM
              </motion.span>
            </motion.div>

            <motion.div
              className="sm:text-base text-white font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {getUniqueText()}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </BaseScene>
  );
}
