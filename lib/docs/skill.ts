import { GITHUB_URL } from "@/lib/github"
import { SITE_URL } from "@/lib/site"

export const SKILL_DIR = "skills/markdown-graphs"
export const SKILL_URL = `${GITHUB_URL}/tree/main/${SKILL_DIR}`

export type SkillGraph = {
  name: string
  slug: string
}

export type SkillChooserRow = {
  writing: string
  graphs: SkillGraph[]
}

export type SkillAgent = {
  id: "cursor" | "claude" | "codex" | "opencode"
  name: string
  project: string
  personal: string
}

export const skillAgents: SkillAgent[] = [
  {
    id: "cursor",
    name: "Cursor",
    project: ".cursor/skills",
    personal: "~/.cursor/skills",
  },
  {
    id: "claude",
    name: "Claude Code",
    project: ".claude/skills",
    personal: "~/.claude/skills",
  },
  {
    id: "codex",
    name: "Codex",
    project: ".agents/skills",
    personal: "~/.agents/skills",
  },
  {
    id: "opencode",
    name: "OpenCode",
    project: ".opencode/skills",
    personal: "~/.config/opencode/skills",
  },
]

export const skillChooser: SkillChooserRow[] = [
  {
    writing: "A path or a refactor",
    graphs: [
      { name: "GraphFlow", slug: "graph-flow" },
      { name: "GraphTimeline", slug: "graph-timeline" },
    ],
  },
  {
    writing: "An incident",
    graphs: [
      { name: "GraphTimeline", slug: "graph-timeline" },
      { name: "GraphUptime", slug: "graph-uptime" },
    ],
  },
  {
    writing: "Pick A vs B",
    graphs: [
      { name: "GraphCompare", slug: "graph-compare" },
      { name: "GraphRank", slug: "graph-rank" },
    ],
  },
  {
    writing: "What a PR changed",
    graphs: [
      { name: "GraphDiff", slug: "graph-diff" },
      { name: "GraphSlope", slug: "graph-slope" },
    ],
  },
  {
    writing: "Overlapping work",
    graphs: [
      { name: "GraphGantt", slug: "graph-gantt" },
      { name: "GraphStat", slug: "graph-stat" },
    ],
  },
  {
    writing: "A migration in flight",
    graphs: [
      { name: "GraphMeter", slug: "graph-meter" },
      { name: "GraphKpi", slug: "graph-kpi" },
    ],
  },
  {
    writing: "One headline number",
    graphs: [
      { name: "GraphKpi", slug: "graph-kpi" },
      { name: "GraphStat", slug: "graph-stat" },
    ],
  },
  {
    writing: "An RFC or a launch list",
    graphs: [
      { name: "GraphSheet", slug: "graph-sheet" },
      { name: "GraphCheck", slug: "graph-check" },
    ],
  },
  {
    writing: "Nested files",
    graphs: [{ name: "GraphTree", slug: "graph-tree" }],
  },
]

export const skillRules = [
  "At most two graphs in a section. Prose between them.",
  "React / importable MDX: JSX. Comark: ::graph-* with YAML. GitHub / README / Linear: official fenced ASCII from /llms.txt. Do not invent ASCII.",
  "Titles: short uppercase, drawn as [ TITLE ].",
  "Labels: lowercase, plain (auth middleware, not AuthMiddleware Layer).",
  "Copy props from docs or recipes. Do not invent APIs, extra hues, or chart libraries.",
  'palette="duo" / "multi" only when a second or third series needs it.',
  "Motion is already in the components. Do not add loops or pulses.",
]

export type SkillExample = {
  label: string
  hint: string
  prompt: string
}

export const skillExamples: SkillExample[] = [
  {
    label: "Refactor",
    hint: "GraphFlow, then GraphTimeline",
    prompt: `We're moving session checks out of route handlers into middleware. Write a short plan for the team.

Use markdown graphs for the before/after request path and the week-by-week rollout. Prose between the two figures. Don't draw SVG.`,
  },
  {
    label: "Incident",
    hint: "GraphTimeline, then GraphUptime",
    prompt: `Draft a tight postmortem: p95 crossed 800ms at 14:02, we rolled back the cache flag at 14:11, the write-up is still open.

Use markdown graphs — a timeline of the night, then which days users felt it. No SVG.`,
  },
  {
    label: "Pull request",
    hint: "GraphDiff, then GraphSlope",
    prompt: `Leave a PR review comment on the auth refactor. Summarize what files moved, then show how coverage changed on main vs this branch.

    Use markdown graphs from this project. At most two figures. Don't invent APIs or draw SVG.`,
  },
  {
    label: "Pick one",
    hint: "GraphCompare, then GraphRank",
    prompt: `We're choosing a queue: BullMQ vs SQS. Write the tradeoff for the RFC.

Use markdown graphs — a feature matrix, then bundle size only if it matters. Don't draw SVG.`,
  },
  {
    label: "README",
    hint: "Fenced ASCII, not JSX",
    prompt: `Add a launch section to the README. It's a .md file, no React.

Use markdown graphs — a punch list (GraphCheck fence) and a grouped table if it earns it. Paste the official fenced ASCII from llms.txt. Don't paste JSX.`,
  },
  {
    label: "Comark",
    hint: "::graph-timeline, then ::graph-uptime",
    prompt: `Write this postmortem as a Comark Markdown file. p95 crossed 800ms at 14:02, rollback at 14:11.

Use ::graph-* blocks with YAML props. At most two figures. Don't paste JSX. Don't draw SVG.`,
  },
]

export function skillCurl(origin: string, dir: string) {
  const host = origin || SITE_URL
  return `mkdir -p ${dir}/markdown-graphs
curl -fsSL ${host}/skill.md -o ${dir}/markdown-graphs/SKILL.md
curl -fsSL ${host}/skill/recipes.md -o ${dir}/markdown-graphs/recipes.md`
}

export function skillCopyFromRepo(dir: string) {
  return `cp -R skills/markdown-graphs ${dir}/markdown-graphs`
}

export function skillPrompt(origin: string, dir = ".agents/skills") {
  const host = origin || SITE_URL
  return `Copy the markdown graphs skill into this project. It is a SKILL.md (Agent Skills). It tells you when to put a framed graph next to the prose, which component to pick, and whether to write JSX, a ::graph-* block for Comark, or paste the official fenced ASCII. Do not draw SVG. Do not invent ASCII art.

Put it in the skills folder this agent already reads (${dir}/markdown-graphs). If this repo uses a different skills directory (.cursor/skills, .claude/skills, .agents/skills, .opencode/skills), use that instead.

${skillCurl(host, dir)}

If the graph files are missing and the host is React, install them first:

pnpm dlx shadcn@latest add ${host}/r/all.json

Fetch ${host}/agents for the write and read story. Fetch ${host}/llms.txt for the chooser, the MDX ASCII blocks, and the Comark blocks. Copy JSX from ${host}/docs/examples when the file can import components. Copy ::graph-* from ${host}/docs/comark when the host is Comark.`
}
