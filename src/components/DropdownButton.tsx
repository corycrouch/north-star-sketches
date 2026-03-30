import { useState, useRef, useEffect } from "react"
import "@/styles/dropdown-button.scss"

interface DropdownOption {
  key: string
  label: string
}

interface DropdownButtonProps {
  icon: string
  label: string
  options: DropdownOption[]
  value: string | null
  onChange: (key: string | null) => void
  allowDeselect?: boolean
}

export default function DropdownButton({ icon, label, options, value, onChange, allowDeselect = true }: DropdownButtonProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const selectedLabel = options.find((o) => o.key === value)?.label

  function select(key: string) {
    if (value === key && !allowDeselect) {
      setOpen(false)
      return
    }
    onChange(value === key ? null : key)
    setOpen(false)
  }

  return (
    <div className="dropdown-btn" ref={ref}>
      <button
        className={`dropdown-btn__trigger ${open ? "dropdown-btn__trigger--open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span className="material-symbols-outlined dropdown-btn__icon">{icon}</span>
        <span>{label}{selectedLabel ? `: ${selectedLabel}` : ""}</span>
        <span className={`material-symbols-outlined dropdown-btn__chevron ${open ? "dropdown-btn__chevron--open" : ""}`}>
          expand_more
        </span>
      </button>

      {open && (
        <div className="dropdown-btn__menu">
          {options.map((opt) => (
            <button
              key={opt.key}
              className={`dropdown-btn__option ${value === opt.key ? "dropdown-btn__option--active" : ""}`}
              onClick={() => select(opt.key)}
            >
              {opt.label}
              {value === opt.key && (
                <span className="material-symbols-outlined dropdown-btn__check">check</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
