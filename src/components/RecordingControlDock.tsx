import "@/styles/recording-control-dock.scss"

interface RecordingControlDockProps {
  elapsedSeconds: number
  paused: boolean
  onPauseToggle: () => void
  onRestart: () => void
  onSettings: () => void
  onCancel: () => void
  onStop: () => void
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${String(s).padStart(2, "0")}`
}

export default function RecordingControlDock({
  elapsedSeconds,
  paused,
  onPauseToggle,
  onRestart,
  onSettings,
  onCancel,
  onStop,
}: RecordingControlDockProps) {
  return (
    <aside
      className="recording-dock"
      aria-label="Recording controls"
    >
      <div className="recording-dock__drag" aria-hidden title="">
        <span className="recording-dock__drag-dot" />
        <span className="recording-dock__drag-dot" />
        <span className="recording-dock__drag-dot" />
        <span className="recording-dock__drag-dot" />
        <span className="recording-dock__drag-dot" />
        <span className="recording-dock__drag-dot" />
      </div>

      <div className="recording-dock__pill">
        <div className="recording-dock__status" aria-live="polite">
          <span className="recording-dock__rec">
            <span className="recording-dock__rec-dot" aria-hidden />
            REC
          </span>
          <span className="recording-dock__timer">{formatTime(elapsedSeconds)}</span>
        </div>

        <div className="recording-dock__divider" aria-hidden />

        <button
          type="button"
          className="recording-dock__icon-btn"
          aria-label="Recording settings"
          onClick={onSettings}
        >
          <span className="material-symbols-outlined">settings</span>
        </button>

        <button
          type="button"
          className="recording-dock__icon-btn"
          aria-label="Restart timer"
          onClick={onRestart}
        >
          <span className="material-symbols-outlined">replay</span>
        </button>

        <button
          type="button"
          className={`recording-dock__icon-btn ${paused ? "recording-dock__icon-btn--active" : ""}`}
          aria-label={paused ? "Resume" : "Pause"}
          onClick={onPauseToggle}
        >
          <span className="material-symbols-outlined">{paused ? "play_arrow" : "pause"}</span>
        </button>

        <button
          type="button"
          className="recording-dock__stop"
          aria-label="Stop recording"
          onClick={onStop}
        >
          <span className="recording-dock__stop-ring" aria-hidden>
            <span className="recording-dock__stop-inner" aria-hidden>
              <span className="recording-dock__stop-square" aria-hidden />
            </span>
          </span>
        </button>

        <button
          type="button"
          className="recording-dock__icon-btn recording-dock__icon-btn--ghost"
          aria-label="Cancel and discard"
          onClick={onCancel}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </aside>
  )
}
