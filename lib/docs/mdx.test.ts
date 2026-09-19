import { describe, expect, it } from "vitest"

import { toAscii, toMdxCopy } from "@/lib/docs/mdx"

describe("toAscii", () => {
  it("draws a callout with the frame, title, and warning glyph", () => {
    const ascii = toAscii(`<Callout type="warning">
  The CLI copies files into registry/default.
</Callout>`)

    expect(ascii).toContain("[ WARNING ]")
    expect(ascii).toContain("+")
    expect(ascii).toContain("!")
    expect(ascii).toContain("The CLI copies files")
  })

  it("draws a quote with the mark, attribution, and no empty title", () => {
    const ascii = toAscii(`<Quote by="Paul Graham" source="Taste for Makers">
  A thousand barely audible voices all singing in tune.
</Quote>`)

    expect(ascii.startsWith("+---")).toBe(true)
    expect(ascii).not.toContain("[  ]")
    expect(ascii).toContain("Paul Graham")
    expect(ascii).toContain("Taste for Makers")
    expect(ascii).toContain("thousand")
  })

  it("draws a table inside the frame", () => {
    const ascii = toAscii(`<GraphTable title="WHAT THE RESEARCH COST">

| Agent | Tokens |
| --- | ---: |
| Inks and paper | 115,207 |

</GraphTable>`)

    expect(ascii).toContain("[ WHAT THE RESEARCH COST ]")
    expect(ascii).toContain("Inks and paper")
    expect(ascii).toContain("115,207")
    expect(ascii).toContain(" | ")
    expect(ascii).toContain("-+-")
    expect(ascii.startsWith("+")).toBe(true)
  })
})

describe("toMdxCopy", () => {
  it("fences the drawing so Notion keeps the monospace frame", () => {
    const copy = toMdxCopy(`<Callout type="warning">
  Edit the source.
</Callout>`)

    expect(copy.startsWith("```\n")).toBe(true)
    expect(copy.endsWith("\n```")).toBe(true)
    expect(copy).toContain("[ WARNING ]")
    expect(copy).toContain("!")
  })

  it("strips the import from a docs example", () => {
    const copy =
      toMdxCopy(`import { Callout } from "@/registry/default/callout/callout"

<Callout type="warning">
  The CLI copies files into registry/default.
</Callout>`)

    expect(copy).not.toContain("import")
    expect(copy).toContain("[ WARNING ]")
    expect(copy).toContain("!")
  })
})
