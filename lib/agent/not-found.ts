import { SITE_URL } from "@/lib/site"

export function notFoundMarkdown(origin = SITE_URL, path?: string) {
  const host = origin || SITE_URL
  const where = path
    ? ` \`${path}\` is not a page.`
    : " That URL is not a page."

  return `# Not found

${where.trim()}

## Where to look

- Docs: ${host}/docs
- for agents: ${host}/agents
- Skill: ${host}/docs/skill
- llms.txt: ${host}/llms.txt
- OpenAPI: ${host}/openapi.json
- JSON catalog: ${host}/api/v1/components
- Sitemap: ${host}/sitemap.xml
`
}

export function notFoundLinks(origin = SITE_URL) {
  const host = origin || SITE_URL

  return [
    { href: `${host}/docs`, label: "Docs" },
    { href: `${host}/llms.txt`, label: "llms.txt" },
    { href: `${host}/openapi.json`, label: "OpenAPI" },
    { href: `${host}/sitemap.xml`, label: "Sitemap" },
  ]
}
