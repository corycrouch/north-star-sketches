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

export const leadsData: Lead[] = [
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
