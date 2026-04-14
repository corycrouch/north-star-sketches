import { useState } from "react"
import "@/styles/chrome-share-picker-mock.scss"

export type ShareSourceTab = "chrome-tab" | "entire-screen" | "window"

interface FakeTab {
  id: string
  title: string
  favicon: "app" | "sheets" | "gmail" | "chrome" | "warehouse"
}

const FAKE_TABS: FakeTab[] = [
  { id: "t1", title: "Customer App", favicon: "app" },
  { id: "t3", title: "Google Sheets", favicon: "sheets" },
  { id: "t4", title: "Inbox (6,950) - brillshea@gmail.com - Gmail", favicon: "gmail" },
  { id: "t5", title: "New Tab", favicon: "chrome" },
  { id: "t6", title: "3D Warehouse", favicon: "warehouse" },
]

function Favicon({ kind }: { kind: FakeTab["favicon"] }) {
  const common = { className: "chrome-share-mock__favicon" as const }
  switch (kind) {
    case "app":
      return (
        <span className="chrome-share-mock__favicon chrome-share-mock__favicon--glyph-light" style={{ background: "#1a73e8" }} title="">
          <span className="material-symbols-outlined chrome-share-mock__favicon-icon">smartphone</span>
        </span>
      )
    case "sheets":
      return <span {...common} style={{ background: "#22a564" }} title="" />
    case "gmail":
      return (
        <span {...common} style={{ background: "#fff" }} title="">
          <span className="chrome-share-mock__favicon-gmail">M</span>
        </span>
      )
    case "chrome":
      return (
        <span {...common} style={{ background: "#5f6368" }} title="">
          <span className="chrome-share-mock__favicon-chrome" />
        </span>
      )
    case "warehouse":
      return <span {...common} style={{ background: "#e8710a" }} title="" />
  }
}

interface ChromeSharePickerMockProps {
  /** Shown in the subtitle, e.g. `localhost:5173` */
  hostOrigin: string
  onCancel: () => void
  /** Called when the user confirms (still simulated — no real capture). */
  onShare: () => void
}

export default function ChromeSharePickerMock({ hostOrigin, onCancel, onShare }: ChromeSharePickerMockProps) {
  const [source, setSource] = useState<ShareSourceTab>("chrome-tab")
  const [selectedTabId, setSelectedTabId] = useState("t1")
  const [shareTabAudio, setShareTabAudio] = useState(true)

  const selectedTab = FAKE_TABS.find((t) => t.id === selectedTabId) ?? FAKE_TABS[0]

  return (
    <div className="chrome-share-mock">
      <div className="chrome-share-mock__header">
        <h2 id="demo-chrome-share-title" className="chrome-share-mock__title">
          Choose what to share
        </h2>
        <p className="chrome-share-mock__subtitle">
          Chrome wants to share the contents of your screen with{" "}
          <span className="chrome-share-mock__host">{hostOrigin || "this page"}</span>.
        </p>
      </div>

      <div className="chrome-share-mock__tabstrip" role="tablist" aria-label="Share source">
        {(
          [
            ["chrome-tab", "Chrome Tab"],
            ["entire-screen", "Entire Screen"],
            ["window", "Window"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={source === id}
            className={`chrome-share-mock__tab ${source === id ? "chrome-share-mock__tab--active" : ""}`}
            onClick={() => setSource(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="chrome-share-mock__frame">
        {source === "chrome-tab" && (
          <div className="chrome-share-mock__split">
            <ul className="chrome-share-mock__tab-list" role="listbox" aria-label="Open tabs">
              {FAKE_TABS.map((tab) => (
                <li key={tab.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedTabId === tab.id}
                    className={`chrome-share-mock__tab-row ${selectedTabId === tab.id ? "chrome-share-mock__tab-row--selected" : ""}`}
                    onClick={() => setSelectedTabId(tab.id)}
                  >
                    <Favicon kind={tab.favicon} />
                    <span className="chrome-share-mock__tab-title">{tab.title}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="chrome-share-mock__preview-pane">
              <div className="chrome-share-mock__preview-thumb-wrap">
                <div className="chrome-share-mock__preview-placeholder">
                  <span className="material-symbols-outlined">web</span>
                </div>
              </div>
              <p className="chrome-share-mock__preview-caption">{selectedTab.title}</p>
            </div>
          </div>
        )}

        {source === "entire-screen" && (
          <div className="chrome-share-mock__placeholder-pane">
            <div className="chrome-share-mock__monitor">
              <span className="material-symbols-outlined chrome-share-mock__monitor-icon">desktop_windows</span>
            </div>
            <p className="chrome-share-mock__placeholder-caption">Entire screen preview (simulated)</p>
          </div>
        )}

        {source === "window" && (
          <div className="chrome-share-mock__placeholder-pane chrome-share-mock__placeholder-pane--window">
            <ul className="chrome-share-mock__window-list">
              <li>
                <button type="button" className="chrome-share-mock__window-item">
                  <span className="material-symbols-outlined">window</span>
                  North Star — Google Chrome
                </button>
              </li>
              <li>
                <button type="button" className="chrome-share-mock__window-item">
                  <span className="material-symbols-outlined">window</span>
                  Notes — TextEdit
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="chrome-share-mock__footer">
        <label className="chrome-share-mock__audio-label">
          <input
            type="checkbox"
            className="chrome-share-mock__checkbox"
            checked={shareTabAudio}
            onChange={(e) => setShareTabAudio(e.target.checked)}
          />
          <span className="chrome-share-mock__audio-text">Share tab audio</span>
        </label>
        <div className="chrome-share-mock__actions">
          <button type="button" className="chrome-share-mock__btn chrome-share-mock__btn--ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="chrome-share-mock__btn chrome-share-mock__btn--primary" onClick={onShare}>
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
