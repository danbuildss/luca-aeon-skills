# Luca Aeon Skills

**Financial intelligence skills for [Aeon](https://aeonframework.xyz) agents — powered by [x402Books AI](https://www.x402books.xyz).**

```bash
./add-skill danbuildss/luca-aeon-skills --all
```

Two skills land in your Aeon fork:
- `scan_wallet` → full wallet scan, transaction classification, portfolio breakdown
- `treasury_monitor` → treasury health score, budget status, anomaly alerts

Plus two supporting skills:
- `get_report` → shareable x402Books financial report URL
- `check_agent` → look up any agent in the x402Books Financial Registry

The financial layer for Aeon operators.

---

## Quickstart

**No API key needed** — runs in demo mode by default using the x402Books treasury wallet so you can test with zero setup.

```bash
git clone https://github.com/danbuildss/luca-aeon-skills
cd luca-aeon-skills
npm install
ts-node examples/basic-agent.ts
```

For live data, add your API key:

```bash
X402BOOKS_API_KEY=xb_live_... ts-node examples/basic-agent.ts
```

Get an API key at [x402books.xyz](https://www.x402books.xyz/developer).

---

## Skills

### `scan_wallet`

Scan any Base wallet. Returns income, spend, net flow, transaction count, x402 payment count, top category, token portfolio, counterparties, and a shareable report URL.

```typescript
import { scanWalletSkill } from "@x402books/luca-aeon-skills";

const result = await scanWalletSkill.run({
  address: "0xYourWallet",
  range: "30d", // or "7d"
});

console.log(result.text);
// Wallet: 0x...
// Income:       $1,240.00
// Spend:        $380.00
// Net Flow:     $860.00
// Transactions: 47
// x402 Payments:12
// Status:       healthy
// Report: https://www.x402books.xyz/report/0x...
```

---

### `treasury_monitor`

Get treasury health for any wallet. Returns a score out of 100, health label, budget status, net flow, and top expense/income categories. Use this on a schedule to monitor agent treasuries.

```typescript
import { treasuryMonitorSkill } from "@x402books/luca-aeon-skills";

const result = await treasuryMonitorSkill.run({
  address: "0xYourWallet",
});

console.log(result.text);
// Treasury Score:  82/100
// Health:          Strong
// Budget Status:   healthy
// Net Flow (30d):  $860.00
// x402 Payments:   12
// Top Expense:     infrastructure
// Top Income:      api_revenue
```

---

### `get_report`

Generate a shareable x402Books financial report URL for any wallet.

```typescript
import { getReportSkill } from "@x402books/luca-aeon-skills";

const result = await getReportSkill.run({ address: "0xYourWallet" });
// Report URL: https://www.x402books.xyz/report/0x...
```

---

### `check_agent`

Look up an agent in the x402Books Agent Financial Registry.

```typescript
import { checkAgentSkill } from "@x402books/luca-aeon-skills";

const result = await checkAgentSkill.run({ name: "Luca" });
// 1. Luca
//    Wallet: 0xb98f...
//    Chain:  base
//    Status: active
//    Treasury Score: 82/100
```

---

## Pricing

| Tier | Access |
|------|--------|
| Demo mode | Free — no key needed, uses demo wallet |
| API key | Full live data — get key at x402books.xyz/developer |
| $LUCA holders | Free tier — hold ≥1,000 $LUCA on Base |

$LUCA: `0xb2b335f832fd3f43461ebd1cd9831d93d9ca4ba3` on Base

---

## Use all skills together

```typescript
import { x402BooksSkills } from "@x402books/luca-aeon-skills";

// Register all skills with your Aeon agent
const agent = new AeonAgent({
  skills: x402BooksSkills,
});
```

---

## Agent Identity

Luca (the x402Books AI agent) has a verified wallet manifest and GitLawb DID:

- Manifest: [github.com/danbuildss/agent-wallet-manifest](https://github.com/danbuildss/agent-wallet-manifest)
- DID: `did:key:z6Mkszs82vnrmmctTyybGEMN7BDHg2awFEdpYYzfqXhGi1rf`

---

## License

MIT — built by [x402Books AI](https://www.x402books.xyz) · Powered by [@AskLucaAI](https://x.com/AskLucaAI) on Base.
