/**
 * Basic example — run all x402Books skills against a wallet.
 *
 * Usage:
 *   X402BOOKS_API_KEY=xb_live_... ts-node examples/basic-agent.ts
 *
 * Without an API key, runs in demo mode using the x402Books treasury wallet.
 */

import { scanWalletSkill } from "../skills/scan-wallet";
import { treasuryMonitorSkill } from "../skills/treasury-monitor";
import { getReportSkill } from "../skills/get-report";
import { checkAgentSkill } from "../skills/check-agent";

const WALLET = process.env.WALLET ?? "0xb98f0de777eea8c481b64e33d3e0066cea38fa91";

async function main() {
  console.log("x402Books Aeon Skill — Basic Example");
  console.log("=====================================\n");

  console.log("1. Scanning wallet...\n");
  const scan = await scanWalletSkill.run({ address: WALLET, range: "30d" });
  console.log(scan.text);

  console.log("\n2. Treasury health check...\n");
  const treasury = await treasuryMonitorSkill.run({ address: WALLET });
  console.log(treasury.text);

  console.log("\n3. Getting report URL...\n");
  const report = await getReportSkill.run({ address: WALLET });
  console.log(report.text);

  console.log("\n4. Checking agent registry...\n");
  const agent = await checkAgentSkill.run({ name: "Luca" });
  console.log(agent.text);
}

main().catch(console.error);
