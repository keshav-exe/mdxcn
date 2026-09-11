import { describe, expect, it } from "vitest"

import { notFoundProblem, problemResponse } from "@/lib/http/problem"

describe("notFoundProblem", () => {
  it("returns RFC 9457 fields and recovery hrefs", () => {
    const body = notFoundProblem("/api/v1/components/nope")
    expect(body.status).toBe(404)
    expect(body.code).toBe("not_found")
    expect(body.title).toBe("Not found")
    expect(body.instance).toBe("/api/v1/components/nope")
    expect(body.hrefs?.docs).toMatch(/\/docs$/)
    expect(body.hrefs?.llms).toBeUndefined()
    expect(body.hrefs?.openapi).toBeUndefined()
  })
})

describe("problemResponse", () => {
  it("sends problem+json", async () => {
    const response = problemResponse(notFoundProblem("/missing"))
    expect(response.status).toBe(404)
    expect(response.headers.get("Content-Type")).toMatch(
      "application/problem+json"
    )
    const json = (await response.json()) as { code: string }
    expect(json.code).toBe("not_found")
  })
})
