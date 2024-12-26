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
import { FormattedActivitySummary } from "@/types";
import { LastTransaction } from "./screens/last-transaction";
import { MostActiveMonth } from "./screens/most-active-month";

export default function HomePage() {
  const { userData, isLoading, error } = usePublicKey();
  // get the user data from this context after fetching the data
  const [isClient, setIsClient] = useState<boolean>(false);
  const firstTransactionDate = userData?.first_transaction_date
    ? new Date(userData.first_transaction_date)
    : null;
  const lastTransactionDate = userData?.last_transaction_date
    ? new Date(userData.last_transaction_date)
    : null;

  let dateRange = "";
  if (firstTransactionDate && lastTransactionDate) {
    dateRange = `${firstTransactionDate.toLocaleString("default", {
      month: "long",
    })} ${firstTransactionDate.getFullYear()} - ${lastTransactionDate.toLocaleString(
      "default",
      { month: "long" }
    )} ${lastTransactionDate.getFullYear()}`;
  } else {
    // Handle the case where one or both dates are missing
    dateRange = "No transaction data available";
  }

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
      isShare: true,
      excludeScreenshot: true,
    },
    {
      id: "welcome",
      component: <WelcomeMessage username={userData?.account || ""} />,
      requiresPublicKey: true,
      isShare: false,
      excludeScreenshot: true,
    },
    {
      id: "largest-transaction",
      component: <LargestTransaction data={userData} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "net-position",
      component: <NetPosition data={userData} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "transaction-count",
      component: (
        <TransactionCount
          totalCount={userData?.total_transactions || 0}
          dateRange={dateRange}
          categories={userData?.top_5_transactions_by_category || []}
        />
      ),
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "frequent-wallet",
      component: (
        <FrequentWallet
          top_interaction_wallet={userData?.top_interaction_wallet || ""}
        />
      ),
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "unique-wallet-transfers",
      component: (
        <UniqueWalletTransfers {...(userData as FormattedActivitySummary)} />
      ),
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "transaction-count",
      component: (
        <MostActiveMonth
          most_active_month={userData?.most_active_month || ""}
          monthly_transaction_count={userData?.monthly_transaction_count || 0}
        />
      ),
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
      component: (
        <TimeOnChain
          time_on_chain_days={userData?.time_on_chain_days || 0}
          total_interaction_count={userData?.total_interaction_count || 0}
        />
      ),
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "first-transaction",
      component: (
        <FirstTransaction
          first_transaction_date={userData?.first_transaction_date || ""}
        />
      ),
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "last-transaction",
      component: (
        <LastTransaction
          last_transaction_date={userData?.last_transaction_date || ""}
        />
      ),
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "profit-loss",
      component: <ProfitLoss net_pnl={userData?.net_pnl || 0} />,
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
  console.log(isLoading, userData);
  if (!isClient || isLoading) {
    return <LoaderFallback />;
  }

  return <StoryViewer stories={stories} />;
}
