import { useMemo } from "react"
import type { ReactNode } from "react"
import DropdownButton from "@/components/DropdownButton"
import "@/styles/grouped-table.scss"

interface FieldOption {
  key: string
  label: string
}

export interface GroupedTableColumn<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
}

interface GroupedTableProps<T> {
  columns: GroupedTableColumn<T>[]
  data: T[]
  sortBy: string | null
  groupBy: string | null
  onSortChange: (key: string | null) => void
  onGroupChange: (key: string | null) => void
  sortOptions: FieldOption[]
  groupOptions: FieldOption[]
  getSortValue: (row: T, field: string) => string | number
  getGroupValue: (row: T, field: string) => string
  onGroupHeaderClick?: (label: string) => void
  filterCount?: number
}

export default function GroupedTable<T>({
  columns,
  data,
  sortBy,
  groupBy,
  onSortChange,
  onGroupChange,
  sortOptions,
  groupOptions,
  getSortValue,
  getGroupValue,
  onGroupHeaderClick,
  filterCount = 0,
}: GroupedTableProps<T>) {
  /** First option = flat list (no group headers); second = group by that field key. */
  const flatViewKey = groupOptions[0]?.key ?? "individual"
  const groupedFieldKey = groupOptions[1]?.key ?? "company"

  const processed = useMemo(() => {
    let rows = [...data]

    if (sortBy) {
      rows.sort((a, b) => {
        const aVal = getSortValue(a, sortBy)
        const bVal = getSortValue(b, sortBy)
        if (typeof aVal === "number" && typeof bVal === "number") return bVal - aVal
        return String(aVal).localeCompare(String(bVal))
      })
    }

    if (!groupBy) {
      return [{ label: null, rows }] as { label: string | null; rows: T[] }[]
    }

    const groupMap = new Map<string, T[]>()
    for (const row of rows) {
      const key = getGroupValue(row, groupBy)
      if (!groupMap.has(key)) groupMap.set(key, [])
      groupMap.get(key)!.push(row)
    }

    const groups = Array.from(groupMap.entries()).map(([label, groupRows]) => ({
      label,
      rows: groupRows,
    }))

    const isNumericSort = sortBy && typeof getSortValue(groups[0]?.rows[0], sortBy) === "number"

    if (isNumericSort) {
      groups.sort((a, b) => {
        const aTop = getSortValue(a.rows[0], sortBy) as number
        const bTop = getSortValue(b.rows[0], sortBy) as number
        return bTop - aTop
      })
    } else {
      groups.sort((a, b) => a.label.localeCompare(b.label))
    }

    return groups
  }, [data, sortBy, groupBy, getSortValue, getGroupValue])

  return (
    <div className="grouped-table">
      <div className="grouped-table__controls">
        <button className="grouped-table__filter-btn">
          <span className="material-symbols-outlined grouped-table__fake-btn-icon">filter_alt</span>
          Filtered by
          {filterCount > 0 && (
            <span className="grouped-table__filter-badge">{filterCount}</span>
          )}
        </button>
        <span className="grouped-table__divider" />
        <button className="grouped-table__fake-btn">
          <span className="material-symbols-outlined grouped-table__fake-btn-icon">business</span>
          Account
        </button>
        <button className="grouped-table__fake-btn">
          <span className="material-symbols-outlined grouped-table__fake-btn-icon">work</span>
          Role
        </button>
        <button className="grouped-table__fake-btn">
          <span className="material-symbols-outlined grouped-table__fake-btn-icon">view_column</span>
          Columns
        </button>
        <DropdownButton
          icon="format_line_spacing"
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
        />
        <DropdownButton
          icon={groupBy === groupedFieldKey ? "workspaces" : "person"}
          label="View by"
          options={groupOptions}
          value={groupBy ? groupedFieldKey : flatViewKey}
          onChange={(key) => onGroupChange(key === flatViewKey ? null : key)}
          allowDeselect={false}
        />
        <div className="grouped-table__search">
          <span className="material-symbols-outlined grouped-table__search-icon">search</span>
          <input className="grouped-table__search-input" type="text" placeholder="Search…" />
        </div>
      </div>

      <table className="sketch-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processed.map((group, gi) => (
            <GroupSection key={group.label ?? gi} group={group} columns={columns} onGroupHeaderClick={onGroupHeaderClick} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function GroupSection<T>({ group, columns, onGroupHeaderClick }: {
  group: { label: string | null; rows: T[] }
  columns: GroupedTableColumn<T>[]
  onGroupHeaderClick?: (label: string) => void
}) {
  return (
    <>
      {group.label && (
        <>
          <tr className="grouped-table__group-header-spacer">
            <td colSpan={columns.length} />
          </tr>
          <tr className="grouped-table__group-header">
            <td colSpan={columns.length}>
              <span className="grouped-table__group-header-content">
                {group.label}
                {onGroupHeaderClick && (
                  <a
                    className="grouped-table__view-details"
                    href="#"
                    onClick={(e) => { e.preventDefault(); onGroupHeaderClick(group.label!) }}
                  >
                    View Details
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </a>
                )}
              </span>
            </td>
          </tr>
        </>
      )}
      {group.rows.map((row, i) => (
        <tr key={i} className={group.label ? "grouped-table__group-row" : ""}>
          {columns.map((col) => (
            <td key={col.key}>{col.render(row)}</td>
          ))}
        </tr>
      ))}
    </>
  )
}
