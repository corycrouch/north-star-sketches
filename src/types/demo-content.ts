export type DemoContentType = "video" | "tour" | "sandbox" | "document"

export interface DemoContentItem {
  type: DemoContentType
  name: string
}

export const DEMO_CONTENT_META: Record<
  DemoContentType,
  { icon: string; label: string }
> = {
  video: { icon: "videocam", label: "Video" },
  tour: { icon: "tour", label: "Tour" },
  document: { icon: "description", label: "SmartDoc" },
  sandbox: { icon: "code_blocks", label: "Sim" },
}
