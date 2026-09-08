import { CHOOSER } from "@/lib/docs/chooser"

export type NavLink = {
  href: string
  label: string
  isNew?: boolean
}

export type PropRow = {
  name: string
  type: string
  default?: string
  description: string
}

export type ComponentDoc = {
  slug: string
  title: string
  name: string
  description: string
  registry: string
  dependencies: string[]
  props: PropRow[]
  when?: string
  not?: string
}

export const getStarted: NavLink[] = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/examples", label: "Examples" },
  { href: "/docs/comark", label: "Comark", isNew: true },
  { href: "/agents", label: "For agents" },
  { href: "/docs/skill", label: "Skill" },
]

const catalog: ComponentDoc[] = [
  {
    slug: "graph-table",
    title: "Table",
    name: "GraphTable",
    description: "Framed data table with an optional footer row for totals.",
    registry: "graph-table",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "headers",
        type: "string[]",
        description: "Column headings. Sentence case.",
      },
      {
        name: "rows",
        type: "ReactNode[][]",
        description: "Body cells, one array per row.",
      },
      {
        name: "footer",
        type: "ReactNode[]",
        description: "Optional totals row under a rule.",
      },
      {
        name: "align",
        type: '("left" | "right")[]',
        default: "left, then right",
        description:
          "Per-column alignment. Defaults to left on the first column.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-sheet",
    title: "Sheet",
    name: "GraphSheet",
    description:
      "A table with section titles. API surfaces, RFCs, grouped specs.",
    registry: "graph-sheet",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "headers",
        type: "string[]",
        description: "Column headings. Sentence case.",
      },
      {
        name: "sections",
        type: "SheetSection[]",
        description: "Each section has a title and rows of cells.",
      },
      {
        name: "footer",
        type: "ReactNode[]",
        description: "Optional totals row under a rule.",
      },
      {
        name: "align",
        type: '("left" | "right")[]',
        default: "left, then right",
        description:
          "Per-column alignment. Defaults to left on the first column.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-flow",
    title: "Flow",
    name: "GraphFlow",
    description:
      "Process diagram with nodes on a dashed arrow. Accent a node to highlight a path.",
    registry: "graph-flow",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "rows",
        type: "FlowRow[]",
        description: "Each row is a sequence of nodes.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-bars",
    title: "Bars",
    name: "GraphBars",
    description:
      "Two bar groups side by side, drawn with glyphs. The right group is usually the larger one.",
    registry: "graph-bars",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "from",
        type: "BarSeries",
        description: "Left series. values is an array of relative heights.",
      },
      {
        name: "to",
        type: "BarSeries",
        description: "Right series. Set size to lg for the larger group.",
      },
      {
        name: "processor",
        type: "string",
        description: "Optional label between the two groups.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        default: '"shade"',
        description:
          "Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-rank",
    title: "Rank",
    name: "GraphRank",
    description:
      "A list of labels with a bar of characters and a number on the right.",
    registry: "graph-rank",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "items",
        type: "RankItem[]",
        description:
          "Each row is a label, a number, and an optional display string for the right column.",
      },
      {
        name: "max",
        type: "number",
        description: "Scale for the bars. Defaults to the largest value.",
      },
      {
        name: "ticks",
        type: "number",
        default: "20",
        description: "How many character slots each bar uses.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        default: '"shade"',
        description:
          "Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-cells",
    title: "Cells",
    name: "GraphCells",
    description:
      "Grid of filled and empty cells, drawn with glyphs. Useful for density or comparing two sets.",
    registry: "graph-cells",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "items",
        type: "CellGrid[]",
        description: "Each item is a labeled 0/1 matrix.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        default: '"shade"',
        description:
          "Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-meter",
    title: "Meter",
    name: "GraphMeter",
    description:
      "Progress bar drawn with = characters. Empty slots stay as dashes.",
    registry: "graph-meter",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "value",
        type: "number",
        description: "0 to 1.",
      },
      {
        name: "ticks",
        type: "number",
        default: "14",
        description: "Number of character slots.",
      },
      {
        name: "caption",
        type: "string",
        description: "Muted line under the meter.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        default: '"shade"',
        description:
          "Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-spark",
    title: "Spark",
    name: "GraphSpark",
    description:
      "Sparkline from block characters. Values scale to the highest point.",
    registry: "graph-spark",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "data",
        type: "number[]",
        description: "Relative values. Scaled to the max.",
      },
      {
        name: "caption",
        type: "string",
        description: "Muted line under the sparkline.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        default: "▁▂▃▄▅▆▇█",
        description:
          "Defaults to spark bars. Pass shade, ascii, hash, bar, or your own characters.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-tree",
    title: "Tree",
    name: "GraphTree",
    description:
      "Nested tree with branch glyphs. Accent a node to highlight it.",
    registry: "graph-tree",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "nodes",
        type: "TreeNode[]",
        description:
          "Nested nodes. Each may have label, meta, accent, and children.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-timeline",
    title: "Timeline",
    name: "GraphTimeline",
    description:
      "Vertical list of dates. Mark one row as current with the accent color.",
    registry: "graph-timeline",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "events",
        type: "TimelineEvent[]",
        description: "date, label, and optional state: done, now, or next.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-check",
    title: "Check",
    name: "GraphCheck",
    description: "Punch list. Done rows mark [x], the rest stay [ ].",
    registry: "graph-check",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "items",
        type: "CheckItem[]",
        description: "label, optional done, optional note under the label.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-stack",
    title: "Stack",
    name: "GraphStack",
    description:
      "Stacked bar for parts of a whole. Different glyphs per segment instead of colors.",
    registry: "graph-stack",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "rows",
        type: "StackRow[]",
        description: "Each row has a label and labeled numeric segments.",
      },
      {
        name: "accent",
        type: "string",
        description:
          "Segment label to paint with the accent. Defaults to the first.",
      },
      {
        name: "ticks",
        type: "number",
        default: "24",
        description: "Bar width in characters.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        description:
          "One character per segment, or a preset. Defaults to █▓▒░#=+ -.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-funnel",
    title: "Funnel",
    name: "GraphFunnel",
    description:
      "Steps get narrower as values drop. Percentages compare to the first step.",
    registry: "graph-funnel",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "steps",
        type: "FunnelStep[]",
        description: "label, value, and optional display string for the count.",
      },
      {
        name: "ticks",
        type: "number",
        default: "20",
        description: "Width of the first bar, in characters.",
      },
      {
        name: "stage",
        type: "string",
        description: "Step label to focus. Other rows recede.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        default: '"shade"',
        description:
          "Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-gantt",
    title: "Gantt",
    name: "GraphGantt",
    description:
      "Schedule chart. start and end are fractions from 0 to 1 along the track.",
    registry: "graph-gantt",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "items",
        type: "GanttItem[]",
        description:
          "label, start, end, optional complete (0–1 fill inside the bar).",
      },
      {
        name: "ticks",
        type: "string[]",
        description: "Labels under the track, spaced at the ends.",
      },
      {
        name: "columns",
        type: "number",
        default: "24",
        description: "Track width in characters.",
      },
      {
        name: "stage",
        type: "string",
        description: "Row label to focus. Other rows recede.",
      },
      {
        name: "progress",
        type: "number",
        description: "0–1 playhead. Draws ▾ on the track.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        default: '"shade"',
        description:
          "Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-plot",
    title: "Plot",
    name: "GraphPlot",
    description: "Line or area chart built from columns of block characters.",
    registry: "graph-plot",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "data",
        type: "number[]",
        description: "One value per column, left to right.",
      },
      {
        name: "labels",
        type: "string[]",
        description: "First and last labels under the axis.",
      },
      {
        name: "height",
        type: "number",
        default: "7",
        description: "Rows in the plot.",
      },
      {
        name: "variant",
        type: '"line" | "area"',
        default: '"area"',
        description: "Area fills down from the cap with ░.",
      },
      {
        name: "progress",
        type: "number",
        default: "1",
        description: "0–1. How many columns are revealed.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        default: '"shade"',
        description:
          "Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-waffle",
    title: "Waffle",
    name: "GraphWaffle",
    description: "Grid of 100 cells. The value sets how many are filled in.",
    registry: "graph-waffle",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "value",
        type: "number",
        description: "Share from 0 to 1.",
      },
      {
        name: "cells",
        type: "number",
        default: "100",
        description: "Total cells in the grid.",
      },
      {
        name: "columns",
        type: "number",
        default: "10",
        description: "Cells per row.",
      },
      {
        name: "caption",
        type: "string",
        description: "Muted line under the percent.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        default: '"shade"',
        description:
          "Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-diff",
    title: "Diff",
    name: "GraphDiff",
    description:
      "List with add, remove, and unchanged rows. Works for changelogs or bundle sizes.",
    registry: "graph-diff",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "rows",
        type: "DiffRow[]",
        description: "label, value, and optional sign: add, remove, or keep.",
      },
      {
        name: "footer",
        type: "DiffRow",
        description: "Total row under a rule.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-invoice",
    title: "Invoice",
    name: "GraphInvoice",
    description:
      "Document table for invoices and quotes. From, bill-to, line items, and a totals block.",
    registry: "graph-invoice",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "from",
        type: "InvoiceParty",
        description: "Issuer name and optional address lines.",
      },
      {
        name: "to",
        type: "InvoiceParty",
        description: "Recipient name and optional address lines.",
      },
      {
        name: "meta",
        type: "InvoiceMeta[]",
        description: "Fields like number, issued, due.",
      },
      {
        name: "items",
        type: "InvoiceItem[]",
        description:
          "Line items. qty and rate are optional; columns hide when unused.",
      },
      {
        name: "totals",
        type: "InvoiceTotal[]",
        description: "Rows under the items. Set accent on the amount due.",
      },
      {
        name: "note",
        type: "string",
        description: "Muted line under the totals. Payment terms, etc.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-compare",
    title: "Compare",
    name: "GraphCompare",
    description:
      "Feature matrix. Cells are text or true/false, drawn as ✓ and –.",
    registry: "graph-compare",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "columns",
        type: "string[]",
        description: "Option names across the top.",
      },
      {
        name: "rows",
        type: "CompareRow[]",
        description: "label plus one value per column. Booleans become ✓ or –.",
      },
      {
        name: "accent",
        type: "string",
        description: "Column name to highlight. Other columns recede.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-matrix",
    title: "Matrix",
    name: "GraphMatrix",
    description:
      "Exact numbers on both axes. Confusion matrices, latency by region.",
    registry: "graph-matrix",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "columns",
        type: "string[]",
        description: "Column headings across the top.",
      },
      {
        name: "rows",
        type: "MatrixRow[]",
        description: "label plus one number or string per column.",
      },
      {
        name: "accent",
        type: "string",
        description: "Row label to highlight. Other rows recede.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-stat",
    title: "Stat",
    name: "GraphStat",
    description: "A row of large numbers with labels.",
    registry: "graph-stat",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "items",
        type: "StatItem[]",
        description: "value, label, optional hint, optional accent.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-kpi",
    title: "KPI",
    name: "GraphKpi",
    description: "One large number with a sparkline under it.",
    registry: "graph-kpi",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "value",
        type: "string",
        description: "The large number, already formatted.",
      },
      {
        name: "label",
        type: "string",
        description: "Line under the number.",
      },
      {
        name: "hint",
        type: "string",
        description: "Optional extra next to the label, like a delta.",
      },
      {
        name: "data",
        type: "number[]",
        description: "Sparkline values. Scaled to the highest point.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        description: "Sparkline characters. Defaults to ▁▂▃▄▅▆▇█.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-spec",
    title: "Spec",
    name: "GraphSpec",
    description:
      "Aligned label and value rows. Spec sheets, shipping labels, type samples.",
    registry: "graph-spec",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "rows",
        type: "SpecRow[]",
        description: "label, value, and optional accent.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-activity",
    title: "Activity",
    name: "GraphActivity",
    description:
      "GitHub-style contribution grid. Pass dated counts; weeks, months, and intensity are derived.",
    registry: "graph-activity",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "days",
        type: "ActivityDay[]",
        description: "ISO date plus count. Gaps fill as empty days.",
      },
      {
        name: "weekStartsOn",
        type: "0 | 1",
        default: "0",
        description: "0 is Sunday, like GitHub. 1 is Monday.",
      },
      {
        name: "max",
        type: "number",
        description: "Lock the intensity scale. Defaults to the highest count.",
      },
      {
        name: "legend",
        type: "boolean",
        default: "true",
        description: "Less / more glyph key under the grid.",
      },
      {
        name: "caption",
        type: "string | false",
        description:
          "Replaces the computed contribution total. Pass false to hide it.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        default: '"shade"',
        description:
          "Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-heatmap",
    title: "Heatmap",
    name: "GraphHeatmap",
    description:
      "Labeled rows and columns with the same intensity glyphs as Activity. Punchcards, hours, anything 2d.",
    registry: "graph-heatmap",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "columns",
        type: "string[]",
        description: "Column headers, left to right.",
      },
      {
        name: "rows",
        type: "HeatRow[]",
        description: "label plus a value per column.",
      },
      {
        name: "max",
        type: "number",
        description: "Lock the intensity scale across charts.",
      },
      {
        name: "legend",
        type: "boolean",
        default: "true",
        description: "Less / more glyph key.",
      },
      {
        name: "caption",
        type: "string",
        description: "Optional note under the matrix.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        default: '"shade"',
        description:
          "Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-calendar",
    title: "Calendar",
    name: "GraphCalendar",
    description:
      "One month as a seven-column grid. Marked days use the accent. today is wrapped in brackets.",
    registry: "graph-calendar",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption. Defaults to the month name.",
      },
      {
        name: "year",
        type: "number",
        description: "Full year.",
      },
      {
        name: "month",
        type: "number",
        description: "1–12.",
      },
      {
        name: "weekStartsOn",
        type: "0 | 1",
        default: "1",
        description: "0 is Sunday. 1 is Monday.",
      },
      {
        name: "marks",
        type: "number[] | CalendarMark[]",
        description: "Days to accent. Pass numbers, or { day, accent }.",
      },
      {
        name: "today",
        type: "number",
        description: "Day of the month to wrap in brackets. Pass it in.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-waterfall",
    title: "Waterfall",
    name: "GraphWaterfall",
    description:
      "Running total as floating bars. First row is the start, last is the end, signed values in between.",
    registry: "graph-waterfall",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "items",
        type: "WaterfallItem[]",
        description:
          "label, value, optional kind: start, in, out, or end. Kind is inferred if omitted.",
      },
      {
        name: "ticks",
        type: "number",
        default: "24",
        description: "Bar width in characters.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        default: '"shade"',
        description:
          "Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-uptime",
    title: "Uptime",
    name: "GraphUptime",
    description:
      "One glyph per day. ok, degraded, down, or empty. Wraps every 30 days.",
    registry: "graph-uptime",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "days",
        type: "UptimeStatus[]",
        description: "ok, degraded, down, or empty.",
      },
      {
        name: "from",
        type: "string",
        description: "Label at the start of the range.",
      },
      {
        name: "to",
        type: "string",
        description: "Label at the end of the range.",
      },
      {
        name: "columns",
        type: "number",
        default: "30",
        description: "Days per row. Short series are not padded to this width.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        default: '"shade"',
        description:
          "Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-slope",
    title: "Slope",
    name: "GraphSlope",
    description:
      "Two figures per row with an arrow between. Up uses the accent, down recedes.",
    registry: "graph-slope",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "fromLabel",
        type: "string",
        description: "Header over the first column.",
      },
      {
        name: "toLabel",
        type: "string",
        description: "Header over the second column.",
      },
      {
        name: "items",
        type: "SlopeItem[]",
        description: "label, from, and to.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-bullet",
    title: "Bullet",
    name: "GraphBullet",
    description:
      "Actual versus target on a shared track. The marker is the target.",
    registry: "graph-bullet",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "items",
        type: "BulletItem[]",
        description: "label, value, optional target, max, and display.",
      },
      {
        name: "ticks",
        type: "number",
        default: "20",
        description: "Track width in characters, not counting the brackets.",
      },
      {
        name: "glyphs",
        type: '"shade" | "ascii" | "hash" | "bar" | string[]',
        default: '"shade"',
        description:
          "Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-timer",
    title: "Timer",
    name: "GraphTimer",
    description:
      "Elapsed time, how long ago, or the time of day. The numbers update every second.",
    registry: "graph-timer",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "kind",
        type: '"elapsed" | "ago" | "clock"',
        default: '"elapsed"',
        description:
          "elapsed counts up from at. ago is relative. clock is the time of day.",
      },
      {
        name: "at",
        type: "Date | number | string",
        description:
          "Start time for elapsed and ago. A date, timestamp, or ISO string.",
      },
      {
        name: "caption",
        type: "string",
        description: "Line under the number.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-countdown",
    title: "Countdown",
    name: "GraphCountdown",
    description:
      "Time left until a date. After that it shows a short label you pass in.",
    registry: "graph-countdown",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Caption drawn on the top edge of the frame.",
      },
      {
        name: "to",
        type: "Date | number | string",
        description: "The deadline. A date, timestamp, or ISO string.",
      },
      {
        name: "done",
        type: "string",
        default: '"done"',
        description: "What to show after the deadline.",
      },
      {
        name: "caption",
        type: "string",
        description: "Line under the number.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner of the frame.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the outer frame.",
      },
    ],
  },
  {
    slug: "graph-frame",
    title: "Frame",
    name: "Graph",
    description:
      "Dashed frame wrapper used by every graph. Compose with GraphTitle, GraphBody, GraphRule, GraphTrack, and GraphTick. corner picks the character at each corner.",
    registry: "graph-frame",
    dependencies: ["motion"],
    props: [
      {
        name: "title",
        type: "string",
        description: "Optional caption. Renders as [ TITLE ] on the top edge.",
      },
      {
        name: "corner",
        type: "string",
        default: '"+"',
        description: "Character at each corner. Default +.",
      },
      {
        name: "className",
        type: "string",
        description: "Passed to the figure.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Usually GraphBody.",
      },
    ],
  },
]

const PALETTE_SLUGS = new Set([
  "graph-flow",
  "graph-bars",
  "graph-rank",
  "graph-cells",
  "graph-meter",
  "graph-spark",
  "graph-timeline",
  "graph-stack",
  "graph-funnel",
  "graph-gantt",
  "graph-plot",
  "graph-waffle",
  "graph-diff",
  "graph-compare",
  "graph-matrix",
  "graph-kpi",
  "graph-check",
  "graph-activity",
  "graph-heatmap",
  "graph-calendar",
  "graph-waterfall",
  "graph-uptime",
  "graph-slope",
  "graph-bullet",
  "graph-timer",
  "graph-countdown",
])

const paletteProp: PropRow = {
  name: "palette",
  type: '"mono" | "duo" | "multi"',
  default: '"mono"',
  description:
    "mono is one accent plus muted. duo paints the second series with --graph-accent-2. multi cycles three accents.",
}

export const components = catalog.map((item) => {
  const hint = CHOOSER[item.slug]
  const base = hint ? { ...item, when: hint.when, not: hint.not } : item

  if (!PALETTE_SLUGS.has(item.slug)) {
    return base
  }

  const corner = base.props.findIndex((prop) => prop.name === "corner")
  const props = [...base.props]
  props.splice(corner === -1 ? props.length : corner, 0, paletteProp)
  return { ...base, props }
})

export function getComponent(slug: string) {
  return components.find((item) => item.slug === slug)
}
