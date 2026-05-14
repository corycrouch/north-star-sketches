export const ACQUISITION_TABS = [
  { id: "viewers", label: "Viewers" },
  { id: "links-embeds", label: "Links & Embeds" },
  { id: "campaigns", label: "Campaigns" },
  { id: "viewer-journeys", label: "Viewer journeys" },
  { id: "segmentation", label: "Segmentation" },
  { id: "ab-tests", label: "A/B Tests" },
  { id: "forms", label: "Forms" },
] as const

export const PIPELINE_TABS = [
  { id: "accounts", label: "Accounts" },
  { id: "buyers", label: "Buyers" },
  { id: "deal-links", label: "Links" },
] as const

export type AcquisitionTabId = (typeof ACQUISITION_TABS)[number]["id"]
export type PipelineTabId = (typeof PIPELINE_TABS)[number]["id"]
