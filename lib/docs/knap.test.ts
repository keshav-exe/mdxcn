import { describe, expect, it } from "vitest"

import { components } from "@/lib/docs/catalog"
import { knapExample, isKnapSlug } from "@/lib/docs/knap"
import {
  GRAPH_FILTER_SLUGS,
  graphFilterMetadata,
  graphFilterNames,
  graphFilters,
} from "@/registry/default/graph-knap/graph-knap"

describe("graphFilters", () => {
  it("draws a meter from a number and a title", () => {
    const out = graphFilters.graph_meter("0.67", "SHIPPED", {
      rawValue: 0.67,
    })
    expect(out).toContain("[ SHIPPED ]")
    expect(out.startsWith("```")).toBe(true)
  })

  it("lets the title param override a title on the props object", () => {
    const out = graphFilters.graph_meter("", "SHIPPED", {
      rawValue: { title: "OLD", value: 0.67 },
    })
    expect(out).toContain("[ SHIPPED ]")
    expect(out).not.toContain("[ OLD ]")
  })

  it("draws a timeline from an events array", () => {
    const events = [
      { date: "14:02", label: "p95 crossed 800ms" },
      { date: "14:11", label: "rolled back the cache flag", state: "now" },
    ]
    const out = graphFilters.graph_timeline("", "NIGHT", { rawValue: events })
    expect(out).toContain("[ NIGHT ]")
    expect(out).toContain("p95 crossed 800ms")
  })

  it("frames a table from records, like Knap's table filter", () => {
    const out = graphFilters.graph_table("", "CAST", {
      rawValue: [
        { Actor: "Keanu Reeves", Role: "Neo" },
        { Actor: "Carrie-Anne Moss", Role: "Trinity" },
      ],
    })
    expect(out).toContain("Actor")
    expect(out).toContain("Keanu Reeves")
    expect(out).toContain(" | ")
    expect(out).toContain("-+-")
  })

  it("emits a ::graph-* block when the param is comark", () => {
    const out = graphFilters.graph_meter("", "comark", {
      rawValue: { title: "SHIPPED", value: 0.67 },
    })
    expect(out).toContain("::graph-meter")
    expect(out).toContain("value: 0.67")
  })

  it("emits Comark YAML for graphs with no ASCII", () => {
    const out = graphFilters.graph_flow("", undefined, {
      rawValue: {
        title: "PATH",
        rows: [{ nodes: [{ label: "a" }, { label: "b" }] }],
      },
    })
    expect(out).toContain("::graph-flow")
    expect(out.startsWith("```")).toBe(false)
  })

  it("wraps a timer start time under at", () => {
    const out = graphFilters.graph_timer("", "INCIDENT", {
      rawValue: "2026-08-27T08:00:00Z",
    })
    expect(out).toContain("::graph-timer")
    expect(out).toContain("2026-08-27T08:00:00Z")
  })

  it("warns with INVALID_FILTER_INPUT when the piped value is unusable", () => {
    const warnings: { message: string; code?: string }[] = []
    const out = graphFilters.graph_compare("hello", undefined, {
      reportWarning: (warning) => warnings.push(warning),
    })
    expect(out).toBe("hello")
    expect(warnings).toEqual([
      {
        message: "Could not read graph_compare data",
        code: "INVALID_FILTER_INPUT",
      },
    ])
  })
})

describe("knap engine", () => {
  it("renders a graph filter through createEngine", async () => {
    const { createEngine, standardFilters } = await import("knap")
    const engine = createEngine({
      filters: { ...standardFilters, ...graphFilters },
    })
    const result = await engine.render('{{ v | graph_meter:"SHIPPED" }}', {
      variables: { v: 0.67 },
    })
    expect(result.errors).toEqual([])
    expect(result.warnings).toEqual([])
    expect(result.output).toContain("[ SHIPPED ]")
  })

  it("keeps arrays typed via rawValue", async () => {
    const { createEngine, standardFilters } = await import("knap")
    const engine = createEngine({
      filters: { ...standardFilters, ...graphFilters },
    })
    const result = await engine.render(
      '{{ events | graph_timeline:"NIGHT" }}',
      {
        variables: {
          events: [{ date: "14:02", label: "p95 crossed 800ms" }],
        },
      }
    )
    expect(result.errors).toEqual([])
    expect(result.output).toContain("p95 crossed 800ms")
  })

  it("surfaces unreadable input as a filter warning, not a fatal error", async () => {
    const { createEngine, standardFilters } = await import("knap")
    const engine = createEngine({
      filters: { ...standardFilters, ...graphFilters },
    })
    const result = await engine.render("{{ v | graph_compare }}", {
      variables: { v: "hello" },
    })
    expect(result.errors).toEqual([])
    expect(result.output).toContain("hello")
    expect(result.warnings).toEqual([
      expect.objectContaining({
        code: "INVALID_FILTER_INPUT",
        filter: "graph_compare",
        message: "Could not read graph_compare data",
      }),
    ])
  })

  it("lets validateFilters see graph_* names after merging metadata", async () => {
    const { parse, standardFilterMetadata, validateFilters } =
      await import("knap")
    const parsed = parse('{{ v | graph_meter:"SHIPPED" }}')
    expect(parsed.errors).toEqual([])
    expect(
      validateFilters(parsed.ast, standardFilterMetadata).some(
        (error) => error.code === "UNKNOWN_FILTER"
      )
    ).toBe(true)
    expect(
      validateFilters(parsed.ast, {
        ...standardFilterMetadata,
        ...graphFilterMetadata,
      })
    ).toEqual([])
  })
})

describe("knapExample", () => {
  it("covers every graph except frame", () => {
    expect(graphFilterNames.length).toBe(GRAPH_FILTER_SLUGS.length)
    expect(new Set(graphFilterNames)).toEqual(
      new Set(GRAPH_FILTER_SLUGS.map((slug) => slug.replaceAll("-", "_")))
    )
    for (const item of components) {
      if (item.slug === "graph-frame" || !item.slug.startsWith("graph-")) {
        expect(isKnapSlug(item.slug)).toBe(false)
        continue
      }
      const example = knapExample(item.slug)
      expect(example, item.slug).toBeTruthy()
      expect(example?.template).toContain(`| ${example?.filter}`)
      if (typeof example?.props.title === "string") {
        expect(example?.template).toContain(example.props.title)
      }
      expect(example?.markdown.length).toBeGreaterThan(0)
    }
  })
})
