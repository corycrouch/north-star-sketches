import Avatar from "@/components/Avatar"
import "@/styles/left-nav.scss"

interface NavItem {
  icon: string
  label: string
  hasSubmenu?: boolean
}

interface NavItemRowProps extends NavItem {
  active?: boolean
  onClick?: () => void
}

const mainNav: NavItem[] = [
  { icon: "speed", label: "Dashboard" },
  { icon: "add", label: "Create", hasSubmenu: true },
  { icon: "send", label: "Share", hasSubmenu: true },
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

function NavItemRow({ icon, label, hasSubmenu, active, onClick }: NavItemRowProps) {
  return (
    <button
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

interface LeftNavProps {
  activePage: string
  onNavigate: (page: string) => void
}

export default function LeftNav({ activePage, onNavigate }: LeftNavProps) {
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
            active={activePage === item.label}
            onClick={() => onNavigate(item.label)}
          />
        ))}
      </div>

      <div className="left-nav__spacer" />
      <div className="left-nav__divider" />

      <div className="left-nav__bottom">
        {bottomNav.map((item) => (
          <NavItemRow
            key={item.label}
            {...item}
            active={activePage === item.label}
            onClick={() => onNavigate(item.label)}
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
