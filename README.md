# Luca Aeon Skills

**Financial intelligence skills for [Aeon](https://github.com/aaronjmars/aeon) agents — powered by [Luca](https://x.com/AskLucaAI) and [x402Books AI](https://www.x402books.xyz).**

```bash
./add-skill danbuildss/luca-aeon-skills --all
```

Four skills land in your Aeon fork:
- `scan-wallet` → full wallet scan, transaction classification, portfolio breakdown
- `treasury-monitor` → daily treasury health score, budget status, anomaly alerts
- `get-report` → shareable x402Books financial report URL
- `check-agent` → look up any agent in the x402Books Financial Registry

The financial layer for Aeon operators. Built on Base.

---

## Install

```bash
# All skills
./add-skill danbuildss/luca-aeon-skills --all

# Or individual skills
./add-skill danbuildss/luca-aeon-skills scan-wallet
./add-skill danbuildss/luca-aeon-skills treasury-monitor
./add-skill danbuildss/luca-aeon-skills get-report
./add-skill danbuildss/luca-aeon-skills check-agent
```

Skills land disabled in your `aeon.yml` — flip `enabled: true` and configure your wallet address to activate.

---

## Skills

### `scan-wallet`
Full wallet scan for any Base address. Returns income, spend, net flow, transaction count, x402 payment count, token portfolio, top counterparties, and a shareable report URL.

**Vars:** `WALLET_ADDRESS`, `X402BOOKS_API_KEY`

### `treasury-monitor`
Daily treasury health check. Returns score out of 100, budget status, net flow, top expense/income categories. Sends alert via `./notify` if treasury is unhealthy.

**Vars:** `WALLET_ADDRESS`, `X402BOOKS_API_KEY`

### `get-report`
Generates a shareable x402Books report URL for any wallet. Publicly accessible — no login required.

**Vars:** `WALLET_ADDRESS`, `X402BOOKS_API_KEY`

### `check-agent`
Looks up any agent in the x402Books Agent Financial Registry. Public — no API key needed.

**Vars:** `AGENT_NAME`

---

## Setup

Add to your `aeon.yml`:

```yaml
skills:
  scan-wallet:
    enabled: true
    vars:
      WALLET_ADDRESS: "0xYourWallet"
      X402BOOKS_API_KEY: "xb_live_..."

  treasury-monitor:
    enabled: true
    schedule: "0 9 * * *"
    vars:
      WALLET_ADDRESS: "0xYourWallet"
      X402BOOKS_API_KEY: "xb_live_..."
```

Get an API key at [x402books.xyz/developer](https://www.x402books.xyz/developer).

**No API key?** All skills run in demo mode by default — zero setup required to test.

---

## Pricing

| Tier | Access |
|------|--------|
| Demo | Free — no key, uses demo wallet |
| API key | Full live data — [get key](https://www.x402books.xyz/developer) |
| $LUCA holders | Free tier — hold ≥1,000 $LUCA on Base |

$LUCA CA: `0xb2b335f832fd3f43461ebd1cd9831d93d9ca4ba3`

---

## Agent Identity

Luca has a verified wallet manifest and GitLawb DID:

- Manifest: [github.com/danbuildss/agent-wallet-manifest](https://github.com/danbuildss/agent-wallet-manifest)
- GitLawb: [gitlawb.com/z6Mkszs82vnrmmctTyybGEMN7BDHg2awFEdpYYzfqXhGi1rf/luca-aeon-skills](https://gitlawb.com/z6Mkszs82vnrmmctTyybGEMN7BDHg2awFEdpYYzfqXhGi1rf/luca-aeon-skills)
- DID: `did:key:z6Mkszs82vnrmmctTyybGEMN7BDHg2awFEdpYYzfqXhGi1rf`

---

## License

MIT — built by [x402Books AI](https://www.x402books.xyz) · [@AskLucaAI](https://x.com/AskLucaAI) on Base.
