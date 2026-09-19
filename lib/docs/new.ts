export const NEW_SLUGS = [
  "callout",
  "quote",
  "steps",
  "terminal",
  "changelog",
] as const

const newSlugSet = new Set<string>(NEW_SLUGS)

export function isNewSlug(slug: string) {
  return newSlugSet.has(slug)
}
