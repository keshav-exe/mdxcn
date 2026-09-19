import type { ComponentDoc } from "@/lib/docs/catalog"
import { COMARK_PROPS } from "@/lib/docs/comark-props"
import { SITE_URL } from "@/lib/site"
import {
  filterName,
  GRAPH_FILTER_SLUGS,
  graphFilters,
  type GraphFilterName,
  type GraphFilterSlug,
} from "@/registry/default/graph-knap/graph-knap"

export const KNAP_URL = "https://knap.md"
export const KNAP_API_URL = "https://knap.md/api"
export const KNAP_REPO = "https://github.com/obsidianmd/knap"

export const KNAP_DESCRIPTION =
  "Turn data into framed mdxcn figures with Knap filters. Pipe a props object through graph_timeline, graph_meter, … and get the official fence, or a ::graph-* block."

export function isKnapSlug(slug: string): slug is GraphFilterSlug {
  return (GRAPH_FILTER_SLUGS as readonly string[]).includes(slug)
}

export function knapVarName(slug: string) {
  return slug.replace(/^graph-/, "").replaceAll("-", "_")
}

export function knapExample(slug: string) {
  if (!isKnapSlug(slug)) return null
  const props = COMARK_PROPS[slug]
  if (!props) return null
  const filter = filterName(slug) as GraphFilterName
  const varName = knapVarName(slug)
  const title =
    typeof props.title === "string" && props.title.trim()
      ? props.title.trim()
      : ""
  const template = title
    ? `{{ ${varName} | ${filter}:"${title.replaceAll('"', '\\"')}" }}`
    : `{{ ${varName} | ${filter} }}`
  const markdown = graphFilters[filter](
    JSON.stringify(props),
    title || undefined,
    {
      rawValue: props,
    }
  )
  return {
    filter,
    markdown,
    props,
    template,
    varName,
    variables: { [varName]: props },
  }
}

export const KNAP_WIRE = `import { createEngine, standardFilters } from "knap"
import { graphFilters } from "@/registry/default/graph-knap/graph-knap"

const engine = createEngine({
  filters: { ...standardFilters, ...graphFilters },
})

const result = await engine.render(template, { variables })
if (result.errors.length === 0) {
  console.log(result.output)
}`

export const KNAP_SUBSET = `import { createGraphFilters } from "@/registry/default/graph-knap/graph-knap"

const graphFilters = createGraphFilters(["graph_table", "graph_timeline"])`

export function knapChooserSection(
  items: Pick<ComponentDoc, "slug" | "name" | "title">[],
  origin = SITE_URL
) {
  const host = origin || SITE_URL
  const blocks = items
    .filter((item) => isKnapSlug(item.slug))
    .map((item) => {
      const example = knapExample(item.slug)
      if (!example) return ""
      const data = JSON.stringify(example.variables, null, 2)
      return `### ${item.title} (\`${item.name}\`, \`${example.filter}\`)

${host}/docs/${item.slug}

\`\`\`knap
${example.template}
\`\`\`

\`\`\`json
${data}
\`\`\`

${example.markdown}`
    })
    .filter(Boolean)
    .join("\n\n")

  return `## Knap

[Knap](${KNAP_URL}) turns data into Markdown. These filters emit the official fenced ASCII (or a \`::graph-*\` block when the figure has no ASCII, or when the param is \`comark\`). Do not invent ASCII. The Knap CLI does not load custom filters. Wire them in your app.

Install the filters after the graphs:

pnpm dlx shadcn@latest add @mdxcn/graph-knap

Wiring: ${host}/docs/knap
Landing: ${host}/knap
Knap: ${KNAP_URL}

${KNAP_WIRE}

Piped value is the same props object as the React API. A string param is the title.

${blocks}`
}

export const KNAP_DEMO_TEMPLATE = `# {{ title }}

p95 crossed 800ms at {{ start }}. Rollback at {{ rollback }}.

{{ events | graph_timeline:"NIGHT" }}

Same night. Two days users felt it.

{{ uptime | graph_uptime }}`

export const KNAP_DEMO_DATA = {
  title: "incident",
  start: "14:02",
  rollback: "14:11",
  events: [
    { date: "14:02", label: "p95 crossed 800ms" },
    {
      date: "14:11",
      label: "rolled back the cache flag",
      state: "now",
    },
    { date: "14:40", label: "write the postmortem", state: "next" },
  ],
  uptime: {
    title: "api",
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
} as const
