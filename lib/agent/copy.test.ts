import { describe, expect, it } from "vitest"

import {
  ABOUT_PARAS,
  CONTACT_PARAS,
  HOME_API,
  HOME_BRAND,
  HOME_CLI,
  HOME_READ,
  HOME_WHAT,
  HOME_WRITE,
  PRIVACY_PARAS,
  copyLength,
  homeMarkdown,
} from "@/lib/agent/copy"

describe("trust copy length", () => {
  it("keeps about, contact, and privacy over 500 characters", () => {
    expect(copyLength(ABOUT_PARAS)).toBeGreaterThanOrEqual(500)
    expect(copyLength(CONTACT_PARAS)).toBeGreaterThanOrEqual(500)
    expect(copyLength(PRIVACY_PARAS)).toBeGreaterThanOrEqual(500)
  })
})

describe("homepage copy", () => {
  it("has at least 500 characters of prose", () => {
    const text = [
      HOME_WHAT,
      HOME_WRITE,
      HOME_READ,
      HOME_API,
      HOME_CLI,
      HOME_BRAND,
    ].join(" ")
    expect(text.length).toBeGreaterThanOrEqual(500)
  })

  it("includes when-to-use jobs in the markdown export", () => {
    const md = homeMarkdown()
    expect(md).toContain("# mdxcn")
    expect(md).toContain("## write")
    expect(md).toContain("## read")
    expect(md).toContain("/llms.txt")
    expect(md).toContain("/openapi.json")
  })
})
