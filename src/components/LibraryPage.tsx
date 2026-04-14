import SketchTable from "@/components/SketchTable"
import type { Column } from "@/components/SketchTable"
import { demosData, type DemoRecord } from "@/data/demos"
import "@/styles/track-engagement.scss"

interface LibraryPageProps {
  onOpenDemo: (demo: DemoRecord) => void
  onCreateDemo: () => void
}

function buildColumns(onOpenDemo: (demo: DemoRecord) => void): Column<DemoRecord>[] {
  return [
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
  ]
}

export default function LibraryPage({ onOpenDemo, onCreateDemo }: LibraryPageProps) {
  const columns = buildColumns(onOpenDemo)

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
        <SketchTable columns={columns} data={demosData} />
      </div>
    </div>
  )
}
