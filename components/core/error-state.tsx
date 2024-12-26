"use client";

import { motion } from "framer-motion";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AttestFullIcon } from "@/assets/logo";
import Link from "next/link";
import { BaseScene } from "../pages/home/screens/base-scene";

interface AuthErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function AuthErrorState({
  title = "Authentication Error",
  message = "There was a problem accessing your account. Please try again.",
  onRetry,
}: AuthErrorStateProps) {
  return (
    <div className="fixed h-screen inset-0 flex flex-col bg-muted">
      <div className="h-full max-w-md mx-auto">
        <BaseScene
          backgroundImage="/backgrounds/black-grunge-bg.png"
          className="text-foreground"
          isCenter
        >
          <motion.div
            className="flex flex-col items-center text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 p-3 rounded-full bg-red-500/20"
            >
              <AlertCircle className="w-8 h-8 text-red-500" />
            </motion.div>

            <motion.h1
              className="text-3xl font-bold mb-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="text-lg mb-8 text-foreground max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {message}
            </motion.p>

            {onRetry && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={onRetry}
                  className="bg-white/10 hover:bg-white/20 text-white"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </motion.div>
            )}
          </motion.div>
        </BaseScene>
      </div>

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
