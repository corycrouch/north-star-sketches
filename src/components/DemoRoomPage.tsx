import { useMemo, useState } from "react"
import { demosData } from "@/data/demos"
import "@/styles/demo-room-page.scss"

/**
 * Sketch of the "demo room" — the page a prospective buyer lands on after
 * clicking a demo link (e.g. from the fake Claude conversation). Standalone:
 * no global app nav. See hash routing in `App.tsx` (`#/demo-room`).
 *
 * Same layout shape as a Consensus / video-player landing page but in the
 * blueprint sketch language. All copy / mock data lives in the constants
 * below so it's easy to iterate without touching markup.
 */

const HERO = {
  greeting: "Hi Cory",
  subtitle: "Here's your next watch",
  videoTitle: "Video preview",
  videoCaption: "Video · 4 min",
}

const REP = {
  initials: "R",
  name: "Rep Name Here",
  title: "Rep Title Here",
  message: "Custom rep message here. Lorem ipsum set amet.",
}

const VIEWER_BADGES = ["A", "B", "C"]
const VIEWER_OVERFLOW = "+10"

type CardKind = "video" | "playlist" | "flow"

interface CardItem {
  id: string
  title: string
  subtitle: string
  /** Plain row cards default to `video`. */
  kind?: CardKind
  /** Demos in a playlist, or questions in a flow — drives badge + stack hint. */
  clusterCount?: number
}

const SUGGESTED_ITEMS: CardItem[] = [
  {
    id: "p1",
    title: "Enterprise kickoff pack",
    subtitle: "Curated for your team",
    kind: "playlist",
    clusterCount: 4,
  },
  {
    id: "f1",
    title: "Discovery qualification flow",
    subtitle: "Rep-shared",
    kind: "flow",
    clusterCount: 5,
  },
  { id: "d1", title: "Single demo: ROI calculator", subtitle: "Video · 6 min" },
  {
    id: "f2",
    title: "Security review path",
    subtitle: "From Jordan K.",
    kind: "flow",
    clusterCount: 5,
  },
]

const WATCHED_ITEMS: CardItem[] = [
  { id: "w1", title: "Product Overview", subtitle: "Video · 4 min" },
  {
    id: "w2",
    title: "Pricing deep-dive series",
    subtitle: "Pick up where you left off",
    kind: "playlist",
    clusterCount: 4,
  },
  {
    id: "w3",
    title: "Integrations tour",
    subtitle: "5-step walkthrough",
    kind: "flow",
    clusterCount: 5,
  },
  { id: "w4", title: "Customer story: Acme Co.", subtitle: "Video · 8 min" },
]

const SHARED_ITEMS: CardItem[] = [
  { id: "s1", title: "Q3 Roadmap Preview", subtitle: "From Mary R." },
  {
    id: "s2",
    title: "Security & compliance pack",
    subtitle: "From Jordan K.",
    kind: "playlist",
    clusterCount: 4,
  },
  {
    id: "s3",
    title: "Implementation checklist",
    subtitle: "From Mary R.",
    kind: "flow",
    clusterCount: 5,
  },
  { id: "s4", title: "Custom pricing deck", subtitle: "From Sam B." },
]

interface ShortItem {
  id: string
  title: string
  viewsLabel: string
}

const SHORTS_ITEMS: ShortItem[] = [
  { id: "sh1", title: "60-sec recap: new nav", viewsLabel: "12K views" },
  { id: "sh2", title: "What buyers ask first", viewsLabel: "892K views" },
  { id: "sh3", title: "Clip: pricing objection", viewsLabel: "54K views" },
  { id: "sh4", title: "Behind the demo room", viewsLabel: "201K views" },
  { id: "sh5", title: "Security in one minute", viewsLabel: "3.1M views" },
  { id: "sh6", title: "Champion tips", viewsLabel: "88K views" },
]

interface AssistantMessage {
  id: string
  sender: "ai" | "user"
  text: string
}

const ASSISTANT_MESSAGES: AssistantMessage[] = [
  {
    id: "a1",
    sender: "ai",
    text: "Welcome back, Cory.",
  },
  {
    id: "a2",
    sender: "ai",
    text: "Jordan K. shared this demo room with you. Ask me anything about the videos and flows here, or I can suggest a good place to start.",
  },
]

type DemoRoomSurface = "home" | "allDemos"

/**
 * Three-state model for the AI assistant:
 *   - 'closed'   — only the floating "Ask AI" pill is visible.
 *   - 'compact'  — popped over as a rounded-rectangle popover in the corner.
 *   - 'expanded' — docked full-height to the right; main content reflows to
 *                  make room.
 */
type AssistantState = "closed" | "compact" | "expanded"

export default function DemoRoomPage() {
  const [assistantState, setAssistantState] =
    useState<AssistantState>("compact")
  const [surface, setSurface] = useState<DemoRoomSurface>("home")
  const [allDemosQuery, setAllDemosQuery] = useState("")

  const isOpen = assistantState !== "closed"
  const isExpanded = assistantState === "expanded"

  const filteredDemos = useMemo(() => {
    const q = allDemosQuery.trim().toLowerCase()
    if (!q) return demosData
    return demosData.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.status.toLowerCase().includes(q) ||
        d.lastUpdated.toLowerCase().includes(q),
    )
  }, [allDemosQuery])

  const openAssistant = () => setAssistantState("compact")
  const closeAssistant = () => setAssistantState("closed")
  const toggleExpand = () =>
    setAssistantState((s) => (s === "expanded" ? "compact" : "expanded"))

  return (
    <div
      className={[
        "demo-room",
        isOpen ? "demo-room--assistant-open" : "",
        assistantState === "compact" ? "demo-room--assistant-compact" : "",
        isExpanded ? "demo-room--assistant-expanded" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="demo-room__topbar">
        <div className="demo-room__topbar-start">
          <div className="demo-room__brand">
            <span className="material-symbols-outlined" aria-hidden="true">
              square
            </span>
            Logo
          </div>

          <nav className="demo-room__topbar-nav" aria-label="Primary">
            <button
              type="button"
              className={`demo-room__topbar-nav-item${
                surface === "home" ? " demo-room__topbar-nav-item--current" : ""
              }`}
              aria-current={surface === "home" ? "page" : undefined}
              onClick={() => setSurface("home")}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                home
              </span>
              My Stuff
            </button>
            <button
              type="button"
              className={`demo-room__topbar-nav-item${
                surface === "allDemos"
                  ? " demo-room__topbar-nav-item--current"
                  : ""
              }`}
              aria-current={surface === "allDemos" ? "page" : undefined}
              onClick={() => setSurface("allDemos")}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                video_library
              </span>
              All demos
            </button>
            <button type="button" className="demo-room__topbar-nav-item">
              <span
                className="demo-room__topbar-nav-avatar"
                aria-hidden="true"
              >
                {REP.initials}
              </span>
              My Rep
            </button>
          </nav>
        </div>

        <div className="demo-room__topbar-actions">
          <div
            className="demo-room__viewers"
            aria-label="Other viewers in this room"
          >
            {VIEWER_BADGES.map((initial) => (
              <span key={initial} className="demo-room__viewer">
                {initial}
              </span>
            ))}
            <span className="demo-room__viewer-count">{VIEWER_OVERFLOW}</span>
          </div>

          {/*
            Hidden for now — the floating "Ask AI" pill near the right edge
            opens the assistant instead. Uncomment to bring this back as an
            explicit Ask AI toggle in the topbar.
          <button
            type="button"
            className={`demo-room__assistant-toggle${
              assistantState !== "closed"
                ? " demo-room__assistant-toggle--active"
                : ""
            }`}
            aria-pressed={assistantState !== "closed"}
            onClick={() =>
              setAssistantState((s) =>
                s === "closed" ? "compact" : "closed",
              )
            }
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              auto_awesome
            </span>
            Ask AI
          </button>
          */}

          <button type="button" className="demo-room__share-button">
            Share
          </button>
        </div>
      </header>

      <button
        type="button"
        className="demo-room__search"
        aria-pressed={isOpen}
        aria-hidden={isOpen}
        aria-label="Open assistant"
        disabled={isOpen}
        onClick={openAssistant}
      >
        <span className="demo-room__search-avatar" aria-hidden="true">
          <span className="material-symbols-outlined">auto_awesome</span>
        </span>
        <span className="demo-room__search-placeholder">Ask AI</span>
        <span className="material-symbols-outlined" aria-hidden="true">
          mic
        </span>
      </button>

      <div className="demo-room__body">
        <main className="demo-room__main">
          {surface === "home" ? (
            <>
              <div className="demo-room__greeting">
                <h1 className="demo-room__greeting-title">{HERO.greeting}</h1>
                <p className="demo-room__greeting-subtitle">{HERO.subtitle}</p>
              </div>

              <section
                className="demo-room__featured"
                aria-label="Featured content"
              >
                <button
                  type="button"
                  className="demo-room__player"
                  aria-label={`Play ${HERO.videoTitle}`}
                >
                  <span className="demo-room__player-icon" aria-hidden="true">
                    <span className="material-symbols-outlined">play_arrow</span>
                  </span>
                  <span className="demo-room__player-caption">
                    {HERO.videoCaption}
                  </span>
                </button>

                <div
                  className="demo-room__feature-aside"
                  role="presentation"
                  aria-hidden="true"
                >
                  <span className="demo-room__feature-aside-label">
                    Placeholder
                  </span>
                </div>
              </section>

              <CardRow label="Suggested" items={SUGGESTED_ITEMS} />
              <ShortsRow />
              <CardRow label="Shared with Me" items={SHARED_ITEMS} />
              <CardRow label="Watched" items={WATCHED_ITEMS} />
            </>
          ) : (
            <section
              className="demo-room__all-demos"
              aria-labelledby="demo-room-all-demos-heading"
            >
              <h1
                id="demo-room-all-demos-heading"
                className="demo-room__all-demos-heading"
              >
                All Demos
              </h1>

              <div className="demo-room__all-demos-search" role="search">
                <label
                  htmlFor="demo-room-all-demos-search"
                  className="demo-room__visually-hidden"
                >
                  Search demos
                </label>
                <span
                  className="material-symbols-outlined demo-room__all-demos-search-icon"
                  aria-hidden="true"
                >
                  search
                </span>
                <input
                  id="demo-room-all-demos-search"
                  type="search"
                  className="demo-room__all-demos-search-input"
                  placeholder="Search demos…"
                  value={allDemosQuery}
                  onChange={(e) => setAllDemosQuery(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <ul className="demo-room__all-demos-list">
                {filteredDemos.length === 0 ? (
                  <li className="demo-room__all-demos-empty">
                    No demos match “{allDemosQuery.trim()}”.
                  </li>
                ) : (
                  filteredDemos.map((demo) => (
                    <li key={demo.id}>
                      <button
                        type="button"
                        className="demo-room__all-demos-row"
                      >
                        <span
                          className="demo-room__all-demos-thumb"
                          aria-hidden="true"
                        />
                        <span className="demo-room__all-demos-row-text">
                          <span className="demo-room__all-demos-row-title">
                            {demo.name}
                          </span>
                          <span className="demo-room__all-demos-row-updated">
                            {demo.lastUpdated}
                          </span>
                        </span>
                        <span
                          className="material-symbols-outlined demo-room__all-demos-row-chevron"
                          aria-hidden="true"
                        >
                          chevron_right
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </section>
          )}
        </main>
      </div>

      {/*
        Floating chat popover. Lives outside `.demo-room__body` so the body
        stays a simple single-column layout; the popover is anchored to the
        viewport (position: fixed) at the same bottom-right corner as the
        "Ask AI" FAB so it appears to expand out of the button.
      */}
      <aside
        className="demo-room__assistant"
        aria-label="Ask AI"
        aria-hidden={!isOpen}
      >
        <div className="demo-room__assistant-head">
          <span className="demo-room__assistant-eyebrow">
            <span className="material-symbols-outlined" aria-hidden="true">
              auto_awesome
            </span>
            Ask AI
          </span>
          <div className="demo-room__assistant-head-actions">
            <button
              type="button"
              className="demo-room__assistant-icon-button"
              aria-label={isExpanded ? "Restore size" : "Expand to full height"}
              aria-pressed={isExpanded}
              onClick={toggleExpand}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {isExpanded ? "close_fullscreen" : "open_in_full"}
              </span>
            </button>
            <button
              type="button"
              className="demo-room__assistant-icon-button"
              aria-label="Close assistant"
              onClick={closeAssistant}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                close
              </span>
            </button>
          </div>
        </div>

        <ol className="demo-room__assistant-thread">
          {ASSISTANT_MESSAGES.map((msg) => (
            <li
              key={msg.id}
              className={`demo-room__assistant-msg demo-room__assistant-msg--${msg.sender}`}
            >
              <p>{msg.text}</p>
            </li>
          ))}
        </ol>

        <div
          className="demo-room__assistant-composer"
          aria-hidden="true"
        >
          <span className="demo-room__assistant-composer-placeholder">
            Ask anything…
          </span>
          <span
            className="material-symbols-outlined demo-room__assistant-composer-send"
            aria-hidden="true"
          >
            arrow_upward
          </span>
        </div>
      </aside>
    </div>
  )
}

/**
 * One labeled row of placeholder content cards. Same 4-up grid used for
 * Suggested / Watched / Shared with Me — add a new constant + another
 * `<CardRow />` call to drop in a fourth row later.
 */
interface CardRowProps {
  label: string
  items: CardItem[]
}

function CardRow({ label, items }: CardRowProps) {
  return (
    <section className="demo-room__row">
      <h2 className="demo-room__section-label">{label}</h2>
      <ul className="demo-room__cards">
        {items.map((item) => {
          const kind = item.kind ?? "video"
          const stacked = kind === "playlist" || kind === "flow"
          const count =
            item.clusterCount ?? (kind === "playlist" ? 4 : 5)

          return (
            <li key={item.id} className="demo-room__card">
              <button
                type="button"
                className={`demo-room__card-button${
                  stacked ? ` demo-room__card-button--${kind}` : ""
                }`}
              >
                <div
                  className={`demo-room__card-thumb${
                    stacked ? " demo-room__card-thumb--stacked" : ""
                  }`}
                >
                  <div className="demo-room__card-image" aria-hidden="true">
                    <span>
                      {stacked
                        ? kind === "playlist"
                          ? "4-up"
                          : "Flow"
                        : "Thumb"}
                    </span>
                    {stacked ? (
                      <span className="demo-room__card-badge">
                        <span className="demo-room__card-badge-label">
                          {kind === "playlist" ? "Playlist" : "Flow"}
                        </span>
                        <span className="demo-room__card-badge-meta">
                          {kind === "playlist"
                            ? `${count} demos`
                            : `${count} questions`}
                        </span>
                      </span>
                    ) : null}
                  </div>
                  {stacked ? (
                    <span className="demo-room__card-stack" aria-hidden="true">
                      <span className="demo-room__card-stack-layer" />
                      <span className="demo-room__card-stack-layer" />
                    </span>
                  ) : null}
                </div>
                <div className="demo-room__card-meta">
                  <div className="demo-room__card-title">{item.title}</div>
                  <div className="demo-room__card-subtitle">{item.subtitle}</div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function ShortsRow() {
  return (
    <section className="demo-room__shorts" aria-labelledby="demo-room-shorts-title">
      <div className="demo-room__shorts-head">
        <span
          className="demo-room__shorts-icon material-symbols-outlined"
          aria-hidden="true"
        >
          view_column
        </span>
        <h2 id="demo-room-shorts-title" className="demo-room__shorts-title">
          Shorts
        </h2>
      </div>
      <ul className="demo-room__shorts-track">
        {SHORTS_ITEMS.map((item) => (
          <li key={item.id} className="demo-room__short">
            <button type="button" className="demo-room__short-button">
              <div className="demo-room__short-thumb" aria-hidden="true">
                <span className="demo-room__short-thumb-label">Short</span>
              </div>
              <div className="demo-room__short-meta">
                <div className="demo-room__short-title">{item.title}</div>
                <div className="demo-room__short-views">{item.viewsLabel}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
