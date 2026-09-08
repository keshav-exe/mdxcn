import { SITE_URL } from "@/lib/site"

export type RecipeTag = "plan" | "debug" | "tradeoff" | "ship"

export type RecipeGraph = {
  slug: string
  label: string
  code: string
}

export type Recipe = {
  slug: string
  title: string
  blurb: string
  story: string
  tags: RecipeTag[]
  featured?: boolean
  graphs: RecipeGraph[]
}

export const recipes: Recipe[] = [
  {
    slug: "refactor",
    title: "Refactor",
    blurb: "Old path, new path, then the weeks.",
    story:
      "You're moving auth checks out of handlers. Show the request path first, then the work in order, with the current week marked.",
    tags: ["plan"],
    featured: true,
    graphs: [
      {
        slug: "graph-flow",
        label: "request path",
        code: `import { GraphFlow } from "@/registry/default/graph-flow/graph-flow"

<GraphFlow
  title="AUTH"
  rows={[
    {
      nodes: [
        { label: "request" },
        { label: "handler" },
        { label: "session util", tone: "muted" },
      ],
    },
    {
      nodes: [
        { label: "request" },
        { label: "middleware", tone: "accent" },
        { label: "handler" },
      ],
    },
  ]}
/>`,
      },
      {
        slug: "graph-timeline",
        label: "rollout plan",
        code: `import { GraphTimeline } from "@/registry/default/graph-timeline/graph-timeline"

<GraphTimeline
  title="PLAN"
  events={[
    { date: "w1", label: "extract session helper", state: "done" },
    { date: "w2", label: "move checks to middleware", state: "now" },
    { date: "w3", label: "delete the old util", state: "next" },
  ]}
/>`,
      },
    ],
  },
  {
    slug: "incident",
    title: "Incident",
    blurb: "What happened, and which days took the hit.",
    story:
      "p95 crossed the line, you rolled back a flag, and the postmortem is still open. The strip is the two days people felt it.",
    tags: ["debug"],
    featured: true,
    graphs: [
      {
        slug: "graph-timeline",
        label: "timeline",
        code: `import { GraphTimeline } from "@/registry/default/graph-timeline/graph-timeline"

<GraphTimeline
  title="INCIDENT"
  events={[
    { date: "14:02", label: "p95 crossed 800ms" },
    { date: "14:11", label: "rolled back the cache flag", state: "now" },
    { date: "14:40", label: "write the postmortem", state: "next" },
  ]}
/>`,
      },
      {
        slug: "graph-uptime",
        label: "uptime strip",
        code: `import { GraphUptime } from "@/registry/default/graph-uptime/graph-uptime"

<GraphUptime
  title="API"
  from="Aug 14"
  to="Aug 27"
  days={[
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
  ]}
/>`,
      },
    ],
  },
  {
    slug: "pick",
    title: "Pick one",
    blurb: "A matrix, then the sizes if they matter.",
    story:
      "You're choosing a queue. Checks and dashes first. Bundle size only if that's part of the argument.",
    tags: ["tradeoff"],
    graphs: [
      {
        slug: "graph-compare",
        label: "feature matrix",
        code: `import { GraphCompare } from "@/registry/default/graph-compare/graph-compare"

<GraphCompare
  title="QUEUE"
  columns={["BullMQ", "SQS"]}
  accent="BullMQ"
  rows={[
    { label: "in-process", values: [true, false] },
    { label: "retries", values: [true, true] },
    { label: "ops", values: ["redis", "aws"] },
    { label: "local", values: [true, false] },
  ]}
/>`,
      },
      {
        slug: "graph-rank",
        label: "bundle size",
        code: `import { GraphRank } from "@/registry/default/graph-rank/graph-rank"

<GraphRank
  title="INSTALL"
  items={[
    { label: "bullmq", value: 48, display: "48 kb" },
    { label: "ioredis", value: 31, display: "31 kb" },
    { label: "aws sdk", value: 120, display: "120 kb" },
  ]}
/>`,
      },
    ],
  },
  {
    slug: "review",
    title: "Pull request",
    blurb: "What moved, and what the numbers did.",
    story:
      "A review comment with a file list and a coverage slope. The reader shouldn't have to open the diff to get the shape.",
    tags: ["ship"],
    graphs: [
      {
        slug: "graph-diff",
        label: "files changed",
        code: `import { GraphDiff } from "@/registry/default/graph-diff/graph-diff"

<GraphDiff
  title="FILES"
  palette="duo"
  rows={[
    { label: "auth.ts", value: "new", sign: "add" },
    { label: "session.ts", value: "moved" },
    { label: "legacy-auth.ts", value: "gone", sign: "remove" },
  ]}
/>`,
      },
      {
        slug: "graph-slope",
        label: "coverage",
        code: `import { GraphSlope } from "@/registry/default/graph-slope/graph-slope"

<GraphSlope
  title="COVERAGE"
  fromLabel="main"
  toLabel="this pr"
  items={[
    { label: "auth", from: 41, to: 88 },
    { label: "billing", from: 72, to: 74 },
    { label: "docs", from: 11, to: 40 },
  ]}
/>`,
      },
    ],
  },
  {
    slug: "sprint",
    title: "This week",
    blurb: "Overlapping work, then the board counts.",
    story:
      "Monday stand-up. The track is the calendar. The numbers are what's in review, blocked, and already shipped.",
    tags: ["plan"],
    graphs: [
      {
        slug: "graph-gantt",
        label: "calendar",
        code: `import { GraphGantt } from "@/registry/default/graph-gantt/graph-gantt"

<GraphGantt
  title="THIS WEEK"
  columns={20}
  ticks={["mon", "wed", "fri"]}
  stage="patch"
  items={[
    { label: "rfc", start: 0, end: 0.4, complete: 1 },
    { label: "patch", start: 0.35, end: 0.8, complete: 0.55 },
    { label: "review", start: 0.7, end: 1, complete: 0 },
  ]}
/>`,
      },
      {
        slug: "graph-stat",
        label: "board counts",
        code: `import { GraphStat } from "@/registry/default/graph-stat/graph-stat"

<GraphStat
  title="BOARD"
  items={[
    { value: "4", label: "in review" },
    { value: "2", label: "blocked" },
    { value: "9", label: "shipped", accent: true },
  ]}
/>`,
      },
    ],
  },
  {
    slug: "migrate",
    title: "Migration",
    blurb: "How far the job is, and the count behind it.",
    story:
      "A backfill that's still running. The fill is the share. The figure is the row count, with the last points of the job underneath.",
    tags: ["ship"],
    graphs: [
      {
        slug: "graph-meter",
        label: "job progress",
        code: `import { GraphMeter } from "@/registry/default/graph-meter/graph-meter"

<GraphMeter
  title="ROWS"
  value={0.67}
  caption="users table"
/>`,
      },
      {
        slug: "graph-kpi",
        label: "rows migrated",
        code: `import { GraphKpi } from "@/registry/default/graph-kpi/graph-kpi"

<GraphKpi
  title="MIGRATED"
  value="1.2M"
  label="of 1.8M rows"
  hint="67%"
  data={[2, 3, 3, 5, 8, 9, 11, 12, 14, 16, 18, 21]}
/>`,
      },
    ],
  },
]

export const featuredRecipes = recipes.filter((item) => item.featured)

export function getRecipe(slug: string) {
  return recipes.find((item) => item.slug === slug)
}

export function recipeCopy(recipe: Recipe) {
  const imports = new Set<string>()
  const bodies: string[] = []

  for (const graph of recipe.graphs) {
    const lines = graph.code.trim().split("\n")
    const rest: string[] = []

    for (const line of lines) {
      if (line.startsWith("import ")) {
        imports.add(line)
      } else {
        rest.push(line)
      }
    }

    bodies.push(rest.join("\n").trim())
  }

  return `${[...imports].join("\n")}\n\n${bodies.join("\n\n")}`
}

export function recipesMarkdown(origin = SITE_URL) {
  const host = origin || SITE_URL
  const lines = recipes.map((item) => {
    const names = item.graphs
      .map((graph) => graph.slug.replace("graph-", ""))
      .join(" + ")
    return `- ${item.title}: ${item.blurb} Use ${names}. ${host}/docs/examples#${item.slug}`
  })

  return `## Recipes

Two graphs per write-up is enough. Prose between them. Copy the JSX from the examples when the host can import components. Plain Markdown: copy the matching fence from ## MDX above. Comark: copy the matching block from ## Comark.

${lines.join("\n")}

For agents: ${host}/agents
Skill: ${host}/docs/skill
`
}
