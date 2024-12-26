import { formatDate } from "@/utlis";

interface TransactionDetail {
  id: string;
  op_type_int: number;
  op_type_str: string;
  timestamp: string;
  asset_code: string | null;
  amount: number;
}

interface XLMTransaction {
  xlm_asset_code: string;
  xlm_amount: number;
  xlm_op_type_int: number;
  xlm_op_type_str: string;
  tx_id: string;
  tx_time: string;
}

interface NonXLMTransaction {
  nonxlm_asset_code: string;
  nonxlm_amount: number;
  nonxlm_op_type_int: number;
  nonxlm_op_type_str: string;
  tx_id: string;
  tx_time: string;
}

interface TokenTransaction {
  code: string;
  total_buying?: number;
  total_selling?: number;
  total_sent?: number;
  total_received?: number;
}

export interface ActivitySummary {
  account: string;
  balance_diff: number;
  createdAt: string;
  first_transaction_date: string;
  first_txn_time: string;
  isMissing: boolean;
  last_nonxlm_transaction_details: string;
  last_transaction_details: string;
  last_txn_time: string;
  last_xlm_transaction_details: string;
  most_active_day: string;
  most_active_day_count: number;
  most_active_month: string;
  most_active_month_count: number;
  net_pnl: number;
  net_pnl_xlm: number;
  starting_balance: number;
  time_on_chain_days: number;
  token_balance: number;
  top_5_transactions_by_category: string;
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

export interface FormattedActivitySummary {
  account: string;
  is_missing: boolean;
  total_transactions: number;
  total_sent_xlm: number;
  total_received_xlm: number;
  unique_wallet_interactions: number;
  most_active_day: string;
  most_active_day_count: number;
  most_active_month: string;
  most_active_month_count: number;
  top_interaction_wallet: string;
  top_interaction_count: number;
  top_5_transactions_by_category: Array<{ category: string; count: number }>;
  total_selling_xlm: number;
  total_buying_xlm: number;
  net_pnl_xlm: number;
  token_balance: number;
  balance_diff: number;
  starting_balance: number;
  first_txn_time: string;
  last_txn_time: string;
  time_on_chain_days: number;
  last_transaction_details: TransactionDetail;
  last_xlm_transaction_details: TransactionDetail;
  last_nonxlm_transaction_details: TransactionDetail;
  top_largest_xlm: XLMTransaction[];
  top_largest_nonxlm: NonXLMTransaction[];
  top_nonxlm_buying: TokenTransaction[];
  top_nonxlm_selling: TokenTransaction[];
  top_nonxlm_sent: TokenTransaction[];
  top_nonxlm_received: TokenTransaction[];
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
    total_sent_xlm: rawData.total_sent_xlm,
    total_received_xlm: rawData.total_received_xlm,
    unique_wallet_interactions: rawData.unique_wallet_interactions,
    most_active_day: formatDate(rawData.most_active_day),
    most_active_day_count: rawData.most_active_day_count,
    most_active_month: rawData.most_active_month,
    most_active_month_count: rawData.most_active_month_count,
    top_interaction_wallet: rawData.top_interaction_wallet,
    top_interaction_count: rawData.top_interaction_count,
    top_5_transactions_by_category: top5Transactions,
    total_selling_xlm: rawData.total_selling_xlm,
    total_buying_xlm: rawData.total_buying_xlm,
    net_pnl_xlm: rawData.net_pnl_xlm,
    token_balance: rawData.token_balance,
    balance_diff: rawData.balance_diff,
    starting_balance: rawData.starting_balance,
    first_txn_time: formatDate(rawData.first_txn_time),
    last_txn_time: formatDate(rawData.last_txn_time),
    time_on_chain_days: rawData.time_on_chain_days,
    last_transaction_details: JSON.parse(rawData.last_transaction_details),
    last_xlm_transaction_details: JSON.parse(
      rawData.last_xlm_transaction_details
    ),
    last_nonxlm_transaction_details: JSON.parse(
      rawData.last_nonxlm_transaction_details
    ),
    top_largest_xlm: JSON.parse(rawData.top_largest_xlm),
    top_largest_nonxlm: JSON.parse(rawData.top_largest_nonxlm),
    top_nonxlm_buying: JSON.parse(rawData.top_nonxlm_buying),
    top_nonxlm_selling: JSON.parse(rawData.top_nonxlm_selling),
    top_nonxlm_sent: JSON.parse(rawData.top_nonxlm_sent),
    top_nonxlm_received: JSON.parse(rawData.top_nonxlm_received),
    created_at: formatDate(rawData.createdAt),
    updated_at: formatDate(rawData.updatedAt),
  };
};
