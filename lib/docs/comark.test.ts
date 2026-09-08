import { describe, expect, it } from "vitest"

import {
  GRAPH_ADAPTERS,
  type GraphAdapter,
} from "@/registry/default/graph-comark/adapters"
import { coerceProps } from "@/registry/default/graph-comark/coerce"
import { components } from "@/lib/docs/catalog"
import {
  catalogNumericProps,
  comarkExample,
  isComarkSlug,
} from "@/lib/docs/comark"
import { toComarkBlock, toYaml } from "@/lib/docs/yaml"

describe("coerceProps", () => {
  it("coerces numeric strings listed in numeric", () => {
    const out = coerceProps({ value: "0.86", ticks: "28", title: "SHIPPED" }, [
      "value",
      "ticks",
    ])
    expect(out.value).toBe(0.86)
    expect(out.ticks).toBe(28)
    expect(out.title).toBe("SHIPPED")
  })

  it("maps class to className and strips a leading colon", () => {
    const out = coerceProps({ class: "max-w-xl", ":legend": "true" })
    expect(out.className).toBe("max-w-xl")
    expect(out.legend).toBe(true)
  })

  it("leaves non-boolean strings alone", () => {
    const out = coerceProps({ caption: "false-ish", done: "false" })
    expect(out.caption).toBe("false-ish")
    expect(out.done).toBe(false)
  })

  it("drops $ meta keys", () => {
    const out = coerceProps({ $slots: {}, title: "API" })
    expect(out).toEqual({ title: "API" })
  })
})

describe("GRAPH_ADAPTERS numeric lists", () => {
  it("only name props the catalog types as numbers", () => {
    for (const item of components) {
      const adapter: GraphAdapter | undefined =
        GRAPH_ADAPTERS[item.slug as keyof typeof GRAPH_ADAPTERS]
      if (!adapter?.numeric) continue
      const allowed = new Set(
        item.props
          .filter((prop) => catalogNumericProps(prop.type))
          .map((prop) => prop.name)
      )
      for (const name of adapter.numeric) {
        expect(allowed.has(name), `${item.slug}.${name}`).toBe(true)
      }
    }
  })

  it("lists every catalog number prop", () => {
    for (const item of components) {
      const adapter: GraphAdapter | undefined =
        GRAPH_ADAPTERS[item.slug as keyof typeof GRAPH_ADAPTERS]
      if (!adapter) continue
      const numeric = new Set(adapter.numeric ?? [])
      for (const prop of item.props) {
        if (!catalogNumericProps(prop.type)) continue
        expect(numeric.has(prop.name), `${item.slug}.${prop.name}`).toBe(true)
      }
    }
  })
})

describe("toComarkBlock", () => {
  it("emits a YAML fence", () => {
    const block = toComarkBlock("graph-meter", {
      title: "SHIPPED",
      value: 0.67,
      caption: "characters, not a progress bar",
    })
    expect(block).toContain("::graph-meter")
    expect(block).toContain("value: 0.67")
    expect(block.endsWith("::")).toBe(true)
  })

  it("quotes strings that would break YAML", () => {
    expect(toYaml({ date: "14:02" })).toContain('"14:02"')
  })

  it("nests tree children", () => {
    const yaml = toYaml({
      nodes: [
        {
          label: "registry/default",
          children: [{ label: "graph-tree.tsx", meta: "ui" }],
        },
      ],
    })
    expect(yaml).toContain("children:")
    expect(yaml).toContain("graph-tree.tsx")
  })
})

describe("comarkExample", () => {
  it("covers every graph except frame", () => {
    for (const item of components) {
      if (item.slug === "graph-frame") {
        expect(isComarkSlug(item.slug)).toBe(false)
        continue
      }
      const example = comarkExample(item.slug)
      expect(example, item.slug).toBeTruthy()
      expect(example?.markdown).toContain(`::${item.slug}`)
    }
  })
})
