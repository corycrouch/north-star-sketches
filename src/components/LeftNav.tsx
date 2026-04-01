import { useState, useRef, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import Avatar from "@/components/Avatar"
import "@/styles/left-nav.scss"

interface NavItem {
  icon: string
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
  { icon: "add", label: "Create", hasSubmenu: true, popout: "create" },
  { icon: "send", label: "Share", hasSubmenu: true, popout: "share" },
  { icon: "note_stack", label: "Library" },
  { icon: "trending_up", label: "Track Engagement" },
  { icon: "link", label: "Manage Links" },
  { icon: "analytics", label: "Analytics" },
]

const bottomNav: NavItem[] = [
  { icon: "business", label: "Test Account", hasSubmenu: true },
  { icon: "settings", label: "Settings", hasSubmenu: true },
  { icon: "cable", label: "Integrations", hasSubmenu: true },
  { icon: "help", label: "Help", hasSubmenu: true },
]

function NavItemRow({ icon, label, hasSubmenu, active, onClick, buttonRef }: NavItemRowProps) {
  return (
    <button
      ref={buttonRef}
      className={`left-nav__item ${active ? "left-nav__item--active" : ""}`}
      onClick={onClick}
    >
      <span className="material-symbols-outlined left-nav__icon">{icon}</span>
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

  function handleDemoClick() {
    onClose()
    onCreateDemo?.()
  }

  return createPortal(
    <div
      className="share-popout"
      ref={popoutRef}
      style={{ top: pos.top, left: pos.left }}
    >
      <div className="share-popout__card share-popout__card--clickable" onClick={handleDemoClick} role="button" tabIndex={0}>
        <div className="share-popout__card-header">
          <span className="material-symbols-outlined share-popout__card-icon">slideshow</span>
          <span className="share-popout__card-title">Demo</span>
        </div>
        <div className="share-popout__card-image" />
        <p className="share-popout__card-desc">
          Build an interactive product demo your buyers can explore at their own pace. Choose from tours, videos, and more.
        </p>
        <a href="#" className="share-popout__card-link" onClick={(e) => e.preventDefault()}>
          See example
        </a>
      </div>

      <div className="share-popout__card">
        <div className="share-popout__card-header">
          <span className="material-symbols-outlined share-popout__card-icon">smart_toy</span>
          <span className="share-popout__card-title">AI Agent</span>
        </div>
        <div className="share-popout__card-image" />
        <p className="share-popout__card-desc">
          Deploy an AI-powered agent that guides buyers through your product with personalized, conversational experiences.
        </p>
        <a href="#" className="share-popout__card-link" onClick={(e) => e.preventDefault()}>
          See example
        </a>
      </div>
    </div>,
    document.body,
  )
}

function SharePopout({ anchorRef, onClose }: PopoutProps) {
  const popoutRef = useRef<HTMLDivElement>(null)
  const pos = usePopoutPosition(anchorRef)
  useClickOutside(popoutRef, anchorRef, onClose)

  return createPortal(
    <div
      className="share-popout"
      ref={popoutRef}
      style={{ top: pos.top, left: pos.left }}
    >
      <div className="share-popout__card">
        <div className="share-popout__card-header">
          <span className="material-symbols-outlined share-popout__card-icon">link</span>
          <span className="share-popout__card-title">Share Link</span>
        </div>
        <div className="share-popout__card-image" />
        <p className="share-popout__card-desc">
          Create a reusable link that you can share anywhere. Or add specific recipients for a personalized touch.
        </p>
        <a href="#" className="share-popout__card-link" onClick={(e) => e.preventDefault()}>
          See example
        </a>
      </div>

      <div className="share-popout__card">
        <div className="share-popout__card-header">
          <span className="material-symbols-outlined share-popout__card-icon">code</span>
          <span className="share-popout__card-title">Page Embed</span>
        </div>
        <div className="share-popout__card-image" />
        <p className="share-popout__card-desc">
          Embed your content directly into any website with a simple code snippet. Seamlessly integrate with your pages.
        </p>
        <a href="#" className="share-popout__card-link" onClick={(e) => e.preventDefault()}>
          See example
        </a>
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
  const shareButtonRef = useRef<HTMLButtonElement>(null)

  const popoutRefs: Record<string, React.RefObject<HTMLButtonElement | null>> = {
    create: createButtonRef,
    share: shareButtonRef,
  }

  const handleNav = useCallback((label: string, popout?: string) => {
    if (popout) {
      setOpenPopout((prev) => prev === popout ? null : popout)
    } else {
      setOpenPopout(null)
      onNavigate(label)
    }
  }, [onNavigate])

  return (
    <nav className="left-nav">
      <div className="left-nav__logo">
        <img src="/Outline_Vertical_White.png" alt="Logo" className="left-nav__logo-img" />
      </div>

      <div className="left-nav__divider" />

      <div className="left-nav__main">
        {mainNav.map((item) => (
          <NavItemRow
            key={item.label}
            {...item}
            active={activePage === item.label || (item.popout != null && openPopout === item.popout)}
            onClick={() => handleNav(item.label, item.popout)}
            buttonRef={item.popout ? popoutRefs[item.popout] : undefined}
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
      {openPopout === "share" && (
        <SharePopout
          anchorRef={shareButtonRef}
          onClose={() => setOpenPopout(null)}
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
