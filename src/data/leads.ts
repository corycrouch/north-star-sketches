export interface Lead {
  firstName: string
  lastName: string
  role: string
  company: string
  domain: string
  account: string
  opportunity: string
  engagementScore: number
}

/** Marketing → Leads tab (formerly the “pipeline” fake list). */
export const leadsData: Lead[] = [
  { firstName: "Nina", lastName: "Walsh", role: "VP Sales", company: "Snowflake", domain: "snowflake.com", account: "Snowflake NA", opportunity: "Enterprise renewal (FY27)", engagementScore: 94 },
  { firstName: "Omar", lastName: "Hassan", role: "Director of Ops", company: "MongoDB", domain: "mongodb.com", account: "MongoDB Atlas", opportunity: "Atlas multi-region expansion", engagementScore: 89 },
  { firstName: "Yuki", lastName: "Tanaka", role: "CFO", company: "Twilio", domain: "twilio.com", account: "Twilio Segment", opportunity: "CPaaS seat expansion", engagementScore: 82 },
  { firstName: "Felix", lastName: "Bauer", role: "Head of Security", company: "Okta", domain: "okta.com", account: "Okta Workforce", opportunity: "SSO + MFA rollout", engagementScore: 76 },
  { firstName: "Chloe", lastName: "Martins", role: "COO", company: "Zoom", domain: "zoom.us", account: "Zoom Enterprise", opportunity: "Rooms + Webinar bundle", engagementScore: 71 },
  { firstName: "Ethan", lastName: "Brooks", role: "IT Director", company: "Slack", domain: "slack.com", account: "Salesforce Slack", opportunity: "GovSlack compliance add-on", engagementScore: 66 },
  { firstName: "Sofia", lastName: "Reyes", role: "VP Marketing", company: "Notion", domain: "notion.so", account: "Notion Enterprise", opportunity: "Workspace consolidation", engagementScore: 58 },
  { firstName: "Jonas", lastName: "Lindqvist", role: "Engineering Lead", company: "Figma", domain: "figma.com", account: "Figma Org", opportunity: "Dev Mode + FigJam seats", engagementScore: 52 },
  { firstName: "Amara", lastName: "Okonkwo", role: "Procurement", company: "Airtable", domain: "airtable.com", account: "Airtable Enterprise", opportunity: "3-year committed spend", engagementScore: 47 },
  { firstName: "Luca", lastName: "Ferrari", role: "RevOps Manager", company: "Canva", domain: "canva.com", account: "Canva Teams", opportunity: "Brand kit + approvals", engagementScore: 41 },
  { firstName: "Hannah", lastName: "Sullivan", role: "CTO", company: "Snowflake", domain: "snowflake.com", account: "Snowflake NA", opportunity: "Data sharing marketplace", engagementScore: 38 },
  { firstName: "Diego", lastName: "Vargas", role: "Solutions Architect", company: "Elastic", domain: "elastic.co", account: "Elastic Cloud", opportunity: "Time-series workload POC", engagementScore: 33 },
]

/** Sales → Buyers tab (formerly the “leads” fake list). */
export const pipelineData: Lead[] = [
  { firstName: "Sarah", lastName: "Chen", role: "VP of Engineering", company: "Google", domain: "google.com", account: "Google Cloud", opportunity: "Cloud Platform Migration", engagementScore: 92 },
  { firstName: "Marcus", lastName: "Johnson", role: "Director of IT", company: "Salesforce", domain: "salesforce.com", account: "Salesforce Enterprise", opportunity: "DevOps Transformation", engagementScore: 87 },
  { firstName: "Emily", lastName: "Rodriguez", role: "Head of Product", company: "Shopify", domain: "shopify.com", account: "Shopify Plus", opportunity: "Analytics Suite", engagementScore: 74 },
  { firstName: "James", lastName: "Kim", role: "CISO", company: "Stripe", domain: "stripe.com", account: "Stripe Inc", opportunity: "Zero Trust Migration", engagementScore: 68 },
  { firstName: "Diana", lastName: "Prince", role: "CTO", company: "HubSpot", domain: "hubspot.com", account: "HubSpot Enterprise", opportunity: "Demo Automation", engagementScore: 63 },
  { firstName: "Priya", lastName: "Patel", role: "IT Manager", company: "Google", domain: "google.com", account: "Google Cloud", opportunity: "Cloud Platform Migration", engagementScore: 61 },
  { firstName: "David", lastName: "Okafor", role: "Staff Engineer", company: "Atlassian", domain: "atlassian.com", account: "Atlassian Corp", opportunity: "CI/CD Pipeline", engagementScore: 55 },
  { firstName: "Anna", lastName: "Park", role: "Security Engineer", company: "Stripe", domain: "stripe.com", account: "Stripe Inc", opportunity: "Zero Trust Migration", engagementScore: 52 },
  { firstName: "Lisa", lastName: "Nguyen", role: "VP of Operations", company: "Google", domain: "google.com", account: "Google Cloud", opportunity: "Cloud Platform Migration", engagementScore: 48 },
  { firstName: "Tom", lastName: "Brewer", role: "Product Manager", company: "HubSpot", domain: "hubspot.com", account: "HubSpot Enterprise", opportunity: "Demo Automation", engagementScore: 41 },
  { firstName: "Mike", lastName: "Torres", role: "Finance Director", company: "Salesforce", domain: "salesforce.com", account: "Salesforce Enterprise", opportunity: "DevOps Transformation", engagementScore: 37 },
  { firstName: "Rachel", lastName: "Stein", role: "Marketing Lead", company: "Datadog", domain: "datadoghq.com", account: "Datadog Inc", opportunity: "Content Platform", engagementScore: 34 },
  { firstName: "Carlos", lastName: "Mendez", role: "Sales Director", company: "Atlassian", domain: "atlassian.com", account: "Atlassian Corp", opportunity: "CI/CD Pipeline", engagementScore: 29 },
]

/** Combined contacts for drill-downs (buying group / person) from either list. */
export const allLeads: Lead[] = [...leadsData, ...pipelineData]
