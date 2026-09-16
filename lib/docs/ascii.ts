import { fence } from "@/registry/default/graph-knap/frame"
import {
  asciiBars,
  asciiBullet,
  asciiCells,
  asciiCheck,
  asciiCompare,
  asciiDiff,
  asciiFunnel,
  asciiGantt,
  asciiInvoice,
  asciiKpi,
  asciiMatrix,
  asciiMeter,
  asciiRank,
  asciiSheet,
  asciiSlope,
  asciiSpark,
  asciiSpec,
  asciiStack,
  asciiStat,
  asciiTable,
  asciiTimeline,
  asciiTree,
  asciiUptime,
  asciiWaffle,
  asciiWaterfall,
} from "@/registry/default/graph-knap/graphs"

export const MDX_SLUGS = [
  "graph-table",
  "graph-sheet",
  "graph-bars",
  "graph-rank",
  "graph-cells",
  "graph-meter",
  "graph-spark",
  "graph-tree",
  "graph-timeline",
  "graph-check",
  "graph-stack",
  "graph-funnel",
  "graph-gantt",
  "graph-waffle",
  "graph-diff",
  "graph-invoice",
  "graph-compare",
  "graph-matrix",
  "graph-stat",
  "graph-kpi",
  "graph-spec",
  "graph-waterfall",
  "graph-uptime",
  "graph-slope",
  "graph-bullet",
] as const

export const MDX_SKIP_SLUGS = [
  "graph-flow",
  "graph-plot",
  "graph-activity",
  "graph-heatmap",
  "graph-calendar",
  "graph-timer",
  "graph-countdown",
  "graph-frame",
] as const

export type MdxSlug = (typeof MDX_SLUGS)[number]

export function isMdxSlug(slug: string): slug is MdxSlug {
  return (MDX_SLUGS as readonly string[]).includes(slug)
}

const uptimeQuarter = Array.from({ length: 90 }, (_, index) =>
  index === 41 || index === 42
    ? ("down" as const)
    : index === 18 || index === 60
      ? ("degraded" as const)
      : ("ok" as const)
)

const examples: Record<MdxSlug, string> = {
  "graph-table": asciiTable({
    title: "WHAT THE RESEARCH COST",
    headers: ["Agent", "Tokens", "Tool calls", "Time"],
    align: ["left", "right", "right", "right"],
    rows: [
      ["Inks and paper", "115,207", "120", "16m"],
      ["Overprint and drift", "135,218", "164", "16m"],
      ["Naming the patterns", "186,716", "112", "18m"],
    ],
    footer: ["Total", "437,141", "396", "~50m"],
  }),
  "graph-sheet": asciiSheet({
    title: "RFC",
    headers: ["Item", "Owner", "Status"],
    align: ["left", "left", "left"],
    sections: [
      {
        title: "Scope",
        rows: [
          ["CLI copies files", "priya", "done"],
          ["Docs previews", "jon", "now"],
        ],
      },
      {
        title: "Out of scope",
        rows: [
          ["npm package", "—", "later"],
          ["Figma kit", "—", "later"],
        ],
      },
    ],
  }),
  "graph-bars": asciiBars({
    title: "THROUGHPUT",
    from: { label: "before", values: [2, 4, 3, 5, 2] },
    to: { label: "after", size: "lg", values: [2, 4, 3, 5, 2] },
  }),
  "graph-rank": asciiRank({
    title: "ROUTES",
    items: [
      { label: "/docs", value: 12400 },
      { label: "/install", value: 4100 },
      { label: "/plot", value: 860 },
      { label: "/rank", value: 420 },
    ],
  }),
  "graph-cells": asciiCells({
    title: "TWO WAYS TO LEARN",
    items: [
      {
        label: "fragments",
        cells: [
          [1, 0, 1, 0, 0],
          [0, 1, 0, 1, 0],
          [1, 0, 0, 0, 1],
        ],
      },
      {
        label: "a system",
        cells: [
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
        ],
      },
    ],
  }),
  "graph-meter": asciiMeter({
    title: "SHIPPED",
    value: 0.67,
    caption: "characters, not a progress bar",
  }),
  "graph-spark": asciiSpark({
    title: "LATENCY",
    data: [2, 3, 4, 3, 6, 5, 8, 7, 9, 6, 10, 8],
    caption: "last point is the accent",
  }),
  "graph-tree": asciiTree({
    title: "REGISTRY",
    nodes: [
      {
        label: "registry/default",
        children: [
          {
            label: "graph-frame",
            children: [
              { label: "graph-frame.tsx", meta: "ui" },
              { label: "graph-motion.ts", meta: "lib" },
            ],
          },
          {
            label: "graph-tree",
            children: [{ label: "graph-tree.tsx", meta: "ui", accent: true }],
          },
        ],
      },
    ],
  }),
  "graph-timeline": asciiTimeline({
    title: "SHIPPED",
    events: [
      { date: "Mar 12", label: "CLI copies the files" },
      { date: "Mar 18", label: "Docs, live previews", state: "now" },
      { date: "Apr 02", label: "Registry listed", state: "next" },
    ],
  }),
  "graph-check": asciiCheck({
    title: "LAUNCH",
    items: [
      { label: "freeze tokens", done: true },
      { label: "ship registry json", done: true },
      { label: "write the postmortem", note: "still open" },
    ],
  }),
  "graph-stack": asciiStack({
    title: "BUNDLE",
    rows: [
      {
        label: "marketing",
        segments: [
          { label: "js", value: 48 },
          { label: "css", value: 22 },
          { label: "images", value: 30 },
        ],
      },
      {
        label: "docs",
        segments: [
          { label: "js", value: 28 },
          { label: "css", value: 18 },
          { label: "images", value: 54 },
        ],
      },
    ],
  }),
  "graph-funnel": asciiFunnel({
    title: "INSTALL",
    steps: [
      { label: "docs", value: 12400, display: "12,400" },
      { label: "copy", value: 4100, display: "4,100" },
      { label: "ship", value: 860, display: "860" },
    ],
  }),
  "graph-gantt": asciiGantt({
    title: "LAUNCH",
    progress: 0.58,
    ticks: ["q1", "q2", "q3", "q4"],
    items: [
      { label: "design", start: 0, end: 0.35, complete: 1 },
      { label: "build", start: 0.2, end: 0.75, complete: 0.55 },
      { label: "docs", start: 0.55, end: 0.9, complete: 0.2 },
      { label: "ship", start: 0.85, end: 1, complete: 0 },
    ],
  }),
  "graph-waffle": asciiWaffle({
    title: "COVERAGE",
    value: 0.73,
    caption: "73 of 100 tests green",
  }),
  "graph-diff": asciiDiff({
    title: "BUNDLE",
    rows: [
      { label: "vendor", value: "84 kb" },
      { label: "app", value: "31 kb", sign: "add" },
      { label: "sourcemaps", value: "12 kb", sign: "remove" },
    ],
    footer: { label: "shipped", value: "103 kb" },
  }),
  "graph-invoice": asciiInvoice({
    title: "INVOICE 0041",
    from: {
      name: "markdown graphs",
      lines: ["kshv.me", "GSTIN 29AXXXXX1234Z5"],
    },
    to: {
      name: "Acme Studio",
      lines: ["14 Market Street", "San Francisco, CA"],
    },
    meta: [
      { label: "No.", value: "0041" },
      { label: "Issued", value: "Mar 12, 2026" },
      { label: "Due", value: "Apr 11, 2026" },
    ],
    items: [
      {
        description: "Design system",
        qty: "1",
        rate: "4,200",
        amount: "4,200",
      },
      { description: "Motion pass", qty: "1", rate: "1,800", amount: "1,800" },
      { description: "Docs rewrite", qty: "8h", rate: "180", amount: "1,440" },
    ],
    totals: [
      { label: "Subtotal", value: "7,440" },
      { label: "Tax", value: "0" },
      { label: "Amount due", value: "7,440" },
    ],
    note: "Net 30. Wire to the account on file.",
  }),
  "graph-compare": asciiCompare({
    title: "PLANS",
    columns: ["Solo", "Studio"],
    rows: [
      { label: "Registry", values: [true, true] },
      { label: "Accent picker", values: [true, true] },
      { label: "Private source", values: [false, true] },
      { label: "Price", values: ["$0", "$24"] },
    ],
  }),
  "graph-matrix": asciiMatrix({
    title: "DETECT",
    columns: ["Pos", "Neg"],
    rows: [
      { label: "Pos", values: [41, 3] },
      { label: "Neg", values: [2, 54] },
    ],
  }),
  "graph-stat": asciiStat({
    title: "THIS WEEK",
    items: [
      { value: "12,400", label: "docs" },
      { value: "4,100", label: "copies" },
      { value: "860", label: "shipped" },
    ],
  }),
  "graph-kpi": asciiKpi({
    title: "READS",
    value: "12,400",
    label: "this week",
    hint: "+18%",
    data: [4, 5, 5, 6, 8, 7, 9, 8, 11, 10, 12, 14],
  }),
  "graph-spec": asciiSpec({
    title: "TYPE",
    rows: [
      { label: "Family", value: "Geist Mono" },
      { label: "Size", value: "14 / 21" },
      { label: "Tracking", value: "+0.02em" },
      { label: "Figures", value: "tabular" },
      { label: "Accent", value: "--graph-accent" },
      { label: "Duo", value: "--graph-accent-2" },
      { label: "Tri", value: "--graph-accent-3" },
    ],
  }),
  "graph-waterfall": asciiWaterfall({
    title: "MARGIN",
    items: [
      { label: "Revenue", value: 48 },
      { label: "Refunds", value: -6 },
      { label: "Hosting", value: -4 },
      { label: "Profit", value: 38 },
    ],
  }),
  "graph-uptime": asciiUptime({
    title: "API",
    from: "Jun 1",
    to: "Aug 29",
    days: uptimeQuarter,
  }),
  "graph-slope": asciiSlope({
    title: "TRAFFIC",
    fromLabel: "2025",
    toLabel: "2026",
    items: [
      { label: "docs", from: 8200, to: 12400 },
      { label: "copy", from: 5100, to: 4100 },
      { label: "ship", from: 640, to: 860 },
    ],
  }),
  "graph-bullet": asciiBullet({
    title: "BUDGET",
    items: [
      { label: "Design", value: 42, target: 40 },
      { label: "Motion", value: 18, target: 24 },
      { label: "Docs", value: 9, target: 12 },
    ],
  }),
}

export function mdxExample(slug: string) {
  if (!isMdxSlug(slug)) {
    return null
  }

  const ascii = examples[slug]

  return { ascii, markdown: fence(ascii) }
}
