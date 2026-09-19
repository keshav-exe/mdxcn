import {
  aboutMarkdown,
  contactMarkdown,
  deprecationMarkdown,
  developersMarkdown,
  homeMarkdown,
  privacyMarkdown,
} from "@/lib/agent/copy"
import { components, getComponent } from "@/lib/docs/catalog"
import { pageMarkdown } from "@/lib/docs/prompt"
import { recipes, recipeCopy } from "@/lib/docs/recipes"
import {
  skillAgents,
  skillChooser,
  skillExamples,
  skillRules,
} from "@/lib/docs/skill"
import { readSkillFile } from "@/lib/docs/skill-files"
import { AGENTS_DESCRIPTION, DOCS_DESCRIPTION, SITE_URL } from "@/lib/site"
import { COMARK_DESCRIPTION, COMARK_WIRE } from "@/lib/docs/comark"
import {
  KNAP_API_URL,
  KNAP_DESCRIPTION,
  KNAP_URL,
  KNAP_WIRE,
} from "@/lib/docs/knap"

function hostOf(origin?: string) {
  return origin || SITE_URL
}

function docsIntro(origin: string) {
  const extra = [
    "## components",
    "",
    ...components.map(
      (item) => `- ${item.title} (${item.name}): ${item.description}`
    ),
  ].join("\n")

  return pageMarkdown({
    origin,
    title: "introduction",
    description: DOCS_DESCRIPTION,
    registry: "all",
    extra,
  })
}

function installationMarkdown(origin: string) {
  return pageMarkdown({
    origin,
    title: "installation",
    description:
      "these are source files, not an npm package. you need an existing shadcn project and the motion dependency.",
    registry: "all",
    extra: `## one component

run the shadcn cli against this site's registry, or copy the files from github.

pnpm dlx shadcn@latest add $ORIGIN/r/graph-table.json

## everything

installs every graph and the shared frame code into registry/default.

pnpm dlx shadcn@latest add $ORIGIN/r/all.json

## namespace

add the registry once in components.json, then install components by name.

pnpm dlx shadcn@latest registry add @mdxcn=$ORIGIN/r/{name}.json

then:

pnpm dlx shadcn@latest add @mdxcn/graph-table

## import

files land under @/registry.

import { GraphTable } from "@/registry/default/graph-table/graph-table"

## mdx

register the parent once in mdx-components.tsx. the mdx tab is the framed figure — copy it into notion or a readme.

## agents

$ORIGIN/agents is write vs read. $ORIGIN/docs/comark is ::graph-* in a plain .md file. $ORIGIN/docs/knap is graph_* filters that emit the fence. $ORIGIN/docs/skill is the skill.md. $ORIGIN/llms.txt is the chooser, the ascii blocks, the comark blocks, and the knap filters.`,
  })
}

function examplesMarkdown(origin: string) {
  const extra = [
    "## examples",
    "",
    ...recipes.flatMap((item) => [
      `### ${item.title}`,
      "",
      item.story,
      "",
      recipeCopy(item),
      "",
    ]),
  ].join("\n")

  return pageMarkdown({
    origin,
    title: "examples",
    description:
      "Short write-ups with two graphs each. A refactor, an incident, a tradeoff, a pull request.",
    extra,
  })
}

function comarkDocsMarkdown(origin: string) {
  return pageMarkdown({
    origin,
    title: "comark",
    description: COMARK_DESCRIPTION,
    registry: "graph-comark",
    extra: `## Wire

${COMARK_WIRE}

## Hosts

GitHub, Linear, and a README still get the fenced ASCII. They do not run Comark. Landing: $ORIGIN/comark.`,
  })
}

function comarkLandingMarkdown(origin: string) {
  return pageMarkdown({
    origin,
    title: "comark",
    description: COMARK_DESCRIPTION,
    extra: `Write figures as ::graph-* blocks in Markdown. Comark parses the file. These graphs render it.

## Wire

${COMARK_WIRE}

## Links

- Wiring: $ORIGIN/docs/comark
- Skill: $ORIGIN/docs/skill
- Demo: https://comark-demo.vercel.app
- Comark: https://comark.dev`,
  })
}

function knapDocsMarkdown(origin: string) {
  return pageMarkdown({
    origin,
    title: "knap",
    description: KNAP_DESCRIPTION,
    registry: "graph-knap",
    extra: `## Wire

${KNAP_WIRE}

## Hosts

Output is Markdown. GitHub and a README can open the fence. A Comark app can open ::graph-* if you passed comark. The Knap CLI does not load these filters. Landing: $ORIGIN/knap.`,
  })
}

function knapLandingMarkdown(origin: string) {
  return pageMarkdown({
    origin,
    title: "knap",
    description: KNAP_DESCRIPTION,
    extra: `Pipe graph props through a graph_* filter. Knap renders Markdown. These filters draw the official fence.

## Wire

${KNAP_WIRE}

## Links

- Wiring: $ORIGIN/docs/knap
- Skill: $ORIGIN/docs/skill
- Knap: ${KNAP_URL}
- API: ${KNAP_API_URL}`,
  })
}

async function skillMarkdown(origin: string) {
  const source = await readSkillFile("SKILL.md")
  const extra = [
    "## Install",
    "",
    "Same two files. Put them in the skills folder your agent already reads.",
    "",
    ...skillAgents.flatMap((item) => [
      `${item.name}: ${item.project}/mdxcn (project) or ${item.personal}/mdxcn (personal)`,
    ]),
    "",
    "curl -fsSL $ORIGIN/skill.md -o <dir>/mdxcn/SKILL.md",
    "curl -fsSL $ORIGIN/skill/recipes.md -o <dir>/mdxcn/recipes.md",
    "",
    "## What it does",
    "",
    "When the agent is explaining a path, an incident, a tradeoff, or a PR, it puts at most two framed graphs next to the prose. React or importable MDX gets JSX. A Comark app gets a ::graph-* block. A Knap template gets a graph_* filter. Plain Markdown gets the official fenced ASCII from /llms.txt.",
    "",
    "## Files",
    "",
    source,
  ].join("\n")

  return pageMarkdown({
    origin,
    title: "skill",
    description:
      "A SKILL.md that tells the agent which graph to put next to the prose.",
    extra,
  })
}

function componentMarkdown(slug: string, origin: string) {
  const item = getComponent(slug)
  if (!item) {
    return null
  }

  return pageMarkdown({
    origin,
    title: item.title,
    description: item.description,
    kicker: item.name,
    registry: item.registry,
    doc: item,
  })
}

function agentsMarkdown(origin: string) {
  const host = hostOf(origin)
  const picks = skillChooser
    .map(
      (row) =>
        `- ${row.writing}: ${row.graphs.map((graph) => graph.name).join(", then ")}`
    )
    .join("\n")
  const prompts = skillExamples
    .map((item) => `### ${item.label}\n\n${item.prompt}`)
    .join("\n\n")

  return `# for agents

${AGENTS_DESCRIPTION}

When a write-up needs a figure, the skill picks which graph to use. Emit JSX in MDX, a ::graph-* block in a Comark app, a graph_* filter in a Knap template, or the official fence in a README, PR, or Linear note.

## Writing and reading

On write, emit at most two graphs next to the claim — JSX for React, YAML for Comark, a Knap filter when data becomes Markdown, or the official fence from ${host}/llms.txt when the host cannot run a renderer.

On read, the figure is still characters in the file, so opening the MDX shows labels and values. Edit the labels; do not replace a graph with SVG.

## How to call it

1. Put ${host}/skill.md and ${host}/skill/recipes.md in the skills folder the agent already reads.
2. If the host is React, install the components: \`pnpm dlx shadcn@latest add ${host}/r/all.json\`.
3. Ask for a write-up. At most two graphs. Prose between them.

## Chooser

${picks}

## Rules

${skillRules.map((rule) => `- ${rule}`).join("\n")}

## Try it

${prompts}

## Links

- Skill install: ${host}/docs/skill
- Comark: ${host}/comark
- Comark wiring: ${host}/docs/comark
- Knap: ${host}/knap
- Knap wiring: ${host}/docs/knap
- Examples: ${host}/docs/examples
- OpenAPI: ${host}/openapi.json
- JSON catalog: ${host}/api/v1/components
- developer api: ${host}/developers
- agents.md: ${host}/agents.md
`
}

export async function markdownForPath(path: string, origin = SITE_URL) {
  const host = hostOf(origin)
  const clean = path.replace(/\.md$/i, "") || "/"

  switch (clean) {
    case "/":
      return homeMarkdown(host)
    case "/agents":
      return agentsMarkdown(host)
    case "/developers":
      return developersMarkdown(host)
    case "/developers/deprecation":
      return deprecationMarkdown(host)
    case "/about":
      return aboutMarkdown(host)
    case "/contact":
      return contactMarkdown(host)
    case "/privacy":
      return privacyMarkdown(host)
    case "/docs":
      return docsIntro(host)
    case "/docs/installation":
      return installationMarkdown(host)
    case "/docs/examples":
      return examplesMarkdown(host)
    case "/docs/comark":
      return comarkDocsMarkdown(host)
    case "/comark":
      return comarkLandingMarkdown(host)
    case "/docs/knap":
      return knapDocsMarkdown(host)
    case "/knap":
      return knapLandingMarkdown(host)
    case "/docs/skill":
      return skillMarkdown(host)
    default:
      break
  }

  const docMatch = /^\/docs\/([a-z0-9-]+)$/.exec(clean)
  if (docMatch?.[1]) {
    return componentMarkdown(docMatch[1], host)
  }

  return null
}

export function knownMarkdownPaths() {
  return [
    "/",
    "/agents",
    "/developers",
    "/developers/deprecation",
    "/about",
    "/contact",
    "/privacy",
    "/docs",
    "/docs/installation",
    "/docs/examples",
    "/docs/comark",
    "/comark",
    "/docs/knap",
    "/knap",
    "/docs/skill",
    ...components.map((item) => `/docs/${item.slug}`),
  ]
}
