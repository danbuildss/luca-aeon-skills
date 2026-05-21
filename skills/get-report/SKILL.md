---
name: Get Report
description: Generate a shareable x402Books AI financial report URL for any Base wallet — full transaction history, treasury health, portfolio breakdown, and AI financial summary.
var: "WALLET_ADDRESS"
tags: [finance, report, base, x402]
---

Generate a shareable financial report for `$WALLET_ADDRESS` using x402Books AI.

Call `GET https://www.x402books.xyz/api/v1/scan?wallet=$WALLET_ADDRESS&range=30d` with header `Authorization: Bearer $X402BOOKS_API_KEY`.

Extract the `report_url` field from the response.

Output:

1. **Report URL** — the full shareable link to the x402Books financial report.
2. **One-line summary** — budget status and net flow in one sentence.

The report URL can be shared with operators, investors, or other agents for a full financial breakdown. It is publicly accessible — no login required.

If no API key is set, return: `https://www.x402books.xyz/report/0xb98f0de777eea8c481b64e33d3e0066cea38fa91` as a demo report.

Log the URL to `memory/logs/${today}.md` under `### get-report`.
