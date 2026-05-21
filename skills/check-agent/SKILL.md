---
name: Check Agent
description: Look up any AI agent in the x402Books Agent Financial Registry — registered wallets, chain, status, and treasury score.
var: "AGENT_NAME"
tags: [finance, registry, agent, base, x402]
---

Look up `$AGENT_NAME` in the x402Books Agent Financial Registry.

Call `GET https://www.x402books.xyz/api/registry/agents?search=$AGENT_NAME`.

No API key required — the registry is public.

From the response, report:

1. **Agent Name** — confirmed name from the registry.
2. **Wallet** — registered wallet address.
3. **Chain** — which chain the agent operates on.
4. **Status** — active, pending, or inactive.
5. **Treasury Score** — score out of 100 if available.

If no agent is found, respond: "No agent named '$AGENT_NAME' found in the x402Books registry. Submit at https://www.x402books.xyz/registry"

Use this skill to verify agent identity before transacting with or delegating to another agent.

Log results to `memory/logs/${today}.md` under `### check-agent`.
