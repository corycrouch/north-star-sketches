import { useCallback, useState } from "react"
import CannedFlowGraphic from "@/components/CannedFlowGraphic"
import "@/styles/flow-builder.scss"

export interface FlowBuilderCloseResult {
  hasCannedFlow: boolean
}

interface FlowBuilderPageProps {
  demoTitle: string
  onClose: (result: FlowBuilderCloseResult) => void
}

export default function FlowBuilderPage({ demoTitle, onClose }: FlowBuilderPageProps) {
  const [showCannedFlow, setShowCannedFlow] = useState(false)

  const seedCannedFlow = useCallback(() => {
    setShowCannedFlow(true)
  }, [])

  const finish = useCallback(() => {
    onClose({ hasCannedFlow: showCannedFlow })
  }, [onClose, showCannedFlow])

  return (
    <div className="flow-builder">
      <header className="flow-builder__top">
        <div className="flow-builder__top-left">
          <button
            type="button"
            className="flow-builder__back"
            onClick={finish}
            aria-label="Back to demo"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="flow-builder__demo-name">{demoTitle}</span>
        </div>
        <div className="flow-builder__top-actions">
          <button type="button" className="flow-builder__top-btn">
            <span className="material-symbols-outlined">play_arrow</span>
            Preview
          </button>
          <button type="button" className="flow-builder__top-btn flow-builder__top-btn--done" onClick={finish}>
            Done
          </button>
        </div>
      </header>

      <div className="flow-builder__body">
        <div className="flow-builder__canvas" aria-label="Flow canvas">
          <div
            className={`flow-builder__canvas-inner ${showCannedFlow ? "flow-builder__canvas-inner--has-flow" : "flow-builder__canvas-inner--empty"}`}
            onClick={seedCannedFlow}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                seedCannedFlow()
              }
            }}
            role={showCannedFlow ? undefined : "button"}
            tabIndex={showCannedFlow ? undefined : 0}
            aria-label={showCannedFlow ? undefined : "Add a sample flow to the canvas"}
          >
            {!showCannedFlow && (
              <>
                <span className="material-symbols-outlined flow-builder__canvas-icon">account_tree</span>
                <p className="flow-builder__canvas-hint">Drag steps here to build your flow</p>
              </>
            )}
            {showCannedFlow && (
              <div className="flow-builder__canned-flow">
                <CannedFlowGraphic />
              </div>
            )}
          </div>
        </div>

        <aside
          className="flow-builder__panel"
          aria-label="Flow palette"
          onClick={seedCannedFlow}
        >
          <section
            className="flow-builder__panel-section flow-builder__panel-section--interactions"
            aria-labelledby="flow-panel-interactions-heading"
          >
            <h2 id="flow-panel-interactions-heading" className="field-label flow-builder__section-heading">
              Interactions
            </h2>
            <div className="flow-builder__interactions-row">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flow-builder__interaction-card" aria-hidden />
              ))}
            </div>
          </section>

          <section
            className="flow-builder__panel-section flow-builder__panel-section--content"
            aria-labelledby="flow-panel-content-heading"
          >
            <h2 id="flow-panel-content-heading" className="field-label flow-builder__section-heading">
              Content
            </h2>
            <div className="flow-builder__search">
              <span className="material-symbols-outlined flow-builder__search-icon" aria-hidden>
                search
              </span>
              <input
                type="search"
                className="flow-builder__search-input"
                placeholder="Search"
                aria-label="Search content"
              />
            </div>
            <div className="flow-builder__content-cards">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="flow-builder__content-card" aria-hidden />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
