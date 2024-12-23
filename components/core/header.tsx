"use client";

import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface StoryHeaderProps {
  title: string;
  chip?: string;
  chipDisplay?: "chip" | "text" | "none"; // Option to control chip display
  className?: string;
}

export function StoryHeader({
  title,
  chip,
  chipDisplay = "chip", // Default to "chip" if not specified
  className = "",
}: StoryHeaderProps) {
  return (
    <div className={cn("relative z-50", className)}>
      <motion.h1
        className="text-4xl sm:text-[40px] font-bold font-schabo text-current tracking-wide mb-2 sm:mb-4 mt-16"
        initial={{ x: 1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>

      {chip && chipDisplay !== "none" && (
        <motion.div
          className={cn(
            "mb-8 sm:text-base text-sm",
            chipDisplay === "chip"
              ? "inline-block font-medium bg-primary text-[#0F0F0F] px-3 py-1 rounded-full w-fit"
              : "text-current"
          )}
          initial={{ x: 1500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {chip}
        </motion.div>
      )}
    </div>
  );
}
