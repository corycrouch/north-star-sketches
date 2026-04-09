import { useState } from "react"
import { leadsData, pipelineData, type Lead } from "@/data/leads"
import GroupedTable, { type GroupedTableColumn } from "@/components/GroupedTable"
import ScoreBar from "@/components/ScoreBar"
import Avatar from "@/components/Avatar"
import CompanyLogo from "@/components/CompanyLogo"
import "@/styles/track-engagement.scss"

export type TrackEngagementView = "acquisition" | "pipeline"

interface TrackEngagementProps {
  view: TrackEngagementView
  acquisitionTab: AcquisitionTabId
  pipelineTab: PipelineTabId
  onPersonClick: (lead: Lead) => void
  onBuyingGroupClick: (group: string) => void
}

export const ACQUISITION_TABS = [
  { id: "leads", label: "Leads" },
  { id: "links-embeds", label: "Links & Embeds" },
  { id: "campaigns", label: "Campaigns" },
  { id: "viewer-journeys", label: "Viewer journeys" },
  { id: "segmentation", label: "Segmentation" },
  { id: "ab-tests", label: "A/B Tests" },
] as const

export const PIPELINE_TABS = [
  { id: "buyers", label: "Buyers" },
  { id: "deal-links", label: "Links" },
] as const

export type AcquisitionTabId = (typeof ACQUISITION_TABS)[number]["id"]
export type PipelineTabId = (typeof PIPELINE_TABS)[number]["id"]

function buildColumns(
  onPersonClick: (lead: Lead) => void,
  onBuyingGroupClick: (group: string) => void,
): GroupedTableColumn<Lead>[] {
  return [
    { key: "name", header: "Name", render: (row) => (
      <a
        className="table-link name-cell"
        href="#"
        onClick={(e) => { e.preventDefault(); onPersonClick(row) }}
      >
        <Avatar initials={`${row.firstName[0]}${row.lastName[0]}`} />
        {row.firstName} {row.lastName}
        <span className="material-symbols-outlined table-link__icon">arrow_forward</span>
      </a>
    ) },
    { key: "company", header: "Buying Group", render: (row) => (
      <a
        className="table-link"
        href="#"
        onClick={(e) => { e.preventDefault(); onBuyingGroupClick(row.company) }}
      >
        <CompanyLogo domain={row.domain} size={20} />
        {row.company}
        <span className="material-symbols-outlined table-link__icon">arrow_forward</span>
      </a>
    ) },
    { key: "role", header: "Role", render: (row) => row.role },
    { key: "account", header: "Account", render: (row) => row.account },
    { key: "opportunity", header: "Opportunity", render: (row) => row.opportunity },
    { key: "engagementScore", header: "Engagement Score", render: (row) => <ScoreBar score={row.engagementScore} /> },
  ]
}

const sortOptions = [
  { key: "engagementScore", label: "Engagement" },
  { key: "name", label: "Name" },
  { key: "company", label: "Buying Group" },
  { key: "role", label: "Role" },
  { key: "account", label: "Account" },
  { key: "opportunity", label: "Opportunity" },
]

const groupOptions = [
  { key: "individual", label: "Individual" },
  { key: "company", label: "Buying Group" },
]

function getSortValue(row: Lead, field: string): string | number {
  switch (field) {
    case "name": return `${row.firstName} ${row.lastName}`
    case "engagementScore": return row.engagementScore
    case "company": return row.company
    case "role": return row.role
    case "account": return row.account
    case "opportunity": return row.opportunity
    default: return ""
  }
}

function getGroupValue(row: Lead, field: string): string {
  switch (field) {
    case "company": return row.company
    case "account": return row.account
    case "opportunity": return row.opportunity
    default: return ""
  }
}

function TabPlaceholder({ title, body }: { title: string; body: string }) {
  return (
    <div className="track-engagement__placeholder">
      <p className="track-engagement__placeholder-title">{title}</p>
      <p className="track-engagement__placeholder-body">{body}</p>
    </div>
  )
}

export default function TrackEngagement({
  view,
  acquisitionTab,
  pipelineTab,
  onPersonClick,
  onBuyingGroupClick,
}: TrackEngagementProps) {
  const columns = buildColumns(onPersonClick, onBuyingGroupClick)

  const [leadsSortBy, setLeadsSortBy] = useState<string | null>("engagementScore")
  const [leadsGroupBy, setLeadsGroupBy] = useState<string | null>(null)

  const [pipelineSortBy, setPipelineSortBy] = useState<string | null>("engagementScore")
  const [pipelineGroupBy, setPipelineGroupBy] = useState<string | null>("company")

  const isAcquisition = view === "acquisition"

  const pageTitle = isAcquisition
    ? ACQUISITION_TABS.find((t) => t.id === acquisitionTab)?.label ?? "Leads"
    : PIPELINE_TABS.find((t) => t.id === pipelineTab)?.label ?? "Buyers"

  return (
    <div className="track-engagement">
      <h1>{pageTitle}</h1>

      <div className="track-engagement__content">
        {isAcquisition && acquisitionTab === "leads" && (
          <GroupedTable
            columns={columns}
            data={leadsData}
            sortBy={leadsSortBy}
            groupBy={leadsGroupBy}
            onSortChange={setLeadsSortBy}
            onGroupChange={setLeadsGroupBy}
            sortOptions={sortOptions}
            groupOptions={groupOptions}
            getSortValue={getSortValue}
            getGroupValue={getGroupValue}
            onGroupHeaderClick={leadsGroupBy === "company" ? onBuyingGroupClick : undefined}
          />
        )}
        {isAcquisition && acquisitionTab === "links-embeds" && (
          <TabPlaceholder
            title="Links & Embeds"
            body="Create and organize lead gen links for your prospects, and embed demos and tours on your site and campaigns. Prototype: connect link templates to buyer journeys; map embeds to lead sources and UTM tags."
          />
        )}
        {isAcquisition && acquisitionTab === "campaigns" && (
          <TabPlaceholder
            title="Campaigns"
            body="Plan and track outbound and inbound programs tied to lead gen. Prototype: associate links, audiences, and goals per campaign."
          />
        )}
        {isAcquisition && acquisitionTab === "viewer-journeys" && (
          <TabPlaceholder
            title="Viewer journeys"
            body="See how prospects move through demos and touchpoints before they convert. Prototype: path visualization and drop-off by step."
          />
        )}
        {isAcquisition && acquisitionTab === "segmentation" && (
          <TabPlaceholder
            title="Segmentation"
            body="Define and manage audience slices for targeting and reporting. Prototype: rules from firmographics, behavior, and campaign source."
          />
        )}
        {isAcquisition && acquisitionTab === "ab-tests" && (
          <TabPlaceholder
            title="A/B Tests"
            body="Run experiments on demos and outreach. Prototype: compare conversion across variants."
          />
        )}

        {!isAcquisition && pipelineTab === "buyers" && (
          <GroupedTable
            columns={columns}
            data={pipelineData}
            sortBy={pipelineSortBy}
            groupBy={pipelineGroupBy}
            onSortChange={setPipelineSortBy}
            onGroupChange={setPipelineGroupBy}
            sortOptions={sortOptions}
            groupOptions={groupOptions}
            getSortValue={getSortValue}
            getGroupValue={getGroupValue}
            onGroupHeaderClick={pipelineGroupBy === "company" ? onBuyingGroupClick : undefined}
          />
        )}
        {!isAcquisition && pipelineTab === "deal-links" && (
          <TabPlaceholder
            title="Links"
            body="Deal-stage links and renewal packages. Prototype: tie links to opportunities in flight."
          />
        )}
      </div>
    </div>
  )
}
