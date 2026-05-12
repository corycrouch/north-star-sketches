import { useEffect, useState } from "react"
import type { Lead } from "@/data/leads"
import LeftNav from "@/components/LeftNav"
import TrackEngagement, {
  type AcquisitionTabId,
  type PipelineTabId,
} from "@/components/TrackEngagement"
import BuyingGroupPage from "@/components/BuyingGroupPage"
import PersonPage from "@/components/PersonPage"
import DemoPage from "@/components/DemoPage"
import FlowBuilderPage from "@/components/FlowBuilderPage"
import LibraryPage from "@/components/LibraryPage"
import DashboardPage from "@/components/DashboardPage"
import ClaudeBuyerPage from "@/components/ClaudeBuyerPage"
import DemoRoomPage from "@/components/DemoRoomPage"
import type { DemoRecord } from "@/data/demos"
import "@/styles/app.scss"

/**
 * Hash-based routes for standalone surfaces (pages that should NOT show
 * the main app's left nav — e.g. a prospective buyer's view of Claude
 * or the demo room they land on after clicking a demo link).
 */
const CLAUDE_BUYER_HASH = "#/claude-demo"
const DEMO_ROOM_HASH = "#/demo-room"

type SubPage =
  | { type: "none" }
  | { type: "buyingGroup"; name: string }
  | { type: "person"; lead: Lead }

/** Main-area surface: Marketing/Sales are driven by nav sub-items (e.g. Viewers, Buyers), not the accordion headers. */
type Workspace =
  | "Dashboard"
  | "Library"
  | "Demo"
  | "Analytics"
  | "Marketing"
  | "Sales"

function App() {
  const [route, setRoute] = useState<string>(() => window.location.hash)
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash)
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  const [workspace, setWorkspace] = useState<Workspace>("Dashboard")
  const [marketingTab, setMarketingTab] = useState<AcquisitionTabId>("viewers")
  const [salesTab, setSalesTab] = useState<PipelineTabId>("buyers")
  const [subPage, setSubPage] = useState<SubPage>({ type: "none" })
  const [demoName, setDemoName] = useState("")
  const [flowBuilder, setFlowBuilder] = useState<{ open: boolean; title: string }>({
    open: false,
    title: "",
  })
  const [demoHasFlowPreview, setDemoHasFlowPreview] = useState(false)
  /** Demo fake screen-recording: full viewport, no left nav (simulated shared tab). */
  const [demoFakeRecording, setDemoFakeRecording] = useState(false)

  function handleNavigate(page: string) {
    setSubPage({ type: "none" })
    if (page === "Dashboard") setWorkspace("Dashboard")
    else if (page === "Library") setWorkspace("Library")
    else if (page === "Analytics") setWorkspace("Analytics")
  }

  function handleCreateDemo() {
    setDemoName("Untitled Demo")
    setDemoHasFlowPreview(false)
    setWorkspace("Demo")
    setSubPage({ type: "none" })
  }

  function selectMarketingTab(id: AcquisitionTabId) {
    setMarketingTab(id)
    setWorkspace("Marketing")
    setSubPage({ type: "none" })
  }

  function selectSalesTab(id: PipelineTabId) {
    setSalesTab(id)
    setWorkspace("Sales")
    setSubPage({ type: "none" })
  }

  function openBuyingGroup(name: string) {
    setSubPage({ type: "buyingGroup", name })
  }

  function openPerson(lead: Lead) {
    setSubPage({ type: "person", lead })
  }

  function goBack() {
    if (workspace === "Demo") {
      setWorkspace("Library")
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
    setWorkspace("Demo")
  }

  if (route === DEMO_ROOM_HASH) {
    return <DemoRoomPage />
  }

  if (route === CLAUDE_BUYER_HASH) {
    return (
      <ClaudeBuyerPage
        onOpenFullDemo={() => {
          window.location.hash = DEMO_ROOM_HASH
        }}
      />
    )
  }

  if (flowBuilder.open) {
    return (
      <FlowBuilderPage demoTitle={flowBuilder.title} onClose={closeFlowBuilder} />
    )
  }

  return (
    <div
      className={`app-layout${demoFakeRecording ? " app-layout--demo-fake-recording" : ""}`}
    >
      {!demoFakeRecording && (
        <LeftNav
          workspace={workspace}
          onNavigate={handleNavigate}
          onCreateDemo={handleCreateDemo}
          marketingTab={marketingTab}
          salesTab={salesTab}
          onMarketingTabSelect={selectMarketingTab}
          onSalesTabSelect={selectSalesTab}
        />
      )}
      <main className="app-layout__content">
        {workspace === "Demo" && (
          <DemoPage
            initialName={demoName}
            onBack={goBack}
            onOpenFlowBuilder={openFlowBuilder}
            hasFlowPreview={demoHasFlowPreview}
            onClearFlowPreview={() => setDemoHasFlowPreview(false)}
            onFakeRecordingActiveChange={setDemoFakeRecording}
          />
        )}
        {workspace === "Library" && (
          <LibraryPage onOpenDemo={openDemoFromLibrary} onCreateDemo={handleCreateDemo} />
        )}
        {workspace === "Dashboard" && <DashboardPage />}
        {(workspace === "Marketing" || workspace === "Sales") && subPage.type === "none" && (
          <TrackEngagement
            view={workspace === "Marketing" ? "acquisition" : "pipeline"}
            acquisitionTab={marketingTab}
            pipelineTab={salesTab}
            onPersonClick={openPerson}
            onBuyingGroupClick={openBuyingGroup}
          />
        )}
        {(workspace === "Marketing" || workspace === "Sales") && subPage.type === "buyingGroup" && (
          <BuyingGroupPage
            groupName={subPage.name}
            onBack={goBack}
            onPersonClick={openPerson}
            backLabel={workspace === "Marketing" ? "Marketing" : "Sales"}
            rollupSubtitle={workspace === "Sales" ? "Account" : "Company"}
          />
        )}
        {(workspace === "Marketing" || workspace === "Sales") && subPage.type === "person" && (
          <PersonPage
            lead={subPage.lead}
            onBack={goBack}
            onBuyingGroupClick={openBuyingGroup}
            rollupFieldLabel={workspace === "Sales" ? "Account" : "Company"}
          />
        )}
        {workspace === "Analytics" && (
          <>
            <h1>Analytics</h1>
            <p>Start building your prototype here.</p>
          </>
        )}
      </main>
    </div>
  )
}

export default App
