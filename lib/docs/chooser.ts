import type { ComponentDoc } from "@/lib/docs/catalog"
import { MDX_SKIP_SLUGS, isMdxSlug, mdxExample } from "@/lib/docs/ascii"
import { comarkChooserSection } from "@/lib/docs/comark"
import { recipesMarkdown } from "@/lib/docs/recipes"
import { SITE_URL } from "@/lib/site"

export const CHOOSER: Record<string, { when: string; not: string }> = {
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
  items: Pick<ComponentDoc, "slug" | "name" | "title" | "description">[],
  origin = SITE_URL
) {
  const host = origin || SITE_URL
  const rows = items
    .filter((item) => item.slug !== "graph-frame")
    .map((item) => {
      const row = CHOOSER[item.slug]
      const when = row?.when ?? item.description
      const not = row?.not ?? "—"
      return `| ${item.name} | ${item.slug} | ${when} | ${not} |`
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

  return `# Markdown Graphs

ASCII-framed React diagrams for MDX. Source is copied via shadcn registry, not npm.
Agents write JSX (React / importable MDX), paste an official fenced ASCII (README, GitHub, Linear), or write a \`::graph-*\` block for Comark. Do not invent ASCII. Do not draw SVG.
${host}

## When to use

Use Markdown Graphs when an agent is writing or editing a file and a figure would scan faster than a wall of bullets.

Reach for it when the writing is a path or a refactor, an incident or postmortem, a tradeoff, a pull request, overlapping work this week, a migration, or a README / RFC / launch list.

How to call it:

1. React or importable MDX: install with \`pnpm dlx shadcn@latest add ${host}/r/<slug>.json\` and copy JSX from ${host}/docs/examples.
2. Plain Markdown that cannot run a renderer (README, GitHub, Linear): paste the official fenced ASCII from ## MDX below. Do not invent ASCII. Do not paste JSX.
3. Comark app (plain \`.md\`, streaming, DB-backed content): paste a \`::graph-*\` block from ## Comark. Wiring: ${host}/docs/comark.
4. Install the skill from ${host}/skill.md so the chooser runs without fetching this file every time.

Do not use it for a one-sentence note, a pie chart, or a drawing that needs SVG. At most two figures, with prose between them.

## Machine-readable

- Markdown Graphs Developer API: ${host}/developers
- OpenAPI: ${host}/openapi.json
- API index: ${host}/api/v1
- Health: ${host}/api/v1/health
- JSON catalog: ${host}/api/v1/components
- One graph: ${host}/api/v1/components/<slug>
- agents.md: ${host}/agents.md
- Skill: ${host}/skill.md
- Recipes: ${host}/skill/recipes.md
- Registry item: ${host}/r/<slug>.json
- Deprecation policy: ${host}/developers/deprecation
- Sitemap: ${host}/sitemap.xml
- For agents: ${host}/agents
- Wiring: ${host}/docs/comark
- Landing: ${host}/comark

## CLI

Install graphs with the official shadcn CLI (not npm):

pnpm dlx shadcn@latest add ${host}/r/<slug>.json

Copy all graphs (includes the Comark adapter):

pnpm dlx shadcn@latest add ${host}/r/all.json

## Host

- React, or MDX that can import \`@/registry/default/...\`: copy JSX from ${host}/docs/examples. Install via shadcn.
- Plain Markdown that cannot run React (README, GitHub, Linear, Slack, PR comments): paste a fenced ASCII from ## MDX. Swap labels, keep the frame. Do not invent ASCII. Do not paste JSX.
- Comark: paste a \`::graph-*\` block from ## Comark. YAML props match the React API. GitHub does not run Comark — use fenced ASCII there.
- No fenced ASCII (${skip}): Flow, Plot, Activity, Heatmap, Calendar, Timer, Countdown, Frame have no ## MDX block. They still have a Comark block except Frame.

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

| Component | Slug | Use for | Not for |
| --- | --- | --- | --- |
${rows.join("\n")}

## MDX

Official fenced ASCII blocks. Paste into plain Markdown. Monospace keeps the frame aligned.

${asciiBlocks}

${comarkChooserSection(items, host)}

${recipesMarkdown(host)}
`
}
