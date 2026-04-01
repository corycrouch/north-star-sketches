import { useState } from "react"
import { leadsData, type Lead } from "@/data/leads"
import GroupedTable, { type GroupedTableColumn } from "@/components/GroupedTable"
import ScoreBar from "@/components/ScoreBar"
import Avatar from "@/components/Avatar"
import CompanyLogo from "@/components/CompanyLogo"
import "@/styles/track-engagement.scss"

const tabs = ["Leads", "Pipeline"] as const

interface TrackEngagementProps {
  onPersonClick: (lead: Lead) => void
  onBuyingGroupClick: (group: string) => void
}

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

export default function TrackEngagement({ onPersonClick, onBuyingGroupClick }: TrackEngagementProps) {
  const [activeTab, setActiveTab] = useState<string>("Leads")
  const columns = buildColumns(onPersonClick, onBuyingGroupClick)

  const [leadsSortBy, setLeadsSortBy] = useState<string | null>("engagementScore")
  const [leadsGroupBy, setLeadsGroupBy] = useState<string | null>("company")

  const [pipelineSortBy, setPipelineSortBy] = useState<string | null>("engagementScore")
  const [pipelineGroupBy, setPipelineGroupBy] = useState<string | null>("company")

  return (
    <div className="track-engagement">
      <h1>Track Engagement</h1>

      <div className="track-engagement__tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`track-engagement__tab ${activeTab === tab ? "track-engagement__tab--active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="track-engagement__content">
        {activeTab === "Leads" && (
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
            onGroupHeaderClick={onBuyingGroupClick}
          />
        )}
        {activeTab === "Pipeline" && (
          <GroupedTable
            columns={columns}
            data={leadsData}
            sortBy={pipelineSortBy}
            groupBy={pipelineGroupBy}
            onSortChange={setPipelineSortBy}
            onGroupChange={setPipelineGroupBy}
            sortOptions={sortOptions}
            groupOptions={groupOptions}
            getSortValue={getSortValue}
            getGroupValue={getGroupValue}
            onGroupHeaderClick={onBuyingGroupClick}
          />
        )}
      </div>
    </div>
  )
}
