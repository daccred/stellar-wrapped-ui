
import { formatDate, formatNumber } from "@/utlis";
export interface UserData {
  account: string;
  balance_diff: number; // New field
  createdAt: string;
  first_transaction_date: string; // Renamed to first_txn_time
  first_txn_time: string; // New field
  isMissing: boolean;
  last_nonxlm_transaction_details: string; // New field
  last_transaction_details: string;
  last_txn_time: string; // New field (Renamed to last_txn_time)
  last_xlm_transaction_details: string; // New field
  most_active_day: string;
  most_active_day_count: number;
  most_active_month: string;
  most_active_month_count: number; // Renamed from most_active_month_count
  net_pnl: number; // Renamed to net_pnl_xlm
  net_pnl_xlm: number; // New field
  starting_balance: number; // New field
  time_on_chain_days: number;
  token_balance: number;
  top_5_transactions_by_category: string; // Keep as string, or can be adjusted to object for better typing
  top_interaction_count: number;
  top_interaction_wallet: string;
  top_largest_nonxlm: string;
  top_largest_xlm: string;
  top_nonxlm_buying: string;
  top_nonxlm_received: string;
  top_nonxlm_selling: string;
  top_nonxlm_sent: string;
  total_buying_xlm: number;
  total_received_xlm: number;
  total_selling_xlm: number;
  total_sent_xlm: number;
  total_transactions: number;
  unique_wallet_interactions: number;
  updatedAt: string;
}

export interface ActivitySummary {
  account: string;
  isMissing: boolean;
  total_transactions: number;
  total_sent_amount: number;
  total_received_amount: number;
  unique_wallet_transfers: number;
  most_active_day: string;
  most_active_day_count: number;
  most_active_month: string;
  monthly_transaction_count: number;
  top_interaction_wallet: string;
  total_interaction_count: number;
  top_5_transactions_by_category: string;
  total_selling_amount: number;
  total_buying_amount: number;
  net_pnl: number;
  token_balance: number;
  first_transaction_date: string;
  last_transaction_date: string;
  time_on_chain_days: number;
  createdAt: string;
  updatedAt: string;
}

export interface FormattedActivitySummary {
  account: string;
  is_missing: boolean;
  total_transactions: number;
  total_sent_amount: number;
  total_received_amount: number;
  unique_wallet_transfers: number;
  most_active_day: string;
  most_active_day_count: number;
  most_active_month: string;
  monthly_transaction_count: number;
  top_interaction_wallet: string;
  total_interaction_count: number;
  top_5_transactions_by_category: Array<{ category: string; count: number }>;
  total_selling_amount: number;
  total_buying_amount: number;
  net_pnl: number;
  token_balance: number;
  first_transaction_date: string;
  last_transaction_date: string;
  time_on_chain_days: number;
  created_at: string;
  updated_at: string;
}

export const formatData = (
  rawData: ActivitySummary
): FormattedActivitySummary => {
  const top5Transactions = rawData.top_5_transactions_by_category
    .split(", ")
    .map((item) => {
      const [category, count] = item.split(": ");
      return { category, count: parseInt(count, 10) };
    });

  return {
    account: rawData.account,
    is_missing: rawData.isMissing,
    total_transactions: rawData.total_transactions,
    total_sent_amount: rawData.total_sent_amount,
    total_received_amount: rawData.total_received_amount,
    unique_wallet_transfers: rawData.unique_wallet_transfers,
    most_active_day: formatDate(rawData.most_active_day),
    most_active_day_count: rawData.most_active_day_count,
    most_active_month: rawData.most_active_month,
    monthly_transaction_count: rawData.monthly_transaction_count,
    top_interaction_wallet: rawData.top_interaction_wallet,
    total_interaction_count: rawData.total_interaction_count,
    top_5_transactions_by_category: top5Transactions,
    total_selling_amount: rawData.total_selling_amount,
    total_buying_amount: rawData.total_buying_amount,
    net_pnl: rawData.net_pnl,
    token_balance: rawData.token_balance,
    first_transaction_date: formatDate(rawData.first_transaction_date),
    last_transaction_date: formatDate(rawData.last_transaction_date),
    time_on_chain_days: rawData.time_on_chain_days,
    created_at: formatDate(rawData.createdAt),
    updated_at: formatDate(rawData.updatedAt),
  };
};
