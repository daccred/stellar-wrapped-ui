"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShareModal } from "@/components/core/share-modal";
import {
  ArrowUpDown,
  BarChart3,
  Hash,
  Users,
  Wallet,
  Coins,
  Calendar,
  Clock,
  CalendarCheck,
  CalendarX,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const activeComponents = [
  { id: "largest-transaction", title: "LargestTransaction", icon: ArrowUpDown },
  { id: "net-position", title: "NetPosition", icon: BarChart3 },
  { id: "transaction-count", title: "TransactionCount", icon: Hash },
  { id: "frequent-wallet", title: "FrequentWallet", icon: Users },
  {
    id: "unique-wallet-transfers",
    title: "UniqueWalletTransfers",
    icon: Wallet,
  },
  { id: "starting-balance", title: "StartingBalance", icon: Coins },
  { id: "most-active-month", title: "MostActiveMonth", icon: Calendar },
  { id: "time-on-chain", title: "TimeOnChain", icon: Clock },
  { id: "first-transaction", title: "FirstTransaction", icon: CalendarCheck },
  { id: "last-transaction", title: "LastTransaction", icon: CalendarX },
  { id: "profit-loss", title: "ProfitLoss", icon: TrendingUp },
];
export function Thanks() {
  const [shareListOpen, setShareListOpen] = useState<boolean>(false);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  const handleShare = (storyId: string) => {
    setSelectedStory(storyId);
  };

  return (
    <BaseScene backgroundImage="/backgrounds/dotted-yellow-bg.png" isCenter>
      {!shareListOpen && (
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
            onClick={() => setShareListOpen(true)}
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
      )}

      {/* Animated Share List */}
      <AnimatePresence>
        {shareListOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="flex flex-col gap-4 items-center justify-center p-4 rounded bg-black relative z-50"
          >
            <div className="grid grid-cols-2 gap-4 overflow-y-auto [&::-webkit-scrollbar]:hidden place-content-center">
              {activeComponents.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn("flex flex-col items-center justify-center", {
                    "col-span-2": index === 10,
                  })}
                >
                  <Button
                    variant="outline"
                    className="w-full text-xs bg-white/10 border-white/20 backdrop-blur-sm text-white hover:bg-white/20 flex flex-col items-center justify-center h-20 rounded-xl"
                    onClick={() => handleShare(story.id)}
                  >
                    <story.icon className="w-5 h-5 mr-3" />
                    {story.title}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      {selectedStory && (
        <ShareModal
          storyId={selectedStory}
          open={!!selectedStory}
          isLinkOnly
          onOpenChange={() => setSelectedStory(null)}
        />
      )}
    </BaseScene>
  );
}
