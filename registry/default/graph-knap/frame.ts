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

function frameAscii(title: string, lines: string[], minInner = MIN_INNER) {
  const caption = `[ ${title.trim().toUpperCase()} ]`
  const contentWidth = Math.max(0, ...lines.map(widthOf))
  const inner = Math.max(minInner, contentWidth, caption.length + 4)
  const span = inner + 2
  const label = ` ${caption} `
  const leftover = Math.max(0, span - label.length)
  const left = Math.floor(leftover / 2)
  const right = leftover - left
  const empty = `| ${" ".repeat(inner)} |`
  const body = lines.map((line) => `| ${padEnd(line, inner)} |`)

  return [
    `+${dash(left)}${label}${dash(right)}+`,
    empty,
    ...body,
    empty,
    `+${dash(span)}+`,
  ].join("\n")
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
}
export { MIN_INNER }
