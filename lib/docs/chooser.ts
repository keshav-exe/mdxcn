import type { ComponentDoc } from "@/lib/docs/catalog"
import { MDX_SKIP_SLUGS, isMdxSlug, mdxExample } from "@/lib/docs/ascii"
import { comarkChooserSection } from "@/lib/docs/comark"
import { knapChooserSection } from "@/lib/docs/knap"
import { recipesMarkdown } from "@/lib/docs/recipes"
import { SITE_URL } from "@/lib/site"

export const CHOOSER: Record<string, { when: string; not: string }> = {
  callout: {
    when: "Good for an aside the reader should not skip — a caveat, a tip, a breaking change.",
    not: "A quote is Quote. A list of steps is Steps.",
  },
  quote: {
    when: "Good for one sentence someone else said, with a name under it.",
    not: "Your own caveat is Callout.",
  },
  steps: {
    when: "Good for a procedure — install, migrate, release — with one step marked now.",
    not: "Dated events are Timeline. A punch list with done boxes is Check.",
  },
  terminal: {
    when: "Good for a command and what it printed.",
    not: "Source code is a fenced code block. A file tree is Tree.",
  },
  changelog: {
    when: "Good for one release: what was added, changed, fixed, removed.",
    not: "Bundle or headcount deltas with numbers are Diff.",
  },
  "graph-table": {
    when: "Good when the numbers belong in a spreadsheet.",
    not: "Grouped sections are Sheet. Label/value rows are Spec.",
  },
  "graph-sheet": {
    when: "Good when a table needs section titles — an API, an RFC, a spec with groups.",
    not: "A flat table is Table. Label/value rows are Spec.",
  },
  "graph-flow": {
    when: "Good for a pipeline, a request path, or walking through a change.",
    not: "A dated list is Timeline. A schedule with start and end is Gantt.",
  },
  "graph-bars": {
    when: "Good for a before and after, or any two small histograms.",
    not: "A ranked list is Rank.",
  },
  "graph-rank": {
    when: "Good for traffic, coverage, or anything you'd sort highest first.",
    not: "Two histograms side by side is Bars. A table of numbers is Table.",
  },
  "graph-cells": {
    when: "Good for a small grid of filled and empty cells.",
    not: "A share of a hundred cells is Waffle. A year of days is Activity.",
  },
  "graph-meter": {
    when: "Good for one value between 0 and 1, shown as a fill.",
    not: "Actual versus a target is Bullet. Parts of a whole is Stack.",
  },
  "graph-spark": {
    when: "Good for a handful of numbers when you don't need an axis.",
    not: "If you need a y-scale, use Plot.",
  },
  "graph-kpi": {
    when: "Good when one number is the headline and the rest is context.",
    not: "Several numbers with no trend is Stat.",
  },
  "graph-tree": {
    when: "Good for nested files or an org chart.",
    not: "A timeline or a table.",
  },
  "graph-timeline": {
    when: "Good for steps in order, with one marked as current.",
    not: "A punch list is Check. A schedule with start and end is Gantt.",
  },
  "graph-check": {
    when: "Good for a punch list. Done is [x], the rest stay [ ].",
    not: "Dated steps are Timeline.",
  },
  "graph-stack": {
    when: "Good for parts of a whole on one track.",
    not: "There is no pie chart. Use Waffle if you want a share of cells.",
  },
  "graph-funnel": {
    when: "Good for steps that get narrower as people drop off.",
    not: "A ranked list is Rank. A process diagram is Flow.",
  },
  "graph-gantt": {
    when: "Good for work that overlaps on a shared calendar.",
    not: "A dated log is Timeline.",
  },
  "graph-plot": {
    when: "Good when the series needs a y-scale.",
    not: "A handful of points with no axis is Spark.",
  },
  "graph-waffle": {
    when: "Good for a share shown as a grid of about a hundred cells.",
    not: "Labeled parts of a whole is Stack.",
  },
  "graph-diff": {
    when: "Good for showing what was added, removed, or kept.",
    not: "A list of numeric before and after is Slope.",
  },
  "graph-invoice": {
    when: "Good for from, bill-to, line items, and totals.",
    not: "A generic table is Table.",
  },
  "graph-compare": {
    when: "Good for putting two options side by side.",
    not: "Exact numbers on both axes are Matrix. Numeric ranks are Rank.",
  },
  "graph-matrix": {
    when: "Good when both axes are labels and the cells are exact numbers.",
    not: "Intensities are Heatmap. Yes/no features are Compare.",
  },
  "graph-stat": {
    when: "Good for two to four large numbers, with no sparkline.",
    not: "One number with a trend is KPI. A live clock is Timer.",
  },
  "graph-spec": {
    when: "Good for aligned label and value rows, like a spec sheet.",
    not: "Large headline numbers are Stat. A table with headers is Table. Grouped sections are Sheet.",
  },
  "graph-activity": {
    when: "Good for daily counts over months, like a contribution grid.",
    not: "One month of marks is Calendar. Up or down days is Uptime.",
  },
  "graph-heatmap": {
    when: "Good for a labeled grid of intensities.",
    not: "Exact numbers on both axes are Matrix. A contribution calendar is Activity.",
  },
  "graph-calendar": {
    when: "Good for one month with a few days marked.",
    not: "A year of activity is Activity.",
  },
  "graph-waterfall": {
    when: "Good for a running total as floating bars.",
    not: "Parts of a whole is Stack.",
  },
  "graph-uptime": {
    when: "Good for a status per day, or the blast radius of an outage.",
    not: "A heatmap or an activity grid.",
  },
  "graph-slope": {
    when: "Good for a before and after number on each row.",
    not: "Two bar groups is Bars. A ranked list is Rank.",
  },
  "graph-bullet": {
    when: "Good when a number has a goal sitting on the same track.",
    not: "A single fill from 0 to 1 is Meter.",
  },
  "graph-timer": {
    when: "Good for uptime, last deploy, or a clock in the corner.",
    not: "Time left until a date is Countdown. A static number is Stat.",
  },
  "graph-countdown": {
    when: "Good for a freeze, a launch, or a window that closes.",
    not: "Elapsed time since a start is Timer.",
  },
  "graph-frame": {
    when: "Good when you're putting together a custom figure.",
    not: "If the chart already exists, install that one instead.",
  },
}

export function chooserMarkdown(
  items: Pick<
    ComponentDoc,
    "slug" | "name" | "title" | "description" | "mdx"
  >[],
  origin = SITE_URL
) {
  const host = origin || SITE_URL
  const rows = items
    .filter((item) => item.slug !== "graph-frame")
    .map((item) => {
      const row = CHOOSER[item.slug]
      const when = row?.when ?? item.description
      const not = row?.not ?? "—"
      const mdx = item.mdx ? `\`${item.mdx}\`` : "props"
      return `| ${item.name} | ${item.slug} | ${when} | ${not} | ${mdx} |`
    })

  const skip = MDX_SKIP_SLUGS.map((slug) => slug.replace("graph-", "")).join(
    ", "
  )

  const asciiBlocks = items
    .filter((item) => isMdxSlug(item.slug))
    .map((item) => {
      const mdx = mdxExample(item.slug)
      if (!mdx) {
        return ""
      }

      return `### ${item.title} (\`${item.name}\`, \`${item.slug}\`)

${host}/docs/${item.slug}

${mdx.markdown}`
    })
    .filter(Boolean)
    .join("\n\n")

  return `# mdxcn

ASCII-framed React diagrams for MDX. Source is copied via shadcn registry, not npm.
The docs .mdx tab is the framed figure (dashed box, [ TITLE ], glyphs). Paste that into Notion, Linear, or a README. Keep the fence. Wrap markdown children in the parent after registering once (React / MDX). Write a \`::graph-*\` block for Comark, or pipe data through a Knap filter. Do not invent ASCII. Do not draw SVG.
${host}

## When to use

Use mdxcn when an agent is writing or editing a file and a figure would scan faster than a wall of bullets.

Reach for it when the writing is a path or a refactor, an incident or postmortem, a tradeoff, a pull request, overlapping work this week, a migration, or a README / RFC / launch list.

How to call it:

1. Notion, Linear, or a README: copy the framed ASCII from the docs MDX tab. Keep the fence so the + corners stay aligned.
2. React or importable MDX: install with \`pnpm dlx shadcn@latest add ${host}/r/<slug>.json\`, register the parent once in mdx-components.tsx, wrap markdown children in the tag.
3. Plain Markdown that cannot run a renderer (README, GitHub): same framed ASCII from ## MDX below. Do not invent ASCII. Do not paste JSX.
4. Comark app (plain \`.md\`, streaming, DB-backed content): paste a \`::graph-*\` block from ## Comark. Wiring: ${host}/docs/comark.
5. Knap template (data → Markdown): pipe props through a \`graph_*\` filter from ## Knap. Wiring: ${host}/docs/knap.
6. Install the skill from ${host}/skill.md so the chooser runs without fetching this file every time.

Do not use it for a one-sentence note, a pie chart, or a drawing that needs SVG. At most two figures, with prose between them.

## Machine-readable

- OpenAPI: ${host}/openapi.json
- JSON catalog: ${host}/api/v1/components
- Skill: ${host}/skill.md
- Registry: ${host}/r/<slug>.json
- Agents: ${host}/agents

## CLI

Install graphs with the official shadcn CLI (not npm):

pnpm dlx shadcn@latest add ${host}/r/<slug>.json

Copy all graphs (includes the Comark adapter and Knap filters):

pnpm dlx shadcn@latest add ${host}/r/all.json

## Host

- Notion, Linear, Google Docs, any rich text editor: copy the framed ASCII from the docs MDX tab. Keep the fence.
- React, or MDX that can register the parent: wrap markdown children in the tag. Install via shadcn. Register once in mdx-components.tsx. No extra child imports.
- Plain Markdown that cannot run React (README, GitHub, Slack, PR comments): paste a fenced ASCII from ## MDX. Swap labels, keep the frame. Do not invent ASCII. Do not paste JSX.
- Comark: paste a \`::graph-*\` block from ## Comark. YAML props match the React API. GitHub does not run Comark — use fenced ASCII there.
- Knap: pipe the same props through a \`graph_*\` filter from ## Knap. Output is the official fence, or \`::graph-*\` when the figure has no ASCII / the param is \`comark\`. The Knap CLI does not load these filters. Wire them in your app.
- No fenced ASCII (${skip}): Flow, Plot, Activity, Heatmap, Calendar, Timer, Countdown, Frame have no ## MDX block. They still have a Comark block and a Knap filter (YAML) except Frame.

## Rules

- Geist Mono. Dashed frame, + corners, title as [ TITLE ].
- Charts are made of characters (█ ░ - = + ├ └). Borders are dashes. Do not use SVG, Recharts, or canvas.
- One accent: --graph-accent. palette="duo" | "multi" is opt-in.
- Motion is opacity and transform, ~220ms, no loops, no pulsing.
- Copy the example props exactly. Do not invent extra hues or chart libraries.

## Install

pnpm dlx shadcn@latest add ${host}/r/<slug>.json

Files land under @/registry/default.

## Chooser

| Component | Slug | Use for | Not for | MDX children |
| --- | --- | --- | --- | --- |
${rows.join("\n")}

## MDX

Official fenced ASCII blocks. Paste into plain Markdown. Monospace keeps the frame aligned.

${asciiBlocks}

${comarkChooserSection(items, host)}

${knapChooserSection(items, host)}

${recipesMarkdown(host)}
`
}
