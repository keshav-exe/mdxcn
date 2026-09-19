import { fence } from "@/registry/default/graph-knap/frame"
import {
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
} from "@/registry/default/graph-knap/graphs"

/**
 * The docs `.mdx` tab. A fenced ASCII drawing of the component — frame,
 * `[ TITLE ]`, glyphs — so Notion / Linear / a README render the figure
 * without our runtime.
 */
export function toMdxCopy(source: string) {
  return fence(toAscii(source))
}

export function toAscii(source: string) {
  const tag = parseSource(source)
  if (!tag) {
    return source.trim()
  }

  const props = parseAttrs(tag.attrs)
  const body = unwrapFence(tag.body ?? "")
  const title = props.title
  const drawn = draw(tag.name, props, body, title)

  return drawn
}

function parseSource(source: string) {
  let text = source
    .replace(/^(?:import[\s\S]*?from\s+["'][^"']+["']\s*\n+)+/, "")
    .trim()
  const jsxAt = text.search(/<[A-Z][A-Za-z0-9]*/)
  if (jsxAt > 0) {
    text = text.slice(jsxAt).trim()
  }

  return splitTag(text)
}

function splitTag(source: string): {
  name: string
  attrs: string
  body: string | null
} | null {
  const open = source.match(/^<([A-Z][A-Za-z0-9]*)\b([\s\S]*?)(\/>|>)/)
  if (!open || !open[1]) {
    return null
  }

  const name = open[1]
  const attrs = open[2] ?? ""
  if (open[3] === "/>") {
    return { name, attrs, body: null }
  }

  const close = source.lastIndexOf(`</${name}>`)
  if (close === -1) {
    return { name, attrs, body: null }
  }

  return {
    name,
    attrs,
    body: source.slice(open[0].length, close),
  }
}

function parseAttrs(raw: string): Record<string, string> {
  const props: Record<string, string> = {}
  const pattern =
    /([A-Za-z_][\w-]*)(?:\s*=\s*("[^"]*"|'[^']*'|\{[\s\S]*?\}|[^\s{>/]+))?/g

  for (const match of raw.matchAll(pattern)) {
    const key = match[1]
    if (!key) {
      continue
    }
    props[key] = match[2] ? jsValue(match[2]) : "true"
  }

  return props
}

function jsValue(raw: string): string {
  const text = raw.trim()
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    return text.slice(1, -1)
  }

  if (text.startsWith("{") && text.endsWith("}")) {
    const inner = text.slice(1, -1).trim()
    if (inner.startsWith("[")) {
      return inner
        .replace(/[\[\]{}]/g, " ")
        .replace(/,/g, " ")
        .replace(/["']/g, "")
        .replace(/\s+/g, " ")
        .trim()
    }
    if (inner.includes("(")) {
      return ""
    }
    return jsValue(inner)
  }

  return text
}

function unwrapFence(body: string) {
  return body
    .trim()
    .replace(/^```(?:\w*)\n?/, "")
    .replace(/\n?```$/, "")
    .trim()
}

function marks(text: string) {
  const trimmed = text.trim()
  const strong = /^\*\*[\s\S]*\*\*$/.test(trimmed)
  const em = !strong && /^\*[\s\S]*\*$/.test(trimmed)
  return {
    text: trimmed.replace(/^\*+|\*+$/g, "").trim(),
    strong,
    em,
  }
}

type Bullet = {
  indent: number
  text: string
  strong: boolean
  em: boolean
}

function bullets(body: string): Bullet[] {
  const items: Bullet[] = []

  for (const line of body.split("\n")) {
    const match = line.match(/^(\s*)[-*]\s+(.*)$/)
    if (!match) {
      continue
    }
    items.push({ indent: (match[1] ?? "").length, ...marks(match[2] ?? "") })
  }

  return items
}

function nest(items: Bullet[]) {
  type Node = {
    label: string
    meta?: string
    accent?: boolean
    children?: Node[]
  }

  const root: Node[] = []
  const stack: { indent: number; children: Node[] }[] = [
    { indent: -1, children: root },
  ]

  for (const item of items) {
    while (stack.length > 1 && item.indent <= (stack.at(-1)?.indent ?? 0)) {
      stack.pop()
    }
    const [label, meta] = item.text.split(/\s+[—–]\s+/)
    const node: Node = {
      label: label || item.text,
      meta,
      accent: item.strong,
      children: [],
    }
    stack.at(-1)?.children.push(node)
    stack.push({ indent: item.indent, children: node.children ?? [] })
  }

  const clean = (nodes: Node[]): Node[] =>
    nodes.map((node) => ({
      ...node,
      children:
        node.children && node.children.length > 0
          ? clean(node.children)
          : undefined,
    }))

  return clean(root)
}

function splitLabel(text: string) {
  const match = text.match(/^(.+?):\s+(.+)$/)
  if (!match) {
    return { label: text, rest: "" }
  }
  return { label: (match[1] ?? text).trim(), rest: (match[2] ?? "").trim() }
}

function firstToken(text: string) {
  const match = text.match(/^(\S+)\s*(.*)$/)
  return { token: match?.[1] ?? text, rest: match?.[2] ?? "" }
}

function numbers(value: string | undefined) {
  if (!value) {
    return []
  }
  return value
    .split(/[\s,]+/)
    .filter(Boolean)
    .map(Number)
    .filter((entry) => Number.isFinite(entry))
}

function fraction(value: string | undefined, fallback = 0) {
  if (!value) {
    return fallback
  }
  const text = value.trim()
  const percent = text.endsWith("%")
  const parsed = Number.parseFloat(text)
  if (!Number.isFinite(parsed)) {
    return fallback
  }
  return percent ? parsed / 100 : parsed
}

function isSeparator(line: string) {
  return /^\s*\|[\s:|-]+\|\s*$/.test(line)
}

function splitRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim())
}

function parseGfm(body: string) {
  const rows = body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"))
  if (rows.length < 2) {
    return null
  }

  const sep = rows.find(isSeparator)
  const data = rows.filter((row) => !isSeparator(row)).map(splitRow)
  const headers = data[0]
  if (!headers) {
    return null
  }

  const align = sep
    ? splitRow(sep).map((cell) =>
        cell.endsWith(":") && !cell.startsWith(":") ? "right" : "left"
      )
    : undefined
  const rest = data.slice(1)
  const last = rest.at(-1)
  const footer = last && /^total$/i.test(last[0] ?? "") ? rest.pop() : undefined

  return { headers, rows: rest, footer, align }
}

function parseLabeled(body: string) {
  const table = parseGfm(body)
  if (!table || table.headers.length < 2) {
    return null
  }
  const labeled =
    table.headers[0] === "" ||
    table.headers[0] === "—" ||
    table.headers[0] === "-"
  const columns = labeled ? table.headers.slice(1) : table.headers
  const rows = table.rows.map((row) => ({
    label: labeled ? (row[0] ?? "") : (row[0] ?? ""),
    values: labeled ? row.slice(1) : row.slice(1),
  }))
  if (!labeled) {
    return {
      columns: table.headers,
      rows: table.rows.map((row) => ({
        label: row[0] ?? "",
        values: row.slice(1),
      })),
    }
  }
  return { columns, rows }
}

function parseOrdered(body: string) {
  const chunks = body.trim().split(/\n(?=\s*\d+\.\s+)/)
  return chunks.flatMap((chunk) => {
    const match = chunk.match(/^\s*\d+\.\s+([\s\S]*)$/)
    if (!match) {
      return []
    }
    const lines = (match[1] ?? "").split("\n")
    const head = marks((lines[0] ?? "").trim())
    const rest = lines
      .slice(1)
      .map((line) => line.trim())
      .filter(Boolean)
      .join(" ")
    return [{ title: head.text, body: rest || undefined }]
  })
}

function compareCell(value: string) {
  const key = value.trim().toLowerCase()
  if (key === "yes" || key === "true") {
    return true
  }
  if (key === "no" || key === "false") {
    return false
  }
  return value
}

function draw(
  name: string,
  props: Record<string, string>,
  body: string,
  title?: string
) {
  switch (name) {
    case "Callout":
      return asciiCallout({
        type: props.type,
        title: title ?? props.type,
        body,
      })
    case "Quote":
      return asciiQuote({
        title,
        by: props.by,
        source: props.source,
        body,
      })
    case "Steps":
      return asciiSteps({ title, steps: parseOrdered(body) })
    case "Terminal":
      return asciiTerminal({
        title: title ?? "SHELL",
        lines: body.split("\n"),
      })
    case "Changelog": {
      const items = bullets(body).map((item) => {
        const { label, rest } = splitLabel(item.text)
        const type =
          label === "added"
            ? "add"
            : label === "changed"
              ? "change"
              : label === "fixed"
                ? "fix"
                : label === "removed"
                  ? "remove"
                  : "change"
        return { type, text: rest || item.text }
      })
      return asciiChangelog({
        title,
        version: props.version,
        date: props.date,
        items,
      })
    }
    case "GraphTable": {
      const table = parseGfm(body)
      return asciiTable({
        title: title ?? "TABLE",
        headers: table?.headers ?? [],
        rows: table?.rows ?? [],
        footer: table?.footer,
        align: table?.align as ("left" | "right")[] | undefined,
      })
    }
    case "GraphSheet": {
      const sections: { title: string; rows: string[][] }[] = []
      let current: { title: string; rows: string[][] } | null = null
      let headers: string[] = []
      for (const line of body.split("\n")) {
        const heading = line.match(/^#{1,6}\s+(.*)$/)
        if (heading) {
          current = { title: heading[1] ?? "", rows: [] }
          sections.push(current)
          continue
        }
        if (!line.trim().startsWith("|") || isSeparator(line)) {
          continue
        }
        const cells = splitRow(line)
        if (!current) {
          continue
        }
        if (headers.length === 0) {
          headers = cells
          continue
        }
        if (cells[0] && cells[0] === headers[0]) {
          continue
        }
        current.rows.push(cells)
      }
      return asciiSheet({
        title: title ?? "SHEET",
        headers: headers.length > 0 ? headers : ["Item"],
        sections,
      })
    }
    case "GraphTree":
      return asciiTree({
        title: title ?? "TREE",
        nodes: nest(bullets(body)),
      })
    case "GraphTimeline":
      return asciiTimeline({
        title: title ?? "TIMELINE",
        events: bullets(body).map((item) => {
          const { label, rest } = splitLabel(item.text)
          return {
            date: rest ? label : item.text,
            label: rest || label,
            state: item.strong ? "now" : item.em ? "next" : "done",
          }
        }),
      })
    case "GraphCheck":
      return asciiCheck({
        title: title ?? "CHECK",
        items: bullets(body).map((item) => {
          const done =
            item.text.startsWith("[x]") || item.text.startsWith("[X]")
          const rest = item.text.replace(/^\[[ xX]\]\s*/, "")
          const [label, note] = rest.split(/\s+[—–]\s+/)
          return { label: label || rest, done, note }
        }),
      })
    case "GraphFlow":
      return asciiFlow({
        title: title ?? "FLOW",
        rows: body
          .split(/\n+/)
          .map((line) => line.replace(/\*+/g, "").trim())
          .filter(Boolean),
      })
    case "GraphBars": {
      const series = bullets(body).map((item) => {
        const { label, rest } = splitLabel(item.text)
        return {
          label: rest ? label : item.text,
          values: numbers(rest),
          size: (item.strong ? "lg" : "sm") as "sm" | "lg",
        }
      })
      return asciiBars({
        title: title ?? "BARS",
        from: series[0] ?? { label: "from", values: [] },
        to: series[1] ?? { label: "to", values: [] },
        processor: props.processor,
      })
    }
    case "GraphRank":
      return asciiRank({
        title: title ?? "RANK",
        items: bullets(body).map((item) => {
          const { token, rest } = firstToken(item.text)
          return { label: rest || token, value: Number.parseFloat(token) || 0 }
        }),
        max: props.max ? Number(props.max) : undefined,
      })
    case "GraphCells":
      return asciiCells({
        title: title ?? "CELLS",
        items: bullets(body).map((item) => {
          const { label, rest } = splitLabel(item.text)
          const cells = (rest || item.text).split("/").map((row) =>
            row
              .trim()
              .split(/\s+/)
              .map((cell) => Number.parseInt(cell, 10) || 0)
          )
          return { label: rest ? label : item.text, cells }
        }),
      })
    case "GraphMeter":
      return asciiMeter({
        title: title ?? "METER",
        value: fraction(props.value),
        ticks: props.ticks ? Number(props.ticks) : 14,
        caption: props.caption,
      })
    case "GraphSpark":
      return asciiSpark({
        title: title ?? "SPARK",
        data: numbers(props.data),
        caption: props.caption,
      })
    case "GraphStack":
      return asciiStack({
        title: title ?? "STACK",
        rows: bullets(body).map((item) => {
          const { label, rest } = splitLabel(item.text)
          const segs = (rest || item.text)
            .split(",")
            .map((part) => part.trim())
            .filter(Boolean)
            .map((part) => {
              const { token, rest: name } = firstToken(part)
              return {
                label: name || token,
                value: Number.parseFloat(token) || 0,
              }
            })
          return { label: rest ? label : item.text, segments: segs }
        }),
        ticks: props.ticks ? Number(props.ticks) : undefined,
      })
    case "GraphFunnel":
      return asciiFunnel({
        title: title ?? "FUNNEL",
        steps: bullets(body).map((item) => {
          const { token, rest } = firstToken(item.text)
          return {
            value: Number.parseFloat(token.replace(/,/g, "")) || 0,
            label: rest || token,
          }
        }),
      })
    case "GraphGantt":
      return asciiGantt({
        title: title ?? "GANTT",
        columns: props.columns ? Number(props.columns) : 24,
        ticks: props.ticks ? props.ticks.split(/\s+/) : undefined,
        items: bullets(body).map((item) => {
          const { label, rest } = splitLabel(item.text)
          const nums = (rest || item.text).match(/[\d.]+/g) ?? []
          return {
            label: rest ? label : item.text.replace(/[\d.]+/g, "").trim(),
            start: Number(nums[0] ?? 0),
            end: Number(nums[1] ?? nums[0] ?? 0),
            complete: nums[2] != null ? Number(nums[2]) : undefined,
          }
        }),
      })
    case "GraphDiff":
      return asciiDiff({
        title: title ?? "DIFF",
        rows: bullets(body).map((item) => {
          const { label, rest } = splitLabel(item.text)
          const sign: "add" | "remove" | undefined = /^\+/.test(rest)
            ? "add"
            : /^[−\-]/.test(rest)
              ? "remove"
              : undefined
          return {
            label: rest ? label : item.text,
            value: rest.replace(/^[+\-−]\s*/, "") || rest,
            sign,
          }
        }),
      })
    case "GraphInvoice": {
      const table = parseGfm(body)
      const meta = bullets(body)
        .map((item) => splitLabel(item.text))
        .filter((item) => item.rest)
        .map((item) => ({ label: item.label, value: item.rest }))
      const totals = body.split("\n").flatMap((line) => {
        const match = line
          .trim()
          .match(/^\*\*(.+?)\*\*\s+([\d,]+(?:\.\d+)?)\s*$/)
        if (!match) {
          return []
        }
        return [{ label: match[1] ?? "", value: match[2] ?? "" }]
      })
      const note = body
        .split(/\n\s*\n/)
        .map((block) => block.trim())
        .find(
          (block) =>
            block &&
            !block.startsWith("|") &&
            !block.startsWith("-") &&
            !block.startsWith("**")
        )
      const headers = table?.headers.map((header) => header.toLowerCase()) ?? []
      const qtyAt = headers.findIndex((header) => /qty|quantity/.test(header))
      const rateAt = headers.findIndex((header) => /rate|price/.test(header))
      const amountAt = headers.findIndex((header) =>
        /amount|total|sum/.test(header)
      )
      return asciiInvoice({
        title: title ?? "INVOICE",
        from: props.from ? { name: props.from } : undefined,
        to: props.to ? { name: props.to } : undefined,
        meta,
        items: (table?.rows ?? []).map((row) => {
          const last = row.length - 1
          return {
            description: row[0] ?? "",
            qty: qtyAt >= 0 ? row[qtyAt] : row.length >= 4 ? row[1] : undefined,
            rate:
              rateAt >= 0 ? row[rateAt] : row.length >= 4 ? row[2] : undefined,
            amount: row[amountAt >= 0 ? amountAt : last] ?? "",
          }
        }),
        totals,
        note,
      })
    }
    case "GraphCompare": {
      const labeled = parseLabeled(body)
      return asciiCompare({
        title: title ?? "COMPARE",
        columns: labeled?.columns ?? props.columns?.split(/\s+/) ?? [],
        rows: (labeled?.rows ?? []).map((row) => ({
          label: row.label,
          values: row.values.map(compareCell),
        })),
      })
    }
    case "GraphMatrix":
    case "GraphHeatmap": {
      const labeled = parseLabeled(body)
      return asciiMatrix({
        title: title ?? name.replace("Graph", "").toUpperCase(),
        columns: labeled?.columns ?? [],
        rows: (labeled?.rows ?? []).map((row) => ({
          label: row.label,
          values: row.values.map((value) => {
            const parsed = Number(value)
            return Number.isFinite(parsed) ? parsed : value
          }),
        })),
      })
    }
    case "GraphStat":
      return asciiStat({
        title: title ?? "STAT",
        items: bullets(body).map((item) => {
          const { token, rest } = firstToken(item.text)
          const [label, hint] = rest.split(/\s+[—–]\s+/)
          return { value: token, label: label || rest, hint }
        }),
      })
    case "GraphKpi":
      return asciiKpi({
        title: title ?? "KPI",
        value: props.value ?? "",
        label: props.label ?? "",
        hint: props.hint,
        data: numbers(props.data),
      })
    case "GraphSpec":
      return asciiSpec({
        title: title ?? "SPEC",
        rows: bullets(body).map((item) => {
          const { label, rest } = splitLabel(item.text)
          return { label: rest ? label : item.text, value: rest }
        }),
      })
    case "GraphWaterfall":
      return asciiWaterfall({
        title: title ?? "WATERFALL",
        items: bullets(body).map((item) => {
          const { label, rest } = splitLabel(item.text)
          return {
            label: rest ? label : item.text.replace(/[+\-−\d.,]+/g, "").trim(),
            value:
              Number.parseFloat((rest || item.text).replace(/[^\d.+-]/g, "")) ||
              0,
          }
        }),
      })
    case "GraphUptime":
      return asciiUptime({
        title: title ?? "UPTIME",
        from: props.from,
        to: props.to,
        days: (props.days ?? "")
          .split(/\s+/)
          .filter((day): day is "ok" | "degraded" | "down" | "empty" =>
            ["ok", "degraded", "down", "empty"].includes(day)
          ),
      })
    case "GraphSlope":
      return asciiSlope({
        title: title ?? "SLOPE",
        fromLabel: props.fromLabel ?? "",
        toLabel: props.toLabel ?? "",
        items: bullets(body).map((item) => {
          const { label, rest } = splitLabel(item.text)
          const [from, to] = rest.split(/\s*(?:→|->)\s*/)
          return {
            label: rest ? label : item.text,
            from: Number(from) || 0,
            to: Number(to) || 0,
          }
        }),
      })
    case "GraphBullet":
      return asciiBullet({
        title: title ?? "BULLET",
        items: bullets(body).map((item) => {
          const { label, rest } = splitLabel(item.text)
          const nums = (rest || item.text).match(/[\d.]+/g) ?? []
          return {
            label: rest ? label : item.text,
            value: Number(nums[0] ?? 0),
            target: nums[1] != null ? Number(nums[1]) : undefined,
            max: nums[2] != null ? Number(nums[2]) : undefined,
          }
        }),
      })
    case "GraphWaffle":
      return asciiWaffle({
        title: title ?? "WAFFLE",
        value: fraction(props.value),
      })
    case "GraphPlot":
      return asciiSpark({
        title: title ?? "PLOT",
        data: numbers(props.data),
        caption: props.caption,
      })
    case "Graph":
      return asciiFlow({
        title: title ?? "",
        rows: body
          .replace(/<\/?GraphBody>/g, "")
          .replace(/<\/?p>/g, "")
          .split(/\n+/)
          .map((line) => line.trim())
          .filter(Boolean),
      })
    default:
      return asciiFlow({
        title: title ?? name,
        rows: body
          ? body
              .split(/\n/)
              .map((line) => line.replace(/\*+/g, "").trim())
              .filter(Boolean)
          : Object.entries(props)
              .filter(([key, value]) => value && key !== "title")
              .map(([key, value]) => `${key}: ${value}`),
      })
  }
}
