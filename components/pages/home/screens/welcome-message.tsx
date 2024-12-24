"use client";

import { usePublicKey } from "@/contexts/PublicKeyContext";
import { motion } from "framer-motion";
import Image from "next/image";

interface WelcomeMessageProps {
  username: string;
}

function truncateString(
  str: string | undefined | null
): string | undefined | null {
  if (!str || str.length <= 12) {
    return str; // If the string is null, undefined, or shorter than or equal to 12 characters, no truncation needed
  }

  const firstPart = str.slice(0, 5); // First 6 characters
  const lastPart = str.slice(-5); // Last 6 characters

  return `${firstPart}****${lastPart}`;
}

export function WelcomeMessage({ username }: WelcomeMessageProps) {
  const { userData } = usePublicKey();
  // console.log("the user data is", userData);
  return (
    <div className="relative h-full w-full flex flex-col items-start justify-center overflow-hidden px-4">
      <Image
        src="/backgrounds/welcome-bg.png"
        alt="Intro Bg"
        width={240}
        height={80}
        className="absolute w-full h-full inset-0"
        unoptimized
      />
      {/* <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: `url('/backgrounds/welcome-bg.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
        }}
      /> */}
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-white text-start mb-4 z-50"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Hi {username || truncateString(userData?.account)}
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
