"use client"

import { motion } from 'framer-motion'
import { BaseScene } from './base-scene'
import Image from 'next/image'
import { StoryHeader } from '@/components/core/header'

interface Protocol {
  name: string
  usage: number
  icon: string
}

interface TopProtocolsProps {
  protocols: Protocol[]
}

export function TopProtocols({ protocols }: TopProtocolsProps) {
  return (
    <BaseScene backgroundImage="/backgrounds/top-protocol-bg.png">
      <div className="w-full text-muted">
        <StoryHeader
          title="YOUR TOP PROTOCOLS"
          chip="You're a DEX/DeFi Power User!"
          chipDisplay="chip"
        />

        <div className="space-y-4">
          {protocols.map((protocol, index) => (
            <motion.div
              key={protocol.name}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Image
                src={protocol.icon}
                alt={protocol.name}
                width={40}
                height={40}
                className="rounded-xl text-sm"
                unoptimized
              />
              <div className="flex-1">
                <div className="font-medium text-muted">{protocol.name}</div>
                <div className="text-sm text-muted/50">
                  {protocol.usage}% of usage
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BaseScene>
  );
}

