import { leadsData, type Lead } from "@/data/leads"
import Avatar from "@/components/Avatar"
import ScoreBar from "@/components/ScoreBar"
import CompanyLogo from "@/components/CompanyLogo"
import SketchTable, { type Column } from "@/components/SketchTable"
import "@/styles/detail-page.scss"

interface BuyingGroupPageProps {
  groupName: string
  onBack: () => void
  onPersonClick: (lead: Lead) => void
}

export default function BuyingGroupPage({ groupName, onBack, onPersonClick }: BuyingGroupPageProps) {
  const members = leadsData
    .filter((l) => l.company === groupName)
    .sort((a, b) => b.engagementScore - a.engagementScore)

  const domain = members[0]?.domain ?? ""
  const avgScore = Math.round(members.reduce((sum, l) => sum + l.engagementScore, 0) / members.length)
  const topScore = Math.max(...members.map((l) => l.engagementScore))
  const opportunities = [...new Set(members.map((l) => l.opportunity))]

  const columns: Column<Lead>[] = [
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
    { key: "role", header: "Role", render: (row) => row.role },
    { key: "opportunity", header: "Opportunity", render: (row) => row.opportunity },
    { key: "engagementScore", header: "Engagement Score", render: (row) => <ScoreBar score={row.engagementScore} /> },
  ]

  return (
    <div className="detail-page">
      <button className="detail-page__back" onClick={onBack}>
        <span className="material-symbols-outlined">arrow_back</span>
        Track Engagement
      </button>

      <div className="detail-page__header">
        <CompanyLogo domain={domain} size={40} card />
        <div>
          <h1>{groupName}</h1>
          <span className="detail-page__subtitle">Buying Group</span>
        </div>
      </div>

      <div className="detail-page__stats">
        <div className="detail-page__stat">
          <span className="detail-page__stat-value">{members.length}</span>
          <span className="field-label">Members</span>
        </div>
        <div className="detail-page__stat">
          <span className="detail-page__stat-value">{topScore}</span>
          <span className="field-label">Top Score</span>
        </div>
        <div className="detail-page__stat">
          <span className="detail-page__stat-value">{avgScore}</span>
          <span className="field-label">Avg Score</span>
        </div>
        <div className="detail-page__stat">
          <span className="detail-page__stat-value">{opportunities.length}</span>
          <span className="field-label">Opportunities</span>
        </div>
      </div>

      <SketchTable columns={columns} data={members} />
    </div>
  )
}
