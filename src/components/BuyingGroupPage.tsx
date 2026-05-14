import { allLeads, type Lead } from "@/data/leads"
import Avatar from "@/components/Avatar"
import CompanyLogo from "@/components/CompanyLogo"
import "@/styles/detail-page.scss"

interface BuyingGroupPageProps {
  groupName: string
  onBack: () => void
  onPersonClick: (lead: Lead) => void
  /** Label for the back control (e.g. parent list page name). */
  backLabel?: string
  /** Subtitle under the group title (matches Marketing “Company” vs Sales “Account”). */
  rollupSubtitle?: string
}

/**
 * Illustrative enrichment for each member of the buying group. Real product
 * would source this from event data; here it's deterministic-by-rank so the
 * top viewer always reads as "most engaged."
 */
interface BuyerEnrichment {
  viewMinutes: number
  trend: string
  lastEventLabel: string
  lastEventTime: string
  priorities: string[]
  statusChip: { label: string; variant: "active" | "cool" | "default" }
  badge?: string
}

function enrich(_member: Lead, rank: number): BuyerEnrichment {
  const profiles: BuyerEnrichment[] = [
    {
      viewMinutes: 22,
      trend: "↑ this week",
      lastEventLabel: "Pricing tour",
      lastEventTime: "2 hrs ago",
      priorities: ["Integrations", "ROI Reporting"],
      statusChip: { label: "Active", variant: "active" },
      badge: "Most engaged",
    },
    {
      viewMinutes: 11,
      trend: "→ flat",
      lastEventLabel: "Tour step 4",
      lastEventTime: "11 days ago",
      priorities: ["Security", "Reporting"],
      statusChip: { label: "Cooling", variant: "cool" },
    },
    {
      viewMinutes: 6,
      trend: "first view",
      lastEventLabel: "Overview video",
      lastEventTime: "3 days ago",
      priorities: ["Integrations"],
      statusChip: { label: "New", variant: "default" },
    },
    {
      viewMinutes: 4,
      trend: "first view",
      lastEventLabel: "Pricing tour",
      lastEventTime: "Yesterday",
      priorities: [],
      statusChip: { label: "New", variant: "active" },
    },
  ]
  return profiles[Math.min(rank, profiles.length - 1)]
}

export default function BuyingGroupPage({
  groupName,
  onBack,
  onPersonClick,
  backLabel = "Back",
  rollupSubtitle = "Company",
}: BuyingGroupPageProps) {
  const members = allLeads
    .filter((l) => l.company === groupName)
    .sort((a, b) => b.engagementScore - a.engagementScore)

  const domain = members[0]?.domain ?? ""
  const opportunityName = members[0]?.opportunity ?? "Active opportunity"
  const accountName = members[0]?.account ?? groupName
  const topMember = members[0]

  return (
    <div className="detail-page">
      <button className="detail-page__back" onClick={onBack}>
        <span className="material-symbols-outlined">arrow_back</span>
        {backLabel}
      </button>

      <div className="detail-page__header">
        <CompanyLogo domain={domain} size={40} card />
        <div>
          <h1>{groupName}</h1>
          <span className="detail-page__subtitle">{rollupSubtitle}</span>
        </div>
      </div>

      <div className="detail-page__meta">
        <span>{domain}</span>
        <span className="dot">·</span>
        <span>Enterprise</span>
        <span className="dot">·</span>
        <span>Owner: Dylan Smith</span>
      </div>

      {/* ——— Synthesis: "What's going on here" ——— */}
      <div className="detail-page__synth">
        <div className="detail-page__synth-label field-label">
          What’s going on here · updated 4 min ago
        </div>
        <div className="detail-page__synth-lines">
          <p>
            {groupName} has <strong>{members.length} active viewers</strong> across{" "}
            <strong>2 demos</strong>.
          </p>
          <p>
            Opportunity is in <strong>Stage 3 ($85K)</strong> with engagement{" "}
            <strong>↑ 40% week-over-week</strong>.
          </p>
          {topMember && (
            <p>
              <strong>
                {topMember.firstName} {topMember.lastName} viewed the pricing tour twice
              </strong>{" "}
              in the last 4 days.
            </p>
          )}
          <p>
            A <strong>new viewer from {domain}</strong> joined yesterday — not yet
            matched to CRM.
          </p>
          <p>
            Top stated priorities across the group:{" "}
            <strong>Integrations, ROI Reporting</strong>.
          </p>
        </div>
        <div className="detail-page__synth-actions">
          <button className="sketch-btn sketch-btn--primary">
            <span className="material-symbols-outlined">send</span>
            Send next demo
          </button>
          <button className="sketch-btn">
            <span className="material-symbols-outlined">edit_note</span>
            Draft follow-up
          </button>
          <button className="sketch-btn">
            <span className="material-symbols-outlined">open_in_new</span>
            View in CRM
          </button>
        </div>
      </div>

      {/* ——— Stat strip ——— */}
      <div className="detail-page__stats">
        <div className="detail-page__stat-card">
          <span className="detail-page__stat-card-label">Total view time (14d)</span>
          <span className="detail-page__stat-card-value">42 min</span>
          <span className="detail-page__stat-card-delta">↑ 40% vs prior</span>
        </div>
        <div className="detail-page__stat-card">
          <span className="detail-page__stat-card-label">Demos engaged</span>
          <span className="detail-page__stat-card-value">2</span>
          <span className="detail-page__stat-card-delta">3 sent total</span>
        </div>
        <div className="detail-page__stat-card">
          <span className="detail-page__stat-card-label">Group size</span>
          <span className="detail-page__stat-card-value">{members.length} + 1</span>
          <span className="detail-page__stat-card-delta">1 unmatched</span>
        </div>
        <div className="detail-page__stat-card">
          <span className="detail-page__stat-card-label">Days since last view</span>
          <span className="detail-page__stat-card-value">0</span>
          <span className="detail-page__stat-card-delta">Today, 2 hrs ago</span>
        </div>
      </div>

      <div className="detail-page__two-col">

        {/* ===== LEFT COLUMN — buying group + activity feed ===== */}
        <div className="detail-page__col">

          {/* Buying group panel */}
          <div className="detail-page__panel">
            <div className="detail-page__panel-head">
              <span>Buying Group · {members.length} matched + 1 probable</span>
              <span className="detail-page__panel-head-aside">
                <button className="sketch-btn" style={{ padding: "0.25rem 0.7rem", fontSize: "0.85rem" }}>
                  <span className="material-symbols-outlined">person_add</span>
                  Invite
                </button>
              </span>
            </div>

            <div className="detail-page__panel-body detail-page__panel-body--flush">
              {members.map((member, i) => {
                const e = enrich(member, i)
                return (
                  <div
                    key={member.email}
                    className="detail-page__buyer"
                    onClick={() => onPersonClick(member)}
                  >
                    <div className="detail-page__buyer-who">
                      <div className="detail-page__buyer-name">
                        <Avatar initials={`${member.firstName[0]}${member.lastName[0]}`} />
                        {member.firstName} {member.lastName}
                        {e.badge && <span className="chip chip--active">{e.badge}</span>}
                      </div>
                      <div className="detail-page__buyer-meta">
                        {member.role} · {member.email} · CRM: Contact
                      </div>
                    </div>

                    <div className="detail-page__buyer-stat">
                      <span className="big">{e.viewMinutes}m</span>
                      <span className="sub">{e.trend}</span>
                    </div>

                    <div className="detail-page__buyer-stat">
                      <span>{e.lastEventTime}</span>
                      <span className="sub">{e.lastEventLabel}</span>
                    </div>

                    <div className="detail-page__buyer-priorities">
                      {e.priorities.length > 0 ? (
                        e.priorities.map((p) => (
                          <span className="chip" key={p}>{p}</span>
                        ))
                      ) : (
                        <span style={{ fontSize: "0.82rem", opacity: 0.5 }}>
                          — no answers yet —
                        </span>
                      )}
                    </div>

                    <div className="detail-page__buyer-status">
                      <span
                        className={
                          e.statusChip.variant === "default"
                            ? "chip"
                            : `chip chip--${e.statusChip.variant}`
                        }
                      >
                        {e.statusChip.label}
                      </span>
                    </div>
                  </div>
                )
              })}

              {/* Unmatched viewer row */}
              <div className="detail-page__buyer">
                <div className="detail-page__buyer-who">
                  <div className="detail-page__buyer-name">
                    <Avatar initials="?" />
                    cfo@{domain}
                    <span className="chip chip--muted">unmatched</span>
                  </div>
                  <div className="detail-page__buyer-meta">
                    Title unknown · domain matches Account ·{" "}
                    <a className="table-link" href="#" onClick={(e) => e.preventDefault()}>
                      Add as Contact Role
                    </a>
                  </div>
                </div>
                <div className="detail-page__buyer-stat">
                  <span className="big">3m</span>
                  <span className="sub">first view</span>
                </div>
                <div className="detail-page__buyer-stat">
                  <span>Yesterday</span>
                  <span className="sub">Pricing tour</span>
                </div>
                <div className="detail-page__buyer-priorities">
                  <span style={{ fontSize: "0.82rem", opacity: 0.5 }}>
                    — no answers yet —
                  </span>
                </div>
                <div className="detail-page__buyer-status">
                  <span className="chip chip--active">New</span>
                </div>
              </div>

              {/* Probable viewer (shared link, no email) */}
              <div className="detail-page__buyer detail-page__buyer--probable">
                <div className="detail-page__buyer-who">
                  <div className="detail-page__buyer-name">
                    Probable viewer · {domain}
                  </div>
                  <div className="detail-page__buyer-meta">
                    No email captured · forwarded link · same domain
                  </div>
                </div>
                <div className="detail-page__buyer-stat">
                  <span className="big">2m</span>
                </div>
                <div className="detail-page__buyer-stat">
                  <span>4 days ago</span>
                </div>
                <div className="detail-page__buyer-priorities">
                  <span style={{ fontSize: "0.82rem", opacity: 0.5 }}>— no answers —</span>
                </div>
                <div className="detail-page__buyer-status">
                  <span className="chip">Probable</span>
                </div>
              </div>
            </div>

            <div className="detail-page__panel-foot">
              Click any row to drill into that buyer’s full timeline.
            </div>
          </div>

          {/* Activity feed */}
          <div className="detail-page__panel">
            <div className="detail-page__panel-head">
              <span>Recent activity</span>
              <span className="detail-page__panel-head-aside">
                <span className="chip chip--muted">All people</span>
                <span className="chip chip--muted">All events</span>
              </span>
            </div>
            <div className="detail-page__panel-body detail-page__panel-body--flush">
              {topMember && (
                <div className="detail-page__feed-item">
                  <div className="detail-page__feed-time">2 hrs ago</div>
                  <div className="detail-page__feed-who">{topMember.firstName} {topMember.lastName}</div>
                  <div>Replayed <em>Pricing tour</em> · step 4 (2nd time this week)</div>
                </div>
              )}
              <div className="detail-page__feed-item">
                <div className="detail-page__feed-time">Yesterday</div>
                <div className="detail-page__feed-who">cfo@{domain}</div>
                <div>
                  First view · <em>Pricing tour</em> · 3 min · joined via shared
                  link from {topMember?.firstName ?? "team"}
                </div>
              </div>
              {topMember && (
                <div className="detail-page__feed-item">
                  <div className="detail-page__feed-time">Yesterday</div>
                  <div className="detail-page__feed-who">{topMember.firstName} {topMember.lastName}</div>
                  <div>Shared <em>{groupName} — Q4 Overview</em> with cfo@{domain}</div>
                </div>
              )}
              {members[2] && (
                <div className="detail-page__feed-item">
                  <div className="detail-page__feed-time">3 days ago</div>
                  <div className="detail-page__feed-who">{members[2].firstName} {members[2].lastName}</div>
                  <div>
                    Answered Discovery: “What’s your top integration concern?” →{" "}
                    <em>“Salesforce sync latency”</em>
                  </div>
                </div>
              )}
              {members[2] && (
                <div className="detail-page__feed-item">
                  <div className="detail-page__feed-time">3 days ago</div>
                  <div className="detail-page__feed-who">{members[2].firstName} {members[2].lastName}</div>
                  <div>Ranked topics: Integrations (1), Reporting (2), Security (3)</div>
                </div>
              )}
              {topMember && (
                <div className="detail-page__feed-item">
                  <div className="detail-page__feed-time">4 days ago</div>
                  <div className="detail-page__feed-who">{topMember.firstName} {topMember.lastName}</div>
                  <div>
                    Clicked CTA: <em>“Book a deep-dive”</em> → no meeting booked yet
                  </div>
                </div>
              )}
              {members[1] && (
                <div className="detail-page__feed-item">
                  <div className="detail-page__feed-time">11 days ago</div>
                  <div className="detail-page__feed-who">{members[1].firstName} {members[1].lastName}</div>
                  <div>Viewed <em>{groupName} — Q4 Overview</em> · stopped at tour step 4</div>
                </div>
              )}
            </div>
            <div className="detail-page__panel-foot">
              Showing 7 of 23 events · <a href="#" onClick={(e) => e.preventDefault()}>View all</a>
            </div>
          </div>

        </div>

        {/* ===== RIGHT COLUMN — opportunity, priorities, demos ===== */}
        <div className="detail-page__col">

          {/* Active Opportunity panel */}
          <div className="detail-page__panel">
            <div className="detail-page__panel-head">
              <span>Active opportunity</span>
              <span className="detail-page__panel-head-aside">
                <a className="table-link" href="#" onClick={(e) => e.preventDefault()}>
                  Open in CRM
                  <span className="material-symbols-outlined table-link__icon" style={{ opacity: 0.7 }}>open_in_new</span>
                </a>
              </span>
            </div>
            <div className="detail-page__panel-body">
              <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.15rem" }}>
                {opportunityName}
              </div>
              <div style={{ fontSize: "0.88rem", opacity: 0.6, marginBottom: "0.6rem" }}>
                Stage 3: Evaluation · $85,000 · Close: Jun 30 · {accountName}
              </div>

              <div className="detail-page__eyebrow">Stage history × engagement</div>
              <div className="stage-chart">
                <div className="stage-chart__marker" style={{ left: "8%" }}>
                  <span className="stage-chart__marker-label">S1</span>
                </div>
                <div className="stage-chart__marker" style={{ left: "32%" }}>
                  <span className="stage-chart__marker-label">S2</span>
                </div>
                <div className="stage-chart__marker" style={{ left: "62%" }}>
                  <span className="stage-chart__marker-label">S3</span>
                </div>
                {/* engagement bars */}
                <div className="stage-chart__bar" style={{ left: "10%", height: "20%" }} />
                <div className="stage-chart__bar" style={{ left: "18%", height: "35%" }} />
                <div className="stage-chart__bar" style={{ left: "28%", height: "55%" }} />
                <div className="stage-chart__bar" style={{ left: "36%", height: "25%" }} />
                <div className="stage-chart__bar" style={{ left: "46%", height: "15%" }} />
                <div className="stage-chart__bar" style={{ left: "56%", height: "60%" }} />
                <div className="stage-chart__bar" style={{ left: "64%", height: "40%" }} />
                <div className="stage-chart__bar" style={{ left: "74%", height: "70%" }} />
                <div className="stage-chart__bar" style={{ left: "84%", height: "80%" }} />
                <div className="stage-chart__bar" style={{ left: "92%", height: "65%" }} />
              </div>
              <div style={{ fontSize: "0.82rem", opacity: 0.6 }}>
                Stage advances aligned with engagement spikes — earned, not hopeful.
              </div>

              <hr style={{ border: "none", borderTop: "calc(var(--stroke) * 0.4) dashed var(--border)", margin: "0.85rem 0" }} />

              <div style={{ fontSize: "0.92rem", lineHeight: 1.6 }}>
                <div><strong>Days since last engagement:</strong> 0</div>
                <div><strong>Days since last stage change:</strong> 9</div>
                <div><strong>Amount changes:</strong> $60K → $85K (12 days ago)</div>
              </div>
            </div>
          </div>

          {/* Group priorities synthesis */}
          <div className="detail-page__panel">
            <div className="detail-page__panel-head"><span>Stated priorities (group)</span></div>
            <div className="detail-page__panel-body">
              <div style={{ fontSize: "0.92rem", opacity: 0.7, marginBottom: "0.6rem" }}>
                Across 3 buyers who ranked or answered:
              </div>
              <div className="priority-list" style={{ marginBottom: "0.85rem" }}>
                <div className="priority-list__row">
                  <span className="priority-list__name">Integrations</span>
                  <span className="priority-list__detail">top-ranked by 2/3 · 80% view time</span>
                </div>
                <div className="priority-list__row">
                  <span className="priority-list__name">ROI Reporting</span>
                  <span className="priority-list__detail">top-ranked by 1/3 · 60% view time</span>
                </div>
                <div className="priority-list__row priority-list__row--muted">
                  <span className="priority-list__name">Security</span>
                  <span className="priority-list__detail">
                    ranked by {members[1]?.firstName ?? "1 buyer"} only · 15% view time
                  </span>
                </div>
              </div>

              <hr style={{ border: "none", borderTop: "calc(var(--stroke) * 0.4) dashed var(--border)", margin: "0.6rem 0 0.75rem" }} />

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span className="chip chip--warn">Mismatch</span>
                <span style={{ fontSize: "0.92rem", lineHeight: 1.4 }}>
                  {topMember?.firstName ?? "Top viewer"} ranked <em>Integrations</em> #1
                  but spent 80% of time on <em>Pricing</em>.
                </span>
              </div>
            </div>
          </div>

          {/* Demos on this account */}
          <div className="detail-page__panel">
            <div className="detail-page__panel-head"><span>Demos (3)</span></div>
            <div className="detail-page__panel-body detail-page__panel-body--flush">
              <div className="inline-row">
                <div>
                  <div className="inline-row__title">{groupName} — Q4 Overview</div>
                  <div className="inline-row__meta">Sent 18 days ago · 4 viewers</div>
                </div>
                <div className="inline-row__value">31m</div>
              </div>
              <div className="inline-row">
                <div>
                  <div className="inline-row__title">Pricing & Packaging</div>
                  <div className="inline-row__meta">Sent 6 days ago · 2 viewers</div>
                </div>
                <div className="inline-row__value">11m</div>
              </div>
              <div className="inline-row">
                <div>
                  <div className="inline-row__title">Integration Deep Dive</div>
                  <div className="inline-row__meta">Sent 4 days ago · 0 viewers</div>
                </div>
                <div className="inline-row__value inline-row__value--muted">—</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
