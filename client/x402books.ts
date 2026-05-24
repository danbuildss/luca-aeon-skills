const BASE_URL = "https://www.x402books.xyz/api/v1";
const SCAN_URL = "https://www.x402books.xyz/api/scan";
const REGISTRY_URL = "https://www.x402books.xyz/api/registry/agents";
const DEMO_WALLET = "0xb98f0de777eea8c481b64e33d3e0066cea38fa91";

function headers(): Record<string, string> {
  const key = process.env.X402BOOKS_API_KEY;
  if (!key) return {};
  return { Authorization: `Bearer ${key}` };
}

function isDemoMode(): boolean {
  return !process.env.X402BOOKS_API_KEY;
}

export type ScanResult = {
  wallet: string;
  range: string;
  generated_at: string;
  demo?: boolean;
  summary: {
    total_income: number;
    total_spend: number;
    net_flow: number;
    transaction_count: number;
    likely_x402_count: number;
    top_category: string;
    budget_status: "healthy" | "watch" | "negative";
  };
  categories: { category: string; usd_total: number; count: number }[];
  portfolio: {
    token_symbol: string;
    token_address: string;
    is_agent_token: boolean;
    is_stablecoin: boolean;
    usd_inflow: number;
    usd_outflow: number;
    usd_net_flow: number;
    tx_count: number;
  }[];
  top_counterparties: { address: string; usd_total: number; count: number }[];
  report_url: string;
};

export type TreasuryResult = {
  wallet: string;
  demo?: boolean;
  financial_state: {
    treasury_score: number;
    health_label: string;
    budget_status: string;
    net_flow_30d: number;
    x402_payment_count: number;
    top_expense_category: string;
    top_income_source: string;
  };
};

export type RegistryResult = {
  agents: {
    name: string;
    wallet: string;
    chain: string;
    status: string;
    treasury_score?: number;
  }[];
};

async function fetchScan(address: string, range: "7d" | "30d"): Promise<ScanResult> {
  const res = await fetch(`${SCAN_URL}?wallet=${address}&range=${range}`, { headers: headers() });
  if (!res.ok) throw new Error(`x402Books scan failed: ${res.status}`);
  return res.json() as Promise<ScanResult>;
}

async function fetchTreasuryScore(address: string): Promise<TreasuryResult> {
  const res = await fetch(`${BASE_URL}/agent-financial-state?wallet=${address}`, { headers: headers() });
  if (!res.ok) throw new Error(`x402Books treasury check failed: ${res.status}`);
  return res.json() as Promise<TreasuryResult>;
}

export async function scanWallet(address: string, range: "7d" | "30d" = "30d"): Promise<ScanResult> {
  if (isDemoMode()) {
    const r = await fetchScan(DEMO_WALLET, range);
    return { ...r, wallet: address, demo: true };
  }
  return fetchScan(address, range);
}

export async function getTreasuryScore(address: string): Promise<TreasuryResult> {
  if (isDemoMode()) {
    const r = await fetchTreasuryScore(DEMO_WALLET);
    return { ...r, wallet: address, demo: true };
  }
  return fetchTreasuryScore(address);
}

export async function getReportUrl(address: string): Promise<{ wallet: string; report_url: string; demo?: boolean }> {
  if (isDemoMode()) {
    return { wallet: address, report_url: `https://www.x402books.xyz/report/${DEMO_WALLET}`, demo: true };
  }
  const data = await fetchScan(address, "30d");
  return { wallet: address, report_url: data.report_url };
}

export async function checkAgent(name: string): Promise<RegistryResult> {
  const res = await fetch(REGISTRY_URL);
  if (!res.ok) throw new Error(`x402Books registry lookup failed: ${res.status}`);
  const data = await res.json() as RegistryResult;
  const q = name.toLowerCase();
  return {
    agents: data.agents.filter(a => a.name.toLowerCase().includes(q)),
  };
}
