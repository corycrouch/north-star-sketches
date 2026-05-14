export const CANNED_FLOW_NODES = [
  { id: "a", label: "Video", x: 8, y: 42, w: 18, h: 12 },
  { id: "b", label: "Tour", x: 41, y: 26, w: 18, h: 12 },
  { id: "c", label: "Book Call", x: 74, y: 42, w: 18, h: 12 },
] as const

function formatContentCount(label: string, count: number): string {
  if (count === 1) {
    return `1 ${label}`
  }
  if (label === "Book Call") {
    return `${count} Book Calls`
  }
  return `${count} ${label}s`
}

/** Counts by step label in flow order, e.g. "1 Video, 1 Tour, 1 Book Call". */
export function getCannedFlowContentSummary(): string {
  const order: string[] = []
  const seen = new Set<string>()
  const counts = new Map<string, number>()

  for (const n of CANNED_FLOW_NODES) {
    counts.set(n.label, (counts.get(n.label) ?? 0) + 1)
    if (!seen.has(n.label)) {
      seen.add(n.label)
      order.push(n.label)
    }
  }

  return order.map((label) => formatContentCount(label, counts.get(label)!)).join(", ")
}
