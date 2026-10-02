import { fence } from "@/registry/default/graph-knap/frame"
import { drawMarkdown } from "@/registry/default/graph-knap/markdown"

/**
 * The docs `.mdx` tab. A fenced ASCII drawing of the component — frame,
 * `[ TITLE ]`, glyphs — so Notion / Linear / a README render the figure
 * without our runtime.
 */
export function toMdxCopy(source: string) {
  return fence(toAscii(source))
}

export function toAscii(source: string) {
  const tag = parseSource(source)
  if (!tag) {
    return source.trim()
  }

  const props = parseAttrs(tag.attrs)
  return drawMarkdown(tag.name, props, (tag.body ?? "").trim(), props.title)
}

function parseSource(source: string) {
  let text = source
    .replace(/^(?:import[\s\S]*?from\s+["'][^"']+["']\s*\n+)+/, "")
    .trim()
  const jsxAt = text.search(/<[A-Z][A-Za-z0-9]*/)
  if (jsxAt > 0) {
    text = text.slice(jsxAt).trim()
  }

  return splitTag(text)
}

function splitTag(source: string): {
  name: string
  attrs: string
  body: string | null
} | null {
  const open = source.match(/^<([A-Z][A-Za-z0-9]*)\b([\s\S]*?)(\/>|>)/)
  if (!open || !open[1]) {
    return null
  }

  const name = open[1]
  const attrs = open[2] ?? ""
  if (open[3] === "/>") {
    return { name, attrs, body: null }
  }

  const close = source.lastIndexOf(`</${name}>`)
  if (close === -1) {
    return { name, attrs, body: null }
  }

  return {
    name,
    attrs,
    body: source.slice(open[0].length, close),
  }
}

function parseAttrs(raw: string): Record<string, string> {
  const props: Record<string, string> = {}
  const pattern =
    /([A-Za-z_][\w-]*)(?:\s*=\s*("[^"]*"|'[^']*'|\{[\s\S]*?\}|[^\s{>/]+))?/g

  for (const match of raw.matchAll(pattern)) {
    const key = match[1]
    if (!key) {
      continue
    }
    props[key] = match[2] ? jsValue(match[2]) : "true"
  }

  return props
}

function jsValue(raw: string): string {
  const text = raw.trim()
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    return text.slice(1, -1)
  }

  if (text.startsWith("{") && text.endsWith("}")) {
    const inner = text.slice(1, -1).trim()
    if (inner.startsWith("[")) {
      return inner
        .replace(/[\[\]{}]/g, " ")
        .replace(/,/g, " ")
        .replace(/["']/g, "")
        .replace(/\s+/g, " ")
        .trim()
    }
    if (inner.includes("(")) {
      return ""
    }
    return jsValue(inner)
  }

  return text
}
