import { leadsData, pipelineData, type Lead } from "@/data/leads"

export interface AccountRecord {
  /** Row label — company (Marketing) or account (Sales). */
  name: string
  /** Parent company for drill-down to the buying group page. */
  company: string
  domain: string
  opportunity: string
  viewers: number
  engagementScore: number
  lastActivityAt: string
}

function latestActivity(leads: Lead[]): string {
  return leads.reduce((latest, lead) =>
    lead.lastActivityAt > latest ? lead.lastActivityAt : latest,
  leads[0].lastActivityAt)
}

function topOpportunity(leads: Lead[]): string {
  return [...leads].sort((a, b) => b.engagementScore - a.engagementScore)[0].opportunity
}

function rollupLeads(leads: Lead[], groupField: "company" | "account"): AccountRecord[] {
  const buckets = new Map<string, Lead[]>()

  for (const lead of leads) {
    const key = groupField === "company" ? lead.company : lead.account
    const group = buckets.get(key)
    if (group) group.push(lead)
    else buckets.set(key, [lead])
  }

  return [...buckets.entries()].map(([name, members]) => ({
    name,
    company: members[0].company,
    domain: members[0].domain,
    opportunity: topOpportunity(members),
    viewers: members.length,
    engagementScore: Math.max(...members.map((m) => m.engagementScore)),
    lastActivityAt: latestActivity(members),
  }))
}

/** Marketing → Accounts (rolled up by company). */
export const marketingAccountsData: AccountRecord[] = rollupLeads(leadsData, "company")

/** Sales → Accounts (rolled up by CRM account). */
export const salesAccountsData: AccountRecord[] = rollupLeads(pipelineData, "account")
