import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import CannedFlowGraphic, { getCannedFlowContentSummary } from "@/components/CannedFlowGraphic"
import "@/styles/demo-page.scss"

interface ContentItem {
  id: string
  type: "video" | "tour" | "sandbox" | "document"
  name: string
}

const CONTENT_TYPES: { type: ContentItem["type"]; icon: string; label: string }[] = [
  { type: "video", icon: "videocam", label: "Video" },
  { type: "tour", icon: "tour", label: "Tour" },
  { type: "document", icon: "description", label: "SmartDoc" },
  { type: "sandbox", icon: "code_blocks", label: "Sandbox" },
]

interface LibraryItem {
  id: string
  type: ContentItem["type"]
  name: string
}

const LIBRARY_ITEMS: LibraryItem[] = [
  { id: "lib-1", type: "video", name: "Q4 Product Walkthrough" },
  { id: "lib-2", type: "video", name: "Onboarding Overview" },
  { id: "lib-3", type: "tour", name: "Getting Started Tour" },
  { id: "lib-4", type: "tour", name: "Admin Settings Tour" },
  { id: "lib-5", type: "sandbox", name: "API Playground" },
  { id: "lib-6", type: "sandbox", name: "Dashboard Builder" },
  { id: "lib-7", type: "document", name: "Security Whitepaper" },
  { id: "lib-8", type: "document", name: "ROI Calculator Guide" },
]

interface DemoPageProps {
  initialName: string
  onBack: () => void
  onOpenFlowBuilder: (demoTitle: string) => void
  /** Set when returning from Flow Builder with the canned sample flow on canvas */
  hasFlowPreview?: boolean
  onClearFlowPreview?: () => void
}

let nextId = 100

function formatCreatedDate() {
  const now = new Date()
  return now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export default function DemoPage({
  initialName,
  onBack,
  onOpenFlowBuilder,
  hasFlowPreview = false,
  onClearFlowPreview,
}: DemoPageProps) {
  const [name, setName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false)
  const [viewerTitle, setViewerTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [contentItems, setContentItems] = useState<ContentItem[]>([])

  const [visualTheme, setVisualTheme] = useState("default")
  const [createdAt] = useState(formatCreatedDate)
  const [showLibrary, setShowLibrary] = useState(false)
  const [librarySearch, setLibrarySearch] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  function addContent(type: ContentItem["type"]) {
    const label = CONTENT_TYPES.find((t) => t.type === type)!.label
    setContentItems((prev) => [
      ...prev,
      { id: String(nextId++), type, name: `Untitled ${label}` },
    ])
  }

  function removeContent(id: string) {
    setContentItems((prev) => prev.filter((item) => item.id !== id))
  }

  function addFromLibrary(item: LibraryItem) {
    setContentItems((prev) => [
      ...prev,
      { id: String(nextId++), type: item.type, name: item.name },
    ])
    setShowLibrary(false)
    setLibrarySearch("")
  }

  function finishEditing() {
    setIsEditing(false)
    if (!name.trim()) setName(initialName)
  }

  const itemCount = contentItems.length
  const filteredLibrary = LIBRARY_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(librarySearch.toLowerCase())
  )

  return (
    <div className="demo-page">
      <button className="detail-page__back" onClick={onBack}>
        <span className="material-symbols-outlined">arrow_back</span>
        Back
      </button>

      <div className="demo-page__header">
        <div className="demo-page__title-area">
          {isEditing ? (
            <input
              ref={inputRef}
              className="demo-page__name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={finishEditing}
              onKeyDown={(e) => {
                if (e.key === "Enter") finishEditing()
              }}
            />
          ) : (
            <h1
              className="demo-page__name"
              onClick={() => setIsEditing(true)}
              title="Click to rename"
            >
              {name}
              <span className="material-symbols-outlined demo-page__edit-icon">edit</span>
            </h1>
          )}
        </div>

        <div className="demo-page__controls">
          <div className="demo-page__status-toggle">
            <button
              className={`demo-page__status-btn ${status === "draft" ? "demo-page__status-btn--active" : ""}`}
              onClick={() => setStatus("draft")}
            >
              <span className="material-symbols-outlined demo-page__status-icon">edit</span>
              Draft
            </button>
            <button
              className={`demo-page__status-btn ${status === "published" ? "demo-page__status-btn--active" : ""}`}
              onClick={() => setStatus("published")}
            >
              <span className="demo-page__status-dot" />
              Published
            </button>
          </div>
          <button type="button" className="demo-page__action-btn">
            <span className="material-symbols-outlined">play_arrow</span>
            Preview
          </button>
          <button type="button" className="demo-page__action-btn demo-page__action-btn--primary">
            <span className="material-symbols-outlined">send</span>
            Share
          </button>
        </div>
      </div>

      {itemCount === 0 && hasFlowPreview && (
        <div className="demo-page__content">
          <div className="demo-page__single-preview demo-page__single-preview--flow">
            <div className="demo-page__single-preview-stage">
              <div className="demo-page__flow-preview-graphic">
                <CannedFlowGraphic compact />
              </div>
              <button
                type="button"
                className="demo-page__single-preview-edit"
                onClick={() => onOpenFlowBuilder(name)}
                aria-label="Edit flow"
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
            <div className="demo-page__single-preview-bar">
              <div className="demo-page__item-info">
                <span className="field-label">
                  <span className="material-symbols-outlined demo-page__item-icon">account_tree</span>
                  Flow
                </span>
                <span className="demo-page__item-name">{getCannedFlowContentSummary()}</span>
              </div>
              <button
                className="demo-page__item-remove"
                onClick={() => onClearFlowPreview?.()}
                title="Remove flow"
                type="button"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            className="demo-page__flow-create-btn demo-page__flow-create-btn--split"
            onClick={() => onOpenFlowBuilder(name)}
          >
            <span className="demo-page__flow-create-lead">
              <span className="material-symbols-outlined">add</span>
              Add content
            </span>
            <span className="demo-page__flow-create-trail">Edit flow</span>
          </button>
        </div>
      )}

      {itemCount === 0 && !hasFlowPreview && (
        <div className="demo-page__empty">
          <div className="demo-page__empty-prompt">
            <p>Create new content</p>
          </div>
          <div className="demo-page__type-grid">
            {CONTENT_TYPES.map((ct) => (
              <button
                key={ct.type}
                className="demo-page__type-card"
                onClick={() => addContent(ct.type)}
              >
                <span className="material-symbols-outlined demo-page__type-icon">{ct.icon}</span>
                <span className="demo-page__type-label">{ct.label}</span>
              </button>
            ))}
          </div>
          <div className="demo-page__library-choose">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="demo-page__library-ghost-btn"
              onClick={() => setShowLibrary(!showLibrary)}
              aria-expanded={showLibrary}
            >
              <span className="material-symbols-outlined">note_stack</span>
              Choose from Library
            </Button>
            {showLibrary && (
              <div className="demo-page__library-picker">
                <div className="demo-page__library-header">
                  <div className="demo-page__library-search-wrap">
                    <span className="material-symbols-outlined">search</span>
                    <input
                      className="demo-page__library-search"
                      placeholder="Search library..."
                      value={librarySearch}
                      onChange={(e) => setLibrarySearch(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <button
                    type="button"
                    className="demo-page__library-close"
                    onClick={() => { setShowLibrary(false); setLibrarySearch("") }}
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <div className="demo-page__library-list">
                  {filteredLibrary.map((item) => {
                    const ct = CONTENT_TYPES.find((t) => t.type === item.type)!
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className="demo-page__library-item"
                        onClick={() => addFromLibrary(item)}
                      >
                        <span className="material-symbols-outlined demo-page__library-item-icon">{ct.icon}</span>
                        <span className="demo-page__library-item-name">{item.name}</span>
                        <span className="field-label">{ct.label}</span>
                      </button>
                    )
                  })}
                  {filteredLibrary.length === 0 && (
                    <div className="demo-page__library-empty">No matching items</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="demo-page__divider-or">
            <span className="demo-page__divider-line" />
            <span className="demo-page__divider-text">or</span>
            <span className="demo-page__divider-line" />
          </div>
          <div className="demo-page__empty-actions">
            <button
              type="button"
              className="demo-page__library-btn"
              onClick={() => onOpenFlowBuilder(name)}
            >
              <span className="material-symbols-outlined">account_tree</span>
              Build Flow
            </button>
          </div>
        </div>
      )}

      {itemCount === 1 && (() => {
        const item = contentItems[0]
        const ct = CONTENT_TYPES.find((t) => t.type === item.type)!
        return (
          <div className="demo-page__content">
            <div className="demo-page__single-preview">
              <div className="demo-page__single-preview-stage">
                <div className="demo-page__single-preview-placeholder" />
                <button className="demo-page__single-preview-play">
                  <span className="material-symbols-outlined">play_arrow</span>
                </button>
              </div>
              <div className="demo-page__single-preview-bar">
                <div className="demo-page__item-info">
                  <span className="field-label">
                    <span className="material-symbols-outlined demo-page__item-icon">{ct.icon}</span>
                    {ct.label}
                  </span>
                  <span className="demo-page__item-name">{item.name}</span>
                </div>
                <button
                  className="demo-page__item-remove"
                  onClick={() => removeContent(item.id)}
                  title="Remove"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              className="demo-page__flow-create-btn demo-page__flow-create-btn--split"
              onClick={() => onOpenFlowBuilder(name)}
            >
              <span className="demo-page__flow-create-lead">
                <span className="material-symbols-outlined">account_tree</span>
                Add more content
              </span>
              <span className="demo-page__flow-create-trail">Build a Flow</span>
            </button>
          </div>
        )
      })()}

      {itemCount >= 2 && (
        <div className="demo-page__content">
          <div className="demo-page__items">
            {contentItems.map((item, index) => {
              const ct = CONTENT_TYPES.find((t) => t.type === item.type)!
              return (
                <div key={item.id} className="demo-page__item-card">
                  <span className="demo-page__item-number">{index + 1}</span>
                  <div className="demo-page__item-thumb">
                    <span className="material-symbols-outlined">play_arrow</span>
                  </div>
                  <div className="demo-page__item-info">
                    <span className="field-label">
                      <span className="material-symbols-outlined demo-page__item-icon">{ct.icon}</span>
                      {ct.label}
                    </span>
                    <span className="demo-page__item-name">{item.name}</span>
                  </div>
                  <button
                    className="demo-page__item-remove"
                    onClick={() => removeContent(item.id)}
                    title="Remove"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              )
            })}
          </div>

          <button
            type="button"
            className="demo-page__flow-create-btn"
            onClick={() => onOpenFlowBuilder(name)}
          >
            <span className="material-symbols-outlined">account_tree</span>
            Edit Flow to Add More Content
          </button>
        </div>
      )}

      <div className="demo-page__meta">
        <div className="demo-page__meta-col">
          <div className="demo-page__meta-field">
            <span className="field-label">Viewer Title</span>
            <input
              className="demo-page__meta-input"
              placeholder="Add a viewer title..."
              value={viewerTitle}
              onChange={(e) => setViewerTitle(e.target.value)}
            />
          </div>
          <div className="demo-page__meta-field">
            <span className="field-label">Internal Description</span>
            <textarea
              className="demo-page__description"
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <div className="demo-page__meta-col">
          <div className="demo-page__meta-field">
            <span className="field-label">Visual Theme</span>
            <select
              className="demo-page__meta-select"
              value={visualTheme}
              onChange={(e) => setVisualTheme(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="minimal">Minimal</option>
              <option value="dark">Dark</option>
              <option value="branded">Branded</option>
            </select>
          </div>
          <div className="demo-page__meta-field">
            <span className="field-label">Created by</span>
            <span className="demo-page__meta-value">Cory Crouch</span>
          </div>
          <div className="demo-page__meta-field">
            <span className="field-label">Last Updated</span>
            <span className="demo-page__meta-value">{createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
