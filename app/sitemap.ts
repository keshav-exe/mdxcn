import type { MetadataRoute } from "next"

import { components } from "@/lib/docs/catalog"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/agents",
    "/comark",
    "/developers",
    "/developers/deprecation",
    "/agents.md",
    "/about",
    "/contact",
    "/privacy",
    "/sponsor",
    "/docs",
    "/docs/installation",
    "/docs/examples",
    "/docs/comark",
    "/docs/skill",
    "/llms.txt",
    "/skill.md",
    "/skill/recipes.md",
    "/openapi.json",
    ...components.map((item) => `/docs/${item.slug}`),
  ]

  return paths.map((path) => ({
    url: path === "/" ? SITE_URL : new URL(path, SITE_URL).toString(),
  }))
}
