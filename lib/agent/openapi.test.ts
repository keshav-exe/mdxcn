import { describe, expect, it } from "vitest"

import { apiIndex, openApiSpec, toComponentJson } from "@/lib/agent/openapi"
import { components } from "@/lib/docs/catalog"

type Operation = {
  operationId?: string
  description?: string
  responses?: Record<
    string,
    {
      content?: Record<string, unknown>
      headers?: Record<string, unknown>
    }
  >
}

describe("openApiSpec", () => {
  const spec = openApiSpec("https://example.test")

  it("is OpenAPI 3.1 with identity fields", () => {
    expect(spec.openapi).toBe("3.1.0")
    expect(spec.info.title).toBe("mdxcn API")
    expect(spec.servers[0]?.url).toBe("https://example.test")
    expect(spec.info["x-deprecation-policy"]).toContain(
      "/developers/deprecation"
    )
  })

  it("gives every operation an id, description, typed response, and rate headers", () => {
    for (const [path, methods] of Object.entries(spec.paths)) {
      const get = (methods as { get?: Operation }).get
      expect(get?.operationId, path).toBeTruthy()
      expect(get?.description, path).toBeTruthy()
      const ok = get?.responses?.["200"]
      expect(ok?.content, path).toBeTruthy()
      expect(ok?.headers?.["RateLimit-Limit"], path).toBeTruthy()
    }
  })

  it("documents meta, catalog, and machine endpoints", () => {
    expect(spec.paths["/api/v1"]).toBeTruthy()
    expect(spec.paths["/api/v1/health"]).toBeTruthy()
    expect(spec.paths["/api/v1/components"]).toBeTruthy()
    expect(spec.paths["/api/v1/components/{slug}"]).toBeTruthy()
    expect(spec.paths["/agents.md"]).toBeTruthy()
    expect(spec.paths["/llms.txt"]).toBeTruthy()
    expect(spec.paths["/r/{name}.json"]).toBeTruthy()
    expect(spec.paths["/openapi.json"]).toBeTruthy()
  })

  it("types every 200 response body with a schema ref or type", () => {
    for (const [path, methods] of Object.entries(spec.paths)) {
      const get = (methods as { get?: Operation }).get
      const content = get?.responses?.["200"]?.content ?? {}
      for (const body of Object.values(content)) {
        const schema = (body as { schema?: { $ref?: string; type?: string } })
          .schema
        expect(schema?.$ref ?? schema?.type, path).toBeTruthy()
      }
    }
  })
})

describe("apiIndex", () => {
  it("lists public endpoints", () => {
    const index = apiIndex("https://example.test")
    expect(index.name).toBe("mdxcn API")
    expect(index.endpoints.some((item) => item.path === "/api/v1/health")).toBe(
      true
    )
    expect(index.deprecation).toContain("/developers/deprecation")
  })
})

describe("toComponentJson", () => {
  it("maps a catalog row", () => {
    const item = components[0]
    expect(item).toBeTruthy()
    const json = toComponentJson(item!)
    expect(json.slug).toBe(item!.slug)
    expect(json.docs).toContain(item!.slug)
  })
})
