const MIN_INNER = 48

function widthOf(text: string) {
  return text.length
}

function padEnd(text: string, size: number) {
  const extra = size - widthOf(text)
  if (extra > 0) {
    return text + " ".repeat(extra)
  }

  return text.slice(0, size)
}

function padStart(text: string, size: number) {
  const extra = size - widthOf(text)
  if (extra > 0) {
    return " ".repeat(extra) + text
  }

  return text.slice(-size)
}

function dash(count: number) {
  return "-".repeat(Math.max(0, count))
}

function wrapText(text: string, width = 56): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  if (words.length === 0) {
    return []
  }

  const lines: string[] = []
  let current = ""

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (current && next.length > width) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }

  if (current) {
    lines.push(current)
  }

  return lines
}

function frameAscii(
  title: string | undefined,
  lines: string[],
  minInner = MIN_INNER
) {
  const caption = title?.trim() ? `[ ${title.trim().toUpperCase()} ]` : ""
  const contentWidth = Math.max(0, ...lines.map(widthOf))
  const inner = Math.max(
    minInner,
    contentWidth,
    caption ? caption.length + 4 : 0
  )
  const span = inner + 2
  const empty = `| ${" ".repeat(inner)} |`
  const body = lines.map((line) => `| ${padEnd(line, inner)} |`)
  const top = caption
    ? (() => {
        const label = ` ${caption} `
        const leftover = Math.max(0, span - label.length)
        const left = Math.floor(leftover / 2)
        const right = leftover - left
        return `+${dash(left)}${label}${dash(right)}+`
      })()
    : `+${dash(span)}+`

  return [top, empty, ...body, empty, `+${dash(span)}+`].join("\n")
}

function rule(size: number) {
  return dash(size)
}

function fillTrack(filled: number, total: number, on = "=", off = "-") {
  const count = Math.min(total, Math.max(0, filled))
  return on.repeat(count) + off.repeat(total - count)
}

function col(text: string, size: number, align: "left" | "right" = "left") {
  return align === "right" ? padStart(text, size) : padEnd(text, size)
}

function colWidth(values: string[]) {
  return Math.max(0, ...values.map(widthOf))
}

function fence(ascii: string) {
  return `\`\`\`\n${ascii}\n\`\`\``
}

export {
  col,
  colWidth,
  dash,
  fence,
  fillTrack,
  frameAscii,
  padEnd,
  padStart,
  rule,
  widthOf,
  wrapText,
}
export { MIN_INNER }
