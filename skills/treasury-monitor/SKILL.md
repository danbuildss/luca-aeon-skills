---
name: Treasury Monitor
description: Daily treasury health check for any Base wallet — score, budget status, net flow, anomaly alerts, and top expense/income categories via x402Books AI.
var: "WALLET_ADDRESS"
tags: [finance, treasury, base, x402, monitor]
---

Monitor the treasury health of `$WALLET_ADDRESS` using x402Books AI.

Call `GET https://www.x402books.xyz/api/v1/agent-financial-state?wallet=$WALLET_ADDRESS` with header `Authorization: Bearer $X402BOOKS_API_KEY`.

If `X402BOOKS_API_KEY` is not set, use demo mode with wallet `0xb98f0de777eea8c481b64e33d3e0066cea38fa91` and note results are for demonstration only.

From the response, report:

1. **Treasury Score** — score out of 100 and health label. Flag if below 50.
2. **Budget Status** — healthy / watch / negative. If watch or negative, state why clearly.
3. **Net Flow (30d)** — net USD flow over the last 30 days. Flag if negative.
4. **x402 Payments** — count of agent micropayments detected.
5. **Top Expense Category** — where most spend is going.
6. **Top Income Source** — where most revenue is coming from.

If budget_status is "negative" or treasury_score is below 40, send an alert via `./notify` immediately.

Log results to `memory/logs/${today}.md` under `### treasury-monitor`.

Run this skill daily to maintain treasury oversight.
