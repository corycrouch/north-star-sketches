import type { Lead } from "@/data/leads"
import Avatar from "@/components/Avatar"
import CompanyLogo from "@/components/CompanyLogo"
import "@/styles/detail-page.scss"

interface PersonPageProps {
  lead: Lead
  onBack: () => void
  onBuyingGroupClick: (group: string) => void
  /** Label for the linked company / account row (Marketing “Company” vs Sales “Account”). */
  rollupFieldLabel?: string
}

/**
 * Individual viewer page (e.g. Sarah Chen).
 * Built from the Account & Insights wireframe — content & structure adapted to
 * the existing blueprint visual system. All non-CRM data is illustrative.
 */
export default function PersonPage({
  lead,
  onBack,
  onBuyingGroupClick,
  rollupFieldLabel = "Company",
}: PersonPageProps) {
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

      <div className="detail-page__meta">
        <span>{lead.email}</span>
        <span className="dot">·</span>
        <span>CRM: Contact</span>
        <span className="dot">·</span>
        <span>
          {rollupFieldLabel}:&nbsp;
          <a
            className="table-link"
            href="#"
            onClick={(e) => { e.preventDefault(); onBuyingGroupClick(lead.company) }}
          >
            <CompanyLogo domain={lead.domain} size={18} />
            {lead.company}
            <span className="material-symbols-outlined table-link__icon" style={{ opacity: 0.45 }}>arrow_forward</span>
          </a>
        </span>
      </div>

      {/* ——— Synthesis: "What we know about this viewer" ——— */}
      <div className="detail-page__synth">
        <div className="detail-page__synth-label field-label">
          {lead.firstName}’s behavior · last 14 days
        </div>
        <div className="detail-page__synth-lines">
          <p>
            <strong>Most engaged</strong> in the {lead.company} buying group ·
            <strong> 22 minutes</strong> across <strong>2 demos</strong>.
          </p>
          <p>
            Replayed the <strong>Pricing tour twice</strong> this week — last visit{" "}
            <strong>2 hrs ago</strong>.
          </p>
          <p>
            Clicked <strong>“Book a deep-dive”</strong> CTA 4 days ago —{" "}
            <strong>no meeting booked yet</strong>.
          </p>
          <p>
            Shared <em>Q4 Overview</em> with <strong>cfo@{lead.domain}</strong> yesterday.
          </p>
          <p>
            Stated priorities: <strong>Integrations, ROI Reporting</strong>.
          </p>
        </div>
        <div className="detail-page__synth-actions">
          <button className="sketch-btn sketch-btn--primary">
            <span className="material-symbols-outlined">edit_note</span>
            Draft follow-up to {lead.firstName}
          </button>
          <button className="sketch-btn">
            <span className="material-symbols-outlined">send</span>
            Send next demo
          </button>
          <button className="sketch-btn">
            <span className="material-symbols-outlined">open_in_new</span>
            Open in CRM
          </button>
        </div>
      </div>

      {/* ——— Stat strip ——— */}
      <div className="detail-page__stats">
        <div className="detail-page__stat-card">
          <span className="detail-page__stat-card-label">Total view time</span>
          <span className="detail-page__stat-card-value">22 min</span>
          <span className="detail-page__stat-card-delta">↑ 60% this week</span>
        </div>
        <div className="detail-page__stat-card">
          <span className="detail-page__stat-card-label">Demos engaged</span>
          <span className="detail-page__stat-card-value">2 of 3</span>
          <span className="detail-page__stat-card-delta">
            Hasn’t opened Integration Deep Dive
          </span>
        </div>
        <div className="detail-page__stat-card">
          <span className="detail-page__stat-card-label">Sessions</span>
          <span className="detail-page__stat-card-value">5</span>
          <span className="detail-page__stat-card-delta">Returning viewer</span>
        </div>
        <div className="detail-page__stat-card">
          <span className="detail-page__stat-card-label">CTAs · Shares</span>
          <span className="detail-page__stat-card-value">1 · 1</span>
          <span className="detail-page__stat-card-delta">High intent signals</span>
        </div>
      </div>

      <div className="detail-page__two-col">

        {/* ===== LEFT COLUMN — activity timeline ===== */}
        <div className="detail-page__col">
          <div className="detail-page__panel">
            <div className="detail-page__panel-head">
              <span>Activity timeline</span>
              <span className="detail-page__panel-head-aside">
                {lead.firstName}’s sessions, in order
              </span>
            </div>
            <div className="detail-page__panel-body">
              <div className="detail-page__timeline-item">
                <div className="detail-page__timeline-time">2 hrs ago · Pricing & Packaging</div>
                <div className="detail-page__timeline-body">
                  Replayed <strong>Pricing tour</strong> · step 4 · 6 min · 2nd visit this week
                </div>
              </div>
              <div className="detail-page__timeline-item">
                <div className="detail-page__timeline-time">Yesterday · Q4 Overview</div>
                <div className="detail-page__timeline-body">
                  Shared demo with <strong>cfo@{lead.domain}</strong>
                </div>
              </div>
              <div className="detail-page__timeline-item">
                <div className="detail-page__timeline-time">3 days ago · Pricing & Packaging</div>
                <div className="detail-page__timeline-body">
                  First view of pricing tour · 5 min · paused at step 4
                </div>
              </div>
              <div className="detail-page__timeline-item">
                <div className="detail-page__timeline-time">4 days ago · Q4 Overview</div>
                <div className="detail-page__timeline-body">
                  Clicked CTA: <strong>“Book a deep-dive”</strong> · no meeting booked
                </div>
              </div>
              <div className="detail-page__timeline-item">
                <div className="detail-page__timeline-time">7 days ago · Q4 Overview</div>
                <div className="detail-page__timeline-body">
                  Reaction 👍 on overview video at 1:42
                </div>
              </div>
              <div className="detail-page__timeline-item">
                <div className="detail-page__timeline-time">12 days ago · Q4 Overview</div>
                <div className="detail-page__timeline-body">
                  Ranked topics: <strong>Integrations (1), ROI Reporting (2)</strong>, Security (3)
                </div>
              </div>
              <div className="detail-page__timeline-item">
                <div className="detail-page__timeline-time">12 days ago · Q4 Overview</div>
                <div className="detail-page__timeline-body">
                  Answered Discovery: “Current tooling?” → <em>“Looker + manual exports”</em>
                </div>
              </div>
              <div className="detail-page__timeline-item">
                <div className="detail-page__timeline-time">18 days ago · Q4 Overview</div>
                <div className="detail-page__timeline-body">
                  First view · 11 min · completed all tour steps
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RIGHT COLUMN — priorities / behavior / mismatch ===== */}
        <div className="detail-page__col">
          <div className="detail-page__panel">
            <div className="detail-page__panel-head"><span>Stated priorities</span></div>
            <div className="detail-page__panel-body">
              <div className="detail-page__eyebrow">Topic rankings</div>
              <div className="priority-list" style={{ marginBottom: "1rem" }}>
                <div className="priority-list__row">
                  <div>
                    <span className="priority-list__rank">1</span>
                    <span className="priority-list__name">Integrations</span>
                  </div>
                </div>
                <div className="priority-list__row">
                  <div>
                    <span className="priority-list__rank">2</span>
                    <span className="priority-list__name">ROI Reporting</span>
                  </div>
                </div>
                <div className="priority-list__row priority-list__row--muted">
                  <div>
                    <span className="priority-list__rank">3</span>
                    <span className="priority-list__name">Security</span>
                  </div>
                </div>
              </div>

              <div className="detail-page__eyebrow">Discovery answers</div>
              <div className="qa-list">
                <div>
                  <div className="qa-list__q">“Current tooling?”</div>
                  <div className="qa-list__a">→ Looker + manual exports</div>
                </div>
                <div>
                  <div className="qa-list__q">“Top integration concern?”</div>
                  <div className="qa-list__a qa-list__a--empty">— not answered —</div>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-page__panel">
            <div className="detail-page__panel-head"><span>Inferred behavior</span></div>
            <div className="detail-page__panel-body">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.6rem" }}>
                <span className="chip chip--active">Returning viewer</span>
                <span className="chip chip--active">Shares internally</span>
                <span className="chip">High CTA intent</span>
              </div>
              <div style={{ fontSize: "0.88rem", opacity: 0.6, lineHeight: 1.4 }}>
                Returning + sharing pattern suggests internal advocacy. Confidence:
                medium (only 18 days of history).
              </div>
            </div>
          </div>

          <div className="detail-page__panel">
            <div className="detail-page__panel-head"><span>Stated vs. demonstrated</span></div>
            <div className="detail-page__panel-body">
              <span className="chip chip--warn">Mismatch</span>
              <p style={{ marginTop: "0.6rem", marginBottom: "0.5rem", lineHeight: 1.4 }}>
                Ranked <strong>Integrations</strong> #1, but{" "}
                <strong>80% of view time</strong> has been on <strong>Pricing</strong>.
              </p>
              <p style={{ margin: 0, fontSize: "0.88rem", opacity: 0.6, lineHeight: 1.4 }}>
                Suggested action: lead the next conversation with pricing clarity,
                not integrations.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
