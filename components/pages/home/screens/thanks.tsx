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

const gradients = {
  purple:
    "bg-gradient-to-br from-purple-500/10 to-purple-500/20 hover:from-purple-500/20 hover:to-purple-500/30",
  blue: "bg-gradient-to-br from-blue-500/10 to-blue-500/20 hover:from-blue-500/20 hover:to-blue-500/30",
  green:
    "bg-gradient-to-br from-green-500/10 to-green-500/20 hover:from-green-500/20 hover:to-green-500/30",
  yellow:
    "bg-gradient-to-br from-yellow-500/10 to-yellow-500/20 hover:from-yellow-500/20 hover:to-yellow-500/30",
  pink: "bg-gradient-to-br from-pink-500/10 to-pink-500/20 hover:from-pink-500/20 hover:to-pink-500/30",
  orange:
    "bg-gradient-to-br from-orange-500/10 to-orange-500/20 hover:from-orange-500/20 hover:to-orange-500/30",
};

const activeComponents = [
  {
    id: "largest-transaction",
    title: "Largest Transaction",
    icon: ArrowUpDown,
    gradient: gradients.purple,
  },
  {
    id: "net-position",
    title: "Net Position",
    icon: BarChart3,
    gradient: gradients.blue,
  },
  {
    id: "transaction-count",
    title: "Transaction Count",
    icon: Hash,
    gradient: gradients.green,
  },
  {
    id: "frequent-wallet",
    title: "Frequent Wallet",
    icon: Users,
    gradient: gradients.yellow,
  },
  {
    id: "unique-wallet-transfers",
    title: "Unique Transfers",
    icon: Wallet,
    gradient: gradients.pink,
  },
  {
    id: "starting-balance",
    title: "Starting Balance",
    icon: Coins,
    gradient: gradients.orange,
  },
  {
    id: "most-active-month",
    title: "Most Active Month",
    icon: Calendar,
    gradient: gradients.purple,
  },
  {
    id: "time-on-chain",
    title: "Time On Chain",
    icon: Clock,
    gradient: gradients.blue,
  },
  {
    id: "first-transaction",
    title: "First Transaction",
    icon: CalendarCheck,
    gradient: gradients.green,
  },
  {
    id: "last-transaction",
    title: "Last Transaction",
    icon: CalendarX,
    gradient: gradients.yellow,
  },
  {
    id: "profit-loss",
    title: "Profit & Loss",
    icon: TrendingUp,
    gradient: gradients.pink,
  },
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
          className="w-full space-y-4 bg-black rounded p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl sm:text-[64px] font-bold font-schabo text-white leading-[1.1]"
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
            <span className="text-base p-1.5 rounded-full bg-primary text-black">
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>
      )}

      {/* Animated Share List */}
      <AnimatePresence>
        {shareListOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full bg-black rounded-2xl p-4 border border-white/10"
          >
            <div className="grid grid-cols-3 gap-3 max-h-[70vh] overflow-y-auto scrollbar-hide">
              {activeComponents.map((component, index) => (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn("group relative", {})}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full h-auto p-4 flex flex-col items-center gap-2 rounded-xl border border-white/5",
                      "transition-all duration-300 ease-out",
                      component.gradient
                    )}
                    onClick={() => handleShare(component.id)}
                  >
                    <component.icon className="w-4 h-4 transition-opacity" />
                    <span className="text-[9px] font-medium transition-opacity">
                      {component.title}
                    </span>
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
