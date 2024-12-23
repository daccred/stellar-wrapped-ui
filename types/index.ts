export interface UserData {
  account: string;
  createdAt: string;
  first_transaction_date: string;
  isMissing: boolean;
  last_transaction_date: string;
  monthly_transaction_count: number;
  most_active_day: string;
  most_active_day_count: number;
  most_active_month: string;
  net_pnl: number;
  time_on_chain_days: number;
  token_balance: number;
  top_5_transactions_by_category: {
    manage_sell_offer: number;
    manage_buy_offer: number;
    payment: number;
    change_trust: number;
  };
  top_interaction_wallet: string;
  total_buying_amount: number;
  total_interaction_count: number;
  total_received_amount: number;
  total_selling_amount: number;
  total_sent_amount: number;
  total_transactions: number;
  unique_wallet_transfers: number;
  updatedAt: string;
}
