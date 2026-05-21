export { scanWalletSkill } from "./scan-wallet";
export { treasuryMonitorSkill } from "./treasury-monitor";
export { getReportSkill } from "./get-report";
export { checkAgentSkill } from "./check-agent";

export const x402BooksSkills = [
  require("./scan-wallet").scanWalletSkill,
  require("./treasury-monitor").treasuryMonitorSkill,
  require("./get-report").getReportSkill,
  require("./check-agent").checkAgentSkill,
];
