// export interface UserData {
//   account: string;
//   createdAt: string;
//   first_transaction_date: string;
//   isMissing: boolean;
//   last_transaction_date: string;
//   monthly_transaction_count: number;
//   most_active_day: string;
//   most_active_day_count: number;
//   most_active_month: string;
//   net_pnl: number;
//   time_on_chain_days: number;
//   token_balance: number;
//   top_5_transactions_by_category: {
//     manage_sell_offer: number;
//     manage_buy_offer: number;
//     payment: number;
//     change_trust: number;
//   };
//   top_interaction_wallet: string;
//   total_buying_amount: number;
//   total_interaction_count: number;
//   total_received_amount: number;
//   total_selling_amount: number;
//   total_sent_amount: number;
//   total_transactions: number;
//   unique_wallet_transfers: number;
//   updatedAt: string;
// }

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
