export const NEW_SLUGS = [
  "annotate",
  "decision",
  "chat",
  "env",
  "endpoint",
  "keys",
  "faq",
  "graph-board",
  "graph-score",
] as const

const newSlugSet = new Set<string>(NEW_SLUGS)

export function isNewSlug(slug: string) {
  return newSlugSet.has(slug)
}
