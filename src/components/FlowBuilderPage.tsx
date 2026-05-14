import { useCallback, useState } from "react"
import CannedFlowGraphic from "@/components/CannedFlowGraphic"
import { DEMO_CONTENT_META, type DemoContentItem } from "@/types/demo-content"
import "@/styles/flow-builder.scss"

export interface FlowBuilderCloseResult {
  hasCannedFlow: boolean
}

interface FlowBuilderPageProps {
  demoTitle: string
  seedContent?: DemoContentItem[]
  onClose: (result: FlowBuilderCloseResult) => void
}

export default function FlowBuilderPage({
  demoTitle,
  seedContent = [],
  onClose,
}: FlowBuilderPageProps) {
  const [showCannedFlow, setShowCannedFlow] = useState(false)
  const hasSeedContent = seedContent.length > 0

  const seedCannedFlow = useCallback(() => {
    setShowCannedFlow(true)
  }, [])

  const finish = useCallback(() => {
    onClose({ hasCannedFlow: showCannedFlow })
  }, [onClose, showCannedFlow])

  const canvasClass = [
    "flow-builder__canvas-inner",
    showCannedFlow
      ? "flow-builder__canvas-inner--has-flow"
      : hasSeedContent
        ? "flow-builder__canvas-inner--has-seed"
        : "flow-builder__canvas-inner--empty",
  ].join(" ")

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
            className={canvasClass}
            onClick={!hasSeedContent && !showCannedFlow ? seedCannedFlow : undefined}
            onKeyDown={
              !hasSeedContent && !showCannedFlow
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      seedCannedFlow()
                    }
                  }
                : undefined
            }
            role={!hasSeedContent && !showCannedFlow ? "button" : undefined}
            tabIndex={!hasSeedContent && !showCannedFlow ? 0 : undefined}
            aria-label={
              !hasSeedContent && !showCannedFlow
                ? "Add a sample flow to the canvas"
                : undefined
            }
          >
            {!showCannedFlow && !hasSeedContent && (
              <>
                <span className="material-symbols-outlined flow-builder__canvas-icon">account_tree</span>
                <p className="flow-builder__canvas-hint">Drag steps here to build your flow</p>
              </>
            )}
            {!showCannedFlow && hasSeedContent && (
              <div className="flow-builder__seed-content">
                {seedContent.map((item, index) => {
                  const meta = DEMO_CONTENT_META[item.type]
                  return (
                    <div
                      key={`${item.type}-${item.name}-${index}`}
                      className="flow-builder__seed-card"
                    >
                      <div className="flow-builder__seed-card-thumb" aria-hidden>
                        <span className="material-symbols-outlined">play_arrow</span>
                      </div>
                      <div className="flow-builder__seed-card-meta">
                        <span className="field-label flow-builder__seed-card-type">
                          <span className="material-symbols-outlined" aria-hidden>
                            {meta.icon}
                          </span>
                          {meta.label}
                        </span>
                        <span className="flow-builder__seed-card-name">{item.name}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
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
              {seedContent.map((item, index) => {
                const meta = DEMO_CONTENT_META[item.type]
                return (
                  <div
                    key={`${item.type}-${item.name}-${index}`}
                    className="flow-builder__content-card flow-builder__content-card--filled"
                  >
                    <span className="material-symbols-outlined flow-builder__content-card-icon" aria-hidden>
                      {meta.icon}
                    </span>
                    <span className="flow-builder__content-card-label">{meta.label}</span>
                    <span className="flow-builder__content-card-name">{item.name}</span>
                  </div>
                )
              })}
              {Array.from({ length: Math.max(0, 10 - seedContent.length) }, (_, i) => (
                <div key={`placeholder-${i}`} className="flow-builder__content-card" aria-hidden />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
