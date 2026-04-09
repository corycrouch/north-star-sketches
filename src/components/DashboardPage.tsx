import Avatar from "@/components/Avatar"
import "@/styles/dashboard-page.scss"

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <header className="dashboard-page__hero">
        <div className="dashboard-page__hero-main">
          <Avatar initials="C" />
          <div className="dashboard-page__hero-text">
            <h1 className="dashboard-page__title">Cory Crouch</h1>
            <p className="dashboard-page__tagline">
              The system is ready. Are you? (No pressure.)
            </p>
          </div>
        </div>
        <button type="button" className="dashboard-page__hero-edit" aria-label="Edit profile">
          <span className="material-symbols-outlined">edit</span>
        </button>
      </header>
    </div>
  )
}
