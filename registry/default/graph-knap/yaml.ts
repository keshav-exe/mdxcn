function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isScalar(value: unknown) {
  return (
    value == null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  )
}

function yamlString(value: string) {
  if (value === "") return '""'
  if (/^[A-Za-z_][A-Za-z0-9_-]*$/.test(value)) return value
  return JSON.stringify(value)
}

function yamlScalar(value: unknown): string {
  if (value == null) return "null"
  if (typeof value === "boolean" || typeof value === "number") {
    return String(value)
  }
  if (typeof value === "string") return yamlString(value)
  return JSON.stringify(value)
}

function flowMap(value: Record<string, unknown>) {
  const parts = Object.entries(value)
    .filter(([, item]) => item !== undefined)
    .map(([key, item]) => `${key}: ${yamlScalar(item)}`)
  return `{ ${parts.join(", ")} }`
}

function yamlValue(value: unknown, indent: number): string {
  const pad = " ".repeat(indent)

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]"
    if (value.every(isScalar)) {
      return `[${value.map((item) => yamlScalar(item)).join(", ")}]`
    }
    if (
      value.every(
        (item) => isPlainObject(item) && Object.values(item).every(isScalar)
      )
    ) {
      return value
        .map((item) => `\n${pad}- ${flowMap(item as Record<string, unknown>)}`)
        .join("")
    }
    return value
      .map((item) => {
        if (isPlainObject(item)) {
          const nested = yamlObject(item, indent + 2)
          const lines = nested.split("\n")
          const first = lines[0]?.trimStart() ?? ""
          const rest = lines.slice(1).join("\n")
          return `\n${pad}- ${first}${rest ? `\n${rest}` : ""}`
        }
        return `\n${pad}- ${yamlScalar(item)}`
      })
      .join("")
  }

  if (isPlainObject(value)) {
    return yamlObject(value, indent)
  }

  return yamlScalar(value)
}

function yamlObject(value: Record<string, unknown>, indent: number) {
  const pad = " ".repeat(indent)
  const lines: string[] = []

  for (const [key, item] of Object.entries(value)) {
    if (item === undefined) continue
    const rendered = yamlValue(item, indent + 2)
    if (rendered.startsWith("\n")) {
      lines.push(`${pad}${key}:${rendered}`)
    } else {
      lines.push(`${pad}${key}: ${rendered}`)
    }
  }

  return lines.join("\n")
}

export function toYaml(value: Record<string, unknown>) {
  return yamlObject(value, 0)
}

export function toComarkBlock(tag: string, props: Record<string, unknown>) {
  const yaml = toYaml(props).trimEnd()
  if (!yaml) {
    return `::${tag}\n::`
  }
  return `::${tag}\n---\n${yaml}\n---\n::`
}
