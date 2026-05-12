import { useState } from "react"
import "@/styles/claude-buyer-page.scss"

/**
 * Sketch of a prospective buyer's conversation with Claude.
 * Lives outside the main app shell (no global nav) so it can be linked
 * to as a standalone surface — see hash routing in `App.tsx`.
 *
 * v1 brainstorm: imagery is placeholder. All copy is hoisted into the
 * constants below so it's easy to iterate on without touching markup.
 */

const BUYER_PROMPT =
  "What's the best way to let buyers explore our product on their own — without a sales rep walking them through it?"

const CLAUDE_INTRO =
  "A few platforms are popular for this. One that comes up often for buyer-led, self-serve demos is Consensus — they let sales teams build interactive video demos that prospects can explore on their own. I found a live demo showing exactly how it works in a real sales workflow."

const CLAUDE_FOLLOWUP =
  "Other options in this space include Navattic, Reprise, and Walnut — but Consensus is particularly strong for multi-stakeholder deals where you need to know who watched and for how long."

/**
 * "Near" thread — what Claude can do today: synthesize from a transcript
 * and link out, without rendering the demo inline. Same buyer prompt,
 * deliberately plainer reply, to make the contrast with "Future" crisp.
 *
 * The link gets its own paragraph and the link text is a bare URL —
 * that's how Claude typically surfaces a source citation today.
 */
const NEAR_CLAUDE_RESPONSE =
  "A few platforms are popular for this. One that comes up often for buyer-led, self-serve demos is Consensus — they let sales teams build interactive video demos that prospects can explore on their own. Sending buyers a personalized link to an interactive demo they can explore on their own works well here. They click through what matters to them while the seller gets real-time signals on who watched what and for how long. Acme's sales team built this exact flow."

const NEAR_CLAUDE_LINK_PREFIX =
  "You can see a working example of exactly this flow here: "

const NEAR_CLAUDE_LINK_TEXT = "goconsensus.com/interactive-demo"

const SUGGESTED_FOLLOWUPS = [
  "How does this compare to Navattic?",
  "What does Consensus cost?",
  "How do teams roll this out?",
]

const MESSAGE_FEEDBACK = [
  { icon: "content_copy", label: "Copy" },
  { icon: "thumb_up", label: "Good response" },
  { icon: "thumb_down", label: "Bad response" },
  { icon: "refresh", label: "Regenerate" },
]

/** Fake Claude desktop chrome — labels here are the only ones that read as text. */
const NAV_TABS = [
  { icon: "chat_bubble", label: "Chat", active: true },
  { icon: "format_list_bulleted", label: "Cowork", active: false },
  { icon: "code", label: "Code", active: false },
]

const NAV_MENU = [
  { icon: "add", label: "New chat" },
  { icon: "folder", label: "Projects" },
  { icon: "category", label: "Artifacts" },
  { icon: "work", label: "Ask your org" },
  { icon: "person", label: "Customize" },
]

/**
 * The two "saved chats" in the fake Claude sidebar. Clicking either swaps
 * the conversation shown in the main column. Add more entries here and the
 * sidebar list grows automatically.
 */
type ConversationId = "near" | "future"

const CONVERSATIONS: { id: ConversationId; title: string }[] = [
  { id: "near", title: "Near: Make content LLM discoverable" },
  { id: "future", title: "Future: Render content in LLM chat" },
]

const DEMO_CARD = {
  sourceName: "Consensus",
  sourceUrl: "goconsensus.com",
  badge: "Demo",
  title: "How Acme's sales team closes deals faster with self-serve demos",
  meta: "Interactive demo · 4 min · no login required",
  previewCaption: "Animated preview · 12 sec",
  summary:
    "Shows how a rep sends a personalized demo link, how the buyer self-navigates through features relevant to them, and how the seller sees real-time engagement alerts — including which stakeholders watched and for how long.",
  tags: [
    { icon: "send", label: "1-click share" },
    { icon: "person", label: "Buyer self-serve" },
    { icon: "monitoring", label: "Engagement analytics" },
    { icon: "group", label: "Stakeholder tracking" },
  ],
  stats: [
    { icon: "visibility", label: "2.4k views" },
    { icon: "schedule", label: "4 min" },
  ],
  ctaLabel: "Watch full demo",
}

interface ClaudeBuyerPageProps {
  onOpenFullDemo?: () => void
}

export default function ClaudeBuyerPage({ onOpenFullDemo }: ClaudeBuyerPageProps) {
  /** Default to the "Future" thread since that's the one with content right now. */
  const [activeConversation, setActiveConversation] =
    useState<ConversationId>("future")

  function handleOpenDemo() {
    onOpenFullDemo?.()
  }

  return (
    <div className="claude-buyer-page">
      <aside className="claude-nav" aria-label="Claude navigation (mock)">
        <div className="claude-nav__brand">Claude</div>

        <nav className="claude-nav__tabs" aria-label="Workspace">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.label}
              type="button"
              className={`claude-nav__tab${
                tab.active ? " claude-nav__tab--active" : ""
              }`}
              aria-current={tab.active ? "page" : undefined}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </nav>

        <ul className="claude-nav__menu">
          {NAV_MENU.map((item) => (
            <li key={item.label}>
              <button type="button" className="claude-nav__menu-item">
                <span className="material-symbols-outlined" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <section className="claude-nav__recents">
          <p className="claude-nav__section-label">Recents</p>
          <ul className="claude-nav__recents-list">
            {CONVERSATIONS.map((conv) => {
              const isActive = conv.id === activeConversation
              return (
                <li key={conv.id}>
                  <button
                    type="button"
                    className={`claude-nav__recent${
                      isActive ? " claude-nav__recent--active" : ""
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setActiveConversation(conv.id)}
                    title={conv.title}
                  >
                    {conv.title}
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        <div className="claude-nav__spacer" />

        <footer className="claude-nav__user">
          <div className="claude-nav__user-avatar" aria-hidden="true">
            C
          </div>
          <span
            className="claude-nav__rect claude-nav__rect--sm"
            aria-hidden="true"
          />
          <span className="material-symbols-outlined" aria-hidden="true">
            expand_more
          </span>
          <span
            className="material-symbols-outlined claude-nav__user-trailing"
            aria-hidden="true"
          >
            download
          </span>
        </footer>
      </aside>

      <div className="claude-buyer-page__main">
        <div className="claude-buyer-page__shell">
          <div className="claude-buyer-page__conversation">
            {activeConversation === "future" ? (
              <FutureConversation onOpenDemo={handleOpenDemo} />
            ) : (
              <NearConversation onOpenDemo={handleOpenDemo} />
            )}
          </div>
        </div>

        <div className="claude-buyer-page__composer-wrap">
          <div className="claude-buyer-page__composer" aria-hidden="true">
            <div className="claude-buyer-page__composer-placeholder">
              Write a message…
            </div>
            <div className="claude-buyer-page__composer-bar">
              <button
                type="button"
                className="claude-buyer-page__composer-icon"
                aria-label="Attach"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
              <div className="claude-buyer-page__composer-spacer" />
              <button
                type="button"
                className="claude-buyer-page__composer-model"
              >
                Sonnet 4.6
                <span className="material-symbols-outlined" aria-hidden="true">
                  expand_more
                </span>
              </button>
              <button
                type="button"
                className="claude-buyer-page__composer-icon"
                aria-label="Voice input"
              >
                <span className="material-symbols-outlined">mic</span>
              </button>
            </div>
          </div>
          <p className="claude-buyer-page__disclaimer">
            Claude is AI and can make mistakes. Please double-check responses.
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * "Near: Make content LLM discoverable" thread — what's achievable today:
 * Claude has access to a demo's transcript and can answer with text + a
 * link out to the source. Same buyer prompt as the Future thread, so the
 * contrast lands on Claude's reply.
 */
interface NearConversationProps {
  onOpenDemo: () => void
}

function NearConversation({ onOpenDemo }: NearConversationProps) {
  function handleSourceClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    onOpenDemo()
  }

  return (
    <>
      <div className="claude-buyer-page__message claude-buyer-page__message--user">
        <div className="claude-buyer-page__bubble">{BUYER_PROMPT}</div>
      </div>

      <div className="claude-buyer-page__message claude-buyer-page__message--claude">
        <div className="claude-buyer-page__claude-body">
          <p className="claude-buyer-page__text">{NEAR_CLAUDE_RESPONSE}</p>

          <p className="claude-buyer-page__text">
            {NEAR_CLAUDE_LINK_PREFIX}
            <a
              href="#"
              className="claude-buyer-page__source-link"
              onClick={handleSourceClick}
            >
              {NEAR_CLAUDE_LINK_TEXT}
            </a>
          </p>

          <div
            className="claude-buyer-page__feedback"
            role="group"
            aria-label="Message feedback"
          >
            {MESSAGE_FEEDBACK.map((action) => (
              <button
                key={action.label}
                type="button"
                className="claude-buyer-page__feedback-button"
                aria-label={action.label}
              >
                <span
                  className="material-symbols-outlined"
                  aria-hidden="true"
                >
                  {action.icon}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * The "Future: Render content in LLM chat" thread — the rich Claude reply
 * with the embedded Consensus demo card we've been iterating on.
 */
interface FutureConversationProps {
  onOpenDemo: () => void
}

function FutureConversation({ onOpenDemo }: FutureConversationProps) {
  return (
    <>
      <div className="claude-buyer-page__message claude-buyer-page__message--user">
        <div className="claude-buyer-page__bubble">{BUYER_PROMPT}</div>
      </div>

      <div className="claude-buyer-page__message claude-buyer-page__message--claude">
        <div className="claude-buyer-page__claude-body">
              <p className="claude-buyer-page__text">{CLAUDE_INTRO}</p>

              <article className="demo-card">
                <header className="demo-card__head">
                  <div className="demo-card__source">
                    <div className="demo-card__source-logo" aria-hidden="true">
                      C
                    </div>
                    <div className="demo-card__source-meta">
                      <span className="demo-card__source-name">
                        {DEMO_CARD.sourceName}
                      </span>
                      <span className="demo-card__source-sep">·</span>
                      <span className="demo-card__source-url">
                        from {DEMO_CARD.sourceUrl}
                      </span>
                    </div>
                  </div>
                  <span className="demo-card__badge">{DEMO_CARD.badge}</span>
                </header>

                <h2 className="demo-card__title">{DEMO_CARD.title}</h2>
                <p className="demo-card__meta">{DEMO_CARD.meta}</p>

                <button
                  type="button"
                  className="demo-card__preview"
                  onClick={onOpenDemo}
                  aria-label={`Open ${DEMO_CARD.title}`}
                >
                  <span className="demo-card__preview-placeholder">
                    Animated GIF
                  </span>
                  <span className="demo-card__preview-caption">
                    <span className="material-symbols-outlined" aria-hidden="true">
                      animation
                    </span>
                    {DEMO_CARD.previewCaption}
                  </span>
                </button>

                <div className="demo-card__section">
                  <span className="field-label demo-card__section-label">
                    Summary
                  </span>
                  <p className="demo-card__summary">{DEMO_CARD.summary}</p>
                </div>

                <ul className="demo-card__tags">
                  {DEMO_CARD.tags.map((tag) => (
                    <li key={tag.label} className="demo-card__tag">
                      <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                      >
                        {tag.icon}
                      </span>
                      {tag.label}
                    </li>
                  ))}
                </ul>

                <footer className="demo-card__footer">
                  <button
                    type="button"
                    className="demo-card__cta"
                    onClick={onOpenDemo}
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">
                      play_arrow
                    </span>
                    {DEMO_CARD.ctaLabel}
                  </button>
                  <ul className="demo-card__stats">
                    {DEMO_CARD.stats.map((stat) => (
                      <li key={stat.label} className="demo-card__stat">
                        <span
                          className="material-symbols-outlined"
                          aria-hidden="true"
                        >
                          {stat.icon}
                        </span>
                        {stat.label}
                      </li>
                    ))}
                  </ul>
                </footer>
              </article>

              <p className="claude-buyer-page__text">{CLAUDE_FOLLOWUP}</p>

              <ul className="claude-buyer-page__suggestions">
                {SUGGESTED_FOLLOWUPS.map((q) => (
                  <li key={q}>
                    <button
                      type="button"
                      className="claude-buyer-page__suggestion"
                      onClick={onOpenDemo}
                    >
                      {q}
                      <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                      >
                        north_east
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div
                className="claude-buyer-page__feedback"
                role="group"
                aria-label="Message feedback"
              >
                {MESSAGE_FEEDBACK.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    className="claude-buyer-page__feedback-button"
                    aria-label={action.label}
                  >
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      {action.icon}
                    </span>
                  </button>
                ))}
              </div>
        </div>
      </div>
    </>
  )
}
