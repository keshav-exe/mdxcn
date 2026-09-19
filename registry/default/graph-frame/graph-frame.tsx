"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function GraphCorners({ mark = "+" }: { mark?: string }) {
  const corner =
    "pointer-events-none absolute z-10 flex size-4 items-center justify-center bg-background font-mono text-sm leading-none text-graph-frame select-none"

  return (
    <>
      <span
        aria-hidden="true"
        className={cn(corner, "top-0 left-0 -translate-x-1/2 -translate-y-1/2")}
      >
        {mark}
      </span>
      <span
        aria-hidden="true"
        className={cn(corner, "top-0 right-0 translate-x-1/2 -translate-y-1/2")}
      >
        {mark}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          corner,
          "bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
        )}
      >
        {mark}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          corner,
          "right-0 bottom-0 translate-x-1/2 translate-y-1/2"
        )}
      >
        {mark}
      </span>
    </>
  )
}

function GraphTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"figcaption">) {
  return (
    <figcaption
      className={cn(
        "absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-background px-2.5 tracking-wide whitespace-nowrap uppercase",
        className
      )}
      {...props}
    >
      <span className="graph-title-ink text-graph-accent">[ {children} ]</span>
    </figcaption>
  )
}

function GraphBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("min-w-0 px-5 py-7 sm:px-8 sm:py-8", className)}
      {...props}
    />
  )
}

function GraphRule({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("graph-rule w-full", className)}
      {...props}
    />
  )
}

function GraphRuleY({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("graph-rule-y self-stretch", className)}
      {...props}
    />
  )
}

function GraphTrack({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex w-full min-w-0 select-none", className)}
      {...props}
    />
  )
}

function GraphTick({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("min-w-0 flex-1 overflow-hidden text-center", className)}
      {...props}
    />
  )
}

/**
 * Markdown children inside a frame — paragraphs, lists, inline code, links.
 * MDX renders `<p>` / `<ul>` / `<code>` here; this keeps them quiet and
 * on the mono grid instead of inheriting the page's prose styles.
 */
const graphProseClass = cn(
  "flex min-w-0 flex-col gap-3 leading-relaxed",
  "[&_p]:m-0 [&_p]:text-pretty",
  "[&_ul]:m-0 [&_ul]:flex [&_ul]:list-none [&_ul]:flex-col [&_ul]:gap-1 [&_ul]:p-0",
  "[&_ol]:m-0 [&_ol]:flex [&_ol]:list-none [&_ol]:flex-col [&_ol]:gap-1 [&_ol]:p-0",
  "[&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-graph-muted [&_li]:before:content-['-']",
  "[&_a]:text-foreground [&_a]:underline [&_a]:decoration-graph-frame [&_a]:decoration-dashed [&_a]:underline-offset-[0.2em]",
  "[&_code]:font-semibold [&_code]:text-foreground",
  "[&_pre]:m-0 [&_pre]:whitespace-pre-wrap [&_pre_code]:font-normal [&_pre_code]:text-inherit",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
  "[&_em]:text-graph-muted [&_em]:not-italic"
)

function GraphProse({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(graphProseClass, className)} {...props} />
}

/* ---- MDX children ------------------------------------------------------ */

type WithChildren<P> = P & { children?: React.ReactNode }

type GraphItemComponent<P extends object> = ((
  props: WithChildren<P>
) => null) & {
  graphItem: string
  displayName?: string
}

/**
 * A data-only child. `<Stat value="12" label="docs" />` renders nothing by
 * itself; the parent graph reads its props with `childItems`. Matching is by
 * the tag name (and the RSC client-reference id), not function identity.
 */
function defineItem<P extends object>(name: string): GraphItemComponent<P> {
  const Item = function Item() {
    return null
  } as unknown as GraphItemComponent<P>
  Item.displayName = name
  Item.graphItem = name
  return Item
}

/** Function name, host tag, or the `#Export` of a React Server client ref. */
function typeName(type: unknown): string {
  if (typeof type === "string") {
    return type
  }

  if (typeof type === "function") {
    const fn = type as {
      graphItem?: string
      displayName?: string
      name?: string
    }
    return fn.graphItem || fn.displayName || fn.name || ""
  }

  if (type && typeof type === "object") {
    const obj = type as {
      graphItem?: string
      displayName?: string
      $$id?: string
      name?: string
    }
    if (obj.graphItem) {
      return obj.graphItem
    }
    if (obj.displayName) {
      return obj.displayName
    }
    if (typeof obj.$$id === "string") {
      const id = obj.$$id.split("#").pop() ?? ""
      return id.split("@")[0] ?? ""
    }
    if (obj.name) {
      return obj.name
    }
  }

  return ""
}

function isHost(
  element: React.ReactElement,
  tags: string | readonly string[]
): boolean {
  const name = typeName(element.type).toLowerCase()
  const list = typeof tags === "string" ? [tags] : tags
  return list.some((tag) => tag.toLowerCase() === name)
}

function elementsOf(children: React.ReactNode): React.ReactElement[] {
  const out: React.ReactElement[] = []
  for (const child of React.Children.toArray(children)) {
    if (!React.isValidElement(child)) {
      continue
    }
    if (child.type === React.Fragment) {
      out.push(
        ...elementsOf((child.props as { children?: React.ReactNode }).children)
      )
      continue
    }
    out.push(child)
  }
  return out
}

/** Direct `ul`/`ol` items, or `li` children if the parent already is a list. */
function listItems(children: React.ReactNode): React.ReactElement[] {
  const elements = elementsOf(children)
  const lists = elements.filter((element) => isHost(element, ["ul", "ol"]))
  const items =
    lists.length > 0
      ? lists.flatMap((list) =>
          elementsOf((list.props as { children?: React.ReactNode }).children)
        )
      : elements
  return items.filter((element) => isHost(element, "li"))
}

function nestedList(item: React.ReactElement): React.ReactElement[] {
  return listItems((item.props as { children?: React.ReactNode }).children)
}

/** Visible text of a list item, ignoring nested lists. */
function itemText(item: React.ReactElement): string {
  const parts: React.ReactNode[] = []
  for (const child of React.Children.toArray(
    (item.props as { children?: React.ReactNode }).children
  )) {
    if (React.isValidElement(child) && isHost(child, ["ul", "ol"])) {
      continue
    }
    parts.push(child)
  }
  return textOf(parts).replace(/\s+/g, " ").trim()
}

function hasHost(node: React.ReactNode, tags: string | readonly string[]) {
  for (const child of React.Children.toArray(node)) {
    if (!React.isValidElement(child)) {
      continue
    }
    if (isHost(child, tags)) {
      return true
    }
    if (
      hasHost((child.props as { children?: React.ReactNode }).children, tags)
    ) {
      return true
    }
  }
  return false
}

function paragraphsOf(children: React.ReactNode): React.ReactElement[] {
  return elementsOf(children).filter((element) => isHost(element, "p"))
}

const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const

/** `### Scope` followed by a table or list — used by Sheet. */
function headingSections(children: React.ReactNode): {
  title: string
  children: React.ReactNode
}[] {
  const sections: { title: string; children: React.ReactNode[] }[] = []
  let current: { title: string; children: React.ReactNode[] } | null = null

  for (const element of elementsOf(children)) {
    if (isHost(element, HEADING_TAGS)) {
      current = {
        title: textOf(
          (element.props as { children?: React.ReactNode }).children
        ).trim(),
        children: [],
      }
      sections.push(current)
      continue
    }

    current?.children.push(element)
  }

  return sections
}

type MdAlign = "left" | "right"

type MdTable = {
  headers: string[]
  rows: string[][]
  footer?: string[]
  align?: MdAlign[]
}

function cellAlign(cell: React.ReactElement): MdAlign | undefined {
  const props = cell.props as {
    align?: string
    style?: { textAlign?: string }
  }
  const value = props.align || props.style?.textAlign
  if (value === "right") {
    return "right"
  }
  if (value === "left") {
    return "left"
  }
  return undefined
}

function rowCells(row: React.ReactElement): {
  values: string[]
  align: (MdAlign | undefined)[]
} {
  const cells = elementsOf(
    (row.props as { children?: React.ReactNode }).children
  ).filter((cell) => isHost(cell, ["th", "td"]))
  return {
    values: cells.map((cell) =>
      textOf((cell.props as { children?: React.ReactNode }).children).trim()
    ),
    align: cells.map(cellAlign),
  }
}

function rowsIn(section: React.ReactElement | undefined) {
  if (!section) {
    return []
  }
  return elementsOf(
    (section.props as { children?: React.ReactNode }).children
  ).filter((row) => isHost(row, "tr"))
}

/** A Markdown / HTML table written as children of a graph. */
function tableOf(children: React.ReactNode): MdTable | null {
  const table = elementsOf(children).find((element) => isHost(element, "table"))
  if (!table) {
    return null
  }

  const sections = elementsOf(
    (table.props as { children?: React.ReactNode }).children
  )
  const thead = sections.find((element) => isHost(element, "thead"))
  const tbody = sections.find((element) => isHost(element, "tbody"))
  const tfoot = sections.find((element) => isHost(element, "tfoot"))
  const body = tbody ?? table
  const heads = rowsIn(thead)
  const bodies = rowsIn(body).filter((row) => !heads.includes(row))
  const foots = rowsIn(tfoot)
  const headRow = heads[0] ?? bodies[0]
  if (!headRow) {
    return null
  }

  const head = rowCells(headRow)
  const dataRows = (heads[0] ? bodies : bodies.slice(1)).map(
    (row) => rowCells(row).values
  )
  const foot = foots[0] ? rowCells(foots[0]).values : undefined
  const align = head.align.some(Boolean)
    ? head.align.map(
        (value, index) => value ?? (index === 0 ? "left" : "right")
      )
    : undefined

  return {
    headers: head.values,
    rows: dataRows,
    footer: foot,
    align,
  }
}

/** First column is the row label. Used by compare / matrix / heatmap. */
function labeledTable(children: React.ReactNode): {
  columns: string[]
  rows: { label: string; values: string[] }[]
  align?: MdAlign[]
} | null {
  const table = tableOf(children)
  if (!table || table.headers.length < 2) {
    return null
  }

  const labeled =
    table.headers[0] === "" ||
    table.headers[0] === "—" ||
    table.headers[0] === "-"

  if (!labeled) {
    return {
      columns: table.headers,
      rows: table.rows.map((row) => ({
        label: row[0] ?? "",
        values: row.slice(1),
      })),
      align: table.align,
    }
  }

  return {
    columns: table.headers.slice(1),
    rows: table.rows.map((row) => ({
      label: row[0] ?? "",
      values: row.slice(1),
    })),
    align: table.align?.slice(1),
  }
}

/** Split `Mar 18: Docs, live` / `14:02: p95 crossed` on `: `. */
function splitLabel(text: string): { label: string; rest: string } {
  const match = text.match(/^(.+?):\s+(.+)$/)
  if (!match) {
    return { label: text, rest: "" }
  }
  return {
    label: (match[1] ?? text).trim(),
    rest: (match[2] ?? "").trim(),
  }
}

/** Split `graph-tree.tsx — ui` / `Copy the source — Run the CLI` on em dash. */
function splitDash(text: string): { label: string; rest: string } {
  const parts = text.split(/\s+[—–]\s+/)
  if (parts.length < 2) {
    return { label: text, rest: "" }
  }
  return {
    label: (parts[0] ?? text).trim(),
    rest: parts.slice(1).join(" — ").trim(),
  }
}

/** First word and the rest: `12,400 docs`, `100% frame`. */
function firstToken(text: string): { token: string; rest: string } {
  const match = text.match(/^(\S+)\s*(.*)$/)
  if (!match) {
    return { token: text, rest: "" }
  }
  return { token: match[1] ?? text, rest: match[2] ?? "" }
}

/** Plain text of a React tree. Strings, numbers, and element children. */
function textOf(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") {
    return ""
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(textOf).join("")
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return textOf(node.props.children)
  }

  return ""
}

/** Props of each direct child rendered with the given item component. */
function childItems<P extends object>(
  children: React.ReactNode,
  Item: GraphItemComponent<P>
): WithChildren<P>[] {
  const tag = Item.graphItem
  return elementsOf(children)
    .filter((element) => typeName(element.type) === tag)
    .map((element) => element.props as WithChildren<P>)
}

/** Every direct child element, in order, with its item tag if it has one. */
function childElements(children: React.ReactNode) {
  return elementsOf(children).map((element) => ({
    element,
    tag: typeName(element.type) || undefined,
  }))
}

/** `[2, 3, 4]`, `"2 3 4"`, or `"2, 3, 4"` → `[2, 3, 4]`. */
function numbers(value: readonly number[] | string | undefined): number[] {
  if (value == null) {
    return []
  }

  if (typeof value === "string") {
    return value
      .split(/[\s,]+/)
      .filter(Boolean)
      .map(Number)
      .filter((entry) => Number.isFinite(entry))
  }

  return [...value]
}

/** `["ok", "down"]` or `"ok down"` → `["ok", "down"]`. */
function words<T extends string>(
  value: readonly T[] | string | undefined
): T[] {
  if (value == null) {
    return []
  }

  if (typeof value === "string") {
    return value.split(/[\s,]+/).filter(Boolean) as T[]
  }

  return [...value]
}

/** `0.67`, `"0.67"`, or `"67%"` → `0.67`. */
function fraction(value: number | string | undefined, fallback = 0): number {
  if (value == null) {
    return fallback
  }

  if (typeof value === "number") {
    return value
  }

  const text = value.trim()
  const percent = text.endsWith("%")
  const parsed = Number.parseFloat(text)

  if (!Number.isFinite(parsed)) {
    return fallback
  }

  return percent ? parsed / 100 : parsed
}

/** `42` or `"12,400"` or `"100%"` → `42`. */
function numberOf(value: number | string | undefined, fallback = 0): number {
  if (value == null) {
    return fallback
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : fallback
  }

  const parsed = Number.parseFloat(value.replace(/,/g, ""))
  return Number.isFinite(parsed) ? parsed : fallback
}

type CellProps = {
  align?: "left" | "right"
}

type RowProps = {
  /** Matrix / compare / heatmap. Table rows ignore this. */
  label?: string
  cells?: React.ReactNode[]
}

/** Column headings. Pipe text or `<Cell>` children. */
const Head = defineItem("Head")
/** One body row. Table: cells. Labeled graphs: `label` + values in the text. */
const Row = defineItem<RowProps>("Row")
/** Totals row under the rule. */
const Foot = defineItem<RowProps>("Foot")
/** One table cell. `align` on a Head cell sets the column. */
const Cell = defineItem<CellProps>("Cell")

/** Cells from an array, pipe text, or `<Cell>` children. */
function cellsOf(
  value?: React.ReactNode[] | string,
  children?: React.ReactNode
): React.ReactNode[] {
  if (Array.isArray(value)) {
    return value
  }

  const nested = childItems(children, Cell)
  if (nested.length > 0) {
    return nested.map((cell) => cell.children ?? "")
  }

  const text = (typeof value === "string" ? value : textOf(children)).trim()
  if (!text) {
    return []
  }

  if (text.includes("|")) {
    return text.split("|").map((cell) => cell.trim())
  }

  return words(text)
}

/** Align list from a Head's `<Cell align>` children. */
function alignsOf(
  children?: React.ReactNode
): ("left" | "right")[] | undefined {
  const cells = childItems(children, Cell)
  if (!cells.some((cell) => cell.align)) {
    return undefined
  }

  return cells.map(
    (cell, index) => cell.align ?? (index === 0 ? "left" : "right")
  )
}

/** Text of a node, one trimmed line per newline. */
function linesOf(node: React.ReactNode): string[] {
  return textOf(node)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

function Graph({
  title,
  corner = "+",
  className,
  children,
  ...props
}: React.ComponentProps<"figure"> & {
  title?: string
  corner?: string
}) {
  const captionId = React.useId()

  return (
    <figure
      aria-labelledby={title ? captionId : undefined}
      className={cn(
        "relative w-full min-w-0 graph-frame font-mono text-sm text-foreground",
        className
      )}
      {...props}
    >
      {title ? <GraphTitle id={captionId}>{title}</GraphTitle> : null}
      <GraphCorners mark={corner} />
      {children}
    </figure>
  )
}

export {
  alignsOf,
  Cell,
  cellsOf,
  childElements,
  childItems,
  defineItem,
  firstToken,
  Foot,
  fraction,
  Graph,
  GraphBody,
  GraphCorners,
  GraphProse,
  graphProseClass,
  GraphRule,
  GraphRuleY,
  GraphTick,
  GraphTitle,
  GraphTrack,
  hasHost,
  Head,
  headingSections,
  isHost,
  itemText,
  labeledTable,
  linesOf,
  listItems,
  nestedList,
  numberOf,
  numbers,
  paragraphsOf,
  Row,
  splitDash,
  splitLabel,
  tableOf,
  textOf,
  typeName,
  words,
}
export type { CellProps, GraphItemComponent, MdAlign, MdTable, RowProps }
