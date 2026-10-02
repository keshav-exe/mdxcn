import * as React from "react"

import { Callout, type CalloutType } from "@/registry/default/callout/callout"
import {
  childrenOf,
  dropLead,
  GRAPH_HOST_TAGS,
  isHost,
  childNodes,
  takeText,
  textOf,
} from "@/registry/default/graph-frame/graph-markdown"
import { Footnotes } from "@/registry/default/mdx/mdx-footnotes"
import { Quote } from "@/registry/default/quote/quote"
import { Terminal } from "@/registry/default/terminal/terminal"

/*
 * Plain Markdown, upgraded. No "use client": `mdx-components.tsx` runs on the
 * server, and so does everything here. The frames it swaps in are client
 * components, which is fine to render from the server.
 *
 *   > [!WARNING]            → <Callout type="warning">
 *   > quote … — Name, Where → <Quote by="Name" source="Where">
 *   ```console              → <Terminal>
 *   [^1] footnotes          → <Footnotes>
 *
 * Each one still reads right on GitHub, where nothing is upgraded.
 */

type MdxComponents = { [key: string]: unknown }

type MdxcnOptions = {
  /** `> [!NOTE]`, `> [!WARNING]` … become Callout. Default true. */
  alerts?: boolean
  /** A blockquote whose last line starts with `—` becomes Quote. Default true. */
  quotes?: boolean
  /** ```console, or a shell fence with `$ ` lines, becomes Terminal. Default true. */
  terminals?: boolean
  /** The GFM footnotes section gets a frame. Default true. */
  footnotes?: boolean
}

type AnyProps = { children?: React.ReactNode; [key: string]: unknown }
type AnyComponent = React.ElementType<AnyProps>

/** GitHub alerts, plus the Obsidian names people already type. */
const ALERTS: Record<string, { type: CalloutType; title?: string }> = {
  note: { type: "note" },
  info: { type: "note", title: "info" },
  abstract: { type: "note", title: "summary" },
  summary: { type: "note", title: "summary" },
  question: { type: "note", title: "question" },
  tip: { type: "tip" },
  hint: { type: "tip", title: "hint" },
  success: { type: "tip", title: "success" },
  important: { type: "warning", title: "important" },
  warning: { type: "warning" },
  attention: { type: "warning", title: "attention" },
  caution: { type: "danger", title: "caution" },
  danger: { type: "danger" },
  error: { type: "danger", title: "error" },
  bug: { type: "danger", title: "bug" },
}

const ALERT = /^\s*\[!([a-z]+)\][+-]?[ \t]*([^\n]*)\n?\s*/i
const BYLINE = /(?:^|\n)[ \t]*(?:—|―|–|--)[ \t]*([^\n]+)$/
const SHELLS = ["sh", "bash", "shell", "zsh", "fish"]
const SESSIONS = ["console", "shell-session", "terminal"]
const PROMPTS = ["$", "%", "❯", ">"]

function blocksOf(children: React.ReactNode) {
  return childNodes(children)
}

function isParagraph(node: React.ReactNode): node is React.ReactElement {
  return React.isValidElement(node) && isHost(node, "p")
}

function withChildren(element: React.ReactElement, children: React.ReactNode) {
  return React.cloneElement(
    element as React.ReactElement<{ children?: React.ReactNode }>,
    undefined,
    children
  )
}

/** `> [!WARNING] Optional title` → Callout, marker removed from the body. */
function alertOf(children: React.ReactNode) {
  const blocks = blocksOf(children)
  const at = blocks.findIndex(isParagraph)
  const first = blocks[at]
  if (!isParagraph(first)) {
    return null
  }

  const { match, rest } = dropLead(childrenOf(first), ALERT)
  if (!match) {
    return null
  }

  const kind = (match[1] ?? "note").toLowerCase()
  const known = ALERTS[kind]
  const title = (match[2] ?? "").trim() || known?.title || (known ? "" : kind)
  const body = [...blocks]
  if (textOf(rest).trim() === "") {
    body.splice(at, 1)
  } else {
    body[at] = withChildren(first, rest)
  }

  return {
    type: known?.type ?? "note",
    title: title || undefined,
    children: body,
  }
}

/** Last line `— Name, Where` → Quote. The line can be its own paragraph. */
function quoteOf(children: React.ReactNode) {
  const blocks = blocksOf(children)
  const at = blocks.findLastIndex(isParagraph)
  const last = blocks[at]
  if (!isParagraph(last)) {
    return null
  }

  const text = textOf(childrenOf(last))
  const match = text.match(BYLINE)
  if (!match || match.index == null) {
    return null
  }

  const line = (match[1] ?? "").trim()
  const comma = line.indexOf(", ")
  const by = comma === -1 ? line : line.slice(0, comma)
  const source = comma === -1 ? undefined : line.slice(comma + 2)
  const body = blocks.slice(0, at)
  if (match.index > 0) {
    body.push(withChildren(last, takeText(childrenOf(last), match.index)))
  }

  if (!body.some((node) => textOf(node).trim() !== "")) {
    return null
  }

  return { by, source, children: body }
}

function languageOf(pre: AnyProps): string {
  const marked = pre["data-language"]
  if (typeof marked === "string") {
    return marked.toLowerCase()
  }

  const code = blocksOf(pre.children).find(
    (node): node is React.ReactElement =>
      React.isValidElement(node) && isHost(node, "code")
  )
  const className = (code?.props as { className?: unknown } | undefined)
    ?.className
  const match =
    typeof className === "string" ? className.match(/language-(\S+)/) : null
  return (match?.[1] ?? "").toLowerCase()
}

/** A session fence → Terminal. Plain shell scripts stay code. */
function sessionOf(pre: AnyProps) {
  const language = languageOf(pre)
  const text = textOf(pre.children).replace(/\n$/, "")
  const lines = text.split("\n")
  const prompt =
    PROMPTS.map((mark) => ({
      mark,
      count: lines.filter((line) => line.startsWith(`${mark} `)).length,
    })).sort((a, b) => b.count - a.count)[0] ?? null

  if (SESSIONS.includes(language)) {
    return { prompt: prompt?.count ? prompt.mark : "$", text }
  }

  if (SHELLS.includes(language) && prompt?.count && prompt.mark === "$") {
    return { prompt: "$", text }
  }

  return null
}

/** `li: ListItem` still reads as an `li` to the parent graph. */
function markHost(tag: string, Component: AnyComponent) {
  function Host(props: AnyProps) {
    return React.createElement(Component, {
      ...props,
      "data-graph-host": tag,
    })
  }
  Host.graphHost = tag
  Host.displayName = `Host(${tag})`
  return Host
}

function isMarked(value: unknown) {
  return (
    typeof value === "function" &&
    typeof (value as { graphHost?: unknown }).graphHost === "string"
  )
}

/**
 * Wrap your MDX components. Marks any tag you override so the graphs can
 * still read it, and upgrades plain Markdown into frames.
 *
 * ```tsx
 * // mdx-components.tsx
 * export function useMDXComponents(components: MDXComponents) {
 *   return withMdxcn({ ...components, Callout, GraphTimeline })
 * }
 * ```
 */
function withMdxcn<T extends MdxComponents>(
  components: T = {} as T,
  {
    alerts = true,
    quotes = true,
    terminals = true,
    footnotes = true,
  }: MdxcnOptions = {}
): T {
  const out: MdxComponents = { ...components }

  for (const tag of GRAPH_HOST_TAGS) {
    const value = components[tag]
    if (value != null && !isMarked(value)) {
      out[tag] = markHost(tag, value as AnyComponent)
    }
  }

  const Blockquote = (out.blockquote ?? "blockquote") as AnyComponent
  const Pre = (out.pre ?? "pre") as AnyComponent
  const Section = (out.section ?? "section") as AnyComponent

  if (alerts || quotes) {
    function MdxBlockquote(props: AnyProps) {
      const alert = alerts ? alertOf(props.children) : null
      if (alert) {
        return <Callout {...alert} />
      }
      const quote = quotes ? quoteOf(props.children) : null
      if (quote) {
        return <Quote {...quote} />
      }
      return <Blockquote {...props} />
    }
    MdxBlockquote.graphHost = "blockquote"
    out.blockquote = MdxBlockquote
  }

  if (terminals) {
    function MdxPre(props: AnyProps) {
      const session = sessionOf(props)
      if (session) {
        return <Terminal prompt={session.prompt}>{session.text}</Terminal>
      }
      return <Pre {...props} />
    }
    MdxPre.graphHost = "pre"
    out.pre = MdxPre
  }

  if (footnotes) {
    function MdxSection(props: AnyProps) {
      if (props["data-footnotes"] != null) {
        return <Footnotes>{props.children}</Footnotes>
      }
      return <Section {...props} />
    }
    out.section = MdxSection
  }

  return out as T
}

export { withMdxcn }
export type { MdxcnOptions }
