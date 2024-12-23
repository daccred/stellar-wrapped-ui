export const protocolData = {
  topProtocols: [
    { name: "Uniwap", interactions: 65, icon: "/icons/uniwap.png" },
    { name: "OpenSea", interactions: 40, icon: "/icons/opensea.png" },
    { name: "Aave", interactions: 25, icon: "/icons/aave.png" },
  ],
  otherProtocols: [
    { name: "Curve", interactions: 15, icon: "/icons/curve.png" },
    { name: "SushiSwap", interactions: 10, icon: "/icons/sushi.png" },
    { name: "Soroban Wallet", interactions: 8, icon: "/icons/soroban.png" },
  ],
};

export const interactionData = {
  walletAddress: "0xabcdef123456789",
  walletEngagements: "18 (12 sends, 6 receives)",
  contractAddress: "S3R0B4N-C0NT-ACT123",
  contractEngagements: "12 (staking and swaps)",
  dapp: "OpenSea",
  dappEngagements: "10 (NFT purchases and sales)",
  totalInteractions: "155 (overlapping across wallets, dApps, and contracts)",
};

export const tokenRatioData = {
  overallRatio: "1.5:1",
  tokens: [
    {
      symbol: "ETH",
      icon: "/icons/eth.png",
      buys: { count: 40, percentage: 80 },
      sells: { count: 10, percentage: 20 },
      ratio: "4:1",
    },
    {
      symbol: "MATIC",
      icon: "/icons/matic.png",
      buys: { count: 50, percentage: 71 },
      sells: { count: 20, percentage: 29 },
      ratio: "2.5:1",
    },
    {
      symbol: "DOGE",
      icon: "/icons/doge.png",
      buys: { count: 30, percentage: 60 },
      sells: { count: 20, percentage: 40 },
      ratio: "1.5:1",
    },
  ],
};

export const stakingData = {
  totalStaked: 12500,
  tokens: [
    {
      symbol: "USDT",
      staked: 6000,
      rewards: { amount: 450, apy: "7.5%" },
    },
    {
      symbol: "ETH",
      staked: 3500,
      rewards: { amount: 280, apy: "8%" },
    },
    {
      symbol: "MATIC",
      staked: 3000,
      rewards: { amount: 240, apy: "8%" },
    },
  ],
  totalRewardsEarned: 970,
};

export const crossChainData = {
  chains: [
    { name: "Ethereum", percentage: 85, icon: "/icons/ethereum.png" },
    { name: "Polygon", percentage: 10, icon: "/icons/polygon.png" },
    {
      name: "Binance Smart Chain (BSC)",
      percentage: 5,
      icon: "/icons/bsc.png",
    },
  ],
  transfers: [
    {
      from: {
        name: "Ethereum",
        icon: "/icons/ethereum.png",
      },
      to: {
        name: "Polygon",
        icon: "/icons/polygon.png",
      },
      amount: "5,000 MATIC",
      value: "~2,100 USDC value",
    },
    {
      from: {
        name: "Ethereum",
        icon: "/icons/ethereum.png",
      },
      to: {
        name: "BSC",
        icon: "/icons/bsc.png",
      },
      amount: "1 ETH",
      value: "~1,800 USDC value",
    },
  ],
};
