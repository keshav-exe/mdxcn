export const SITE_URL = "https://mdxcn.dev"
export const SITE_HOST = "mdxcn.dev"
export const REGISTRY_SCOPE = "@mdxcn"

export function scopedRegistryInstall(name: string) {
  return `pnpm dlx shadcn@latest add ${REGISTRY_SCOPE}/${name}`
}
export const SITE_NAME = "mdxcn"
export const SITE_NAME_SHORT = "mdxcn"
/** Browser / OG homepage title — what people search for. */
export const SITE_TITLE = "mdxcn | markdown-friendly components"
export const SITE_TAGLINE = "Markdown-friendly components."
export const SITE_KEYWORDS = [
  "mdxcn",
  "Markdown-friendly components",
  "MDX components",
  "Markdown components",
  "React MDX components",
  "markdown-friendly React components",
  "MDX callout",
  "MDX steps",
  "MDX charts",
  "ASCII charts",
  "ASCII diagrams",
  "markdown charts",
  "shadcn registry",
  "shadcn MDX",
  "Comark",
  "Knap",
  "mdxcn API",
] as const
export const SITE_DESCRIPTION =
  "A curated set of Markdown-friendly React components for MDX. Callouts, steps, terminals, charts, and timelines that sit between paragraphs — copied into your project with the shadcn CLI, not installed from npm."
export const SITE_ALTERNATE_NAMES = [
  "mdxcn.dev",
  "mdxcn",
  "mdx",
  "Markdown-friendly components",
  "MDX components",
] as const
export const AGENTS_DESCRIPTION =
  "A skill and chooser that tell an agent which mdxcn component to put next to the prose, and whether to write MDX, a ::graph-* block, a Knap filter, or fenced ASCII it can read back later."
export const DOCS_DESCRIPTION =
  "Markdown-friendly components for MDX. The MDX tab is the framed figure — copy it into Notion or a README. Register the parent once to render it live."
export const SITE_NAV = [
  { href: "/docs", label: "components" },
  { href: "/docs/examples", label: "examples" },
  { href: "/agents", label: "agents" },
  { href: "/comark", label: "comark" },
  { href: "/knap", label: "knap" },
] as const
export const SITE_TWITTER = "@kshvbgde"
export const SITE_EMAIL = "hi@kshv.me"
export const SITE_AUTHOR = {
  name: "Keshav Bagaade",
  url: "https://github.com/keshav-exe",
  x: "https://x.com/kshvbgde",
  jobTitle: "Engineer",
}
