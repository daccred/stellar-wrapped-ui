"use client";

import { FallbackComponent } from "@/components/core/fallback-component";
import { LoaderFallback } from "@/components/core/loader-fallback";
import { LargestTransaction } from "@/components/pages/home/screens/largest-transaction";
import { NetPosition } from "@/components/pages/home/screens/net-position";
import { TransactionCount } from "@/components/pages/home/screens/transaction-count";
import { FrequentWallet } from "@/components/pages/home/screens/frequent-wallet";
import { UniqueWalletTransfers } from "@/components/pages/home/screens/unique-wallet-transfers";
import { StartingBalance } from "@/components/pages/home/screens/starting-balance";
import { MostActiveMonth } from "@/components/pages/home/screens/most-active-month";
import { TimeOnChain } from "@/components/pages/home/screens/time-on-chain";
import { FirstTransaction } from "@/components/pages/home/screens/first-transaction";
import { LastTransaction } from "@/components/pages/home/screens/last-transaction";
import { usePublicKey } from "@/contexts/PublicKeyContext";
import { useEffect, useState } from "react";
import { ProfitLoss } from "../home/screens/profile-loss";

interface SharePageProps {
  publicKey: string;
  storyId: string;
}

export default function SharePage({ publicKey, storyId }: SharePageProps) {
  const { userData, isLoading, fetchSharedData, error } = usePublicKey();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    if (publicKey) {
      fetchSharedData(publicKey);
    }
  }, [publicKey]);

  // Ensure the component is running on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isLoading) {
    return <LoaderFallback />;
  }
  if (!isLoading && !userData) {
    return <FallbackComponent />;
  }

  if (error) {
    return <FallbackComponent />;
  }

  // Switch case to render the correct component with its specific props
  const renderStoryComponent = () => {
    switch (storyId) {
      case "largest-transaction":
        return <LargestTransaction />;
      case "net-position":
        return <NetPosition />;
      case "transaction-count":
        return <TransactionCount />;
      case "frequent-wallet":
        return <FrequentWallet />;
      case "unique-wallet-transfers":
        return <UniqueWalletTransfers />;
      case "starting-balance":
        return <StartingBalance />;
      case "most-active-month":
        return <MostActiveMonth />;
      case "time-on-chain":
        return <TimeOnChain />;
      case "first-transaction":
        return <FirstTransaction />;
      case "last-transaction":
        return <LastTransaction />;
      case "profit-loss":
        return <ProfitLoss />;
      default:
        return <FallbackComponent />;
    }
  };

  return renderStoryComponent();
}
