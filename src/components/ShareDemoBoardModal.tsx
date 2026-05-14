import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import "@/styles/share-demo-board-modal.scss"

// Recipient chips — restore when adding people back to the share flow.
// const RECIPIENTS = [
//   { id: "r1", initials: "AZ", name: "Name Here" },
//   ...
// ]

function formatDemoBoardDate() {
  const now = new Date()
  const mm = String(now.getMonth() + 1).padStart(2, "0")
  const dd = String(now.getDate()).padStart(2, "0")
  const yy = String(now.getFullYear()).slice(-2)
  return `${mm}/${dd}/${yy}`
}

interface ShareDemoBoardModalProps {
  demoName: string
  sharedCount?: number
  onClose: () => void
}

export default function ShareDemoBoardModal({
  demoName,
  sharedCount = 3,
  onClose,
}: ShareDemoBoardModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  return createPortal(
    <div
      className="share-demo-board-modal__backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className="share-demo-board-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-demo-board-title"
      >
        <div className="share-demo-board-modal__config">
          <div className="share-demo-board-modal__title-row">
            <h2 id="share-demo-board-title" className="share-demo-board-modal__title">
              Share Link – {formatDemoBoardDate()}
            </h2>
            <button type="button" className="share-demo-board-modal__icon-btn" aria-label="Rename DemoBoard">
              <span className="material-symbols-outlined" aria-hidden>
                edit
              </span>
            </button>
          </div>

          <button type="button" className="share-demo-board-modal__recipients-placeholder">
            Add recipients (optional)
          </button>

          <label className="share-demo-board-modal__field share-demo-board-modal__field--full">
            <span className="share-demo-board-modal__field-label">Account</span>
            <span className="share-demo-board-modal__select">
              Adobe Renewal 2026
              <span className="material-symbols-outlined" aria-hidden>
                expand_more
              </span>
            </span>
          </label>

          <section className="share-demo-board-modal__settings" aria-labelledby="share-demo-board-settings-heading">
            <div className="share-demo-board-modal__settings-head">
              <h3 id="share-demo-board-settings-heading" className="share-demo-board-modal__settings-title">
                Settings
              </h3>
              <button type="button" className="share-demo-board-modal__settings-link">
                All Options
              </button>
            </div>
            <ul className="share-demo-board-modal__settings-list">
              <li className="share-demo-board-modal__settings-row">
                <span>Include Intro Video</span>
                <span className="share-demo-board-modal__settings-value">
                  On
                  <span className="material-symbols-outlined" aria-hidden>
                    expand_more
                  </span>
                </span>
              </li>
              <li className="share-demo-board-modal__settings-row">
                <span>Intro Video</span>
                <span className="share-demo-board-modal__settings-value">
                  My Default
                  <span className="material-symbols-outlined" aria-hidden>
                    expand_more
                  </span>
                </span>
              </li>
              <li className="share-demo-board-modal__settings-row">
                <span>Mark as Test</span>
                <span className="share-demo-board-modal__settings-value">
                  Off
                  <span className="material-symbols-outlined" aria-hidden>
                    expand_more
                  </span>
                </span>
              </li>
            </ul>
          </section>

          <div className="share-demo-board-modal__actions">
            <button type="button" className="share-demo-board-modal__action share-demo-board-modal__action--secondary">
              <span className="material-symbols-outlined" aria-hidden>
                link
              </span>
              Copy Link
            </button>
            <button
              type="button"
              className="share-demo-board-modal__action share-demo-board-modal__action--primary"
              disabled
            >
              Send
              <span className="material-symbols-outlined" aria-hidden>
                send
              </span>
            </button>
          </div>
        </div>

        <div className="share-demo-board-modal__preview">
          <button
            type="button"
            className="share-demo-board-modal__close"
            aria-label="Close share dialog"
            onClick={onClose}
          >
            <span className="material-symbols-outlined" aria-hidden>
              close
            </span>
          </button>

          <p className="share-demo-board-modal__preview-heading">
            Sharing {sharedCount} Demo{sharedCount === 1 ? "" : "s"}
          </p>

          <div className="share-demo-board-modal__hero-card">
            <div className="share-demo-board-modal__hero-thumb" aria-hidden>
              <button type="button" className="share-demo-board-modal__hero-play" aria-label="Play intro video">
                <span className="material-symbols-outlined" aria-hidden>
                  play_arrow
                </span>
              </button>
              <span className="share-demo-board-modal__hero-caption">Watch our demo!</span>
            </div>
            <button type="button" className="share-demo-board-modal__hero-edit" aria-label="Edit intro video">
              <span className="material-symbols-outlined" aria-hidden>
                edit
              </span>
            </button>
          </div>

          <div className="share-demo-board-modal__stack">
            <div className="share-demo-board-modal__stack-card share-demo-board-modal__stack-card--front">
              <span className="share-demo-board-modal__stack-thumb" aria-hidden />
              <span className="share-demo-board-modal__stack-text">
                <span className="share-demo-board-modal__stack-title">
                  {demoName.length > 18 ? `${demoName.slice(0, 15)}...` : demoName}
                </span>
                <span className="share-demo-board-modal__stack-meta">Demo creator...</span>
              </span>
              <button type="button" className="share-demo-board-modal__stack-action">
                Edit or Reorder
              </button>
            </div>
            <div className="share-demo-board-modal__stack-card share-demo-board-modal__stack-card--layer" aria-hidden />
            <div className="share-demo-board-modal__stack-card share-demo-board-modal__stack-card--layer" aria-hidden />
          </div>

        </div>
      </div>
    </div>,
    document.body,
  )
}
