export interface DemoRecord {
  id: string
  name: string
  status: "draft" | "published"
  lastUpdated: string
}

/** Sample demos shown on the Library page (where demos “live” in this sketch). */
export const demosData: DemoRecord[] = [
  { id: "d-1", name: "Untitled Demo", status: "draft", lastUpdated: "Apr 3, 2026, 2:15 PM" },
  { id: "d-2", name: "Q4 Product Walkthrough", status: "published", lastUpdated: "Mar 28, 2026, 10:42 AM" },
  { id: "d-3", name: "Onboarding Overview", status: "published", lastUpdated: "Mar 22, 2026, 4:08 PM" },
  { id: "d-4", name: "Security Whitepaper Tour", status: "draft", lastUpdated: "Mar 18, 2026, 9:20 AM" },
  { id: "d-5", name: "ROI Calculator Guide", status: "published", lastUpdated: "Mar 10, 2026, 11:55 AM" },
]
