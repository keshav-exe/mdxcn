import { mdxExample } from "@/lib/docs/ascii"
import { comarkExample } from "@/lib/docs/comark"
import type { ComponentDoc, PropRow } from "@/lib/docs/catalog"

export const DESIGN_AND_MOOD = `Design
- Geist Mono. Dashed frame, plus-sign corners, title as [ TITLE ] on the top edge.
- One accent color: CSS variable --graph-accent. Unused rows recede with opacity (~0.4). Drawing graphs accept palette="mono" | "duo" | "multi" (default mono). duo uses --graph-accent-2 for the second series. multi cycles three accents. Do not invent extra hues.
- Glyphs do the drawing: █ ░ - = + ├ └ ✓. Borders are dashes, not SVG strokes. Do not use Recharts, canvas, or SVG.
- Numbers use tabular-nums and sit right-aligned.
- Motion is transform and opacity only, 220ms cubic-bezier(0.215, 0.61, 0.355, 1). Nothing loops or pulses. If prefers-reduced-motion, duration is 0. Timers still tick once a second as text.

Chooser
- a handful of numbers, no axis → GraphSpark
- a series with a y-scale → GraphPlot (columns of characters, not a line chart library)
- one fill from 0 to 1 → GraphMeter
- parts of a whole → GraphStack or GraphWaffle (not a pie)
- ok / slow / down days → GraphUptime
- actual vs target → GraphBullet
- before and after figures → GraphSlope
- a short ranked list → GraphRank (not Bars)
- one number plus a trend → GraphKpi
- two to four numbers, no trend → GraphStat
- elapsed, how long ago, or the time of day → GraphTimer
- time left until a date → GraphCountdown
- walking through a change → GraphFlow, then GraphTimeline
- pick A vs B → GraphCompare
- exact numbers on both axes → GraphMatrix
- a table with section titles → GraphSheet
- a punch list → GraphCheck
- what a PR did → GraphDiff, then GraphSlope
- overlapping work this week → GraphGantt

Host
- React, or MDX that can import the components → JSX from the examples.
- Plain Markdown (README, GitHub, Linear, PR comments) → official fenced ASCII from /llms.txt ## MDX, or the docs MDX tab. Swap labels, keep the frame. Do not invent ASCII. Do not paste JSX.
- Comark app (plain .md the app renders) → ::graph-* block from /llms.txt ## Comark, or the docs Comark tab. YAML props match the React API. Do not paste JSX. GitHub still gets fenced ASCII.
- Reading an existing file: the figure is characters. Edit labels. Do not replace a graph with SVG.
- No fenced ASCII: GraphFlow, GraphPlot, GraphActivity, GraphHeatmap, GraphCalendar, GraphTimer, GraphCountdown, GraphFrame. They still have a Comark block except GraphFrame. Pick another or skip.

Mood
Typed, not illustrated. Quiet monospace figures that sit next to prose. Two graphs per section is enough. Restraint over decoration. Do not restyle the frame. Default is one accent; palette is opt-in.`

export function installCli(origin: string, registry: string) {
  const host = origin || "<origin>"
  return `pnpm dlx shadcn@latest add ${host}/r/${registry}.json`
}

export function formatProps(props: PropRow[]) {
  return props
    .map((row) => {
      const fallback = row.default ? `, default ${row.default}` : ""
      return `- ${row.name} (${row.type}${fallback}): ${row.description}`
    })
    .join("\n")
}

type AgentPromptInput = {
  origin: string
  registry: string
  doc?: Pick<
    ComponentDoc,
    "title" | "name" | "description" | "dependencies" | "props" | "when" | "not"
  >
  example?: string
}

export function agentPrompt({
  origin,
  registry,
  doc,
  example,
}: AgentPromptInput) {
  const command = installCli(origin, registry)
  const deps = doc?.dependencies?.length
    ? doc.dependencies.map((item) => `\`${item}\``).join(", ")
    : "`motion`"

  if (!doc) {
    return `Install markdown graphs into this shadcn project.

${command}

These are React source files, not an npm package. You need ${deps}. Files land under @/registry/default. Import from there, or add a barrel.

${DESIGN_AND_MOOD}`
  }

  const usage = example
    ? `\nUsage\n\n${example.trim()}\n`
    : `\nImport\n\nimport { ${doc.name} } from "@/registry/default/${registry}/${registry}"\n`

  return `Install ${doc.name} (${doc.title}) from markdown graphs into this shadcn project.

${command}

These are React source files, not an npm package. You need ${deps}. Files land under @/registry/default.

What it is
${doc.description}
${doc.when ? `\nWhen to use\n${doc.when}\n` : ""}${doc.not ? `\nSkip it when\n${doc.not}\n` : ""}${usage}
Props
${formatProps(doc.props)}

${DESIGN_AND_MOOD}`
}

type PageExample = {
  title: string
  description?: string
  code: string
}

export type PageCopy = {
  title: string
  description: string
  kicker?: string
  registry?: string
  doc?: Pick<
    ComponentDoc,
    | "title"
    | "name"
    | "description"
    | "dependencies"
    | "props"
    | "registry"
    | "when"
    | "not"
  >
  examples?: PageExample[]
  extra?: string
}

export function pageMarkdown({
  origin,
  title,
  description,
  kicker,
  registry,
  doc,
  examples,
  extra,
}: PageCopy & { origin: string }) {
  const parts = [`# ${title}`]

  if (kicker) {
    parts.push("", kicker)
  }

  parts.push("", description)

  const name = registry ?? doc?.registry
  if (name) {
    parts.push("", "## Install", "", installCli(origin, name))
    parts.push(
      "",
      "## Agent",
      "",
      agentPrompt({ origin, registry: name, doc, example: examples?.[0]?.code })
    )

    const mdx = mdxExample(name)
    if (mdx) {
      parts.push(
        "",
        "## MDX",
        "",
        "Plain Markdown (README, GitHub, Linear, PR comments). Paste the fence. Do not paste JSX.",
        "",
        mdx.markdown
      )
    }

    const comark = comarkExample(name)
    if (comark) {
      parts.push(
        "",
        "## Comark",
        "",
        "Plain .md that a Comark app will render. YAML props match the React API. GitHub still gets the MDX fence.",
        "",
        comark.markdown
      )
    }
  }

  if (examples && examples.length > 0) {
    parts.push("", "## Examples")
    for (const example of examples) {
      parts.push("", `### ${example.title}`)
      if (example.description) {
        parts.push("", example.description)
      }
      parts.push("", example.code.trim())
    }
  }

  if (doc?.props.length) {
    parts.push("", "## Props", "")
    parts.push("| Prop | Type | Default | Description |")
    parts.push("| --- | --- | --- | --- |")
    for (const row of doc.props) {
      const fallback = row.default ?? "—"
      parts.push(
        `| ${row.name} | ${row.type} | ${fallback} | ${row.description} |`
      )
    }
  }

  if (extra) {
    parts.push("", extra.trim())
  }

  return parts.join("\n").replaceAll("$ORIGIN", origin || "<origin>")
}
