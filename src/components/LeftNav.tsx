import { useState, useRef, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import Avatar from "@/components/Avatar"
import {
  ACQUISITION_TABS,
  PIPELINE_TABS,
  type AcquisitionTabId,
  type PipelineTabId,
} from "@/components/TrackEngagement"
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

const mainNavRest: NavItem[] = [
  { icon: "note_stack", label: "Library" },
]

const bottomNav: NavItem[] = [
  { icon: "business", label: "Test Account", hasSubmenu: true },
  { icon: "settings", label: "Settings", hasSubmenu: true },
  { icon: "cable", label: "Integrations", hasSubmenu: true },
  { icon: "help", label: "Help", hasSubmenu: true },
]

interface NavAccordionProps {
  label: string
  icon?: string
  customIconSrc?: string
  expanded: boolean
  /** True when main content is a tab in this suite (drives sub-item active state). */
  suiteActive: boolean
  activeSubId: string
  onHeaderClick: () => void
  onSubClick: (id: string) => void
  subItems: readonly { readonly id: string; readonly label: string }[]
}

function NavAccordion({
  label,
  icon,
  customIconSrc,
  expanded,
  suiteActive,
  activeSubId,
  onHeaderClick,
  onSubClick,
  subItems,
}: NavAccordionProps) {
  return (
    <div className="left-nav__accordion">
      <button
        type="button"
        className="left-nav__item left-nav__item--accordion-head"
        onClick={onHeaderClick}
        aria-expanded={expanded}
      >
        {customIconSrc ? (
          <img src={customIconSrc} alt="" className="left-nav__icon left-nav__icon--custom" />
        ) : (
          <span className="material-symbols-outlined left-nav__icon">{icon}</span>
        )}
        <span className="left-nav__label">{label}</span>
        <span
          className={`material-symbols-outlined left-nav__accordion-chevron ${expanded ? "left-nav__accordion-chevron--open" : ""}`}
          aria-hidden
        >
          chevron_right
        </span>
      </button>
      {expanded && (
        <ul className="left-nav__sublist" role="list">
          {subItems.map((tab) => (
            <li key={tab.id}>
              <button
                type="button"
                className={`left-nav__subitem ${suiteActive && activeSubId === tab.id ? "left-nav__subitem--active" : ""}`}
                onClick={() => onSubClick(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

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

type Workspace = "Dashboard" | "Library" | "Demo" | "Analytics" | "Marketing" | "Sales"

interface LeftNavProps {
  workspace: Workspace
  onNavigate: (page: string) => void
  onCreateDemo: () => void
  marketingTab: AcquisitionTabId
  salesTab: PipelineTabId
  onMarketingTabSelect: (id: AcquisitionTabId) => void
  onSalesTabSelect: (id: PipelineTabId) => void
}

export default function LeftNav({
  workspace,
  onNavigate,
  onCreateDemo,
  marketingTab,
  salesTab,
  onMarketingTabSelect,
  onSalesTabSelect,
}: LeftNavProps) {
  const [openPopout, setOpenPopout] = useState<string | null>(null)
  const [marketingOpen, setMarketingOpen] = useState(false)
  const [salesOpen, setSalesOpen] = useState(false)
  const createButtonRef = useRef<HTMLButtonElement>(null)

  const handleNav = useCallback((label: string, popout?: string) => {
    if (popout) {
      setOpenPopout((prev) => prev === popout ? null : popout)
    } else {
      setOpenPopout(null)
      onNavigate(label)
    }
  }, [onNavigate])

  function toggleMarketingAccordion() {
    setOpenPopout(null)
    setMarketingOpen((o) => !o)
  }

  function toggleSalesAccordion() {
    setOpenPopout(null)
    setSalesOpen((o) => !o)
  }

  function pickMarketingTab(id: string) {
    setMarketingOpen(true)
    onMarketingTabSelect(id as AcquisitionTabId)
  }

  function pickSalesTab(id: string) {
    setSalesOpen(true)
    onSalesTabSelect(id as PipelineTabId)
  }

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

      <div className="left-nav__scroll">
        <div className="left-nav__main">
          <NavItemRow
            icon="speed"
            label="Dashboard"
            active={workspace === "Dashboard"}
            onClick={() => handleNav("Dashboard")}
          />
          <NavItemRow
            icon="analytics"
            label="Analytics"
            active={workspace === "Analytics"}
            onClick={() => handleNav("Analytics")}
          />
          <NavAccordion
            label="Marketing"
            customIconSrc="/funnel_top.svg"
            expanded={marketingOpen}
            suiteActive={workspace === "Marketing"}
            activeSubId={marketingTab}
            subItems={ACQUISITION_TABS}
            onHeaderClick={toggleMarketingAccordion}
            onSubClick={pickMarketingTab}
          />
          <NavAccordion
            label="Sales"
            customIconSrc="/funnel_bottom.svg"
            expanded={salesOpen}
            suiteActive={workspace === "Sales"}
            activeSubId={salesTab}
            subItems={PIPELINE_TABS}
            onHeaderClick={toggleSalesAccordion}
            onSubClick={pickSalesTab}
          />
          {mainNavRest.map((item) => (
            <NavItemRow
              key={item.label}
              {...item}
              active={workspace === item.label}
              onClick={() => handleNav(item.label, item.popout)}
            />
          ))}
        </div>
      </div>

      {openPopout === "create" && (
        <CreatePopout
          anchorRef={createButtonRef}
          onClose={() => setOpenPopout(null)}
          onCreateDemo={onCreateDemo}
        />
      )}
      <div className="left-nav__divider" />

      <div className="left-nav__bottom">
        {bottomNav.map((item) => (
          <NavItemRow
            key={item.label}
            {...item}
            active={false}
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
