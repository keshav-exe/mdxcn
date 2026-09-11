import { describe, expect, it } from "vitest"

import { notFoundMarkdown } from "@/lib/agent/not-found"
import { knownMarkdownPaths, markdownForPath } from "@/lib/agent/pages"
import { chooserMarkdown } from "@/lib/docs/chooser"
import { components } from "@/lib/docs/catalog"

describe("markdownForPath", () => {
  it("serves markdown for every known page", async () => {
    for (const path of knownMarkdownPaths()) {
      const body = await markdownForPath(path)
      expect(body, path).toBeTruthy()
      expect(body, path).toMatch(/^# /)
    }
  })

  it("returns null for a missing path", async () => {
    expect(await markdownForPath("/this-is-not-a-page")).toBeNull()
  })
})

describe("notFoundMarkdown", () => {
  it("points at sitemap, llms.txt, and docs", () => {
    const body = notFoundMarkdown("https://example.test", "/nope")
    expect(body).toContain("# Not found")
    expect(body).toContain("/nope")
    expect(body).toContain("https://example.test/docs")
    expect(body).toContain("https://example.test/llms.txt")
    expect(body).toContain("https://example.test/openapi.json")
    expect(body).toContain("https://example.test/sitemap.xml")
  })
})

describe("chooserMarkdown", () => {
  it("has a when-to-use section and machine-readable links", () => {
    const body = chooserMarkdown(components, "https://example.test")
    expect(body).toContain("## When to use")
    expect(body).toContain("## Machine-readable")
    expect(body).toContain("https://example.test/openapi.json")
    expect(body).toContain("https://example.test/api/v1/components")
    expect(body).toContain("https://example.test/skill.md")
    expect(body).toContain("## CLI")
    expect(body).toContain("## Comark")
  })
})
