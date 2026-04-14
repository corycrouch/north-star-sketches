import { useState } from "react"
import "@/styles/video-record-setup.scss"

interface VideoRecordSetupModalProps {
  cameraOn: boolean
  onCameraOnChange: (on: boolean) => void
  onCancel: () => void
  onStartRecording: () => void
}

export default function VideoRecordSetupModal({
  cameraOn,
  onCameraOnChange,
  onCancel,
  onStartRecording,
}: VideoRecordSetupModalProps) {
  const [screenOn, setScreenOn] = useState(true)
  const [audioOn, setAudioOn] = useState(true)
  const [cameraDevice, setCameraDevice] = useState("builtin-cam")
  const [audioDevice, setAudioDevice] = useState("builtin-mic")

  return (
    <div className="record-setup">
      <h2 id="demo-fake-video-title" className="record-setup__visually-hidden">
        Recording options
      </h2>

      <div className="record-setup__section">
        <div className="record-setup__row">
          <span className="record-setup__icon" aria-hidden>
            <span className="material-symbols-outlined">monitor</span>
          </span>
          <span className="record-setup__label" id="record-setup-screen-label">
            Record Screen
          </span>
          <button
            type="button"
            className="record-setup__toggle"
            role="switch"
            aria-checked={screenOn}
            aria-labelledby="record-setup-screen-label"
            onClick={() => setScreenOn((v) => !v)}
          />
        </div>
        <div className="record-setup__select-wrap">
          <div
            className={`record-setup__select record-setup__select--static ${!screenOn ? "record-setup__select--muted" : ""}`}
            aria-disabled={!screenOn}
          >
            Choose on the next step
          </div>
        </div>
      </div>

      <div className="record-setup__section">
        <div className="record-setup__row">
          <span className="record-setup__icon" aria-hidden>
            <span className="material-symbols-outlined">videocam</span>
          </span>
          <span className="record-setup__label" id="record-setup-camera-label">
            Camera
          </span>
          <button
            type="button"
            className="record-setup__toggle"
            role="switch"
            aria-checked={cameraOn}
            aria-labelledby="record-setup-camera-label"
            onClick={() => onCameraOnChange(!cameraOn)}
          />
        </div>
        <div className="record-setup__select-wrap">
          <label htmlFor="record-setup-camera-select" className="record-setup__visually-hidden">
            Camera device
          </label>
          <select
            id="record-setup-camera-select"
            className="record-setup__select"
            value={cameraDevice}
            onChange={(e) => setCameraDevice(e.target.value)}
            disabled={!cameraOn}
          >
            <option value="builtin-cam">Built-in Camera</option>
            <option value="off">Off</option>
          </select>
          <span className="record-setup__select-chevron" aria-hidden>
            <span className="material-symbols-outlined">expand_more</span>
          </span>
        </div>
      </div>

      <div className="record-setup__section">
        <div className="record-setup__row">
          <span className="record-setup__icon" aria-hidden>
            <span className="material-symbols-outlined">mic</span>
          </span>
          <span className="record-setup__label" id="record-setup-audio-label">
            Audio
          </span>
          <button
            type="button"
            className="record-setup__toggle"
            role="switch"
            aria-checked={audioOn}
            aria-labelledby="record-setup-audio-label"
            onClick={() => setAudioOn((v) => !v)}
          />
        </div>
        <div className="record-setup__select-wrap">
          <label htmlFor="record-setup-audio-select" className="record-setup__visually-hidden">
            Microphone
          </label>
          <select
            id="record-setup-audio-select"
            className="record-setup__select"
            value={audioDevice}
            onChange={(e) => setAudioDevice(e.target.value)}
            disabled={!audioOn}
          >
            <option value="builtin-mic">Built-in Microphone</option>
            <option value="system">Same as system</option>
          </select>
          <span className="record-setup__select-chevron" aria-hidden>
            <span className="material-symbols-outlined">expand_more</span>
          </span>
        </div>
      </div>

      <div className="record-setup__actions">
        <button type="button" className="record-setup__start" onClick={onStartRecording}>
          <span className="record-setup__start-icon" aria-hidden />
          Start Recording
        </button>
        <button type="button" className="record-setup__cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}
