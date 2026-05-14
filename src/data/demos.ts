export interface DemoRecord {
  id: string
  name: string
  status: "draft" | "published"
  lastUpdated: string
}

/** Sample demos for Library + DemoRoom “All demos” (shared list). */
export const demosData: DemoRecord[] = [
  { id: "d-1", name: "Untitled Demo", status: "draft", lastUpdated: "Apr 3, 2026, 2:15 PM" },
  { id: "d-2", name: "Q4 Product Walkthrough", status: "published", lastUpdated: "Mar 28, 2026, 10:42 AM" },
  { id: "d-3", name: "Onboarding Overview", status: "published", lastUpdated: "Mar 22, 2026, 4:08 PM" },
  { id: "d-4", name: "Security Whitepaper Tour", status: "draft", lastUpdated: "Mar 18, 2026, 9:20 AM" },
  { id: "d-5", name: "ROI Calculator Guide", status: "published", lastUpdated: "Mar 10, 2026, 11:55 AM" },
  { id: "d-6", name: "Enterprise SSO deep dive", status: "published", lastUpdated: "May 8, 2026, 8:12 AM" },
  { id: "d-7", name: "Champion enablement kit", status: "draft", lastUpdated: "May 7, 2026, 3:40 PM" },
  { id: "d-8", name: "Pricing & packaging 101", status: "published", lastUpdated: "May 6, 2026, 11:03 AM" },
  { id: "d-9", name: "API overview for engineers", status: "published", lastUpdated: "May 5, 2026, 9:58 AM" },
  { id: "d-10", name: "SOC 2 readiness walkthrough", status: "draft", lastUpdated: "May 4, 2026, 4:22 PM" },
  { id: "d-11", name: "Customer story: FinServ Co.", status: "published", lastUpdated: "May 2, 2026, 1:17 PM" },
  { id: "d-12", name: "Mutual action plan template", status: "draft", lastUpdated: "May 1, 2026, 10:05 AM" },
  { id: "d-13", name: "Integrations hub tour", status: "published", lastUpdated: "Apr 30, 2026, 2:51 PM" },
  { id: "d-14", name: "RevOps metrics snapshot", status: "published", lastUpdated: "Apr 29, 2026, 8:44 AM" },
  { id: "d-15", name: "Buyer security questionnaire", status: "draft", lastUpdated: "Apr 28, 2026, 5:09 PM" },
  { id: "d-16", name: "Live demo: custom branding", status: "published", lastUpdated: "Apr 27, 2026, 12:33 PM" },
  { id: "d-17", name: "Implementation timeline", status: "published", lastUpdated: "Apr 26, 2026, 9:21 AM" },
  { id: "d-18", name: "Admin console quick tips", status: "draft", lastUpdated: "Apr 25, 2026, 3:56 PM" },
  { id: "d-19", name: "Data residency & regions", status: "published", lastUpdated: "Apr 24, 2026, 11:18 AM" },
  { id: "d-20", name: "Sales handoff playbook", status: "draft", lastUpdated: "Apr 23, 2026, 7:42 AM" },
  { id: "d-21", name: "Mobile experience preview", status: "published", lastUpdated: "Apr 22, 2026, 4:07 PM" },
  { id: "d-22", name: "Partner co-sell overview", status: "published", lastUpdated: "Apr 21, 2026, 10:29 AM" },
  { id: "d-23", name: "Renewal & expansion talk track", status: "draft", lastUpdated: "Apr 20, 2026, 1:55 PM" },
  { id: "d-24", name: "AI assistant in the room", status: "published", lastUpdated: "Apr 19, 2026, 9:03 AM" },
  { id: "d-25", name: "Compliance checklist tour", status: "draft", lastUpdated: "Apr 18, 2026, 6:28 PM" },
  { id: "d-26", name: "Executive briefing (10 min)", status: "published", lastUpdated: "Apr 17, 2026, 8:50 AM" },
  { id: "d-27", name: "Sandbox environment setup", status: "published", lastUpdated: "Apr 16, 2026, 2:14 PM" },
  { id: "d-28", name: "Webhooks & events primer", status: "draft", lastUpdated: "Apr 15, 2026, 11:41 AM" },
]
