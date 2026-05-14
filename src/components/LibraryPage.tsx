import { useMemo, useState } from "react"
import SketchTable from "@/components/SketchTable"
import type { Column } from "@/components/SketchTable"
import { demosData, type DemoRecord } from "@/data/demos"
import "@/styles/track-engagement.scss"

interface LibraryPageProps {
  onOpenDemo: (demo: DemoRecord) => void
  onCreateDemo: () => void
}

function buildColumns(
  onOpenDemo: (demo: DemoRecord) => void,
  selectedIds: Set<string>,
  onToggleSelect: (id: string) => void,
): Column<DemoRecord>[] {
  return [
    {
      key: "select",
      header: "",
      render: (row) => (
        <input
          type="checkbox"
          className="library-page__checkbox"
          aria-label={`Select ${row.name}`}
          checked={selectedIds.has(row.id)}
          onChange={() => onToggleSelect(row.id)}
        />
      ),
    },
    {
      key: "name",
      header: "Demo",
      render: (row) => (
        <a
          className="table-link library-page__demo-link"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onOpenDemo(row)
          }}
        >
          <span className="library-page__thumb" aria-hidden />
          <span>{row.name}</span>
          <span className="material-symbols-outlined table-link__icon">arrow_forward</span>
        </a>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <span className="library-page__status">
          {row.status === "published" ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      key: "lastUpdated",
      header: "Last updated",
      render: (row) => row.lastUpdated,
    },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <button
          type="button"
          className="library-page__row-share"
          aria-label={`Share ${row.name}`}
        >
          <span className="material-symbols-outlined" aria-hidden>
            ios_share
          </span>
          Share
        </button>
      ),
    },
  ]
}

const BULK_ACTIONS = [
  { key: "share", label: "Share", icon: "ios_share" },
  { key: "delete", label: "Delete", icon: "delete" },
  { key: "duplicate", label: "Duplicate", icon: "content_copy" },
  { key: "move", label: "Move", icon: "drive_file_move" },
  { key: "more", label: "More", icon: "more_horiz" },
] as const

export default function LibraryPage({ onOpenDemo, onCreateDemo }: LibraryPageProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())

  const selectedCount = selectedIds.size
  const hasSelection = selectedCount > 0

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const columns = useMemo(
    () => buildColumns(onOpenDemo, selectedIds, toggleSelect),
    [onOpenDemo, selectedIds],
  )

  return (
    <div className="track-engagement library-page">
      <header className="library-page__header">
        <div className="library-page__header-main">
          <h1>Library</h1>
          <p className="library-page__intro">Your demos live here. Open one to edit or preview.</p>
        </div>
        <button type="button" className="library-page__create-btn" onClick={onCreateDemo}>
          <span className="material-symbols-outlined" aria-hidden>
            add
          </span>
          Create demo
        </button>
      </header>

      <div className="track-engagement__content">
        {hasSelection ? (
          <div
            className="library-page__bulk-toolbar"
            role="toolbar"
            aria-label="Bulk actions"
          >
            <span className="library-page__bulk-count">
              {selectedCount} {selectedCount === 1 ? "Item" : "Items"} selected
            </span>
            <div className="library-page__bulk-actions">
              {BULK_ACTIONS.map((action) => (
                <button
                  key={action.key}
                  type="button"
                  className="library-page__bulk-btn"
                >
                  <span className="material-symbols-outlined" aria-hidden>
                    {action.icon}
                  </span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <SketchTable columns={columns} data={demosData} />
      </div>
    </div>
  )
}
