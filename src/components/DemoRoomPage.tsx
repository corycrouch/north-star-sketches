import { useState } from "react"
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

interface CardItem {
  id: string
  title: string
  subtitle: string
}

const SUGGESTED_ITEMS: CardItem[] = [
  { id: "p1", title: "Playlist Title", subtitle: "5 items" },
  { id: "f1", title: "Flow Title", subtitle: "5 items" },
  { id: "d1", title: "Demo Title", subtitle: "Video" },
  { id: "f2", title: "Flow Title", subtitle: "5 items" },
]

const WATCHED_ITEMS: CardItem[] = [
  { id: "w1", title: "Product Overview", subtitle: "Video" },
  { id: "w2", title: "Pricing Walkthrough", subtitle: "Video" },
  { id: "w3", title: "Integrations Tour", subtitle: "Flow" },
  { id: "w4", title: "Customer: Acme Co.", subtitle: "Video" },
]

const SHARED_ITEMS: CardItem[] = [
  { id: "s1", title: "Q3 Roadmap Preview", subtitle: "From Mary R." },
  { id: "s2", title: "Security Overview", subtitle: "From Jordan K." },
  { id: "s3", title: "Implementation Plan", subtitle: "From Mary R." },
  { id: "s4", title: "Custom Pricing", subtitle: "From Sam B." },
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
    text: "Hi Cory — ask me anything about the demos in this room. I can summarize, compare features, or pull up specifics.",
  },
]

export default function DemoRoomPage() {
  const [assistantOpen, setAssistantOpen] = useState(true)

  return (
    <div
      className={`demo-room${
        assistantOpen ? " demo-room--assistant-open" : ""
      }`}
    >
      <header className="demo-room__topbar">
        <div className="demo-room__brand">
          <span className="material-symbols-outlined" aria-hidden="true">
            square
          </span>
          Logo
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
              assistantOpen ? " demo-room__assistant-toggle--active" : ""
            }`}
            aria-pressed={assistantOpen}
            onClick={() => setAssistantOpen((v) => !v)}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              auto_awesome
            </span>
            Ask AI
          </button>
          */}

          <button type="button" className="demo-room__rep-button">
            <span className="demo-room__rep-avatar" aria-hidden="true">
              {REP.initials}
            </span>
            My Rep
          </button>

          <button type="button" className="demo-room__share-button">
            Share
          </button>
        </div>
      </header>

      <button
        type="button"
        className="demo-room__search"
        aria-pressed={assistantOpen}
        aria-hidden={assistantOpen}
        aria-label="Open assistant"
        disabled={assistantOpen}
        onClick={() => setAssistantOpen((v) => !v)}
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
          <CardRow label="Watched" items={WATCHED_ITEMS} />
          <CardRow label="Shared with Me" items={SHARED_ITEMS} />
        </main>

        <aside
          className="demo-room__assistant"
          aria-label="Ask AI"
          aria-hidden={!assistantOpen}
        >
          <div className="demo-room__assistant-head">
              <span className="demo-room__assistant-eyebrow">
                <span className="material-symbols-outlined" aria-hidden="true">
                  auto_awesome
                </span>
                Ask AI
              </span>
              <button
                type="button"
                className="demo-room__assistant-close"
                aria-label="Close assistant"
                onClick={() => setAssistantOpen(false)}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  close
                </span>
              </button>
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
        {items.map((item) => (
          <li key={item.id} className="demo-room__card">
            <button type="button" className="demo-room__card-button">
              <div className="demo-room__card-image" aria-hidden="true">
                <span>Thumb</span>
              </div>
              <div className="demo-room__card-meta">
                <div className="demo-room__card-title">{item.title}</div>
                <div className="demo-room__card-subtitle">{item.subtitle}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
