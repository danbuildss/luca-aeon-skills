---
name: Scan Wallet
description: Full wallet scan via x402Books AI — transaction history, income/spend summary, token portfolio, top counterparties, and a shareable report URL for any Base wallet.
var: "WALLET_ADDRESS"
tags: [finance, wallet, base, x402]
---

Scan the wallet at `$WALLET_ADDRESS` using the x402Books AI API.

Call `GET https://www.x402books.xyz/api/v1/scan?wallet=$WALLET_ADDRESS&range=30d` with header `Authorization: Bearer $X402BOOKS_API_KEY`.

If `X402BOOKS_API_KEY` is not set, use demo mode: call the same endpoint with wallet `0xb98f0de777eea8c481b64e33d3e0066cea38fa91` and note that results are for demonstration only.

From the response, report:

1. **Summary** — total income, total spend, net flow, transaction count, x402 payment count, top spending category, budget status (healthy / watch / negative)
2. **Portfolio** — list each token with inflow, outflow, net flow, and tx count. Highlight agent tokens and stablecoins.
3. **Top Counterparties** — the wallets this address transacts with most.
4. **Report URL** — always include the `report_url` field as a shareable link.

Keep the output scannable. Use a table for portfolio if more than 3 tokens. Flag budget_status = "negative" or "watch" clearly.

Log results to `memory/logs/${today}.md` under `### scan-wallet`.
