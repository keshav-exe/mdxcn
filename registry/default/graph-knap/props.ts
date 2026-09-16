export type GraphFilterWarning = {
  message: string
  code?: "INVALID_FILTER_INPUT" | "FILTER_WARNING"
}

export type GraphFilterContext = {
  rawValue?: unknown
  rawArguments?: unknown[]
  reportWarning?: (warning: GraphFilterWarning) => void
}

export type GraphFilter = {
  (value: string, param?: string, context?: GraphFilterContext): string
  metadata?: { example?: string }
}

/** If the piped value is not a props object, store it under this key. */
export const GRAPH_VALUE_KEY = {
  "graph-table": "rows",
  "graph-sheet": "sections",
  "graph-invoice": "items",
  "graph-spec": "rows",
  "graph-diff": "rows",
  "graph-stat": "items",
  "graph-spark": "data",
  "graph-plot": "data",
  "graph-cells": "items",
  "graph-meter": "value",
  "graph-waffle": "value",
  "graph-stack": "rows",
  "graph-funnel": "steps",
  "graph-waterfall": "items",
  "graph-rank": "items",
  "graph-bullet": "items",
  "graph-heatmap": "rows",
  "graph-activity": "days",
  "graph-uptime": "days",
  "graph-flow": "rows",
  "graph-tree": "nodes",
  "graph-timeline": "events",
  "graph-gantt": "items",
  "graph-check": "items",
  "graph-timer": "at",
  "graph-countdown": "to",
} as const

export function filterName(slug: string) {
  return slug.replaceAll("-", "_")
}

export function unquoteParam(param?: string) {
  if (!param) return ""
  return param.replace(/^(['"])([\s\S]*)\1$/, "$2").trim()
}

export function typedValue(
  value: string,
  context?: GraphFilterContext
): unknown {
  if (context && "rawValue" in context && context.rawValue !== undefined) {
    return context.rawValue
  }
  if (!value || value === "undefined" || value === "null") return undefined
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function cellText(value: unknown) {
  if (value == null) return ""
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }
  return JSON.stringify(value)
}

function tableFromRecords(rows: Record<string, unknown>[]) {
  const first = rows[0]
  if (!first) return null
  const headers = Object.keys(first)
  return {
    headers,
    rows: rows.map((row) => headers.map((header) => cellText(row[header]))),
  }
}

function defaultTitle(slug: string) {
  return slug
    .replace(/^graph-/, "")
    .replaceAll("-", " ")
    .toUpperCase()
}

export function resolveGraphProps(
  slug: string,
  value: string,
  param: string | undefined,
  context?: GraphFilterContext
): { props: Record<string, unknown>; format: "ascii" | "comark" } | null {
  const token = unquoteParam(param)
  const format = token === "comark" ? "comark" : "ascii"
  const title = token && token !== "comark" ? token : undefined
  const data = typedValue(value, context)

  if (data === undefined) return null

  if (isPlainObject(data)) {
    const props = { ...data }
    if (title) props.title = title
    if (props.title == null) props.title = defaultTitle(slug)
    return { props, format }
  }

  if (
    slug === "graph-table" &&
    Array.isArray(data) &&
    data.length > 0 &&
    isPlainObject(data[0])
  ) {
    const table = tableFromRecords(data as Record<string, unknown>[])
    if (!table) return null
    return {
      props: {
        title: title ?? defaultTitle(slug),
        ...table,
      },
      format,
    }
  }

  const key = (GRAPH_VALUE_KEY as Record<string, string | undefined>)[slug]
  if (!key) return null

  return {
    props: {
      title: title ?? defaultTitle(slug),
      [key]: data,
    },
    format,
  }
}

export function warnFilter(
  context: GraphFilterContext | undefined,
  message: string,
  code: GraphFilterWarning["code"] = "FILTER_WARNING"
) {
  context?.reportWarning?.({ message, code })
}
