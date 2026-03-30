import type { Lead } from "@/data/leads"
import Avatar from "@/components/Avatar"
import ScoreBar from "@/components/ScoreBar"
import CompanyLogo from "@/components/CompanyLogo"
import "@/styles/detail-page.scss"

interface PersonPageProps {
  lead: Lead
  onBack: () => void
  onBuyingGroupClick: (group: string) => void
}

export default function PersonPage({ lead, onBack, onBuyingGroupClick }: PersonPageProps) {
  const fullName = `${lead.firstName} ${lead.lastName}`
  const initials = `${lead.firstName[0]}${lead.lastName[0]}`

  return (
    <div className="detail-page">
      <button className="detail-page__back" onClick={onBack}>
        <span className="material-symbols-outlined">arrow_back</span>
        Back
      </button>

      <div className="detail-page__header">
        <Avatar initials={initials} />
        <div>
          <h1>{fullName}</h1>
          <span className="detail-page__subtitle">{lead.role}</span>
        </div>
      </div>

      <div className="detail-page__stats">
        <div className="detail-page__stat">
          <span className="detail-page__stat-value">
            <ScoreBar score={lead.engagementScore} />
          </span>
          <span className="detail-page__stat-label">Engagement Score</span>
        </div>
      </div>

      <div className="detail-page__fields">
        <div className="detail-page__field">
          <span className="detail-page__field-label">Buying Group</span>
          <a
            className="table-link"
            href="#"
            onClick={(e) => { e.preventDefault(); onBuyingGroupClick(lead.company) }}
          >
            <CompanyLogo domain={lead.domain} size={20} />
            {lead.company}
            <span className="material-symbols-outlined table-link__icon" style={{ opacity: 0.45 }}>arrow_forward</span>
          </a>
        </div>
        <div className="detail-page__field">
          <span className="detail-page__field-label">Opportunity</span>
          <span>{lead.opportunity}</span>
        </div>
      </div>

      <div className="detail-page__section">
        <h2>Activity</h2>
        <div className="detail-page__placeholder">
          <span className="material-symbols-outlined">timeline</span>
          <p>Activity timeline coming soon</p>
        </div>
      </div>
    </div>
  )
}
