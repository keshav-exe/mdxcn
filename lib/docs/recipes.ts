import { toMdxCopy } from "@/lib/docs/mdx"
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
    title: "refactor",
    blurb: "Old path, new path, then the weeks.",
    story:
      "You're moving auth checks out of handlers. Show the request path first, then the work in order, with the current week marked.",
    tags: ["plan"],
    featured: true,
    graphs: [
      {
        slug: "graph-flow",
        label: "request path",
        code: `<GraphFlow title="AUTH">

request → handler → *session util*

request → **middleware** → handler

</GraphFlow>`,
      },
      {
        slug: "graph-timeline",
        label: "rollout plan",
        code: `<GraphTimeline title="PLAN">

- w1: extract session helper
- **w2: move checks to middleware**
- *w3: delete the old util*

</GraphTimeline>`,
      },
    ],
  },
  {
    slug: "incident",
    title: "incident",
    blurb: "What happened, and which days took the hit.",
    story:
      "p95 crossed the line, you rolled back a flag, and the postmortem is still open. The strip is the two days people felt it.",
    tags: ["debug"],
    featured: true,
    graphs: [
      {
        slug: "graph-timeline",
        label: "timeline",
        code: `<GraphTimeline title="INCIDENT">

- 14:02: p95 crossed 800ms
- **14:11: rolled back the cache flag**
- *14:40: write the postmortem*

</GraphTimeline>`,
      },
      {
        slug: "graph-uptime",
        label: "uptime strip",
        code: `<GraphUptime
  title="API"
  from="Aug 14"
  to="Aug 27"
  days="ok ok ok ok ok degraded ok ok down down ok ok ok ok"
/>`,
      },
    ],
  },
  {
    slug: "pick",
    title: "pick one",
    blurb: "A matrix, then the sizes if they matter.",
    story:
      "You're choosing a queue. Checks and dashes first. Bundle size only if that's part of the argument.",
    tags: ["tradeoff"],
    graphs: [
      {
        slug: "graph-compare",
        label: "feature matrix",
        code: `<GraphCompare title="QUEUE" accent="BullMQ">

| | BullMQ | SQS |
| --- | --- | --- |
| in-process | yes | no |
| retries | yes | yes |
| ops | redis | aws |
| local | yes | no |

</GraphCompare>`,
      },
      {
        slug: "graph-rank",
        label: "bundle size",
        code: `<GraphRank title="INSTALL">

- 48 bullmq
- 31 ioredis
- 120 aws sdk

</GraphRank>`,
      },
    ],
  },
  {
    slug: "review",
    title: "pull request",
    blurb: "What moved, and what the numbers did.",
    story:
      "A review comment with a file list and a coverage slope. The reader shouldn't have to open the diff to get the shape.",
    tags: ["ship"],
    graphs: [
      {
        slug: "graph-diff",
        label: "files changed",
        code: `<GraphDiff title="FILES" palette="duo">

- auth.ts: +new
- session.ts: moved
- legacy-auth.ts: -gone

</GraphDiff>`,
      },
      {
        slug: "graph-slope",
        label: "coverage",
        code: `<GraphSlope title="COVERAGE" fromLabel="main" toLabel="this pr">

- auth: 41 → 88
- billing: 72 → 74
- docs: 11 → 40

</GraphSlope>`,
      },
    ],
  },
  {
    slug: "sprint",
    title: "this week",
    blurb: "Overlapping work, then the board counts.",
    story:
      "Monday stand-up. The track is the calendar. The numbers are what's in review, blocked, and already shipped.",
    tags: ["plan"],
    graphs: [
      {
        slug: "graph-gantt",
        label: "calendar",
        code: `<GraphGantt title="THIS WEEK" columns={20} ticks="mon wed fri" stage="patch">

- rfc: 0 0.4 1
- **patch**: 0.35 0.8 0.55
- review: 0.7 1 0

</GraphGantt>`,
      },
      {
        slug: "graph-stat",
        label: "board counts",
        code: `<GraphStat title="BOARD">

- 4 in review
- 2 blocked
- **9 shipped**

</GraphStat>`,
      },
    ],
  },
  {
    slug: "migrate",
    title: "migration",
    blurb: "How far the job is, and the count behind it.",
    story:
      "A backfill that's still running. The fill is the share. The figure is the row count, with the last points of the job underneath.",
    tags: ["ship"],
    graphs: [
      {
        slug: "graph-meter",
        label: "job progress",
        code: `<GraphMeter title="ROWS" value="67%" caption="users table" />`,
      },
      {
        slug: "graph-kpi",
        label: "rows migrated",
        code: `<GraphKpi
  title="MIGRATED"
  value="1.2M"
  label="of 1.8M rows"
  hint="67%"
  data="2 3 3 5 8 9 11 12 14 16 18 21"
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
  return recipe.graphs
    .map((graph) => toMdxCopy(graph.code))
    .filter(Boolean)
    .join("\n\n")
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

Two graphs per write-up is enough. Prose between them. Copy the framed ASCII from the examples MDX tab into Notion or a README. Wrap markdown children in the parent when the host can register components. Comark: ## Comark.

${lines.join("\n")}

for agents: ${host}/agents
Skill: ${host}/docs/skill
`
}
