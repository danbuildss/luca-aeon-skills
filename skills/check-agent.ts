import { checkAgent } from "../client/x402books";

export const checkAgentSkill = {
  name: "check_agent",
  description:
    "Look up an AI agent in the x402Books Agent Financial Registry. Returns the agent's registered wallets, chain, status, and treasury score if available.",
  input: {
    name: { type: "string", description: "Agent name to search for in the x402Books registry (e.g. 'Luca', 'WAGENT')" },
  },
  run: async ({ name }: { name: string }) => {
    const result = await checkAgent(name);

    if (!result.agents || result.agents.length === 0) {
      return {
        text: `No agent found in x402Books registry for: "${name}"\n\nSubmit an agent at https://www.x402books.xyz/registry`,
        data: result,
      };
    }

    const lines = [
      `x402Books Registry — "${name}"`,
      `Found ${result.agents.length} agent(s):`,
      ``,
      ...result.agents.map((a, i) =>
        [
          `${i + 1}. ${a.name}`,
          `   Wallet: ${a.wallet}`,
          `   Chain:  ${a.chain}`,
          `   Status: ${a.status}`,
          a.treasury_score !== undefined ? `   Treasury Score: ${a.treasury_score}/100` : "",
        ]
          .filter(Boolean)
          .join("\n")
      ),
    ];

    return { text: lines.join("\n"), data: result };
  },
};
