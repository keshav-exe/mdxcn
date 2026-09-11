<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# markdown graphs

ASCII-framed React diagrams for MDX. Source is copied via shadcn registry, not npm. Site: https://mdx-graphs.kshv.me. Repo: https://github.com/keshav-exe/markdown-graphs.

Nested agent notes:

- [`registry/default/AGENTS.md`](registry/default/AGENTS.md) — how to build a graph
- [`lib/docs/AGENTS.md`](lib/docs/AGENTS.md) — catalog, examples, recipes, **New** marks, OG, ASCII/MDX
- [`skills/markdown-graphs/SKILL.md`](skills/markdown-graphs/SKILL.md) — Agent Skills file; copy into `.cursor/skills`, `.claude/skills`, `.agents/skills`, or `.opencode/skills`

## Adding a graph

Do the full list. Docs pages are generated from the catalog; there is no per-component route file.

1. `registry/default/graph-<name>/graph-<name>.tsx`
2. Item in `registry.json` (and its files on the `all` item)
3. Export from `registry/default/index.ts` and `components/graphs/index.ts`
4. Entry in `lib/docs/catalog.ts` and `lib/docs/files.ts`
5. Examples in `components/docs/examples.tsx`, keyed in `examplesBySlug`
6. **Replace** `NEW_SLUGS` in `lib/docs/new.ts` with this drop’s slugs. Do not append to last drop’s list.
7. Row in the README component table
8. Homepage (`app/page.tsx`) only if it earns a slot
9. fenced ASCII in `lib/ascii` + `MDX_SLUGS` if the figure is a character grid (see `lib/docs/AGENTS.md`)
10. Comark: `COMARK_PROPS` in `lib/docs/comark-props.ts` and `numeric` / `required` in `registry/default/graph-comark/adapters.ts`. Do not add a catalog row for `graph-comark`.
11. `pnpm registry:build` so `public/r/` matches source

OG is one static `app/opengraph-image.png` (+ `.alt.txt`) shared by every route. No per-page `opengraph-image.tsx`, no `ImageResponse` at request time. Redraw the PNG only if the mark or palette changes; `lib/og/mark.tsx` is the source of the mark.

## Design

- Geist Mono. Dashed frame, `+` corners (`corner` prop), title as `[ TITLE ]`.
- One accent: `--graph-accent`. Dim unused rows with opacity (~0.4). Drawing graphs take `palette?: "mono" | "duo" | "multi"` — default mono. duo uses `--graph-accent-2` for the second series. multi cycles three hues. Site accent picker: solid hues first (Theme, Mint, Orange, Green, Cyan, Blue, Purple, Pink), then 3-stop families (Sunset, Ocean, Neon, Aurora, Fire, Prism).
- Glyphs draw the chart. Tracks that represent a range (meter, stack, activity) span the frame (`GraphTrack` / `GraphTick`). Spark, bars, cells, uptime, and rank stay packed at 1ch, centered, with a small gap. `glyphs` is a preset (`shade` `ascii` `hash` `bar`) or a custom character array. No SVG, Recharts, or canvas.
- `tabular-nums`. Amounts right-aligned.
- Motion: transform + opacity, ~220ms, ease-out cubic `[0.215, 0.61, 0.355, 1]`. `useReducedMotion` → duration 0. No loops, no pulsing. Timers tick once a second as text.
- Don’t animate hundreds of cells one-by-one — stagger weeks/rows.
- Plain language. No slogans.

## Code

- Prettier: no semicolons, double quotes, 80 width, Tailwind plugin.
- Registry imports: `@/registry/default/...`. Site barrel: `@/components/graphs`.
- `"use client"` on graphs that use motion.
- Every graph forwards `corner?: string` to `Graph`. Drawing graphs also take `glyphs?: Glyphs` and `palette?: GraphPalette`.
- Shared helpers live in `graph-frame` (`graph-motion.ts`). Don’t couple intensity legends into the frame — keep them in the drawing component.

## Commands

```bash
pnpm dev
pnpm typecheck
pnpm registry:build
```
