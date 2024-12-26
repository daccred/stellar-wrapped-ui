"use client";

import { StoryViewer } from "@/components/core/story-viewer";
import WalletInput from "./screens/wallet-input";
import { WelcomeMessage } from "./screens/welcome-message";
import { TransactionCount } from "./screens/transaction-count";
import { NetPosition } from "./screens/net-position";
import { LargestTransaction } from "./screens/largest-transaction";
import { useEffect, useState } from "react";
import { IntroScreen } from "./screens/intro-screen";
import { FrequentWallet } from "./screens/frequent-wallet";
import { ProfitLoss } from "./screens/profile-loss";
import { TimeOnChain } from "./screens/time-on-chain";
import { FirstTransaction } from "./screens/first-transaction";
import { Thanks } from "./screens/thanks";
import { UniqueWalletTransfers } from "./screens/unique-wallet-transfers";
import { usePublicKey } from "@/contexts/PublicKeyContext";
import { LoaderFallback } from "@/components/core/loader-fallback";
import { LastTransaction } from "./screens/last-transaction";
import { MostActiveMonth } from "./screens/most-active-month";
import { StartingBalance } from "./screens/starting-balance";
import { AuthErrorState } from "@/components/core/error-state";

export default function HomePage() {
  const { userData, isLoading, error, retry } = usePublicKey();
  // get the user data from this context after fetching the data
  const [isClient, setIsClient] = useState<boolean>(false);

  const stories = [
    {
      id: "wallet-input",
      component: <WalletInput />,
      isShare: false,
      requiresPublicKey: false,
      excludeScreenshot: true,
    },
    {
      id: "intro",
      component: <IntroScreen />,
      requiresPublicKey: true,
      isShare: false,
      excludeScreenshot: true,
    },
    {
      id: "welcome",
      component: <WelcomeMessage />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: true,
    },
    {
      id: "largest-transaction",
      component: <LargestTransaction />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "net-position",
      component: <NetPosition />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "transaction-count",
      component: <TransactionCount />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "frequent-wallet",
      component: <FrequentWallet />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "unique-wallet-transfers",
      component: <UniqueWalletTransfers />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "starting-balance",
      component: <StartingBalance />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "transaction-count",
      component: <MostActiveMonth />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    // {
    //   id: "top-protocols",
    //   component: <TopProtocols protocols={protocols} />,
    //   requiresPublicKey: true,
    //   isShare: true,
    //   excludeScreenshot: false,
    // },
    // {
    //   id: "holding-duration",
    //   component: <HoldingDuration {...holdingData} />,
    //   requiresPublicKey: true,
    //   isShare: true,
    //   excludeScreenshot: false,
    // },
    // {
    //   id: "token-ownership",
    //   component: <TokenOwnership tokens={tokenData} />,
    //   requiresPublicKey: true,
    //   isShare: true,
    //   excludeScreenshot: false,
    // },
    // {
    //   id: "active-lps",
    //   component: <ActiveLPs {...lpData} />,
    //   requiresPublicKey: true,
    //   isShare: true,
    //   excludeScreenshot: false,
    // },
    // {
    //   id: "nft-spending",
    //   component: <NFTSpending {...nftData} />,
    //   requiresPublicKey: true,
    //   isShare: true,
    //   excludeScreenshot: false,
    // },
    {
      id: "time-on-chain",
      component: <TimeOnChain />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "first-transaction",
      component: <FirstTransaction />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "last-transaction",
      component: <LastTransaction />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "profit-loss",
      component: <ProfitLoss />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    // {
    //   id: "anchor-protocol-ranking",
    //   component: <AnchorProtocolRanking {...protocolData} />,
    //   requiresPublicKey: true,
    //   isShare: true,
    //   excludeScreenshot: false,
    // },
    // {
    //   id: "repeat-interactions",
    //   component: <RepeatInteractions data={interactionData} />,
    //   requiresPublicKey: true,
    //   isShare: true,
    //   excludeScreenshot: false,
    // },
    // {
    //   id: "token-buy-sell-ratios",
    //   component: <TokenBuySellRatios {...tokenRatioData} />,
    //   requiresPublicKey: true,
    //   isShare: true,
    //   excludeScreenshot: false,
    // },
    // {
    //   id: "staking-rewards",
    //   component: <StakingRewards {...stakingData} />,
    //   requiresPublicKey: true,
    //   isShare: true,
    //   excludeScreenshot: false,
    // },
    // {
    //   id: "cross-chain-activity",
    //   component: <CrossChainActivity {...crossChainData} />,
    //   requiresPublicKey: true,
    //   isShare: true,
    //   excludeScreenshot: false,
    // },
    {
      id: "thanks",
      component: <Thanks />,
      requiresPublicKey: true,
      isShare: false,
      excludeScreenshot: false,
    },
  ];

  // Ensure the component is running on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isLoading) {
    return <LoaderFallback />;
  }

  if (error) {
    return (
      <AuthErrorState
        title="Something went wrong!"
        message="We encountered an error while processing your request. Please try again."
        onRetry={retry}
      />
    );
  }

  return <StoryViewer stories={stories} />;
}
