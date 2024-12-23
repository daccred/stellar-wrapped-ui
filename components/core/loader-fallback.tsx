"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AttestFullIcon } from "@/assets/logo";
import Image from "next/image";

export function LoaderFallback() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="fixed h-screen inset-0 flex flex-col bg-muted">
      <div className="relative h-full w-full flex flex-col max-w-md mx-auto items-start justify-center space-y-8">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('/backgrounds/yellow-grunge-bg.png')`,
          }}
        />
        <Image
          src="/stellar-logo.svg"
          alt="Stellar Logo"
          width={32}
          height={32}
          unoptimized
          className="absolute top-0 left-4"
        />
        <motion.div
          className="relative z-10 flex flex-col items-start justify-center h-full px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-start">
            <motion.span
              variants={wordVariants}
              className="text-[120px] leading-[1] font-schabo text-black"
            >
              YOUR
            </motion.span>
            <motion.span
              variants={wordVariants}
              className="text-[120px] leading-[1] font-schabo text-black"
            >
              2024
            </motion.span>
            <motion.span
              variants={wordVariants}
              className="text-[120px] leading-[1] font-schabo text-black"
            >
              STELLAR
            </motion.span>
            <motion.span
              variants={wordVariants}
              className="text-[120px] leading-[1] font-schabo text-black"
            >
              WRAPPED
            </motion.span>
          </div>
        </motion.div>
      </div>{" "}
      {/* Footer */}
      <div className="relative w-full p-4 flex items-center justify-center text-center gap-2 z-50 bg-white max-w-md mx-auto">
        <p className="text-xs text-black">Powered by </p>
        <Link href="https://x.com/attestprotocol" target="_blank">
          <AttestFullIcon className="h-3 text-black w-fit" />
        </Link>
      </div>
    </div>
  );
}
