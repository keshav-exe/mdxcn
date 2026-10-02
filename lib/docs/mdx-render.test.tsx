import { evaluate } from "@mdx-js/mdx"
import {
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react"
import { renderToStaticMarkup } from "react-dom/server"
import * as runtime from "react/jsx-runtime"
import remarkGfm from "remark-gfm"
import { describe, expect, it } from "vitest"

import { examplesBySlug } from "@/components/docs/examples"
import * as graphs from "@/components/graphs"
import { withMdxcn } from "@/registry/default/mdx/mdx"

type Components = Record<string, unknown>

async function compile(source: string) {
  const mdx = source
    .replace(/^(?:import[\s\S]*?from\s+["'][^"']+["']\s*\n+)+/, "")
    .trim()
  const compiled = await evaluate(mdx, {
    ...runtime,
    remarkPlugins: [remarkGfm],
  } as Parameters<typeof evaluate>[1])
  return compiled.default as (props: { components?: Components }) => ReactNode
}

/** useId differs by tree depth; whitespace between tags is MDX's, not ours. */
function normalize(html: string) {
  return html
    .replace(/ (?:id|aria-labelledby)="_R_[^"]*"/g, "")
    .replace(/ data-graph-host="[^"]*"/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .trim()
}

async function render(source: string, components: Components) {
  const Content = await compile(source)
  return normalize(renderToStaticMarkup(<Content components={components} />))
}

/** What a docs framework does: swap tags for named components. */
function ListItem(props: ComponentProps<"li">) {
  return <li {...props} />
}
function Paragraph(props: ComponentProps<"p">) {
  return <p {...props} />
}
function Table(props: ComponentProps<"table">) {
  return <table {...props} />
}
function Heading(props: ComponentProps<"h3">) {
  return <h3 {...props} />
}
function Strong(props: ComponentProps<"strong">) {
  return <strong {...props} />
}

const overrides = {
  li: ListItem,
  p: Paragraph,
  table: Table,
  h3: Heading,
  strong: Strong,
}

const examples = Object.entries(examplesBySlug).flatMap(([slug, items]) =>
  items
    .filter((item) => item.source !== "tsx")
    .map((item) => ({ slug, ...item }))
)

describe("docs examples through real MDX", () => {
  it.each(
    examples.map((example) => [`${example.slug} — ${example.title}`, example])
  )("%s renders the same as its preview", async (_, example) => {
    const mdx = await render(example.code, graphs)
    const preview = normalize(renderToStaticMarkup(<>{example.preview}</>))
    expect(mdx).toBe(preview)
  })
})

describe("mdx-components overrides", () => {
  it("break parsing without withMdxcn", async () => {
    const source = `<GraphTimeline title="NIGHT">

- 14:02: p95 crossed
- **14:11: rolled back**

</GraphTimeline>`
    const plain = await render(source, graphs)
    const swapped = await render(source, { ...graphs, ...overrides })
    expect(plain).toContain("rolled back")
    expect(swapped).not.toContain("rolled back")
  })

  it.each(
    examples.map((example) => [`${example.slug} — ${example.title}`, example])
  )("%s survives swapped tags with withMdxcn", async (_, example) => {
    const plain = await render(example.code, withMdxcn({ ...graphs }))
    const swapped = await render(
      example.code,
      withMdxcn({ ...graphs, ...overrides })
    )
    expect(swapped).toBe(plain)
  })
})

describe("withMdxcn upgrades plain Markdown", () => {
  const upgrade = (source: string) => render(source, withMdxcn({ ...graphs }))

  it("turns a GitHub alert into a Callout", async () => {
    const html = await upgrade(`> [!WARNING]
> The CLI copies **files**.`)
    expect(html).toContain('role="note"')
    expect(html).toContain("[ warning ]")
    expect(html).toContain("<strong>files</strong>")
    expect(html).not.toContain("[!WARNING]")
  })

  it("maps IMPORTANT and CAUTION onto the four callout types", async () => {
    expect(await upgrade(`> [!IMPORTANT]\n> Read this.`)).toContain(
      "[ important ]"
    )
    expect(await upgrade(`> [!CAUTION]\n> Careful.`)).toContain("[ caution ]")
  })

  it("takes an Obsidian title after the marker", async () => {
    const html = await upgrade(`> [!tip] Palette\n> One accent.`)
    expect(html).toContain("[ Palette ]")
    expect(html).toContain("One accent.")
  })

  it("turns a blockquote with a byline into a Quote", async () => {
    const html = await upgrade(`> A thousand barely audible voices.
>
> — Paul Graham, Taste for Makers`)
    expect(html).toContain("<cite")
    expect(html).toContain("Paul Graham")
    expect(html).toContain("Taste for Makers")
  })

  it("reads a byline on the last line of the same paragraph", async () => {
    const html = await upgrade(`> Less, but better.
> — Dieter Rams`)
    expect(html).toContain("Dieter Rams")
    expect(html).toContain("Less, but better.")
  })

  it("leaves a dash mid-sentence alone", async () => {
    const html = await upgrade(`> Use it — carefully.`)
    expect(html).toBe("<blockquote><p>Use it — carefully.</p></blockquote>")
  })

  it("turns a console fence into a Terminal", async () => {
    const html = await upgrade("```console\n$ pnpm test\n✓ 12 passed\n```")
    expect(html).toContain("[ shell ]")
    expect(html).toContain("pnpm test")
  })

  it("upgrades a sh fence only when it has prompts", async () => {
    expect(await upgrade("```sh\n$ ls\n```")).toContain("[ shell ]")
    expect(await upgrade("```sh\necho hi\n```")).toContain(
      '<pre><code class="language-sh">echo hi'
    )
  })

  it("frames GFM footnotes and keeps the ids", async () => {
    const html = await upgrade("Cited.[^1]\n\n[^1]: Taste for Makers.")
    expect(html).toContain("[ footnotes ]")
    expect(html).toContain('id="user-content-fn-1"')
    expect(html).toContain("Taste for Makers.")
  })

  it("can turn each upgrade off", async () => {
    const html = await render(
      `> [!NOTE]\n> Plain.`,
      withMdxcn({ ...graphs }, { alerts: false })
    )
    expect(html).toContain("<blockquote>")
  })
})

/**
 * React Server Components can pass a client component its children as
 * resolved `React.lazy` nodes. Wrap every element below the graph the same
 * way and the output must not change.
 */
function lazify(node: ReactNode): ReactNode {
  if (Array.isArray(node)) {
    return node.map(lazify)
  }
  if (!isValidElement<{ children?: ReactNode }>(node)) {
    return node
  }
  const element = cloneElement(
    node as ReactElement<{ children?: ReactNode }>,
    undefined,
    lazify(node.props.children)
  )
  return {
    $$typeof: Symbol.for("react.lazy"),
    _payload: element,
    _init: (payload: unknown) => payload,
  } as unknown as ReactNode
}

describe("children from React Server Components", () => {
  it.each(
    examples.map((example) => [`${example.slug} — ${example.title}`, example])
  )("%s reads lazy children", (_, example) => {
    const graph = example.preview as ReactElement<{ children?: ReactNode }>
    const plain = normalize(renderToStaticMarkup(<>{graph}</>))
    const wrapped = cloneElement(graph, undefined, lazify(graph.props.children))
    expect(normalize(renderToStaticMarkup(<>{wrapped}</>))).toBe(plain)
  })
})
