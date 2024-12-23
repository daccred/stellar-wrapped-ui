"use client";

import { StoryViewer } from "@/components/core/story-viewer";
import WalletInput from "./screens/wallet-input";
import { WelcomeMessage } from "./screens/welcome-message";
import { TransactionCount } from "./screens/transaction-count";
import { NetPosition } from "./screens/net-position";
import { TopProtocols } from "./screens/top-protocols";
import { LargestTransaction } from "./screens/largest-transaction";
import { useState } from "react";
import { IntroScreen } from "./screens/intro-screen";
import { FrequentWallet } from "./screens/frequent-wallet";
import { ProfitLoss } from "./screens/profile-loss";
import { HoldingDuration } from "./screens/holding-duration";
import { TokenOwnership } from "./screens/token-ownership";
import { ActiveLPs } from "./screens/active-lps";
import { NFTSpending } from "./screens/nft-spending";
import { TimeOnChain } from "./screens/time-on-chain";
import { FirstTransaction } from "./screens/first-transaction";
import { AnchorProtocolRanking } from "./screens/anchor-protocol-ranking";
import { RepeatInteractions } from "./screens/repeat-interactions";
import { TokenBuySellRatios } from "./screens/token-buy-sell-ratios";
import { StakingRewards } from "./screens/staking-rewards";
import { CrossChainActivity } from "./screens/cross-chain-activity";
import {
  crossChainData,
  interactionData,
  protocolData,
  stakingData,
  tokenRatioData,
} from "@/utlis/static";
import { Thanks } from "./screens/thanks";

export default function HomePage() {
  const [username] = useState("");

  // Mock data based on the design
  const frequentWallets = [
    {
      address: "GABCD4...567890",
      totalTransactions: 15,
      totalAmount: 8200,
    },
    {
      address: "GABCD4...567890",
      totalTransactions: 12,
      totalAmount: 5100,
    },
  ];

  const protocols = [
    { name: "cables", usage: 30, icon: "/icons/cables.png" },
    { name: "zkcross", usage: 45, icon: "/icons/zkcross.png" },
    { name: "StellarX", usage: 30, icon: "/icons/stellarx.png" },
    { name: "Soroswap", usage: 40, icon: "/icons/soroswap.png" },
    { name: "FxDAO", usage: 20, icon: "/icons/fxdao.png" },
    { name: "Lumenswap", usage: 62, icon: "/icons/lumenswap.png" },
    { name: "Blend", usage: 70, icon: "/icons/blend.png" },
  ];

  const pnlData = {
    overallPnl: 7250,
    topPerformers: [
      {
        symbol: "USDC",
        icon: "/icons/usdc.png",
        amount: 3500,
        percentageChange: 10,
        quantity: 2,
      },
      {
        symbol: "AQUA",
        icon: "/icons/aqua.png",
        amount: 2000,
        percentageChange: 15,
        quantity: 5000,
      },
      {
        symbol: "XLM",
        icon: "/icons/xlm.png",
        amount: 5300,
        percentageChange: 25,
        quantity: 5000,
      },
    ],
    worstPerformers: [
      {
        symbol: "xRF",
        icon: "/icons/xrf.png",
        amount: 1000,
        percentageChange: -8,
        quantity: 20000,
      },
    ],
  };

  const holdingData = {
    averageDuration: 9.75,
    tokens: [
      { symbol: "USDC", icon: "/icons/usdc.png", duration: 18 },
      { symbol: "YBX", icon: "/icons/ybx.png", duration: 12 },
      { symbol: "XLM", icon: "/icons/xlm.png", duration: 6 },
      { symbol: "EURT", icon: "/icons/eurt.png", duration: 3 },
    ],
    gasFees: {
      actual: 450,
      savings: 30,
      optimizations:
        "Batch transactions and gas-efficient protocols like Arbitrum. USDC",
    },
  };

  const transactionCategories = [
    { name: "Swaps", count: 45 },
    { name: "Token Transfers", count: 20 },
    { name: "NFT Transactions", count: 25 },
    { name: "Staking", count: 10 },
    { name: "DeFi Interactions", count: 12 },
  ];

  const lpData = {
    pools: [
      {
        name: "USDC/ETH Pool (Uniswap v3)",
        icons: ["/icons/usdc.png", "/icons/eth.png"],
        totalStaked: {
          amount: 5000,
          token: "USDC",
          profitLoss: "+3 ETH",
        },
        stats: {
          fee: "0.3%",
          apy: "18%",
        },
      },
      {
        name: "MATIC/USDC Pool (SushiSwap)",
        icons: ["/icons/matic.png", "/icons/usdc.png"],
        totalStaked: {
          amount: 2000,
          token: "MATIC",
          profitLoss: "+1,000 USDC",
        },
        stats: {
          apy: "22%",
        },
      },
      {
        name: "BTC/USDT Pool (Curve Finance)",
        icons: ["/icons/btc.png", "/icons/usdt.png"],
        totalStaked: {
          amount: 0.2,
          token: "BTC",
          profitLoss: "+5,000 USDT",
        },
        stats: {
          apy: "10%",
        },
      },
    ],
    poolCount: 3,
  };

  const nftData = {
    totalSpent: 18500,
    categories: [
      { name: "Art", amount: 8000, percentage: 43 },
      { name: "Gaming", amount: 5000, percentage: 27 },
      { name: "PFP", amount: 3500, percentage: 19 },
      { name: "Metaverse Assets", amount: 2000, percentage: 11 },
    ],
    bestProfit: {
      name: "CryptoDoodle #245",
      collection: "CryptoDoodles",
      purchasePrice: 1200,
      salePrice: 5000,
      profit: 3800,
      saleDate: "October 15, 2023",
      transactionHash: "0xabcdef0567890234",
    },
  };

  const timeData = {
    activationDate: "January 15, 2021",
    totalTime: "3 years, 11 months",
    milestones: [
      {
        name: "First DeFi Interaction",
        date: "March 20, 2021",
        details: "Staking on Uniswap",
      },
      {
        name: "First NFT Purchase",
        date: "June 5, 2021",
        details: "CryptoDoodles #245",
      },
      {
        name: "First Cross-Chain Transfer",
        date: "August 12, 2022",
        details: "ETH to Polygon Bridge",
      },
    ],
  };

  const firstTransactionData = {
    date: "January 15, 2021",
    details: {
      type: "Wallet funding (deposit)",
      amount: "500 USDC",
      hash: "0x1234abc567890def",
      sourceAddress: "Centralized Exchange Wallet",
      gasFee: "5 USDC",
    },
  };

  const tokenData = [
    {
      symbol: "USDC",
      percentage: 40,
      amount: "2 ETH",
      value: "~6,800 USDC",
      icon: "/icons/usdc.png",
      color: "#2775CA",
    },
    {
      symbol: "MATIC",
      percentage: 25,
      amount: "5,000 MATIC",
      value: "~4,250 USDC",
      icon: "/icons/matic.png",
      color: "#8247E5",
    },
    {
      symbol: "DOGE",
      percentage: 15,
      amount: "20,000 DOGE",
      value: "~2,550 USDC",
      icon: "/icons/doge.png",
      color: "#BA9F33",
    },
    {
      symbol: "USDT",
      percentage: 20,
      amount: "5,000 USDT",
      value: "~5,000 USDC",
      icon: "/icons/usdt.png",
      color: "#26A17B",
    },
  ];

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
      component: <WelcomeMessage username={username} />,
      requiresPublicKey: true,
      isShare: false,
      excludeScreenshot: true,
    },
    {
      id: "largest-transaction",
      component: (
        <LargestTransaction
          amount={42000}
          usdcAmount={12.5}
          date="August 15, 2023"
          mostActiveDay={{
            date: "8/5/2023",
            totalTransactions: 28,
            totalVolume: 7300,
          }}
        />
      ),
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "net-position",
      component: (
        <NetPosition sent={20300} received={15600} netPosition={-4700} />
      ),
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "transaction-count",
      component: (
        <TransactionCount
          totalCount={112}
          dateRange="January 2023 - November 2023"
          categories={transactionCategories}
        />
      ),
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "frequent-wallet",
      component: <FrequentWallet wallets={frequentWallets} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "top-protocols",
      component: <TopProtocols protocols={protocols} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "profit-loss",
      component: <ProfitLoss {...pnlData} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "holding-duration",
      component: <HoldingDuration {...holdingData} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "token-ownership",
      component: <TokenOwnership tokens={tokenData} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "active-lps",
      component: <ActiveLPs {...lpData} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "nft-spending",
      component: <NFTSpending {...nftData} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "time-on-chain",
      component: <TimeOnChain {...timeData} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "first-transaction",
      component: <FirstTransaction {...firstTransactionData} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "anchor-protocol-ranking",
      component: <AnchorProtocolRanking {...protocolData} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "repeat-interactions",
      component: <RepeatInteractions data={interactionData} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "token-buy-sell-ratios",
      component: <TokenBuySellRatios {...tokenRatioData} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "staking-rewards",
      component: <StakingRewards {...stakingData} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "cross-chain-activity",
      component: <CrossChainActivity {...crossChainData} />,
      requiresPublicKey: true,
      isShare: true,
      excludeScreenshot: false,
    },
    {
      id: "thanks",
      component: <Thanks />,
      requiresPublicKey: true,
      isShare: false,
      excludeScreenshot: false,
    },
  ];

  return <StoryViewer stories={stories} />;
}
