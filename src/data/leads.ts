export interface Lead {
  firstName: string
  lastName: string
  role: string
  email: string
  company: string
  domain: string
  account: string
  opportunity: string
  engagementScore: number
}

/** Marketing → Viewers → Demo Leads (formerly the “pipeline” fake list). */
export const leadsData: Lead[] = [
  { firstName: "Nina", lastName: "Walsh", role: "VP Sales", email: "nina.walsh@snowflake.com", company: "Snowflake", domain: "snowflake.com", account: "Snowflake NA", opportunity: "Enterprise renewal (FY27)", engagementScore: 94 },
  { firstName: "Omar", lastName: "Hassan", role: "Director of Ops", email: "omar.hassan@mongodb.com", company: "MongoDB", domain: "mongodb.com", account: "MongoDB Atlas", opportunity: "Atlas multi-region expansion", engagementScore: 89 },
  { firstName: "Yuki", lastName: "Tanaka", role: "CFO", email: "yuki.tanaka@twilio.com", company: "Twilio", domain: "twilio.com", account: "Twilio Segment", opportunity: "CPaaS seat expansion", engagementScore: 82 },
  { firstName: "Felix", lastName: "Bauer", role: "Head of Security", email: "felix.bauer@okta.com", company: "Okta", domain: "okta.com", account: "Okta Workforce", opportunity: "SSO + MFA rollout", engagementScore: 76 },
  { firstName: "Chloe", lastName: "Martins", role: "COO", email: "chloe.martins@zoom.us", company: "Zoom", domain: "zoom.us", account: "Zoom Enterprise", opportunity: "Rooms + Webinar bundle", engagementScore: 71 },
  { firstName: "Ethan", lastName: "Brooks", role: "IT Director", email: "ethan.brooks@slack.com", company: "Slack", domain: "slack.com", account: "Salesforce Slack", opportunity: "GovSlack compliance add-on", engagementScore: 66 },
  { firstName: "Sofia", lastName: "Reyes", role: "VP Marketing", email: "sofia.reyes@notion.so", company: "Notion", domain: "notion.so", account: "Notion Enterprise", opportunity: "Workspace consolidation", engagementScore: 58 },
  { firstName: "Jonas", lastName: "Lindqvist", role: "Engineering Lead", email: "jonas.lindqvist@figma.com", company: "Figma", domain: "figma.com", account: "Figma Org", opportunity: "Dev Mode + FigJam seats", engagementScore: 52 },
  { firstName: "Amara", lastName: "Okonkwo", role: "Procurement", email: "amara.okonkwo@airtable.com", company: "Airtable", domain: "airtable.com", account: "Airtable Enterprise", opportunity: "3-year committed spend", engagementScore: 47 },
  { firstName: "Luca", lastName: "Ferrari", role: "RevOps Manager", email: "luca.ferrari@canva.com", company: "Canva", domain: "canva.com", account: "Canva Teams", opportunity: "Brand kit + approvals", engagementScore: 41 },
  { firstName: "Hannah", lastName: "Sullivan", role: "CTO", email: "hannah.sullivan@snowflake.com", company: "Snowflake", domain: "snowflake.com", account: "Snowflake NA", opportunity: "Data sharing marketplace", engagementScore: 38 },
  { firstName: "Diego", lastName: "Vargas", role: "Solutions Architect", email: "diego.vargas@elastic.co", company: "Elastic", domain: "elastic.co", account: "Elastic Cloud", opportunity: "Time-series workload POC", engagementScore: 33 },
]

/** Sales → Buyers tab (formerly the “leads” fake list). */
export const pipelineData: Lead[] = [
  { firstName: "Sarah", lastName: "Chen", role: "VP of Engineering", email: "sarah.chen@google.com", company: "Google", domain: "google.com", account: "Google Cloud", opportunity: "Cloud Platform Migration", engagementScore: 92 },
  { firstName: "Marcus", lastName: "Johnson", role: "Director of IT", email: "marcus.johnson@salesforce.com", company: "Salesforce", domain: "salesforce.com", account: "Salesforce Enterprise", opportunity: "DevOps Transformation", engagementScore: 87 },
  { firstName: "Emily", lastName: "Rodriguez", role: "Head of Product", email: "emily.rodriguez@shopify.com", company: "Shopify", domain: "shopify.com", account: "Shopify Plus", opportunity: "Analytics Suite", engagementScore: 74 },
  { firstName: "James", lastName: "Kim", role: "CISO", email: "james.kim@stripe.com", company: "Stripe", domain: "stripe.com", account: "Stripe Inc", opportunity: "Zero Trust Migration", engagementScore: 68 },
  { firstName: "Diana", lastName: "Prince", role: "CTO", email: "diana.prince@hubspot.com", company: "HubSpot", domain: "hubspot.com", account: "HubSpot Enterprise", opportunity: "Demo Automation", engagementScore: 63 },
  { firstName: "Priya", lastName: "Patel", role: "IT Manager", email: "priya.patel@google.com", company: "Google", domain: "google.com", account: "Google Cloud", opportunity: "Cloud Platform Migration", engagementScore: 61 },
  { firstName: "David", lastName: "Okafor", role: "Staff Engineer", email: "david.okafor@atlassian.com", company: "Atlassian", domain: "atlassian.com", account: "Atlassian Corp", opportunity: "CI/CD Pipeline", engagementScore: 55 },
  { firstName: "Anna", lastName: "Park", role: "Security Engineer", email: "anna.park@stripe.com", company: "Stripe", domain: "stripe.com", account: "Stripe Inc", opportunity: "Zero Trust Migration", engagementScore: 52 },
  { firstName: "Lisa", lastName: "Nguyen", role: "VP of Operations", email: "lisa.nguyen@google.com", company: "Google", domain: "google.com", account: "Google Cloud", opportunity: "Cloud Platform Migration", engagementScore: 48 },
  { firstName: "Tom", lastName: "Brewer", role: "Product Manager", email: "tom.brewer@hubspot.com", company: "HubSpot", domain: "hubspot.com", account: "HubSpot Enterprise", opportunity: "Demo Automation", engagementScore: 41 },
  { firstName: "Mike", lastName: "Torres", role: "Finance Director", email: "mike.torres@salesforce.com", company: "Salesforce", domain: "salesforce.com", account: "Salesforce Enterprise", opportunity: "DevOps Transformation", engagementScore: 37 },
  { firstName: "Rachel", lastName: "Stein", role: "Marketing Lead", email: "rachel.stein@datadoghq.com", company: "Datadog", domain: "datadoghq.com", account: "Datadog Inc", opportunity: "Content Platform", engagementScore: 34 },
  { firstName: "Carlos", lastName: "Mendez", role: "Sales Director", email: "carlos.mendez@atlassian.com", company: "Atlassian", domain: "atlassian.com", account: "Atlassian Corp", opportunity: "CI/CD Pipeline", engagementScore: 29 },
]

/** Combined contacts for drill-downs (buying group / person) from either list. */
export const allLeads: Lead[] = [...leadsData, ...pipelineData]
