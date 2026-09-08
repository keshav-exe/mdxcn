export const SITE_URL = "https://mdx-graphs.kshv.me"
export const REGISTRY_SCOPE = "@mdx-graphs"

export function scopedRegistryInstall(name: string) {
  return `pnpm dlx shadcn@latest add ${REGISTRY_SCOPE}/${name}`
}
export const SITE_NAME = "Markdown Graphs"
export const SITE_NAME_SHORT = "markdown graphs"
/** Browser / OG homepage title — what people search for. */
export const SITE_TITLE =
  "markdown-friendly React components with an acquired taste"
export const SITE_KEYWORDS = [
  "markdown-friendly React components",
  "React markdown components",
  "markdown components",
  "MDX components",
  "React MDX",
  "Markdown Graphs",
  "mdx-graphs",
  "markdown graphs",
  "ASCII charts",
  "ASCII diagrams",
  "ASCII graphs",
  "MDX graphs",
  "markdown charts",
  "shadcn charts",
  "shadcn registry",
  "Comark",
  "graph components",
  "diagram components",
  "Markdown Graphs API",
] as const
export const SITE_DESCRIPTION =
  "ASCII-framed React diagrams you copy into a shadcn project and drop next to prose — JSX in MDX, a ::graph-* block in Comark, or the official fence in a README."
export const SITE_ALTERNATE_NAMES = [
  SITE_NAME_SHORT,
  "mdx-graphs",
  "markdown-graphs",
  "markdown-friendly React components",
  "React markdown components",
] as const
export const AGENTS_DESCRIPTION =
  "A skill and chooser that tell an agent which graph to use, and whether to emit JSX, a ::graph-* block, or fenced ASCII it can read back later."
export const DOCS_DESCRIPTION =
  "ASCII-framed graphs for MDX, with a skill so agents reach for a component instead of inventing SVG."
export const SITE_NAV = [
  { href: "/agents", label: "agents" },
  { href: "/docs", label: "library" },
  { href: "/comark", label: "comark" },
] as const
export const SITE_TWITTER = "@kshvbgde"
export const SITE_EMAIL = "hi@kshv.me"
export const SITE_AUTHOR = {
  name: "Keshav Bagaade",
  url: "https://github.com/keshav-exe",
  x: "https://x.com/kshvbgde",
  jobTitle: "Engineer",
}
