import { useState } from "react"
import Avatar from "@/components/Avatar"
import "@/styles/dashboard-page.scss"

/** Relative bar heights (0–100) for the “views by hour” sketch chart. */
const HOURLY_BARS = [10, 8, 6, 7, 14, 22, 28, 20, 16, 12, 14, 18]

const METRICS = [
  { id: "views", label: "Total Views", value: "10", delta: "0.0%" },
  { id: "boards", label: "Demoboards Created", value: "3", delta: "12.5%" },
  { id: "demos", label: "Demos Added", value: "8", delta: "4.2%" },
  { id: "rate", label: "View Rate", value: "57.1%", delta: "2.1%" },
  { id: "stake", label: "Stakeholders Discovered", value: "24", delta: "8.0%" },
  { id: "tour", label: "Tour Views", value: "41", delta: "0.0%" },
] as const

const DEMO_ROWS = [
  { id: "1", title: "Cory's Flow Test", meta: "Cory Crouch · 03/12/26", icon: "account_tree" },
  { id: "2", title: "SNAP Demo [Mar 2026]", meta: "Cory Crouch · 03/10/26", icon: "play_circle" },
] as const

type Range = "7" | "30" | "90"

export default function DashboardPage() {
  const [range, setRange] = useState<Range>("30")
  const [demoTab, setDemoTab] = useState<"all" | "fav" | "recent" | "promo">("all")

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__hero">
        <div className="dashboard-page__hero-main">
          <Avatar initials="C" />
          <div className="dashboard-page__hero-text">
            <h1 className="dashboard-page__title">Cory Crouch</h1>
            <p className="dashboard-page__tagline">
              The system is ready. Are you? (No pressure.)
            </p>
          </div>
        </div>
        <button type="button" className="dashboard-page__hero-edit" aria-label="Edit profile">
          <span className="material-symbols-outlined">edit</span>
        </button>
      </header>

      <section className="dashboard-page__panel" aria-labelledby="dash-insights-heading">
        <h2 id="dash-insights-heading" className="dashboard-page__panel-title">
          Insights
        </h2>
        <div className="dashboard-page__insights">
          <article className="dashboard-page__insight">
            <div className="dashboard-page__insight-top">
              <span className="dashboard-page__pill">Last 30 days</span>
              <button type="button" className="dashboard-page__icon-btn" aria-label="Settings">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
            <p className="dashboard-page__insight-value">4 Hours</p>
            <div className="dashboard-page__insight-label-row">
              <span className="material-symbols-outlined dashboard-page__insight-icon">schedule</span>
              <span>Time Saved</span>
              <span className="material-symbols-outlined dashboard-page__hint-icon" title="How we calculate this">
                help
              </span>
            </div>
            <p className="dashboard-page__insight-foot">
              Equivalent to 1 full workday redirected from live demos to high-value selling activities.
            </p>
          </article>

          <article className="dashboard-page__insight">
            <div className="dashboard-page__chart-head">
              <span className="material-symbols-outlined">visibility</span>
              <span>Views percentage by hour</span>
              <span className="material-symbols-outlined dashboard-page__hint-icon">help</span>
            </div>
            <p className="dashboard-page__chart-caption">
              80% of demos viewed outside your team&apos;s working hours.
            </p>
            <div className="dashboard-page__chart" role="img" aria-label="Bar chart of views by hour">
              <div className="dashboard-page__chart-y">
                <span>20%</span>
                <span>15%</span>
                <span>10%</span>
                <span>5%</span>
                <span>0%</span>
              </div>
              <div className="dashboard-page__chart-bars">
                {HOURLY_BARS.map((h, i) => (
                  <div key={i} className="dashboard-page__chart-bar-wrap">
                    <div
                      className={`dashboard-page__chart-bar ${i % 2 === 0 ? "dashboard-page__chart-bar--a" : "dashboard-page__chart-bar--b"}`}
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="dashboard-page__chart-x">
                <span>12am</span>
                <span>4am</span>
                <span>8am</span>
                <span>12pm</span>
                <span>4pm</span>
                <span>8pm</span>
              </div>
            </div>
          </article>

          <article className="dashboard-page__insight">
            <div className="dashboard-page__insight-top">
              <span className="dashboard-page__pill">Last 30 days</span>
            </div>
            <p className="dashboard-page__insight-value">0.50</p>
            <div className="dashboard-page__insight-label-row">
              <span className="material-symbols-outlined dashboard-page__insight-icon">groups</span>
              <span>Avg Stakeholders Discovered</span>
              <span className="material-symbols-outlined dashboard-page__hint-icon">help</span>
            </div>
            <p className="dashboard-page__insight-foot">
              Average new stakeholders per DemoBoard — focus on multi-threading to increase deal velocity.
            </p>
          </article>
        </div>
      </section>

      <section className="dashboard-page__panel" aria-labelledby="dash-metrics-heading">
        <div className="dashboard-page__metrics-head">
          <h2 id="dash-metrics-heading" className="dashboard-page__panel-title">
            Metrics
          </h2>
          <div className="dashboard-page__metrics-tools">
            <button type="button" className="dashboard-page__select">
              Group Stats
              <span className="material-symbols-outlined">expand_more</span>
            </button>
            <div className="dashboard-page__segments" role="group" aria-label="Date range">
              {(
                [
                  { id: "7" as const, label: "Last 7 days" },
                  { id: "30" as const, label: "Last 30 days" },
                  { id: "90" as const, label: "Last 90 days" },
                ]
              ).map((seg) => (
                <button
                  key={seg.id}
                  type="button"
                  className={`dashboard-page__segment ${range === seg.id ? "dashboard-page__segment--active" : ""}`}
                  onClick={() => setRange(seg.id)}
                  aria-pressed={range === seg.id}
                >
                  {seg.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="dashboard-page__metric-grid">
          {METRICS.map((m) => (
            <div key={m.id} className="dashboard-page__metric-card">
              <div className="dashboard-page__metric-label">
                {m.label}
                <span className="material-symbols-outlined dashboard-page__hint-icon">help</span>
              </div>
              <p className="dashboard-page__metric-value">{m.value}</p>
              <p className="dashboard-page__metric-delta">{m.delta}</p>
              <p className="dashboard-page__metric-foot">Value (last 30 days)</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-page__split" aria-label="Create and get started">
        <div className="dashboard-page__split-col dashboard-page__split-col--main">
          <h2 className="dashboard-page__split-title">Create Demoboard</h2>
          <div className="dashboard-page__toolbar">
            <button type="button" className="dashboard-page__filter-btn">
              <span className="material-symbols-outlined">filter_alt</span>
              Filter
            </button>
            <div className="dashboard-page__search">
              <span className="material-symbols-outlined">search</span>
              <input type="search" placeholder="Search" aria-label="Search demos" />
            </div>
          </div>
          <div className="dashboard-page__tabs" role="tablist">
            {(
              [
                { id: "all" as const, label: "All Demos" },
                { id: "fav" as const, label: "Favorites" },
                { id: "recent" as const, label: "Recents" },
                { id: "promo" as const, label: "Promoted" },
              ]
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={demoTab === t.id}
                className={`dashboard-page__tab ${demoTab === t.id ? "dashboard-page__tab--active" : ""}`}
                onClick={() => setDemoTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <ul className="dashboard-page__demo-list">
            {DEMO_ROWS.map((row) => (
              <li key={row.id} className="dashboard-page__demo-row">
                <span className="material-symbols-outlined dashboard-page__demo-lead-icon">{row.icon}</span>
                <div className="dashboard-page__demo-copy">
                  <span className="dashboard-page__demo-title">{row.title}</span>
                  <span className="dashboard-page__demo-meta">{row.meta}</span>
                </div>
                <button type="button" className="dashboard-page__demo-add" aria-label={`Add ${row.title}`}>
                  <span className="material-symbols-outlined">add</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="dashboard-page__demo-footer">
            <div className="dashboard-page__demo-count">
              <span className="dashboard-page__demo-count-badge">0</span>
              <span>Demos selected</span>
            </div>
            <button type="button" className="dashboard-page__share-btn">
              <span className="material-symbols-outlined">send</span>
              Share
            </button>
          </div>
        </div>

        <div className="dashboard-page__split-col dashboard-page__split-col--aside">
          <h2 className="dashboard-page__split-title">Get Started</h2>
          <div className="dashboard-page__feature">
            <div className="dashboard-page__feature-stage">
              <span className="material-symbols-outlined dashboard-page__feature-play">play_arrow</span>
              <span className="dashboard-page__feature-caption">Flow preview</span>
            </div>
            <p className="dashboard-page__suggestions-title">Suggestions for your role</p>
            <ul className="dashboard-page__suggestions">
              <li>
                <span className="material-symbols-outlined">play_circle</span>
                Find a demo
              </li>
              <li>
                <span className="material-symbols-outlined">send</span>
                Share with prospects
              </li>
              <li>
                <span className="material-symbols-outlined">bar_chart</span>
                Track engagement
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
