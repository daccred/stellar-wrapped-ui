"use client";

import { usePublicKey } from "@/contexts/PublicKeyContext";
import { truncateId } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

export function WelcomeMessage() {
  const { userData } = usePublicKey();
  return (
    <div className="relative h-full w-full flex flex-col items-start justify-center overflow-hidden px-4">
      <Image
        src="/backgrounds/black-grunge-bg.png"
        alt="Intro Bg"
        width={240}
        height={80}
        className="absolute w-full h-full inset-0"
        unoptimized
      />

      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-white text-start mb-4 z-50"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Hi {truncateId(userData?.account || "") || "cryptowhiz.xlm"}
      </motion.h1>
      <motion.p
        className="text-sm sm:text-base text-white z-50"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Your Stellar journey awaits...
      </motion.p>
    </div>
  );
}
