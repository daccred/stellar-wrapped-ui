"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { BaseScene } from "./base-scene";
import { Activity } from "lucide-react";

interface TimeOnChainProps {
  time_on_chain_days: number;
  total_interaction_count: number;
}

export function TimeOnChain({
  time_on_chain_days,
  total_interaction_count,
}: TimeOnChainProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const interactionCount = useMotionValue(0);
  const roundedInteractions = useTransform(interactionCount, Math.round);
  const [uniqueText, setUniqueText] = useState<string>("");

  useEffect(() => {
    const animation = animate(count, time_on_chain_days, {
      duration: 2,
      ease: "easeOut",
    });

    const interactionAnimation = animate(
      interactionCount,
      total_interaction_count,
      {
        duration: 2,
        ease: "easeOut",
      }
    );

    // Set unique text based on duration
    if (time_on_chain_days < 30) {
      setUniqueText(
        "Welcome to the blockchain! Your journey is just beginning. 🌱"
      );
    } else if (time_on_chain_days < 180) {
      setUniqueText("You're becoming a blockchain veteran! Keep going! 🚀");
    } else if (time_on_chain_days < 365) {
      setUniqueText("Almost a year! You're a dedicated chain explorer! ⭐");
    } else {
      setUniqueText(
        "Over a year on chain! You're a true blockchain pioneer! 🏆"
      );
    }

    return () => {
      animation.stop();
      interactionAnimation.stop();
    };
  }, [time_on_chain_days, total_interaction_count]);

  return (
    <BaseScene
      backgroundImage="/backgrounds/dotted-yellow-bg.png"
      className="text-foreground"
      isCenter
    >
      <div className="w-full space-y-6 bg-black rounded-2xl p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="sm:text-xl font-medium">TIME ON THE CHAIN</h2>
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
            <motion.span>{rounded}</motion.span>
            <motion.span
              className="text-4xl sm:text-6xl font-medium ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              days
            </motion.span>
          </motion.div>
          <motion.div
            className="pt-4 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Activity className="w-5 h-5" />
              <span>Total Interactions</span>
            </div>
            <motion.div
              className="text-3xl font-bold text-primary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
            >
              {roundedInteractions}
            </motion.div>
          </motion.div>{" "}
          <motion.div
            className="sm:text-lg text-foreground font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {uniqueText}
          </motion.div>
        </motion.div>
      </div>
    </BaseScene>
  );
}

