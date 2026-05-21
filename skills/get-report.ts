import { getReportUrl } from "../client/x402books";

export const getReportSkill = {
  name: "get_report",
  description:
    "Generate a shareable x402Books financial report URL for any Base wallet. The report includes full transaction history, treasury health, portfolio breakdown, and AI-generated financial summary.",
  input: {
    address: { type: "string", description: "Base wallet address (0x...)" },
  },
  run: async ({ address }: { address: string }) => {
    const result = await getReportUrl(address);

    const lines = [
      `Wallet: ${result.wallet}`,
      result.demo ? `[DEMO MODE — set X402BOOKS_API_KEY for live data]` : "",
      ``,
      `Report URL: ${result.report_url}`,
      ``,
      `Share this link for a full financial breakdown of the wallet.`,
    ].filter(Boolean);

    return { text: lines.join("\n"), data: result };
  },
};
