"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

interface BaseSceneProps {
  children: ReactNode;
  backgroundImage?: string;
  className?: string;
  isCenter?: boolean;
}

export function BaseScene({
  children,
  backgroundImage,
  className = "",
  isCenter = false,
}: BaseSceneProps) {
  return (
    <motion.div
      className="relative w-full h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt="Background image"
          width={240}
          height={80}
          className="absolute w-full h-full inset-0"
          unoptimized
        />
      )}
      <div
        className={cn(
          "w-full relative z-10 h-full flex flex-col items-center p-4",
          { "justify-center": isCenter },
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
