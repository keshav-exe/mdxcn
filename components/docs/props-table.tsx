import { GraphTable } from "@/components/graphs"
import type { PropRow } from "@/lib/docs/catalog"

const headers = ["Prop", "Type", "Default", "Description"] as const

function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <GraphTable align="left left left left" title="PROPS">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.type}</td>
              <td>{row.default ?? "—"}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GraphTable>
  )
}

export { PropsTable }
