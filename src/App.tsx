import { useState } from "react"
import type { Lead } from "@/data/leads"
import LeftNav from "@/components/LeftNav"
import TrackEngagement from "@/components/TrackEngagement"
import BuyingGroupPage from "@/components/BuyingGroupPage"
import PersonPage from "@/components/PersonPage"
import DemoPage from "@/components/DemoPage"
import "@/styles/app.scss"

type SubPage =
  | { type: "none" }
  | { type: "buyingGroup"; name: string }
  | { type: "person"; lead: Lead }

function formatDefaultDemoName() {
  const now = new Date()
  return now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }) + " Demo"
}

function App() {
  const [activePage, setActivePage] = useState("Track Engagement")
  const [subPage, setSubPage] = useState<SubPage>({ type: "none" })
  const [demoName, setDemoName] = useState("")

  function handleNavigate(page: string) {
    setActivePage(page)
    setSubPage({ type: "none" })
  }

  function handleCreateDemo() {
    setDemoName(formatDefaultDemoName())
    setActivePage("Demo")
    setSubPage({ type: "none" })
  }

  function openBuyingGroup(name: string) {
    setSubPage({ type: "buyingGroup", name })
  }

  function openPerson(lead: Lead) {
    setSubPage({ type: "person", lead })
  }

  function goBack() {
    if (activePage === "Demo") {
      setActivePage("Track Engagement")
      return
    }
    setSubPage({ type: "none" })
  }

  return (
    <div className="app-layout">
      <LeftNav
        activePage={activePage}
        onNavigate={handleNavigate}
        onCreateDemo={handleCreateDemo}
      />
      <main className="app-layout__content">
        {activePage === "Demo" && (
          <DemoPage
            initialName={demoName}
            onBack={goBack}
          />
        )}
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
        {activePage !== "Track Engagement" && activePage !== "Demo" && (
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
