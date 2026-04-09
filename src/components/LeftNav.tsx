import { useState, useRef, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import Avatar from "@/components/Avatar"
import "@/styles/left-nav.scss"

interface NavItem {
  /** Material Symbols ligature name (omit when `customIconSrc` is set). */
  icon?: string
  /** Public URL for a custom nav icon (e.g. `/funnel_top.svg`). */
  customIconSrc?: string
  label: string
  hasSubmenu?: boolean
  popout?: string
}

interface NavItemRowProps extends NavItem {
  active?: boolean
  onClick?: () => void
  buttonRef?: React.Ref<HTMLButtonElement>
}

const mainNav: NavItem[] = [
  { icon: "speed", label: "Dashboard" },
  { customIconSrc: "/funnel_top.svg", label: "Lead Gen" },
  { customIconSrc: "/funnel_bottom.svg", label: "Deals" },
  { icon: "note_stack", label: "Library" },
  { icon: "analytics", label: "Analytics" },
]

const bottomNav: NavItem[] = [
  { icon: "business", label: "Test Account", hasSubmenu: true },
  { icon: "settings", label: "Settings", hasSubmenu: true },
  { icon: "cable", label: "Integrations", hasSubmenu: true },
  { icon: "help", label: "Help", hasSubmenu: true },
]

function NavItemRow({ icon, customIconSrc, label, hasSubmenu, active, onClick, buttonRef }: NavItemRowProps) {
  return (
    <button
      ref={buttonRef}
      className={`left-nav__item ${active ? "left-nav__item--active" : ""}`}
      onClick={onClick}
    >
      {customIconSrc ? (
        <img src={customIconSrc} alt="" className="left-nav__icon left-nav__icon--custom" />
      ) : (
        <span className="material-symbols-outlined left-nav__icon">{icon}</span>
      )}
      <span className="left-nav__label">{label}</span>
      {hasSubmenu && (
        <span className="material-symbols-outlined left-nav__chevron">
          chevron_right
        </span>
      )}
    </button>
  )
}

interface PopoutProps {
  anchorRef: React.RefObject<HTMLButtonElement | null>
  onClose: () => void
  onCreateDemo?: () => void
}

interface CreateMenuItem {
  id: string
  icon: string
  title: string
  description: string
  /** Opens the demo editor when the row is activated */
  opensDemo?: boolean
}

const CREATE_MENU_ITEMS: CreateMenuItem[] = [
  {
    id: "demo",
    icon: "slideshow",
    title: "Demo",
    description:
      "Build an interactive product demo your buyers can explore at their own pace. Choose from tours, videos, and more.",
    opensDemo: true,
  },
  {
    id: "ai-agent",
    icon: "smart_toy",
    title: "AI Agent",
    description:
      "Deploy an AI-powered agent that guides buyers through your product with personalized, conversational experiences.",
  },
  {
    id: "share-link",
    icon: "link",
    title: "Share Link",
    description:
      "Create a reusable link that you can share anywhere. Or add specific recipients for a personalized touch.",
  },
  {
    id: "page-embed",
    icon: "code",
    title: "Page Embed",
    description:
      "Embed your content directly into any website with a simple code snippet. Seamlessly integrate with your pages.",
  },
]

function usePopoutPosition(anchorRef: React.RefObject<HTMLButtonElement | null>) {
  const anchorRect = anchorRef.current?.getBoundingClientRect()
  return {
    top: anchorRect?.top ?? 0,
    left: (anchorRect?.right ?? 0) + 12,
  }
}

function useClickOutside(
  popoutRef: React.RefObject<HTMLDivElement | null>,
  anchorRef: React.RefObject<HTMLButtonElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node
      if (
        popoutRef.current?.contains(target) ||
        anchorRef.current?.contains(target)
      ) return
      onClose()
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [popoutRef, anchorRef, onClose])
}

function CreatePopout({ anchorRef, onClose, onCreateDemo }: PopoutProps) {
  const popoutRef = useRef<HTMLDivElement>(null)
  const pos = usePopoutPosition(anchorRef)
  useClickOutside(popoutRef, anchorRef, onClose)
  const [hoveredId, setHoveredId] = useState("demo")

  const active = CREATE_MENU_ITEMS.find((item) => item.id === hoveredId) ?? CREATE_MENU_ITEMS[0]

  function handleDemoLaunch() {
    onClose()
    onCreateDemo?.()
  }

  function handleNavClick(item: CreateMenuItem) {
    if (item.opensDemo) handleDemoLaunch()
  }

  return createPortal(
    <div
      className="create-popout"
      ref={popoutRef}
      style={{ top: pos.top, left: pos.left }}
    >
      <div className="create-popout__beak" aria-hidden />
      <div className="create-popout__inner">
        <nav className="create-popout__sidebar" aria-label="Create options">
          <ul className="create-popout__nav-list">
            {CREATE_MENU_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`create-popout__nav-item ${hoveredId === item.id ? "create-popout__nav-item--active" : ""} ${item.opensDemo ? "create-popout__nav-item--launch" : ""}`}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onFocus={() => setHoveredId(item.id)}
                  onClick={() => handleNavClick(item)}
                >
                  <span className="create-popout__nav-icon-wrap">
                    <span className="material-symbols-outlined create-popout__nav-icon">{item.icon}</span>
                  </span>
                  <span className="create-popout__nav-label">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="create-popout__divider" aria-hidden />

        <div className="create-popout__preview" aria-live="polite">
          <h2 className="create-popout__preview-title">{active.title}</h2>
          <div className="create-popout__preview-visual" />
          <p className="create-popout__preview-desc">{active.description}</p>
          <a
            href="#"
            className="create-popout__preview-link"
            onClick={(e) => e.preventDefault()}
          >
            See example
          </a>
        </div>
      </div>
    </div>,
    document.body,
  )
}

interface LeftNavProps {
  activePage: string
  onNavigate: (page: string) => void
  onCreateDemo: () => void
}

export default function LeftNav({ activePage, onNavigate, onCreateDemo }: LeftNavProps) {
  const [openPopout, setOpenPopout] = useState<string | null>(null)
  const createButtonRef = useRef<HTMLButtonElement>(null)

  const handleNav = useCallback((label: string, popout?: string) => {
    if (popout) {
      setOpenPopout((prev) => prev === popout ? null : popout)
    } else {
      setOpenPopout(null)
      onNavigate(label)
    }
  }, [onNavigate])

  function toggleCreateMenu() {
    setOpenPopout((prev) => (prev === "create" ? null : "create"))
  }

  return (
    <nav className="left-nav">
      <div className="left-nav__logo">
        <img src="/Outline_Vertical_White.png" alt="Logo" className="left-nav__logo-img" />
      </div>

      <div className="left-nav__create-wrap">
        <button
          ref={createButtonRef}
          type="button"
          className={`left-nav__create-pill ${openPopout === "create" ? "left-nav__create-pill--open" : ""}`}
          onClick={toggleCreateMenu}
          aria-expanded={openPopout === "create"}
          aria-haspopup="dialog"
        >
          <span className="material-symbols-outlined left-nav__create-pill-icon">add</span>
          <span>Create</span>
        </button>
      </div>

      <div className="left-nav__divider" />

      <div className="left-nav__main">
        {mainNav.map((item) => (
          <NavItemRow
            key={item.label}
            {...item}
            active={activePage === item.label}
            onClick={() => handleNav(item.label, item.popout)}
          />
        ))}
      </div>

      {openPopout === "create" && (
        <CreatePopout
          anchorRef={createButtonRef}
          onClose={() => setOpenPopout(null)}
          onCreateDemo={onCreateDemo}
        />
      )}
      <div className="left-nav__spacer" />
      <div className="left-nav__divider" />

      <div className="left-nav__bottom">
        {bottomNav.map((item) => (
          <NavItemRow
            key={item.label}
            {...item}
            active={activePage === item.label}
            onClick={() => handleNav(item.label, item.popout)}
          />
        ))}
      </div>

      <div className="left-nav__divider" />

      <div className="left-nav__user">
        <Avatar initials="CC" />
        <span className="left-nav__label">Cory Crouch</span>
        <span className="material-symbols-outlined left-nav__chevron">
          chevron_right
        </span>
      </div>
    </nav>
  )
}
