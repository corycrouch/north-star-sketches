import { useState } from "react"
import { leadsData, pipelineData, type Lead } from "@/data/leads"
import { salesAccountsData, type AccountRecord } from "@/data/accounts"
import { marketingLinksData, salesLinksData, type MarketingLink, type SalesLink } from "@/data/links"
import {
  ACQUISITION_TABS,
  PIPELINE_TABS,
  type AcquisitionTabId,
  type PipelineTabId,
} from "@/data/track-engagement-tabs"
import GroupedTable, { type GroupedTableColumn } from "@/components/GroupedTable"
import ScoreBar from "@/components/ScoreBar"
import Avatar from "@/components/Avatar"
import CompanyLogo from "@/components/CompanyLogo"
import "@/styles/track-engagement.scss"

function formatLastActivity(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return "—"

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const startOfThatDay = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  const dayDiff = Math.round((startOfToday - startOfThatDay) / 86_400_000)

  const timeStr = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })

  if (dayDiff < 0) {
    return `${d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} · ${timeStr}`
  }
  if (dayDiff === 0) return `Today · ${timeStr}`
  if (dayDiff === 1) return `Yesterday · ${timeStr}`
  if (dayDiff >= 2 && dayDiff < 7) {
    const weekday = d.toLocaleDateString(undefined, { weekday: "long" })
    return `${weekday} · ${timeStr}`
  }
  return `${d.toLocaleDateString(undefined, { month: "short", day: "numeric" })} · ${timeStr}`
}

function formatCount(n: number): string {
  return n.toLocaleString()
}

function buildLinkColumns(): GroupedTableColumn<MarketingLink>[] {
  return [
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <a className="table-link track-engagement__link-cell" href="#">
          <span className="track-engagement__link-thumb" aria-hidden>
            <span className="material-symbols-outlined">
              {row.type === "embed" ? "code" : "link"}
            </span>
          </span>
          <span className="track-engagement__link-text">
            <span className="track-engagement__link-name">
              {row.name}
              <span className="material-symbols-outlined table-link__icon">arrow_forward</span>
            </span>
            <span className="track-engagement__link-kind">
              {row.type === "embed" ? "Embed" : "Link"}
            </span>
          </span>
        </a>
      ),
    },
    {
      key: "demo",
      header: "Demo",
      render: (row) => {
        const extra = row.demos.length - 1
        return (
          <span className="track-engagement__link-demo">
            {row.demos[0] ?? "—"}
            {extra > 0 && (
              <span className="track-engagement__link-demo-more">, +{extra}</span>
            )}
          </span>
        )
      },
    },
    {
      key: "campaign",
      header: "Campaign",
      render: (row) => <span className="track-engagement__link-campaign">{row.campaign}</span>,
    },
    {
      key: "views",
      header: "Views",
      render: (row) => (
        <span className="track-engagement__metric-cell">
          <span className="track-engagement__metric-value">{formatCount(row.views)}</span>
          <span className="track-engagement__metric-sub">{formatCount(row.uniqueViewers)} unique</span>
        </span>
      ),
    },
    {
      key: "leads",
      header: "Leads",
      render: (row) => (
        <span className="track-engagement__metric-cell">
          <span className="track-engagement__metric-value">{formatCount(row.leads)}</span>
          <span className="track-engagement__metric-sub">{row.conversionRate.toFixed(1)}% conv.</span>
        </span>
      ),
    },
    {
      key: "conversionRate",
      header: "Conversion",
      render: (row) => <ScoreBar score={Math.round(row.conversionRate)} />,
    },
    {
      key: "lastActivityAt",
      header: "Last activity",
      render: (row) => (
        <span className="table-last-activity-cell">{formatLastActivity(row.lastActivityAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <button
          type="button"
          className="track-engagement__row-share"
          aria-label={`Share ${row.name}`}
        >
          <span className="material-symbols-outlined" aria-hidden>
            ios_share
          </span>
          Share
        </button>
      ),
    },
  ]
}

function buildSalesLinkColumns(
  onBuyingGroupClick: (group: string) => void,
): GroupedTableColumn<SalesLink>[] {
  return [
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <a className="table-link track-engagement__link-cell" href="#">
          <span className="track-engagement__link-thumb" aria-hidden>
            <span className="material-symbols-outlined">link</span>
          </span>
          <span className="track-engagement__link-text">
            <span className="track-engagement__link-name">
              {row.name}
              <span className="material-symbols-outlined table-link__icon">arrow_forward</span>
            </span>
            <span className="track-engagement__link-kind">Link</span>
          </span>
        </a>
      ),
    },
    {
      key: "demo",
      header: "Demo",
      render: (row) => {
        const extra = row.demos.length - 1
        return (
          <span className="track-engagement__link-demo">
            {row.demos[0] ?? "—"}
            {extra > 0 && (
              <span className="track-engagement__link-demo-more">, +{extra}</span>
            )}
          </span>
        )
      },
    },
    {
      key: "account",
      header: "Account",
      render: (row) => (
        <a
          className="table-link"
          href="#"
          onClick={(e) => { e.preventDefault(); onBuyingGroupClick(row.account) }}
        >
          <CompanyLogo domain={row.domain} size={20} />
          {row.account}
          <span className="material-symbols-outlined table-link__icon">arrow_forward</span>
        </a>
      ),
    },
    {
      key: "views",
      header: "Views",
      render: (row) => (
        <span className="track-engagement__metric-cell">
          <span className="track-engagement__metric-value">{formatCount(row.views)}</span>
          <span className="track-engagement__metric-sub">{formatCount(row.uniqueViewers)} unique</span>
        </span>
      ),
    },
    {
      key: "viewers",
      header: "Viewers",
      render: (row) => (
        <span className="track-engagement__metric-cell">
          <span className="track-engagement__metric-value">{formatCount(row.viewers)}</span>
          <span className="track-engagement__metric-sub">
            {row.uniqueViewers > 0
              ? `${Math.round((row.viewers / row.uniqueViewers) * 100)}% identified`
              : "—"}
          </span>
        </span>
      ),
    },
    {
      key: "engagementScore",
      header: "Engagement",
      render: (row) => <ScoreBar score={row.engagementScore} />,
    },
    {
      key: "lastActivityAt",
      header: "Last activity",
      render: (row) => (
        <span className="table-last-activity-cell">{formatLastActivity(row.lastActivityAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <button
          type="button"
          className="track-engagement__row-share"
          aria-label={`Share ${row.name}`}
        >
          <span className="material-symbols-outlined" aria-hidden>
            ios_share
          </span>
          Share
        </button>
      ),
    },
  ]
}

const linkSortOptions = [
  { key: "views", label: "Views" },
  { key: "leads", label: "Leads" },
  { key: "conversionRate", label: "Conversion" },
  { key: "name", label: "Name" },
  { key: "demo", label: "Demo" },
  { key: "campaign", label: "Campaign" },
  { key: "lastActivityAt", label: "Last activity" },
]

const linkQuickFilters = [
  { label: "Type", icon: "category" },
  { label: "Demo", icon: "smart_display" },
  { label: "Campaign", icon: "campaign" },
  { label: "Columns", icon: "view_column" },
]

const linkGroupOptions = [
  { key: "individual", label: "Individual" },
  { key: "demo", label: "Demo" },
]

const salesLinkSortOptions = [
  { key: "views", label: "Views" },
  { key: "viewers", label: "Viewers" },
  { key: "engagementScore", label: "Engagement" },
  { key: "name", label: "Name" },
  { key: "demo", label: "Demo" },
  { key: "account", label: "Account" },
  { key: "lastActivityAt", label: "Last activity" },
]

const salesLinkQuickFilters = [
  { label: "Account", icon: "business" },
  { label: "Demo", icon: "smart_display" },
  { label: "Columns", icon: "view_column" },
]

const salesLinkGroupOptions = [
  { key: "individual", label: "Individual" },
  { key: "account", label: "Account" },
]

function getLinkSortValue(row: MarketingLink, field: string): string | number {
  switch (field) {
    case "name": return row.name
    case "demo": return row.demos[0] ?? ""
    case "campaign": return row.campaign
    case "type": return row.type
    case "views": return row.views
    case "leads": return row.leads
    case "conversionRate": return row.conversionRate
    case "lastActivityAt": return row.lastActivityAt
    default: return ""
  }
}

function getLinkGroupValue(row: MarketingLink, field: string): string {
  switch (field) {
    case "demo": return row.demos[0] ?? ""
    case "campaign": return row.campaign
    case "type": return row.type === "embed" ? "Embeds" : "Links"
    default: return ""
  }
}

function getSalesLinkSortValue(row: SalesLink, field: string): string | number {
  switch (field) {
    case "name": return row.name
    case "demo": return row.demos[0] ?? ""
    case "account": return row.account
    case "views": return row.views
    case "viewers": return row.viewers
    case "engagementScore": return row.engagementScore
    case "lastActivityAt": return row.lastActivityAt
    default: return ""
  }
}

function getSalesLinkGroupValue(row: SalesLink, field: string): string {
  switch (field) {
    case "account": return row.account
    case "demo": return row.demos[0] ?? ""
    default: return ""
  }
}

export type TrackEngagementView = "acquisition" | "pipeline"

interface TrackEngagementProps {
  view: TrackEngagementView
  acquisitionTab: AcquisitionTabId
  pipelineTab: PipelineTabId
  onPersonClick: (lead: Lead) => void
  onBuyingGroupClick: (group: string) => void
}

const VIEWERS_SUB_TABS = [
  { id: "demo-leads" as const, label: "Demo Leads" },
  { id: "anonymous" as const, label: "Anonymous Viewers" },
]
type ViewersSubTabId = (typeof VIEWERS_SUB_TABS)[number]["id"]

type LeadsTableVariant = "acquisition" | "pipeline"
type AccountsTableVariant = "acquisition" | "pipeline"

function buildAccountColumns(
  onBuyingGroupClick: (group: string) => void,
  variant: AccountsTableVariant,
): GroupedTableColumn<AccountRecord>[] {
  const isAcquisition = variant === "acquisition"

  const cols: GroupedTableColumn<AccountRecord>[] = [
    {
      key: "name",
      header: isAcquisition ? "Company" : "Account",
      render: (row) => (
        <a
          className="table-link name-cell"
          href="#"
          onClick={(e) => { e.preventDefault(); onBuyingGroupClick(row.company) }}
        >
          <CompanyLogo domain={row.domain} size={20} />
          <span className="name-cell__text">
            <span className="name-cell__name">
              {row.name}
              <span className="material-symbols-outlined table-link__icon">arrow_forward</span>
            </span>
            {!isAcquisition && row.company !== row.name && (
              <span className="name-cell__role">{row.company}</span>
            )}
          </span>
        </a>
      ),
    },
    {
      key: "viewers",
      header: "Viewers",
      render: (row) => (
        <span className="track-engagement__metric-cell">
          <span className="track-engagement__metric-value">{formatCount(row.viewers)}</span>
          <span className="track-engagement__metric-sub">identified</span>
        </span>
      ),
    },
  ]

  if (!isAcquisition) {
    cols.push({
      key: "opportunity",
      header: "Opportunity",
      render: (row) => row.opportunity,
    })
  }

  cols.push(
    {
      key: "lastActivityAt",
      header: "Last activity",
      render: (row) => (
        <span className="table-last-activity-cell">{formatLastActivity(row.lastActivityAt)}</span>
      ),
    },
    {
      key: "engagementScore",
      header: "Engagement Score",
      render: (row) => <ScoreBar score={row.engagementScore} />,
    },
  )

  return cols
}

function buildColumns(
  onPersonClick: (lead: Lead) => void,
  onBuyingGroupClick: (group: string) => void,
  variant: LeadsTableVariant,
): GroupedTableColumn<Lead>[] {
  const isAcquisition = variant === "acquisition"

  const companyColumn: GroupedTableColumn<Lead> = {
    key: "company",
    header: isAcquisition ? "Company" : "Account",
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
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <a
          className="table-link name-cell name-cell--with-role"
          href="#"
          onClick={(e) => { e.preventDefault(); onPersonClick(row) }}
        >
          <Avatar initials={`${row.firstName[0]}${row.lastName[0]}`} />
          <span className="name-cell__text">
            <span className="name-cell__name">
              {row.firstName} {row.lastName}
              <span className="material-symbols-outlined table-link__icon">arrow_forward</span>
            </span>
            <span className="name-cell__role">{row.role}</span>
          </span>
        </a>
      ),
    },
    companyColumn,
  ]

  if (isAcquisition) {
    cols.push({
      key: "email",
      header: "Email",
      render: (row) => <span className="table-email-cell">{row.email}</span>,
    })
    cols.push({
      key: "lastActivityAt",
      header: "Last activity",
      render: (row) => (
        <span className="table-last-activity-cell">{formatLastActivity(row.lastActivityAt)}</span>
      ),
    })
  }

  if (!isAcquisition) {
    cols.push({
      key: "opportunity",
      header: "Opportunity",
      render: (row) => row.opportunity,
    })
    cols.push({
      key: "lastActivityAt",
      header: "Last activity",
      render: (row) => (
        <span className="table-last-activity-cell">{formatLastActivity(row.lastActivityAt)}</span>
      ),
    })
  }

  cols.push({
    key: "engagementScore",
    header: "Engagement Score",
    render: (row) => <ScoreBar score={row.engagementScore} />,
  })

  if (isAcquisition) {
    cols.push({
      key: "actions",
      header: "",
      render: (row) => (
        <span className="track-engagement__row-handoff-wrap">
          <button
            type="button"
            className="track-engagement__row-handoff"
            aria-label={`Hand off ${row.firstName} ${row.lastName} to sales`}
          >
            Handoff
          </button>
          <span className="track-engagement__row-handoff-tip" role="tooltip">
            Triggered automatically by CRM sync status where available
          </span>
        </span>
      ),
    })
  }

  return cols
}

const sortOptionsAll = [
  { key: "engagementScore", label: "Engagement" },
  { key: "name", label: "Name" },
  { key: "company", label: "Account" },
  { key: "role", label: "Role" },
  { key: "lastActivityAt", label: "Last activity" },
  { key: "opportunity", label: "Opportunity" },
]

const acquisitionSortOptions = [
  ...sortOptionsAll
    .filter((o) => o.key !== "opportunity" && o.key !== "lastActivityAt")
    .map((o) => (o.key === "company" ? { ...o, label: "Company" } : o)),
  { key: "email", label: "Email" },
  { key: "lastActivityAt", label: "Last activity" },
]

const acquisitionGroupOptions = [
  { key: "individual", label: "Individual" },
  { key: "company", label: "Company" },
]

const accountSortOptions = [
  { key: "engagementScore", label: "Engagement" },
  { key: "name", label: "Account" },
  { key: "viewers", label: "Viewers" },
  { key: "lastActivityAt", label: "Last activity" },
  { key: "opportunity", label: "Opportunity" },
]

const pipelineAccountGroupOptions = [
  { key: "individual", label: "Individual" },
  { key: "company", label: "Parent company" },
]

function getAccountSortValue(row: AccountRecord, field: string): string | number {
  switch (field) {
    case "name": return row.name
    case "viewers": return row.viewers
    case "engagementScore": return row.engagementScore
    case "lastActivityAt": return row.lastActivityAt
    case "opportunity": return row.opportunity
    case "company": return row.company
    default: return ""
  }
}

function getAccountGroupValue(row: AccountRecord, field: string): string {
  switch (field) {
    case "company": return row.company
    default: return ""
  }
}

const pipelineGroupOptions = [
  { key: "individual", label: "Individual" },
  { key: "company", label: "Account" },
]

function getSortValue(row: Lead, field: string): string | number {
  switch (field) {
    case "name": return `${row.firstName} ${row.lastName}`
    case "engagementScore": return row.engagementScore
    case "company": return row.company
    case "role": return row.role
    case "email": return row.email
    case "lastActivityAt": return row.lastActivityAt
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

function AccountsDashboardPlaceholder() {
  return (
    <section className="track-engagement__accounts-dashboard" aria-label="Dashboard placeholder">
      <h2 className="track-engagement__accounts-dashboard-title">
        Kyle Brauner Dashboard Placeholder
      </h2>
    </section>
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
  const pipelineAccountColumns = buildAccountColumns(onBuyingGroupClick, "pipeline")
  const linkColumns = buildLinkColumns()
  const salesLinkColumns = buildSalesLinkColumns(onBuyingGroupClick)

  const [leadsSortBy, setLeadsSortBy] = useState<string | null>("engagementScore")
  const [leadsGroupBy, setLeadsGroupBy] = useState<string | null>(null)
  const [viewersSubTab, setViewersSubTab] = useState<ViewersSubTabId>("demo-leads")

  const [linksSortBy, setLinksSortBy] = useState<string | null>("views")
  const [linksGroupBy, setLinksGroupBy] = useState<string | null>(null)

  const [salesLinksSortBy, setSalesLinksSortBy] = useState<string | null>("views")
  const [salesLinksGroupBy, setSalesLinksGroupBy] = useState<string | null>(null)

  const [pipelineSortBy, setPipelineSortBy] = useState<string | null>("engagementScore")
  const [pipelineGroupBy, setPipelineGroupBy] = useState<string | null>("company")

  const [salesAccountsSortBy, setSalesAccountsSortBy] = useState<string | null>("engagementScore")
  const [salesAccountsGroupBy, setSalesAccountsGroupBy] = useState<string | null>(null)

  const isAcquisition = view === "acquisition"

  const pageTitle = isAcquisition
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
          <GroupedTable
            columns={linkColumns}
            data={marketingLinksData}
            sortBy={linksSortBy}
            groupBy={linksGroupBy}
            onSortChange={setLinksSortBy}
            onGroupChange={setLinksGroupBy}
            sortOptions={linkSortOptions}
            groupOptions={linkGroupOptions}
            getSortValue={getLinkSortValue}
            getGroupValue={getLinkGroupValue}
            quickFilters={linkQuickFilters}
            viewByFlatIcon="link"
            viewByGroupedIcon="smart_display"
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

        {!isAcquisition && pipelineTab === "accounts" && (
          <>
            <AccountsDashboardPlaceholder />
            <GroupedTable
            columns={pipelineAccountColumns}
            data={salesAccountsData}
            sortBy={salesAccountsSortBy}
            groupBy={salesAccountsGroupBy}
            onSortChange={setSalesAccountsSortBy}
            onGroupChange={setSalesAccountsGroupBy}
            sortOptions={accountSortOptions}
            groupOptions={pipelineAccountGroupOptions}
            getSortValue={getAccountSortValue}
            getGroupValue={getAccountGroupValue}
            onGroupHeaderClick={salesAccountsGroupBy === "company" ? onBuyingGroupClick : undefined}
            quickFilters={[
              { label: "Account", icon: "business" },
              { label: "Opportunity", icon: "work" },
              { label: "Columns", icon: "view_column" },
            ]}
            viewByFlatIcon="business"
            viewByGroupedIcon="corporate_fare"
          />
          </>
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
          <GroupedTable
            columns={salesLinkColumns}
            data={salesLinksData}
            sortBy={salesLinksSortBy}
            groupBy={salesLinksGroupBy}
            onSortChange={setSalesLinksSortBy}
            onGroupChange={setSalesLinksGroupBy}
            sortOptions={salesLinkSortOptions}
            groupOptions={salesLinkGroupOptions}
            getSortValue={getSalesLinkSortValue}
            getGroupValue={getSalesLinkGroupValue}
            onGroupHeaderClick={salesLinksGroupBy === "account" ? onBuyingGroupClick : undefined}
            quickFilters={salesLinkQuickFilters}
            viewByFlatIcon="link"
            viewByGroupedIcon="business"
          />
        )}
      </div>
    </div>
  )
}
