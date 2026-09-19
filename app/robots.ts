import type { MetadataRoute } from "next"

import { SITE_HOST, SITE_URL } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/r/",
        "/api/",
        "/llms.txt",
        "/openapi.json",
        "/skill.md",
        "/skill/recipes.md",
        "/agents.md",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_HOST,
  }
}
