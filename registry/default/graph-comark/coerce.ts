/**
 * Comark hands every component a bag of props parsed out of Markdown.
 *
 * Two things need normalising before those props can reach a typed React
 * component:
 *
 * 1. Scalars arrive as strings. `{value=0.82}` and `ticks: 24` both become
 *    `"0.82"` and `"24"` — Markdown attributes have no number type. Arrays and
 *    objects are the exception: Comark JSON-encodes them on the way in and
 *    parses them back out, so `rows:` and `data:` arrive as real values.
 * 2. Keys may carry a leading `:`. Comark keeps Vue-style binding keys
 *    (`{legend}` → `:legend`, `{:data='[1,2]'}` → `:data`) intact for the
 *    renderer to resolve.
 *
 * `coerceProps` undoes both, so a component can keep its normal typed API and
 * stay usable from TSX as well as from Markdown.
 */

export type NumericProps = readonly string[]

function toNumber(value: unknown): unknown {
  if (typeof value !== "string") return value
  const trimmed = value.trim()
  if (trimmed === "") return value
  const parsed = Number(trimmed)
  return Number.isFinite(parsed) ? parsed : value
}

/**
 * `"true"` / `"false"` only. Anything else is left alone, so a genuine string
 * prop is never clobbered — that matters for props like the activity graph's
 * `caption?: string | false`.
 */
function toBoolean(value: unknown): unknown {
  if (value === "true") return true
  if (value === "false") return false
  return value
}

export function coerceProps<T extends Record<string, unknown>>(
  props: Record<string, unknown>,
  numeric: NumericProps = []
): T {
  const out: Record<string, unknown> = {}

  for (const [rawKey, rawValue] of Object.entries(props)) {
    if (rawKey.startsWith("$")) continue

    const unprefixed = rawKey.startsWith(":") ? rawKey.slice(1) : rawKey
    const key = unprefixed === "class" ? "className" : unprefixed
    const value = toBoolean(rawValue)

    out[key] = numeric.includes(key) ? toNumber(value) : value
  }

  return out as T
}
