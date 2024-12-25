import { ActivitySummary, formatData, FormattedActivitySummary } from "@/types";
import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export class SummaryService {
  private static SUMMARY_API_BASE = `${API_BASE_URL}/v1/wallet`;

  static async validateWallet(address: string): Promise<boolean> {
    try {
      const { data } = await axios.get<{ data: ActivitySummary | null }>(
        `${this.SUMMARY_API_BASE}/${address}/activity-summary`
      );
      return Boolean(data);
    } catch (error) {
      return false;
    }
  }

  static async getUserSummary(
    address: string
  ): Promise<FormattedActivitySummary> {
    const { data } = await axios.get<ActivitySummary>(
      `${this.SUMMARY_API_BASE}/${address}/activity-summary`
    );

    if (!data) {
      throw new Error("No data available");
    }
    return formatData(data);
  }
}
