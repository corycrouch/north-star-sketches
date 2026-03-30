import type { ReactNode } from "react"
import "@/styles/sketch-table.scss"

export interface Column<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
}

interface SketchTableProps<T> {
  columns: Column<T>[]
  data: T[]
}

export default function SketchTable<T>({ columns, data }: SketchTableProps<T>) {
  return (
    <table className="sketch-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={col.key}>{col.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
