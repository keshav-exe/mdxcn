export const COMARK_PROPS: Record<string, Record<string, unknown>> = {
  "graph-table": {
    title: "WHAT THE RESEARCH COST",
    headers: ["Agent", "Tokens", "Tool calls", "Time"],
    align: ["left", "right", "right", "right"],
    rows: [
      ["Inks and paper", "115,207", "120", "16m"],
      ["Overprint and drift", "135,218", "164", "16m"],
      ["Naming the patterns", "186,716", "112", "18m"],
    ],
    footer: ["Total", "437,141", "396", "~50m"],
  },
  "graph-sheet": {
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
  },
  "graph-bars": {
    title: "THROUGHPUT",
    from: { label: "before", values: [2, 4, 3, 5, 2] },
    to: { label: "after", size: "lg", values: [2, 4, 3, 5, 2] },
  },
  "graph-rank": {
    title: "ROUTES",
    items: [
      { label: "/docs", value: 12400 },
      { label: "/install", value: 4100 },
      { label: "/plot", value: 860 },
      { label: "/rank", value: 420 },
    ],
  },
  "graph-cells": {
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
  },
  "graph-meter": {
    title: "SHIPPED",
    value: 0.67,
    caption: "characters, not a progress bar",
  },
  "graph-spark": {
    title: "LATENCY",
    data: [2, 3, 4, 3, 6, 5, 8, 7, 9, 6, 10, 8],
    caption: "last point is the accent",
  },
  "graph-tree": {
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
  },
  "graph-timeline": {
    title: "SHIPPED",
    events: [
      { date: "Mar 12", label: "CLI copies the files" },
      { date: "Mar 18", label: "Docs, live previews", state: "now" },
      { date: "Apr 02", label: "Registry listed", state: "next" },
    ],
  },
  "graph-check": {
    title: "LAUNCH",
    items: [
      { label: "freeze tokens", done: true },
      { label: "ship registry json", done: true },
      { label: "write the postmortem", note: "still open" },
    ],
  },
  "graph-stack": {
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
  },
  "graph-funnel": {
    title: "INSTALL",
    steps: [
      { label: "docs", value: 12400, display: "12,400" },
      { label: "copy", value: 4100, display: "4,100" },
      { label: "ship", value: 860, display: "860" },
    ],
  },
  "graph-gantt": {
    title: "LAUNCH",
    progress: 0.58,
    ticks: ["q1", "q2", "q3", "q4"],
    items: [
      { label: "design", start: 0, end: 0.35, complete: 1 },
      { label: "build", start: 0.2, end: 0.75, complete: 0.55 },
      { label: "docs", start: 0.55, end: 0.9, complete: 0.2 },
      { label: "ship", start: 0.85, end: 1, complete: 0 },
    ],
  },
  "graph-waffle": {
    title: "COVERAGE",
    value: 0.73,
    caption: "73 of 100 tests green",
  },
  "graph-diff": {
    title: "BUNDLE",
    rows: [
      { label: "vendor", value: "84 kb" },
      { label: "app", value: "31 kb", sign: "add" },
      { label: "sourcemaps", value: "12 kb", sign: "remove" },
    ],
    footer: { label: "shipped", value: "103 kb" },
  },
  "graph-invoice": {
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
  },
  "graph-compare": {
    title: "PLANS",
    columns: ["Solo", "Studio"],
    rows: [
      { label: "Registry", values: [true, true] },
      { label: "Accent picker", values: [true, true] },
      { label: "Private source", values: [false, true] },
      { label: "Price", values: ["$0", "$24"] },
    ],
  },
  "graph-matrix": {
    title: "DETECT",
    columns: ["Pos", "Neg"],
    rows: [
      { label: "Pos", values: [41, 3] },
      { label: "Neg", values: [2, 54] },
    ],
  },
  "graph-stat": {
    title: "THIS WEEK",
    items: [
      { value: "12,400", label: "docs" },
      { value: "4,100", label: "copies" },
      { value: "860", label: "shipped" },
    ],
  },
  "graph-kpi": {
    title: "READS",
    value: "12,400",
    label: "this week",
    hint: "+18%",
    data: [4, 5, 5, 6, 8, 7, 9, 8, 11, 10, 12, 14],
  },
  "graph-spec": {
    title: "TYPE",
    rows: [
      { label: "Family", value: "Geist Mono" },
      { label: "Size", value: "14 / 21" },
      { label: "Tracking", value: "+0.02em" },
      { label: "Figures", value: "tabular" },
      { label: "Accent", value: "--graph-accent" },
    ],
  },
  "graph-waterfall": {
    title: "MARGIN",
    items: [
      { label: "Revenue", value: 48 },
      { label: "Refunds", value: -6 },
      { label: "Hosting", value: -4 },
      { label: "Profit", value: 38 },
    ],
  },
  "graph-uptime": {
    title: "API",
    from: "Aug 14",
    to: "Aug 27",
    days: [
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "degraded",
      "ok",
      "ok",
      "down",
      "down",
      "ok",
      "ok",
      "ok",
      "ok",
    ],
  },
  "graph-slope": {
    title: "TRAFFIC",
    fromLabel: "2025",
    toLabel: "2026",
    items: [
      { label: "docs", from: 8200, to: 12400 },
      { label: "copy", from: 5100, to: 4100 },
      { label: "ship", from: 640, to: 860 },
    ],
  },
  "graph-bullet": {
    title: "BUDGET",
    items: [
      { label: "Design", value: 42, target: 40 },
      { label: "Motion", value: 18, target: 24 },
      { label: "Docs", value: 9, target: 12 },
    ],
  },
  "graph-flow": {
    title: "OPTIMISTIC UI",
    rows: [
      {
        nodes: [{ label: "tap" }, { label: "server" }, { label: "update" }],
      },
      {
        nodes: [
          { label: "tap" },
          { label: "update", tone: "accent" },
          { label: "server syncs", stretch: true, tone: "muted" },
        ],
      },
    ],
  },
  "graph-plot": {
    title: "P95",
    data: [2, 3, 3, 5, 4, 7, 6, 8, 5, 9, 7, 6],
    labels: ["jan", "dec"],
  },
  "graph-heatmap": {
    title: "DEPLOYS",
    palette: "duo",
    columns: ["0", "4", "8", "12", "16", "20"],
    rows: [
      { label: "Mon", values: [0, 1, 4, 8, 6, 1] },
      { label: "Tue", values: [0, 0, 5, 9, 4, 2] },
      { label: "Wed", values: [1, 0, 6, 12, 5, 1] },
      { label: "Thu", values: [0, 2, 4, 7, 8, 3] },
      { label: "Fri", values: [0, 1, 3, 5, 2, 0] },
      { label: "Sat", values: [0, 0, 1, 0, 0, 0] },
      { label: "Sun", values: [0, 0, 0, 1, 0, 0] },
    ],
  },
  "graph-activity": {
    title: "SHIPPED",
    weekStartsOn: 1,
    caption: "Jun – Aug",
    days: [
      { date: "2026-06-01", count: 3 },
      { date: "2026-06-02", count: 7 },
      { date: "2026-06-03", count: 0 },
      { date: "2026-06-04", count: 12 },
      { date: "2026-06-05", count: 4 },
      { date: "2026-06-06", count: 0 },
      { date: "2026-06-07", count: 0 },
    ],
  },
  "graph-calendar": {
    title: "SHIP WEEK",
    year: 2026,
    month: 3,
    weekStartsOn: 0,
    marks: [{ day: 12, accent: true }, { day: 18 }],
  },
  "graph-timer": {
    title: "INCIDENT",
    kind: "elapsed",
    at: "2026-08-27T08:00:00Z",
    caption: "api",
  },
  "graph-countdown": {
    title: "FREEZE",
    to: "2027-01-01T00:00:00Z",
    done: "open",
    caption: "until launch",
  },
}
