import { useState } from "react"
import type { Lead } from "@/data/leads"
import LeftNav from "@/components/LeftNav"
import TrackEngagement from "@/components/TrackEngagement"
import BuyingGroupPage from "@/components/BuyingGroupPage"
import PersonPage from "@/components/PersonPage"
import DemoPage from "@/components/DemoPage"
import FlowBuilderPage from "@/components/FlowBuilderPage"
import LibraryPage from "@/components/LibraryPage"
import DashboardPage from "@/components/DashboardPage"
import type { DemoRecord } from "@/data/demos"
import "@/styles/app.scss"

type SubPage =
  | { type: "none" }
  | { type: "buyingGroup"; name: string }
  | { type: "person"; lead: Lead }

function App() {
  const [activePage, setActivePage] = useState("Lead Gen")
  const [subPage, setSubPage] = useState<SubPage>({ type: "none" })
  const [demoName, setDemoName] = useState("")
  const [flowBuilder, setFlowBuilder] = useState<{ open: boolean; title: string }>({
    open: false,
    title: "",
  })
  const [demoHasFlowPreview, setDemoHasFlowPreview] = useState(false)

  function handleNavigate(page: string) {
    setActivePage(page)
    setSubPage({ type: "none" })
  }

  function handleCreateDemo() {
    setDemoName("Untitled Demo")
    setDemoHasFlowPreview(false)
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
      setActivePage("Library")
      return
    }
    setSubPage({ type: "none" })
  }

  function openFlowBuilder(demoTitle: string) {
    setFlowBuilder({ open: true, title: demoTitle })
  }

  function closeFlowBuilder(result: { hasCannedFlow: boolean }) {
    setFlowBuilder({ open: false, title: "" })
    if (result.hasCannedFlow) {
      setDemoHasFlowPreview(true)
    }
  }

  function openDemoFromLibrary(demo: DemoRecord) {
    setDemoName(demo.name)
    setDemoHasFlowPreview(false)
    setActivePage("Demo")
  }

  if (flowBuilder.open) {
    return (
      <FlowBuilderPage demoTitle={flowBuilder.title} onClose={closeFlowBuilder} />
    )
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
            onOpenFlowBuilder={openFlowBuilder}
            hasFlowPreview={demoHasFlowPreview}
            onClearFlowPreview={() => setDemoHasFlowPreview(false)}
          />
        )}
        {activePage === "Library" && (
          <LibraryPage onOpenDemo={openDemoFromLibrary} />
        )}
        {activePage === "Dashboard" && <DashboardPage />}
        {(activePage === "Lead Gen" || activePage === "Deals") && subPage.type === "none" && (
          <TrackEngagement
            view={activePage === "Lead Gen" ? "acquisition" : "pipeline"}
            onPersonClick={openPerson}
            onBuyingGroupClick={openBuyingGroup}
          />
        )}
        {(activePage === "Lead Gen" || activePage === "Deals") && subPage.type === "buyingGroup" && (
          <BuyingGroupPage
            groupName={subPage.name}
            onBack={goBack}
            onPersonClick={openPerson}
            backLabel={activePage}
          />
        )}
        {(activePage === "Lead Gen" || activePage === "Deals") && subPage.type === "person" && (
          <PersonPage
            lead={subPage.lead}
            onBack={goBack}
            onBuyingGroupClick={openBuyingGroup}
          />
        )}
        {activePage !== "Lead Gen" && activePage !== "Deals" && activePage !== "Demo" && activePage !== "Library" && activePage !== "Dashboard" && (
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
