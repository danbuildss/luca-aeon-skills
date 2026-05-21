import { scanWallet } from "../client/x402books";

export const scanWalletSkill = {
  name: "scan_wallet",
  description:
    "Scan any Base wallet using x402Books AI. Returns transaction history, income/spend summary, token portfolio, top counterparties, and a shareable report URL. Powered by x402Books financial intelligence.",
  input: {
    address: { type: "string", description: "Base wallet address (0x...)" },
    range: { type: "string", description: "Time range: 7d or 30d. Defaults to 30d.", default: "30d" },
  },
  run: async ({ address, range = "30d" }: { address: string; range?: "7d" | "30d" }) => {
    const result = await scanWallet(address, range);

    const lines = [
      `Wallet: ${result.wallet}`,
      `Range: ${result.range}`,
      result.demo ? `[DEMO MODE — set X402BOOKS_API_KEY for live data]` : "",
      ``,
      `Summary:`,
      `  Income:       $${result.summary.total_income.toFixed(2)}`,
      `  Spend:        $${result.summary.total_spend.toFixed(2)}`,
      `  Net Flow:     $${result.summary.net_flow.toFixed(2)}`,
      `  Transactions: ${result.summary.transaction_count}`,
      `  x402 Payments:${result.summary.likely_x402_count}`,
      `  Top Category: ${result.summary.top_category}`,
      `  Status:       ${result.summary.budget_status}`,
      ``,
      `Report: ${result.report_url}`,
    ].filter(Boolean);

    return { text: lines.join("\n"), data: result };
  },
};
