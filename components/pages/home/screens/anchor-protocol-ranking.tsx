"use client";

import { motion } from "framer-motion";
import { BaseScene } from "./base-scene";
import Image from "next/image";
import { StoryHeader } from "@/components/core/header";

interface Protocol {
  name: string;
  interactions: number;
  icon: string;
}

interface AnchorProtocolRankingProps {
  topProtocols: Protocol[];
  otherProtocols: Protocol[];
}

export function AnchorProtocolRanking({
  topProtocols,
  otherProtocols,
}: AnchorProtocolRankingProps) {
  return (
    <BaseScene backgroundImage="/backgrounds/purple-bg.png">
      <div className="w-full space-y-4 text-muted">
        <StoryHeader
          title="ANCHOR/PROTOCOL RANKING"
          chip="Top 3 Most-Used Anchors/Protocols"
          chipDisplay="text"
        />

        <div className="space-y-4 border-b border-black pb-4">
          {topProtocols.map((protocol, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Image
                  src={protocol.icon}
                  alt={protocol.name}
                  width={24}
                  height={24}
                  unoptimized
                  className="w-6 h-6 shrink-0 text-xs"
                />
              </div>
              <div>
                <div className="font-medium text-muted">{protocol.name}</div>
                <div className="text-sm text-muted-foreground">
                  {protocol.interactions} interactions
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-sm font-medium text-muted">
            Other Frequently Used Protocols
          </h2>
          {otherProtocols.map((protocol, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Image
                  src={protocol.icon}
                  alt={protocol.name}
                  width={24}
                  height={24}
                  unoptimized
                  className="w-6 h-6 shrink-0 text-xs"
                />
              </div>
              <div>
                <div className="font-medium text-muted">{protocol.name}</div>
                <div className="text-sm text-muted-foreground">
                  {protocol.interactions} interactions
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </BaseScene>
  );
}
