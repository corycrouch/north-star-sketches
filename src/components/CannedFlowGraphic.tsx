import { CANNED_FLOW_NODES } from "@/data/canned-flow"
import "@/styles/canned-flow-graphic.scss"

interface CannedFlowGraphicProps {
  /** Smaller type + padding for demo page embed */
  compact?: boolean
  className?: string
}

export default function CannedFlowGraphic({ compact, className }: CannedFlowGraphicProps) {
  const a = CANNED_FLOW_NODES[0]
  const b = CANNED_FLOW_NODES[1]
  const c = CANNED_FLOW_NODES[2]

  const ax = a.x + a.w
  const ay = a.y + a.h / 2
  const bx0 = b.x
  const by = b.y + b.h / 2
  const bx1 = b.x + b.w
  const cx = c.x
  const cy = c.y + c.h / 2

  const edgeAB = `M ${ax} ${ay} C ${ax + 7} ${ay}, ${bx0 - 6} ${by}, ${bx0} ${by}`
  const edgeBC = `M ${bx1} ${by} C ${bx1 + 7} ${by}, ${cx - 6} ${cy}, ${cx} ${cy}`

  const rootClass = [
    "canned-flow-graphic",
    compact && "canned-flow-graphic--compact",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={rootClass} aria-hidden>
      <svg
        className="canned-flow-graphic__svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <path className="canned-flow-graphic__edge" d={edgeAB} />
        <path className="canned-flow-graphic__edge" d={edgeBC} />
        {CANNED_FLOW_NODES.map((n) => (
          <g key={n.id} className="canned-flow-graphic__node">
            <rect
              className="canned-flow-graphic__node-rect"
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx={1.6}
            />
            <text
              className="canned-flow-graphic__node-label"
              x={n.x + n.w / 2}
              y={n.y + n.h / 2}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
