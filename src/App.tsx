import { useState } from "react"
import type { Lead } from "@/data/leads"
import LeftNav from "@/components/LeftNav"
import TrackEngagement from "@/components/TrackEngagement"
import BuyingGroupPage from "@/components/BuyingGroupPage"
import PersonPage from "@/components/PersonPage"
import "@/styles/app.scss"

type SubPage =
  | { type: "none" }
  | { type: "buyingGroup"; name: string }
  | { type: "person"; lead: Lead }

function App() {
  const [activePage, setActivePage] = useState("Track Engagement")
  const [subPage, setSubPage] = useState<SubPage>({ type: "none" })

  function handleNavigate(page: string) {
    setActivePage(page)
    setSubPage({ type: "none" })
  }

  function openBuyingGroup(name: string) {
    setSubPage({ type: "buyingGroup", name })
  }

  function openPerson(lead: Lead) {
    setSubPage({ type: "person", lead })
  }

  function goBack() {
    setSubPage({ type: "none" })
  }

  return (
    <div className="app-layout">
      <LeftNav activePage={activePage} onNavigate={handleNavigate} />
      <main className="app-layout__content">
        {activePage === "Track Engagement" && subPage.type === "none" && (
          <TrackEngagement
            onPersonClick={openPerson}
            onBuyingGroupClick={openBuyingGroup}
          />
        )}
        {activePage === "Track Engagement" && subPage.type === "buyingGroup" && (
          <BuyingGroupPage
            groupName={subPage.name}
            onBack={goBack}
            onPersonClick={openPerson}
          />
        )}
        {activePage === "Track Engagement" && subPage.type === "person" && (
          <PersonPage
            lead={subPage.lead}
            onBack={goBack}
            onBuyingGroupClick={openBuyingGroup}
          />
        )}
        {activePage !== "Track Engagement" && (
          <>
            <h1>{activePage}</h1>
            <p>Start building your prototype here.</p>
          </>
        )}
      </main>
    </div>
  )
}

export default App
