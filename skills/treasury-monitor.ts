import { getTreasuryScore } from "../client/x402books";

export const treasuryMonitorSkill = {
  name: "treasury_monitor",
  description:
    "Check treasury health for any Base wallet using x402Books AI. Returns a treasury score, health label, budget status, net flow, and top expense/income categories. Use this to monitor agent or protocol treasury on a schedule.",
  input: {
    address: { type: "string", description: "Base wallet address (0x...)" },
  },
  run: async ({ address }: { address: string }) => {
    const result = await getTreasuryScore(address);
    const s = result.financial_state;

    const lines = [
      `Wallet: ${result.wallet}`,
      result.demo ? `[DEMO MODE — set X402BOOKS_API_KEY for live data]` : "",
      ``,
      `Treasury Health:`,
      `  Score:          ${s.treasury_score}/100`,
      `  Health:         ${s.health_label}`,
      `  Budget Status:  ${s.budget_status}`,
      `  Net Flow (30d): $${s.net_flow_30d.toFixed(2)}`,
      `  x402 Payments:  ${s.x402_payment_count}`,
      `  Top Expense:    ${s.top_expense_category}`,
      `  Top Income:     ${s.top_income_source}`,
    ].filter(Boolean);

    return { text: lines.join("\n"), data: result };
  },
};
