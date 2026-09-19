import {
  col,
  colWidth,
  fillTrack,
  frameAscii,
  rule,
  wrapText,
} from "@/registry/default/graph-knap/frame"

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

const SPARK = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"] as const
const STACK = ["█", "▓", "▒", "░", "#", "=", "+", "-"] as const
const SHADE = ["·", "░", "▒", "▓", "█"] as const

function sparkGlyphs(data: number[]) {
  const max = Math.max(...data, 1)

  return data.map((value) => {
    const index = Math.round((value / max) * (SPARK.length - 1))
    return SPARK[index] ?? SPARK[0] ?? "▁"
  })
}

function asciiMeter({
  title,
  value,
  ticks = 14,
  caption,
}: {
  title: string
  value: number
  ticks?: number
  caption?: string
}) {
  const clamped = Math.min(1, Math.max(0, value))
  const filled = Math.round(clamped * ticks)
  const lines = [`[${fillTrack(filled, ticks)}]  ${Math.round(clamped * 100)}%`]

  if (caption) {
    lines.push(caption)
  }

  return frameAscii(title, lines)
}

function asciiRank({
  title,
  items,
  max,
  ticks = 20,
}: {
  title: string
  items: { label: string; value: number; display?: string }[]
  max?: number
  ticks?: number
}) {
  const peak = max ?? Math.max(...items.map((item) => item.value), 1)
  const labels = colWidth(items.map((item) => item.label))
  const values = items.map((item) =>
    item.display
      ? item.display
      : item.value.toLocaleString("en-US", {
          maximumFractionDigits: Number.isInteger(item.value) ? 0 : 1,
        })
  )
  const valueWidth = colWidth(values)

  return frameAscii(
    title,
    items.map((item, index) => {
      const filled = Math.min(
        ticks,
        Math.round((Math.max(item.value, 0) / peak) * ticks)
      )

      return `${col(item.label, labels)}  [${fillTrack(filled, ticks)}]  ${col(values[index] ?? "", valueWidth, "right")}`
    })
  )
}

function asciiSpark({
  title,
  data,
  caption,
}: {
  title: string
  data: number[]
  caption?: string
}) {
  const lines = [sparkGlyphs(data).join("")]
  if (caption) {
    lines.push(caption)
  }

  return frameAscii(title, lines)
}

function asciiBullet({
  title,
  items,
  ticks = 20,
}: {
  title: string
  items: {
    label: string
    value: number
    target?: number
    max?: number
    display?: string
  }[]
  ticks?: number
}) {
  const labels = colWidth(items.map((item) => item.label))
  const values = items.map((item) => {
    if (item.display) {
      return item.display
    }

    const value = item.value.toLocaleString("en-US", {
      maximumFractionDigits: Number.isInteger(item.value) ? 0 : 1,
    })

    if (item.target == null) {
      return value
    }

    const target = item.target.toLocaleString("en-US", {
      maximumFractionDigits: Number.isInteger(item.target) ? 0 : 1,
    })

    return `${value} / ${target}`
  })
  const valueWidth = colWidth(values)

  return frameAscii(
    title,
    items.map((item, index) => {
      const peak = item.max ?? Math.max(item.value, item.target ?? 0, 1)
      const filled = Math.min(
        ticks,
        Math.round((Math.max(item.value, 0) / peak) * ticks)
      )
      const mark =
        item.target == null
          ? null
          : Math.min(
              ticks - 1,
              Math.max(0, Math.round((Math.max(item.target, 0) / peak) * ticks))
            )
      const cells = Array.from({ length: ticks }, (_, cell) => {
        if (mark != null && cell === mark) {
          return "|"
        }

        return cell < filled ? "=" : "-"
      }).join("")

      return `${col(item.label, labels)}  [${cells}]  ${col(values[index] ?? "", valueWidth, "right")}`
    })
  )
}

function asciiStack({
  title,
  rows,
  ticks = 24,
}: {
  title: string
  rows: { label: string; segments: { label: string; value: number }[] }[]
  ticks?: number
  accent?: string
}) {
  const labels = colWidth(rows.map((row) => row.label))
  const legend: string[] = []

  for (const row of rows) {
    for (const segment of row.segments) {
      if (!legend.includes(segment.label)) {
        legend.push(segment.label)
      }
    }
  }

  const painted = rows.map((row) => {
    const total =
      row.segments.reduce((sum, segment) => sum + segment.value, 0) || 1
    let left = ticks

    const pieces = row.segments.map((segment, index) => {
      const raw = Math.round((segment.value / total) * ticks)
      const count =
        index === row.segments.length - 1
          ? Math.max(0, left)
          : Math.min(Math.max(0, raw), left)
      left -= count
      const glyph = STACK[legend.indexOf(segment.label) % STACK.length] ?? "█"

      return glyph.repeat(count)
    })

    return `${col(row.label, labels)}  ${pieces.join("")}`
  })

  const key = legend
    .map((label, index) => {
      const glyph = STACK[index % STACK.length] ?? "█"
      return `${glyph} ${label}`
    })
    .join("  ")

  return frameAscii(title, [...painted, "", key])
}

function asciiDiff({
  title,
  rows,
  footer,
}: {
  title: string
  rows: { label: string; value: string; sign?: "add" | "remove" | "keep" }[]
  footer?: { label: string; value: string; sign?: "add" | "remove" | "keep" }
}) {
  const all = footer ? [...rows, footer] : rows
  const labels = colWidth(all.map((row) => row.label))
  const values = colWidth(all.map((row) => row.value))

  function line(row: {
    label: string
    value: string
    sign?: "add" | "remove" | "keep"
  }) {
    const sign = row.sign === "add" ? "+" : row.sign === "remove" ? "-" : " "

    return `${sign} ${col(row.label, labels)}  ${col(row.value, values, "right")}`
  }

  const lines = rows.map(line)
  if (footer) {
    lines.push(rule(2 + labels + 2 + values), line(footer))
  }

  return frameAscii(title, lines)
}

function asciiTimeline({
  title,
  events,
}: {
  title: string
  events: {
    date: string
    label: string
    state?: "done" | "now" | "next"
  }[]
}) {
  const dates = colWidth(events.map((event) => event.date))
  const lines: string[] = []

  events.forEach((event, index) => {
    const mark = event.state === "next" ? "○" : "●"
    lines.push(`${mark}  ${col(event.date, dates)}  ${event.label}`)
    if (index < events.length - 1) {
      lines.push(`│`)
    }
  })

  return frameAscii(title, lines)
}

function cellText(value: string | boolean) {
  if (typeof value === "boolean") {
    return value ? "✓" : "–"
  }

  return value
}

function gridLines({
  headers,
  rows,
  footer,
  align,
}: {
  headers: string[]
  rows: string[][]
  footer?: string[]
  align?: ("left" | "right")[]
}) {
  const all = [headers, ...rows, ...(footer ? [footer] : [])]
  const count = Math.max(1, ...all.map((row) => row.length))
  const widths = Array.from({ length: count }, (_, index) =>
    colWidth(all.map((row) => row[index] ?? ""))
  )

  function side(index: number): "left" | "right" {
    return align?.[index] ?? (index === 0 ? "left" : "right")
  }

  function cells(row: string[]) {
    return Array.from({ length: count }, (_, index) =>
      col(row[index] ?? "", widths[index] ?? 0, side(index))
    ).join(" | ")
  }

  function ruleLine() {
    return widths.map((width) => rule(width)).join("-+-")
  }

  const lines = [cells(headers), ruleLine(), ...rows.map(cells)]
  if (footer) {
    lines.push(ruleLine(), cells(footer))
  }

  return { lines, cells, ruleLine }
}

function asciiCompare({
  title,
  columns,
  rows,
}: {
  title: string
  columns: string[]
  rows: { label: string; values: (string | boolean)[] }[]
}) {
  return frameAscii(
    title,
    gridLines({
      headers: ["", ...columns],
      rows: rows.map((row) => [
        row.label,
        ...row.values.map((value) => cellText(value)),
      ]),
      align: ["left", ...columns.map(() => "right" as const)],
    }).lines
  )
}

function asciiMatrix({
  title,
  columns,
  rows,
}: {
  title: string
  columns: string[]
  rows: { label: string; values: (number | string)[] }[]
}) {
  return asciiCompare({
    title,
    columns,
    rows: rows.map((row) => ({
      label: row.label,
      values: row.values.map((value) =>
        typeof value === "number"
          ? value.toLocaleString("en-US", {
              maximumFractionDigits: Number.isInteger(value) ? 0 : 1,
            })
          : value
      ),
    })),
  })
}

function asciiTable({
  title,
  headers,
  rows,
  footer,
  align,
}: {
  title: string
  headers: string[]
  rows: string[][]
  footer?: string[]
  align?: ("left" | "right")[]
}) {
  return frameAscii(title, gridLines({ headers, rows, footer, align }).lines)
}

function asciiSheet({
  title,
  headers,
  sections,
  footer,
  align,
}: {
  title: string
  headers: string[]
  sections: { title: string; rows: string[][] }[]
  footer?: string[]
  align?: ("left" | "right")[]
}) {
  const grid = gridLines({
    headers,
    rows: sections.flatMap((section) => section.rows),
    footer,
    align,
  })
  const lines = [grid.cells(headers), grid.ruleLine()]

  sections.forEach((section, index) => {
    if (index > 0) {
      lines.push(grid.ruleLine())
    }
    lines.push(section.title)
    lines.push(...section.rows.map(grid.cells))
  })

  if (footer) {
    lines.push(grid.ruleLine(), grid.cells(footer))
  }

  return frameAscii(title, lines)
}

function asciiCheck({
  title,
  items,
}: {
  title: string
  items: { label: string; done?: boolean; note?: string }[]
}) {
  const labels = colWidth(items.map((item) => item.label))

  return frameAscii(
    title,
    items.map((item) => {
      const mark = item.done ? "[x]" : "[ ]"
      const note = item.note ? `  ${item.note}` : ""

      return `${mark}  ${col(item.label, labels)}${note}`
    })
  )
}

function asciiStat({
  title,
  items,
}: {
  title: string
  items: { value: string; label: string; hint?: string }[]
}) {
  const widths = items.map((item) =>
    Math.max(item.value.length, item.label.length, item.hint?.length ?? 0)
  )
  const values = items
    .map((item, index) => col(item.value, widths[index] ?? 0))
    .join("   ")
  const labels = items
    .map((item, index) => col(item.label, widths[index] ?? 0))
    .join("   ")
  const hints = items.some((item) => item.hint)
    ? items
        .map((item, index) => col(item.hint ?? "", widths[index] ?? 0))
        .join("   ")
    : null

  return frameAscii(title, hints ? [values, labels, hints] : [values, labels])
}

function asciiKpi({
  title,
  value,
  label,
  hint,
  data,
}: {
  title: string
  value: string
  label: string
  hint?: string
  data: number[]
}) {
  const meta = hint ? `${label}  ${hint}` : label

  return frameAscii(title, [value, meta, sparkGlyphs(data).join("")])
}

function asciiSpec({
  title,
  rows,
}: {
  title: string
  rows: { label: string; value: string }[]
}) {
  const labels = colWidth(rows.map((row) => row.label))

  return frameAscii(
    title,
    rows.map((row) => `${col(row.label, labels)}  ${row.value}`)
  )
}

function asciiFunnel({
  title,
  steps,
  ticks = 20,
}: {
  title: string
  steps: { label: string; value: number; display?: string }[]
  ticks?: number
}) {
  const max = Math.max(...steps.map((step) => step.value), 1)
  const head = steps[0]?.value || 1
  const labels = colWidth(steps.map((step) => step.label))
  const amounts = steps.map(
    (step) => step.display ?? step.value.toLocaleString()
  )
  const amountWidth = colWidth(amounts)

  return frameAscii(
    title,
    steps.map((step, index) => {
      const width = Math.max(1, Math.round((step.value / max) * ticks))
      const percent = Math.round((step.value / head) * 100)
      const share = index === 0 ? "    " : col(`${percent}%`, 4, "right")

      return `${col(step.label, labels)}  ${fillTrack(width, ticks, "█", "-")}  ${col(amounts[index] ?? "", amountWidth, "right")}  ${share}`
    })
  )
}

type WaterfallKind = "start" | "in" | "out" | "end"

function asciiWaterfall({
  title,
  items,
  ticks = 24,
}: {
  title: string
  items: {
    label: string
    value: number
    display?: string
    kind?: WaterfallKind
  }[]
  ticks?: number
}) {
  function resolveKind(
    item: (typeof items)[number],
    index: number
  ): WaterfallKind {
    if (item.kind) {
      return item.kind
    }

    if (index === 0) {
      return "start"
    }

    if (index === items.length - 1) {
      return "end"
    }

    return item.value >= 0 ? "in" : "out"
  }

  function formatValue(item: (typeof items)[number], kind: WaterfallKind) {
    if (item.display) {
      return item.display
    }

    const absolute = Math.abs(item.value)

    if (kind === "in") {
      return `+${absolute.toLocaleString("en-US")}`
    }

    if (kind === "out") {
      return `−${absolute.toLocaleString("en-US")}`
    }

    return item.value.toLocaleString("en-US")
  }

  let run = 0
  const segments = items.map((entry, index) => {
    const kind = resolveKind(entry, index)
    const magnitude = Math.abs(entry.value)

    if (kind === "start") {
      const from = 0
      const to = entry.value
      run = entry.value
      return { ...entry, kind, from, to }
    }

    if (kind === "in") {
      const from = run
      const to = run + magnitude
      run = to
      return { ...entry, kind, from, to }
    }

    if (kind === "out") {
      const to = run
      const from = run - magnitude
      run = from
      return { ...entry, kind, from, to }
    }

    const total = entry.value
    run = total
    return { ...entry, kind, from: 0, to: total }
  })
  const lows = segments.map((segment) => Math.min(segment.from, segment.to))
  const highs = segments.map((segment) => Math.max(segment.from, segment.to))
  const low = Math.min(0, ...lows)
  const high = Math.max(1, ...highs)
  const span = high - low || 1

  function column(value: number) {
    return Math.round(((value - low) / span) * ticks)
  }

  const labels = colWidth(segments.map((segment) => segment.label))
  const amounts = segments.map((segment) => formatValue(segment, segment.kind))
  const amountWidth = colWidth(amounts)
  const lines: string[] = []

  segments.forEach((segment, index) => {
    const start = Math.min(column(segment.from), column(segment.to))
    const end = Math.max(column(segment.from), column(segment.to), start + 1)
    const bar = Array.from({ length: ticks }, (_, cell) =>
      cell >= start && cell < end ? "█" : "-"
    ).join("")

    if (segment.kind === "end" && index > 0) {
      lines.push(rule(labels + 2 + ticks + 2 + amountWidth))
    }

    lines.push(
      `${col(segment.label, labels)}  ${bar}  ${col(amounts[index] ?? "", amountWidth, "right")}`
    )
  })

  return frameAscii(title, lines)
}

function asciiUptime({
  title,
  days,
  from,
  to,
  columns = 30,
}: {
  title: string
  days: ("ok" | "degraded" | "down" | "empty")[]
  from?: string
  to?: string
  columns?: number
}) {
  const mark = {
    ok: SHADE[4] ?? "█",
    degraded: SHADE[2] ?? "▒",
    down: SHADE[0] ?? "·",
    empty: "-",
  } as const
  const cols = Math.max(1, columns)
  const rows: string[] = []

  for (let index = 0; index < days.length; index += cols) {
    rows.push(
      days
        .slice(index, index + cols)
        .map((day) => mark[day])
        .join("")
    )
  }

  const known = days.filter((day) => day !== "empty")
  const ok = known.filter((day) => day === "ok").length
  const percent = known.length === 0 ? 0 : Math.round((ok / known.length) * 100)
  const range = [from, to].filter(Boolean).join("  ")
  const meta = range ? `${percent}%  ${range}` : `${percent}%`

  return frameAscii(title, [
    ...rows,
    meta,
    `${mark.ok} up  ${mark.degraded} slow  ${mark.down} down`,
  ])
}

function asciiCells({
  title,
  items,
}: {
  title: string
  items: { label: string; cells: number[][] }[]
}) {
  const grids = items.map((item) => {
    const body = item.cells.map((row) =>
      row.map((cell) => (cell === 1 ? "█" : "·")).join(" ")
    )
    const width = colWidth([...body, item.label])

    return {
      lines: [...body, col(item.label, width)],
      width,
    }
  })
  const height = Math.max(...grids.map((grid) => grid.lines.length))
  const gap = "   "
  const lines = Array.from({ length: height }, (_, row) =>
    grids.map((grid) => col(grid.lines[row] ?? "", grid.width)).join(gap)
  )

  return frameAscii(title, lines)
}

function asciiWaffle({
  title,
  value,
  cells = 100,
  columns = 10,
  caption,
}: {
  title: string
  value: number
  cells?: number
  columns?: number
  caption?: string
}) {
  const clamped = Math.min(1, Math.max(0, value))
  const filled = Math.round(clamped * cells)
  const rows = Math.ceil(cells / columns)
  const lines: string[] = []

  for (let row = 0; row < rows; row++) {
    const glyphs: string[] = []
    for (let column = 0; column < columns; column++) {
      const index = row * columns + column
      if (index >= cells) {
        glyphs.push(" ")
      } else {
        glyphs.push(index < filled ? "█" : "░")
      }
    }
    lines.push(glyphs.join(" "))
  }

  lines.push(`${Math.round(clamped * 100)}%`)
  if (caption) {
    lines.push(caption)
  }

  return frameAscii(title, lines)
}

function asciiSlope({
  title,
  fromLabel,
  toLabel,
  items,
}: {
  title: string
  fromLabel: string
  toLabel: string
  items: { label: string; from: number; to: number }[]
}) {
  function format(value: number) {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: Number.isInteger(value) ? 0 : 1,
    })
  }

  const labels = colWidth(items.map((item) => item.label))
  const froms = colWidth([fromLabel, ...items.map((item) => format(item.from))])
  const tos = colWidth([toLabel, ...items.map((item) => format(item.to))])
  const header = `${col("", labels)}  ${col(fromLabel, froms, "right")}  ${col("", 1)}  ${col(toLabel, tos, "right")}`
  const body = items.map((item) => {
    const arrow = item.to === item.from ? "–" : "→"

    return `${col(item.label, labels)}  ${col(format(item.from), froms, "right")}  ${arrow}  ${col(format(item.to), tos, "right")}`
  })

  return frameAscii(title, [header, ...body])
}

type TreeNode = {
  label: string
  meta?: string
  accent?: boolean
  children?: TreeNode[]
}

function flattenTree(
  nodes: TreeNode[],
  prefix = "",
  isRoot = true
): { branch: string; label: string; meta?: string }[] {
  const singleRoot = isRoot && nodes.length === 1

  return nodes.flatMap((node, index) => {
    const last = index === nodes.length - 1
    const branch = singleRoot ? "" : prefix + (last ? "└─ " : "├─ ")
    const childPrefix = singleRoot ? "" : prefix + (last ? "   " : "│  ")
    const row = { branch, label: node.label, meta: node.meta }
    const kids = node.children
      ? flattenTree(node.children, childPrefix, false)
      : []

    return [row, ...kids]
  })
}

function asciiTree({ title, nodes }: { title: string; nodes: TreeNode[] }) {
  const rows = flattenTree(nodes)
  const left = colWidth(rows.map((row) => `${row.branch}${row.label}`))
  const hasMeta = rows.some((row) => row.meta)

  return frameAscii(
    title,
    rows.map((row) => {
      const name = `${row.branch}${row.label}`
      if (!hasMeta) {
        return name
      }

      return `${col(name, left)}  ${row.meta ?? ""}`
    })
  )
}

function asciiGantt({
  title,
  items,
  ticks,
  columns = 24,
  progress,
}: {
  title: string
  items: {
    label: string
    start: number
    end: number
    complete?: number
  }[]
  ticks?: string[]
  columns?: number
  progress?: number
}) {
  const labels = colWidth(items.map((item) => item.label))
  const lines: string[] = []

  if (progress != null) {
    const playhead = Math.round(clamp01(progress) * (columns - 1))
    const head = Array.from({ length: columns }, (_, index) =>
      index === playhead ? "▾" : " "
    ).join("")
    lines.push(`${col("", labels)}  ${head}`)
  }

  for (const item of items) {
    const start = Math.round(clamp01(item.start) * columns)
    const end = Math.max(start + 1, Math.round(clamp01(item.end) * columns))
    const span = end - start
    const done = Math.round(clamp01(item.complete ?? 1) * span)
    const bar = Array.from({ length: columns }, (_, index) => {
      const inBar = index >= start && index < end
      const filled = inBar && index < start + done
      const rest = inBar && !filled

      if (filled) {
        return "█"
      }

      if (rest) {
        return "░"
      }

      return "-"
    }).join("")

    lines.push(`${col(item.label, labels)}  ${bar}`)
  }

  if (ticks && ticks.length > 0) {
    const track = columns
    const placed = ticks.map((tick, index) => {
      const slot =
        ticks.length === 1
          ? 0
          : Math.round((index / (ticks.length - 1)) * (track - tick.length))

      return { tick, slot: Math.max(0, Math.min(track - tick.length, slot)) }
    })
    const axis = Array.from({ length: track }, () => " ")
    for (const item of placed) {
      for (let index = 0; index < item.tick.length; index++) {
        axis[item.slot + index] = item.tick[index] ?? " "
      }
    }
    lines.push(`${col("", labels)}  ${axis.join("")}`)
  }

  return frameAscii(title, lines)
}

function asciiInvoice({
  title,
  from,
  to,
  meta,
  items,
  totals,
  note,
}: {
  title: string
  from?: { name: string; lines?: string[] }
  to?: { name: string; lines?: string[] }
  meta?: { label: string; value: string }[]
  items: {
    description: string
    qty?: string
    rate?: string
    amount: string
  }[]
  totals?: { label: string; value: string }[]
  note?: string
}) {
  const lines: string[] = []

  if (from || to) {
    const fromLines = from ? ["FROM", from.name, ...(from.lines ?? [])] : []
    const toLines = to ? ["BILL TO", to.name, ...(to.lines ?? [])] : []
    const leftW = colWidth(fromLines)
    const height = Math.max(fromLines.length, toLines.length)

    for (let index = 0; index < height; index++) {
      lines.push(
        `${col(fromLines[index] ?? "", leftW)}    ${toLines[index] ?? ""}`
      )
    }

    lines.push("")
  }

  if (meta && meta.length > 0) {
    const labels = meta.map((entry) => entry.label)
    const values = meta.map((entry) => entry.value)
    const widths = meta.map((entry, index) =>
      Math.max(entry.label.length, values[index]?.length ?? 0)
    )
    lines.push(
      labels.map((label, index) => col(label, widths[index] ?? 0)).join("  ")
    )
    lines.push(
      values.map((value, index) => col(value, widths[index] ?? 0)).join("  ")
    )
    lines.push("")
  }

  const showQty = items.some((item) => item.qty != null)
  const showRate = items.some((item) => item.rate != null)
  const headers = [
    "Description",
    ...(showQty ? ["Qty"] : []),
    ...(showRate ? ["Rate"] : []),
    "Amount",
  ]
  const grid = gridLines({
    headers,
    rows: items.map((item) => [
      item.description,
      ...(showQty ? [item.qty ?? ""] : []),
      ...(showRate ? [item.rate ?? ""] : []),
      item.amount,
    ]),
  })
  lines.push(...grid.lines)

  if (totals && totals.length > 0) {
    const totalWidth = colWidth(totals.map((entry) => entry.label))
    const amountWidth = colWidth(totals.map((entry) => entry.value))
    const block = totals.map(
      (entry) =>
        `${col(entry.label, totalWidth)}  ${col(entry.value, amountWidth, "right")}`
    )
    const span = grid.cells(headers).length
    const indent = Math.max(0, span - (block[0]?.length ?? 0))
    lines.push(grid.ruleLine())
    for (const line of block) {
      lines.push(`${" ".repeat(indent)}${line}`)
    }
  }

  if (note) {
    lines.push("", note)
  }

  return frameAscii(title, lines)
}

function miniBars(values: number[], height: number, fill = "█") {
  const max = Math.max(...values, 1)
  const rows: string[] = []

  for (let row = 0; row < height; row++) {
    const fromTop = row
    const glyphs = values.map((value) => {
      const level = Math.round((value / max) * (height - 1))
      const fromBottom = height - 1 - fromTop

      return fromBottom <= level ? fill : " "
    })
    rows.push(glyphs.join(" "))
  }

  return rows
}

function asciiBars({
  title,
  from,
  to,
  processor,
}: {
  title: string
  from: { label: string; values: number[]; size?: "sm" | "lg" }
  to: { label: string; values: number[]; size?: "sm" | "lg" }
  processor?: string
}) {
  const fromHeight = from.size === "lg" ? 8 : 5
  const toHeight = to.size === "lg" ? 8 : 5
  const left = miniBars(from.values, fromHeight)
  const right = miniBars(to.values, toHeight)
  const leftW = colWidth([...left, from.label])
  const rightW = colWidth([...right, to.label])
  const height = Math.max(fromHeight, toHeight)
  const arrow = processor ? `--> ${processor} -->` : "-->"
  const lines: string[] = []

  for (let row = 0; row < height; row++) {
    const fromRow = left[row + (height - fromHeight)] ?? col("", leftW)
    const toRow = right[row + (height - toHeight)] ?? col("", rightW)
    const mid = row === height - 1 ? arrow : " ".repeat(arrow.length)
    lines.push(`${col(fromRow, leftW)}  ${mid}  ${col(toRow, rightW)}`)
  }

  lines.push(
    `${col(from.label, leftW)}  ${" ".repeat(arrow.length)}  ${col(to.label, rightW)}`
  )

  return frameAscii(title, lines)
}

const CALLOUT_GLYPH: Record<string, string> = {
  note: "i",
  tip: "+",
  warning: "!",
  danger: "×",
}

function asciiCallout({
  type = "note",
  title,
  body,
}: {
  type?: string
  title?: string
  body: string
}) {
  const glyph = CALLOUT_GLYPH[type] ?? "i"
  const lines = body.split(/\n/).flatMap((line) => wrapText(line, 56))
  const drawn =
    lines.length === 0
      ? [`${glyph}`]
      : lines.map((line, index) =>
          index === 0 ? `${glyph}  ${line}` : `   ${line}`
        )

  return frameAscii(title ?? type, drawn)
}

function asciiQuote({
  title,
  by,
  source,
  body,
}: {
  title?: string
  by?: string
  source?: string
  body: string
}) {
  const wrapped = wrapText(body.replace(/\s+/g, " ").trim(), 54)
  const lines =
    wrapped.length === 0
      ? ["“"]
      : wrapped.map((line, index) =>
          index === 0 ? `“  ${line}` : `   ${line}`
        )

  if (by || source) {
    lines.push("")
    lines.push(`—  ${[by, source].filter(Boolean).join("  ")}`)
  }

  return frameAscii(title, lines)
}

function asciiSteps({
  title,
  steps,
}: {
  title?: string
  steps: { title: string; body?: string }[]
}) {
  const lines: string[] = []

  steps.forEach((step, index) => {
    const n = String(index + 1)
    const head = wrapText(step.title, 54)
    lines.push(`${n}  ${head[0] ?? ""}`)
    head.slice(1).forEach((line) => lines.push(`   ${line}`))
    if (step.body) {
      wrapText(step.body, 54).forEach((line) => lines.push(`   ${line}`))
    }
    if (index < steps.length - 1) {
      lines.push("│")
    }
  })

  return frameAscii(title ?? "STEPS", lines)
}

function asciiTerminal({ title, lines }: { title?: string; lines: string[] }) {
  return frameAscii(title ?? "SHELL", lines.length > 0 ? lines : [""])
}

function asciiChangelog({
  title,
  version,
  date,
  items,
}: {
  title?: string
  version?: string
  date?: string
  items: { type: string; text: string }[]
}) {
  const glyph: Record<string, string> = {
    add: "+",
    change: "~",
    fix: "*",
    remove: "-",
  }
  const label: Record<string, string> = {
    add: "added",
    change: "changed",
    fix: "fixed",
    remove: "removed",
  }
  const kinds = colWidth(items.map((item) => label[item.type] ?? item.type))
  const drawn: string[] = []

  if (version || date) {
    drawn.push([version, date].filter(Boolean).join("  "))
    drawn.push("")
  }

  for (const item of items) {
    const mark = glyph[item.type] ?? "-"
    const kind = col(label[item.type] ?? item.type, kinds)
    const wrapped = wrapText(item.text, 48)
    drawn.push(`${mark}  ${kind}  ${wrapped[0] ?? ""}`)
    wrapped
      .slice(1)
      .forEach((line) => drawn.push(`      ${" ".repeat(kinds)}${line}`))
  }

  return frameAscii(title ?? version ?? "CHANGELOG", drawn)
}

function asciiFlow({ title, rows }: { title: string; rows: string[] }) {
  return frameAscii(title, rows.length > 0 ? rows : [""])
}

export {
  asciiBars,
  asciiBullet,
  asciiCallout,
  asciiCells,
  asciiChangelog,
  asciiCheck,
  asciiCompare,
  asciiDiff,
  asciiFlow,
  asciiFunnel,
  asciiGantt,
  asciiInvoice,
  asciiKpi,
  asciiMatrix,
  asciiMeter,
  asciiQuote,
  asciiRank,
  asciiSheet,
  asciiSlope,
  asciiSpark,
  asciiSpec,
  asciiStack,
  asciiStat,
  asciiSteps,
  asciiTable,
  asciiTerminal,
  asciiTimeline,
  asciiTree,
  asciiUptime,
  asciiWaffle,
  asciiWaterfall,
}
