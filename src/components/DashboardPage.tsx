import { useState } from "react"
import Avatar from "@/components/Avatar"
import "@/styles/dashboard-page.scss"

/**
 * Rep home dashboard — blueprint sketch of the Consensus seller dashboard.
 * Layout and copy mirror the production UI; all numbers are illustrative.
 */

const PROFILE = {
  name: "Cory Crouch",
  tagline: "Take a deep breath — you've got this dashboard thing down.",
}

const HOURLY_VIEWS = [
  { label: "12am", height: 18 },
  { label: "2am", height: 12 },
  { label: "4am", height: 8 },
  { label: "6am", height: 22 },
  { label: "8am", height: 28 },
  { label: "10am", height: 35 },
  { label: "12pm", height: 42 },
  { label: "2pm", height: 38 },
  { label: "4pm", height: 55 },
  { label: "6pm", height: 72, highlight: true },
  { label: "8pm", height: 48 },
  { label: "10pm", height: 30 },
] as const

type TimeRange = "7d" | "30d" | "90d"

const TIME_RANGES: { id: TimeRange; label: string }[] = [
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "90d", label: "Last 90 days" },
]

interface MetricCard {
  id: string
  label: string
  value: string
  trend: string
  trendUp: boolean | null
}

const METRICS: MetricCard[] = [
  { id: "views", label: "Total Views", value: "8", trend: "300.0%", trendUp: true },
  { id: "boards", label: "Demoboards Created", value: "8", trend: "166.7%", trendUp: true },
  { id: "demos", label: "Demos Added", value: "8", trend: "166.7%", trendUp: true },
  { id: "rate", label: "View Rate", value: "87.5%", trend: "162.5%", trendUp: true },
  { id: "stakeholders", label: "Stakeholders Discovered", value: "0", trend: "0.0%", trendUp: null },
  { id: "tours", label: "Tour Views", value: "11", trend: "0.0%", trendUp: null },
]

type DemoTab = "all" | "favorites" | "recents" | "promoted"

const DEMO_TABS: { id: DemoTab; label: string }[] = [
  { id: "all", label: "All Demos" },
  { id: "favorites", label: "Favorites" },
  { id: "recents", label: "Recents" },
  { id: "promoted", label: "Promoted" },
]

interface DemoPickerItem {
  id: string
  title: string
  author: string
  date: string
  icon: string
}

const DEMO_PICKER_ITEMS: DemoPickerItem[] = [
  { id: "dp-1", title: "derek - disco rs migration", author: "Derek Hansen", date: "05/10/26", icon: "stethoscope" },
  { id: "dp-2", title: "Consensus 1", author: "Mary Myers", date: "03/26/26", icon: "play_circle" },
  { id: "dp-3", title: "Netsuite", author: "IT Manager", date: "03/12/26", icon: "play_circle" },
  { id: "dp-4", title: "Consensus Test for IT Manager", author: "Cory Crouch", date: "03/12/26", icon: "play_circle" },
]

const GET_STARTED_SUGGESTIONS = [
  { icon: "play_circle", label: "Find a demo" },
  { icon: "send", label: "Share with prospects" },
  { icon: "bar_chart", label: "Track engagement" },
] as const

function InfoIcon() {
  return (
    <span className="dashboard-page__info-icon material-symbols-outlined" aria-hidden>
      info
    </span>
  )
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d")
  const [demoTab, setDemoTab] = useState<DemoTab>("all")
  const [selectedDemoIds, setSelectedDemoIds] = useState<Set<string>>(new Set())

  function toggleDemo(id: string) {
    setSelectedDemoIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const timeRangeLabel = TIME_RANGES.find((r) => r.id === timeRange)?.label ?? "Last 30 days"

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__hero">
        <div className="dashboard-page__hero-main">
          <Avatar initials="C" />
          <div className="dashboard-page__hero-text">
            <h1 className="dashboard-page__title">{PROFILE.name}</h1>
            <p className="dashboard-page__tagline">{PROFILE.tagline}</p>
          </div>
        </div>
        <button type="button" className="dashboard-page__hero-edit" aria-label="Edit profile">
          <span className="material-symbols-outlined">edit</span>
        </button>
      </header>

      {/* ——— Insights ——— */}
      <section className="dashboard-page__section">
        <h2 className="dashboard-page__section-title">Insights</h2>
        <div className="dashboard-page__insights">
          <article className="dashboard-page__insight dashboard-page__insight--time">
            <div className="dashboard-page__insight-head">
              <span className="dashboard-page__badge">Last 30 days</span>
              <button type="button" className="dashboard-page__icon-btn" aria-label="Insight settings">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
            <p className="dashboard-page__insight-value">5 Hours</p>
            <p className="dashboard-page__insight-label">
              <span className="material-symbols-outlined" aria-hidden>schedule</span>
              Time Saved
              <InfoIcon />
            </p>
            <p className="dashboard-page__insight-foot">
              Equivalent to 1 full workdays redirected from live demos to high-value selling activities.
            </p>
          </article>

          <article className="dashboard-page__insight dashboard-page__insight--chart">
            <p className="dashboard-page__insight-chart-title">
              <span className="material-symbols-outlined" aria-hidden>visibility</span>
              Views percentage by hour
              <InfoIcon />
            </p>
            <p className="dashboard-page__insight-chart-sub">
              89% of demos viewed outside your team&apos;s working hours
            </p>
            <div className="dashboard-page__hour-chart" role="img" aria-label="Bar chart of views by hour">
              {HOURLY_VIEWS.map((bar) => (
                <div key={bar.label} className="dashboard-page__hour-chart-col">
                  <div
                    className={`dashboard-page__hour-chart-bar${
                      "highlight" in bar && bar.highlight ? " dashboard-page__hour-chart-bar--peak" : ""
                    }`}
                    style={{ height: `${bar.height}%` }}
                  />
                  <span className="dashboard-page__hour-chart-label">{bar.label}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-page__insight dashboard-page__insight--stakeholders">
            <div className="dashboard-page__insight-head">
              <span className="dashboard-page__badge">Last 30 days</span>
            </div>
            <p className="dashboard-page__insight-value">0.00</p>
            <p className="dashboard-page__insight-label">
              <span className="material-symbols-outlined" aria-hidden>group</span>
              Avg Stakeholders Discovered
              <InfoIcon />
            </p>
            <p className="dashboard-page__insight-foot">
              Average new stakeholders discovered per DemoBoard — focus on multi-threading to increase deal velocity
            </p>
          </article>
        </div>
      </section>

      {/* ——— Metrics ——— */}
      <section className="dashboard-page__section">
        <div className="dashboard-page__section-head">
          <h2 className="dashboard-page__section-title">Metrics</h2>
          <div className="dashboard-page__section-controls">
            <button type="button" className="dashboard-page__select" aria-label="Group stats">
              Group Stats
              <span className="material-symbols-outlined" aria-hidden>expand_more</span>
            </button>
            <div className="dashboard-page__time-toggle" role="group" aria-label="Time range">
              {TIME_RANGES.map((range) => (
                <button
                  key={range.id}
                  type="button"
                  className={`dashboard-page__time-toggle-btn${
                    timeRange === range.id ? " dashboard-page__time-toggle-btn--active" : ""
                  }`}
                  onClick={() => setTimeRange(range.id)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="dashboard-page__metrics">
          {METRICS.map((metric) => (
            <article key={metric.id} className="dashboard-page__metric">
              <p className="dashboard-page__metric-label">
                {metric.label}
                <InfoIcon />
              </p>
              <p className="dashboard-page__metric-value">{metric.value}</p>
              <span
                className={`dashboard-page__metric-trend${
                  metric.trendUp === true
                    ? " dashboard-page__metric-trend--up"
                    : metric.trendUp === false
                      ? " dashboard-page__metric-trend--down"
                      : " dashboard-page__metric-trend--flat"
                }`}
              >
                {metric.trend}
              </span>
              <p className="dashboard-page__metric-foot">Value ({timeRangeLabel.toLowerCase()})</p>
            </article>
          ))}
        </div>
      </section>

      {/* ——— Bottom row ——— */}
      <div className="dashboard-page__bottom">
        <section className="dashboard-page__panel dashboard-page__panel--demoboard">
          <h2 className="dashboard-page__panel-title">Create Demoboard</h2>
          <div className="dashboard-page__demoboard-toolbar">
            <button type="button" className="dashboard-page__filter-btn">
              <span className="material-symbols-outlined" aria-hidden>filter_alt</span>
              Filter
            </button>
            <label className="dashboard-page__search">
              <span className="material-symbols-outlined" aria-hidden>search</span>
              <input type="search" placeholder="Search" aria-label="Search demos" />
            </label>
          </div>
          <div className="dashboard-page__demo-tabs" role="tablist" aria-label="Demo lists">
            {DEMO_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={demoTab === tab.id}
                className={`dashboard-page__demo-tab${
                  demoTab === tab.id ? " dashboard-page__demo-tab--active" : ""
                }`}
                onClick={() => setDemoTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <ul className="dashboard-page__demo-list">
            {DEMO_PICKER_ITEMS.map((item) => {
              const selected = selectedDemoIds.has(item.id)
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`dashboard-page__demo-row${selected ? " dashboard-page__demo-row--selected" : ""}`}
                    onClick={() => toggleDemo(item.id)}
                  >
                    <span className="dashboard-page__demo-thumb" aria-hidden>
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </span>
                    <span className="dashboard-page__demo-copy">
                      <span className="dashboard-page__demo-title">{item.title}</span>
                      <span className="dashboard-page__demo-meta">
                        {item.author} {item.date}
                      </span>
                    </span>
                    <span className="dashboard-page__demo-add" aria-hidden>
                      <span className="material-symbols-outlined">add</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="dashboard-page__demoboard-foot">
            <p className="dashboard-page__selected-count">
              <span className="dashboard-page__selected-count-num">{selectedDemoIds.size}</span>
              Demos Selected
            </p>
            <button type="button" className="dashboard-page__share-btn">
              Share
              <span className="material-symbols-outlined" aria-hidden>play_arrow</span>
            </button>
          </div>
        </section>

        <section className="dashboard-page__panel dashboard-page__panel--started">
          <h2 className="dashboard-page__panel-title">Get Started</h2>
          <div className="dashboard-page__video-preview" role="img" aria-label="Platform overview video preview">
            <div className="dashboard-page__video-frame">
              <span className="dashboard-page__video-play material-symbols-outlined" aria-hidden>
                play_arrow
              </span>
            </div>
            <div className="dashboard-page__video-chrome">
              <span className="dashboard-page__video-chrome-title">Platform Overview</span>
              <span className="dashboard-page__video-chrome-next">Next</span>
            </div>
          </div>
          <p className="dashboard-page__suggestions-label">Suggestions for your role</p>
          <ul className="dashboard-page__suggestions">
            {GET_STARTED_SUGGESTIONS.map((item) => (
              <li key={item.label}>
                <button type="button" className="dashboard-page__suggestion">
                  <span className="material-symbols-outlined" aria-hidden>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <button type="button" className="dashboard-page__record-fab" aria-label="Record video">
        <span className="dashboard-page__record-fab-dot" aria-hidden />
      </button>
    </div>
  )
}
