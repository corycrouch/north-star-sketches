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
  { id: "viewers", label: "Viewers" },
  { id: "links-embeds", label: "Links & Embeds" },
  { id: "campaigns", label: "Campaigns" },
  { id: "viewer-journeys", label: "Viewer journeys" },
  { id: "segmentation", label: "Segmentation" },
  { id: "ab-tests", label: "A/B Tests" },
  { id: "forms", label: "Forms" },
] as const

export const PIPELINE_TABS = [
  { id: "buyers", label: "Buyers" },
  { id: "deal-links", label: "Links" },
] as const

export type AcquisitionTabId = (typeof ACQUISITION_TABS)[number]["id"]
export type PipelineTabId = (typeof PIPELINE_TABS)[number]["id"]

const VIEWERS_SUB_TABS = [
  { id: "demo-leads" as const, label: "Demo Leads" },
  { id: "anonymous" as const, label: "Anonymous Viewers" },
]
type ViewersSubTabId = (typeof VIEWERS_SUB_TABS)[number]["id"]

type LeadsTableVariant = "acquisition" | "pipeline"

function buildColumns(
  onPersonClick: (lead: Lead) => void,
  onBuyingGroupClick: (group: string) => void,
  variant: LeadsTableVariant,
): GroupedTableColumn<Lead>[] {
  const isAcquisition = variant === "acquisition"

  const companyColumn: GroupedTableColumn<Lead> = {
    key: "company",
    header: isAcquisition ? "Company" : "Buying Group",
    render: (row) =>
      isAcquisition ? (
        <span className="table-company-cell">
          <CompanyLogo domain={row.domain} size={20} />
          <span>{row.company}</span>
        </span>
      ) : (
        <a
          className="table-link"
          href="#"
          onClick={(e) => { e.preventDefault(); onBuyingGroupClick(row.company) }}
        >
          <CompanyLogo domain={row.domain} size={20} />
          {row.company}
          <span className="material-symbols-outlined table-link__icon">arrow_forward</span>
        </a>
      ),
  }

  const cols: GroupedTableColumn<Lead>[] = [
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
    companyColumn,
    { key: "role", header: "Role", render: (row) => row.role },
  ]

  if (isAcquisition) {
    cols.push({
      key: "email",
      header: "Email",
      render: (row) => <span className="table-email-cell">{row.email}</span>,
    })
  }

  if (!isAcquisition) {
    cols.push({ key: "account", header: "Account", render: (row) => row.account })
    cols.push({
      key: "opportunity",
      header: "Opportunity",
      render: (row) => row.opportunity,
    })
  }

  cols.push({
    key: "engagementScore",
    header: "Engagement Score",
    render: (row) => <ScoreBar score={row.engagementScore} />,
  })
  return cols
}

const sortOptionsAll = [
  { key: "engagementScore", label: "Engagement" },
  { key: "name", label: "Name" },
  { key: "company", label: "Buying Group" },
  { key: "role", label: "Role" },
  { key: "account", label: "Account" },
  { key: "opportunity", label: "Opportunity" },
]

const acquisitionSortOptions = [
  ...sortOptionsAll
    .filter((o) => o.key !== "opportunity" && o.key !== "account")
    .map((o) => (o.key === "company" ? { ...o, label: "Company" } : o)),
  { key: "email", label: "Email" },
]

const acquisitionGroupOptions = [
  { key: "individual", label: "Individual" },
  { key: "company", label: "Company" },
]

const pipelineGroupOptions = [
  { key: "individual", label: "Individual" },
  { key: "company", label: "Buying Group" },
]

function getSortValue(row: Lead, field: string): string | number {
  switch (field) {
    case "name": return `${row.firstName} ${row.lastName}`
    case "engagementScore": return row.engagementScore
    case "company": return row.company
    case "role": return row.role
    case "email": return row.email
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
  const acquisitionColumns = buildColumns(onPersonClick, onBuyingGroupClick, "acquisition")
  const pipelineColumns = buildColumns(onPersonClick, onBuyingGroupClick, "pipeline")

  const [leadsSortBy, setLeadsSortBy] = useState<string | null>("engagementScore")
  const [leadsGroupBy, setLeadsGroupBy] = useState<string | null>(null)
  const [viewersSubTab, setViewersSubTab] = useState<ViewersSubTabId>("demo-leads")

  const [pipelineSortBy, setPipelineSortBy] = useState<string | null>("engagementScore")
  const [pipelineGroupBy, setPipelineGroupBy] = useState<string | null>("company")

  const isAcquisition = view === "acquisition"

  const pageTitle =
    isAcquisition && acquisitionTab === "viewers"
      ? "Viewers"
      : isAcquisition
        ? ACQUISITION_TABS.find((t) => t.id === acquisitionTab)?.label ?? "Viewers"
        : PIPELINE_TABS.find((t) => t.id === pipelineTab)?.label ?? "Buyers"

  return (
    <div className="track-engagement">
      <h1 className="track-engagement__title">{pageTitle}</h1>

      {isAcquisition && acquisitionTab === "viewers" && (
        <>
          <div className="track-engagement__viewers-tabs" role="tablist" aria-label="Viewer types">
            {VIEWERS_SUB_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`viewers-tab-${tab.id}`}
                aria-selected={viewersSubTab === tab.id}
                aria-controls={`viewers-panel-${tab.id}`}
                tabIndex={viewersSubTab === tab.id ? 0 : -1}
                className={`track-engagement__viewers-tab ${viewersSubTab === tab.id ? "track-engagement__viewers-tab--active" : ""}`}
                onClick={() => setViewersSubTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="track-engagement__viewers-tab-rule" aria-hidden />
        </>
      )}

      <div className="track-engagement__content">
        {isAcquisition && acquisitionTab === "viewers" && viewersSubTab === "demo-leads" && (
          <div
            id="viewers-panel-demo-leads"
            role="tabpanel"
            aria-labelledby="viewers-tab-demo-leads"
          >
            <GroupedTable
              columns={acquisitionColumns}
              data={leadsData}
              sortBy={leadsSortBy}
              groupBy={leadsGroupBy}
              onSortChange={setLeadsSortBy}
              onGroupChange={setLeadsGroupBy}
              sortOptions={acquisitionSortOptions}
              groupOptions={acquisitionGroupOptions}
              getSortValue={getSortValue}
              getGroupValue={getGroupValue}
              onGroupHeaderClick={leadsGroupBy === "company" ? onBuyingGroupClick : undefined}
            />
          </div>
        )}
        {isAcquisition && acquisitionTab === "viewers" && viewersSubTab === "anonymous" && (
          <div
            id="viewers-panel-anonymous"
            role="tabpanel"
            aria-labelledby="viewers-tab-anonymous"
          >
            <TabPlaceholder
              title="Anonymous Viewers"
              body="Visitors who viewed demos without identifying themselves. Prototype: session list, replay links, and conversion to known leads."
            />
          </div>
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
        {isAcquisition && acquisitionTab === "forms" && (
          <TabPlaceholder
            title="Forms"
            body="Build and publish forms that capture leads from demos, campaigns, and your site. Prototype: field builder, thank-you actions, and mapping submissions to Viewers and CRM."
          />
        )}

        {!isAcquisition && pipelineTab === "buyers" && (
          <GroupedTable
            columns={pipelineColumns}
            data={pipelineData}
            sortBy={pipelineSortBy}
            groupBy={pipelineGroupBy}
            onSortChange={setPipelineSortBy}
            onGroupChange={setPipelineGroupBy}
            sortOptions={sortOptionsAll}
            groupOptions={pipelineGroupOptions}
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
