# Stellar Wrapped 🌟

A web application that provides personalized insights and analytics for Stellar blockchain users, similar to Spotify Wrapped but for your Stellar wallet activity.

## Features 🚀

- **Transaction Analysis**: View your largest transactions, net position, and transaction count
- **Wallet Insights**: Track frequent wallets you interact with and unique wallet transfers
- **Historical Data**: See your starting balance, first transaction, and last transaction
- **Performance Metrics**: Analyze profit/loss and time spent on the Stellar chain
- **Most Active Period**: Discover your most active months on the network
- **Shareable Stats**: Generate and share your blockchain activity insights

## Tech Stack 💻

- **Framework**: Next.js 15.0.4
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: TanStack Query (React Query)
- **UI Components**: 
  - Radix UI
  - Shadcn/UI
  - Embla Carousel
  - Framer Motion
- **Data Visualization**: Recharts
- **Image Generation**: html2canvas, react-to-image
- **Database**: MongoDB with Mongoose
- **Icons**: Lucide React

## Getting Started 🏁

### Prerequisites

- Node.js (version 18 or higher)
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/daccred/stellar-wrapped-ui.git
cd stellar-wrapped
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
# Add your environment variables here
```

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
pnpm build
```

## Project Structure 📁

```
stellar-wrapped/
├── app/                   # Next.js app directory
├── components/           
│   ├── core/             # Core UI components
│   └── stories/          # Story-specific components
├── contexts/             # React contexts
├── lib/                  # Utility functions
├── public/              # Static assets
└── styles/              # Global styles
```

## Story Components 📊

The application includes several story components that provide different insights:

- `LargestTransaction`: Shows your biggest transactions
- `NetPosition`: Displays your overall position on Stellar
- `TransactionCount`: Total number of transactions
- `FrequentWallet`: Most frequently interacted wallets
- `UniqueWalletTransfers`: Number of unique wallets interacted with
- `StartingBalance`: Initial wallet balance
- `MostActiveMonth`: Period with highest activity
- `TimeOnChain`: Total time active on Stellar
- `FirstTransaction`: Details of first transaction
- `LastTransaction`: Most recent transaction
- `ProfitLoss`: Overall profit/loss analysis

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Stellar Development Foundation
- Attest.so
