# mdxcn

React components for ASCII-style tables, charts, and diagrams in MDX. Built so an agent can drop a figure next to prose — JSX in MDX, `::graph-*` in Comark, `graph_*` in Knap, official ASCII in a README. Each graph sits in a dashed frame with a title on the top edge. One accent color by default; drawing graphs can take `palette="duo"` or `palette="multi"`. You copy the source into your project — this is not an npm package.

[Docs](https://mdxcn.dev/docs) · [Comark](https://mdxcn.dev/comark) · [Knap](https://mdxcn.dev/knap) · [For agents](https://mdxcn.dev/agents) · [Examples](https://mdxcn.dev/docs/examples) · [Install](https://mdxcn.dev/docs/installation) · [Skill](https://mdxcn.dev/docs/skill) · [GitHub](https://github.com/keshav-exe/markdown-graphs)

## Install

You need an existing [shadcn](https://ui.shadcn.com) project and [`motion`](https://motion.dev).

Scoped registry (same idea as `@dotmatrix/dotm-square-3`):

```bash
pnpm dlx shadcn@latest registry add @mdxcn=https://mdxcn.dev/r/{name}.json
pnpm dlx shadcn@latest add @mdxcn/graph-table
pnpm dlx shadcn@latest add @mdxcn/all
```

Or paste the full URL once:

```bash
pnpm dlx shadcn@latest add https://mdxcn.dev/r/graph-table.json
pnpm dlx shadcn@latest add https://mdxcn.dev/r/all.json
```

`components.json` after `registry add`:

```json
{
  "registries": {
    "@mdxcn": "https://mdxcn.dev/r/{name}.json"
  }
}
```

Files land under `@/registry/default`. Import from there:

```tsx
import { GraphTable } from "@/registry/default/graph-table/graph-table"
```

## Components

| Component | Registry item     | Use for                                    |
| --------- | ----------------- | ------------------------------------------ |
| Table     | `graph-table`     | Data tables with optional footer totals    |
| Sheet     | `graph-sheet`     | Tables with section titles                 |
| Flow      | `graph-flow`      | Process diagrams on a dashed arrow         |
| Bars      | `graph-bars`      | Two bar groups, side by side               |
| Cells     | `graph-cells`     | Filled / empty grids                       |
| Meter     | `graph-meter`     | Progress as `=` and `-`                    |
| Spark     | `graph-spark`     | Sparkline from block characters            |
| Tree      | `graph-tree`      | File or org trees                          |
| Timeline  | `graph-timeline`  | Dated events, one row current              |
| Check     | `graph-check`     | Punch list, `[x]` / `[ ]`                  |
| Stack     | `graph-stack`     | Parts of a whole, glyphs instead of colors |
| Funnel    | `graph-funnel`    | Steps that get narrower                    |
| Gantt     | `graph-gantt`     | Schedule on a character track              |
| Plot      | `graph-plot`      | Line or area from columns of glyphs        |
| Waffle    | `graph-waffle`    | Share of 100 cells                         |
| Diff      | `graph-diff`      | Add / remove / keep rows                   |
| Invoice   | `graph-invoice`   | From, bill-to, line items, totals          |
| Compare   | `graph-compare`   | Feature matrix (`✓` / `–`)                 |
| Matrix    | `graph-matrix`    | Exact numbers on both axes                 |
| Stat      | `graph-stat`      | Large figures with labels                  |
| Spec      | `graph-spec`      | Label / value sheets                       |
| Activity  | `graph-activity`  | GitHub-style contribution grid             |
| Heatmap   | `graph-heatmap`   | Labeled 2d intensity matrix                |
| Calendar  | `graph-calendar`  | One month, marked days                     |
| Waterfall | `graph-waterfall` | Running total as floating bars             |
| Uptime    | `graph-uptime`    | One glyph per day, percent up              |
| Slope     | `graph-slope`     | Two figures per row, before → after        |
| Bullet    | `graph-bullet`    | Actual versus target on one track          |
| Rank      | `graph-rank`      | A ranked list, one bar per row             |
| KPI       | `graph-kpi`       | One number with a sparkline under it       |
| Timer     | `graph-timer`     | Elapsed time, how long ago, or the clock   |
| Countdown | `graph-countdown` | Time left until a date                     |
| Frame     | `graph-frame`     | Shared dashed frame primitives             |

Each docs page has CLI, manual, agent, MDX, Comark, and Knap install tabs. Copy page puts the markdown (install, prompt, examples, props) on the clipboard.

Comark apps render the same figures from `::graph-*` blocks in a plain `.md` file — no MDX. Copy `graph-comark` (already in `all.json`). Full install: `graphComponents` from `graph-comark.tsx`. Subset: `createGraphComponents`. Wiring: [Comark](https://mdxcn.dev/docs/comark). Pitch: [Comark landing](https://mdxcn.dev/comark).

Knap templates pipe the same props through `graph_*` filters and emit the official fence (or a `::graph-*` block). Copy `graph-knap` (already in `all.json`). Spread `graphFilters` into `createEngine`. The Knap CLI does not load them. Wiring: [Knap](https://mdxcn.dev/docs/knap). Pitch: [Knap landing](https://mdxcn.dev/knap).

Composed write-ups (refactor, incident, tradeoff, PR, sprint, migration) live on [Examples](https://mdxcn.dev/docs/examples). [For agents](https://mdxcn.dev/agents) is the write and read story. The [skill](https://mdxcn.dev/docs/skill) tells an agent which graph to put next to the prose — JSX in React, `::graph-*` in Comark, `graph_*` in Knap, fenced ASCII in GitHub. Agents can also fetch [`/llms.txt`](https://mdxcn.dev/llms.txt) for the chooser, the ASCII blocks, the Comark blocks, and the Knap filters.

## Design

- Geist Mono. Dashed frame, `+` corners (swap with `corner`), title as `[ TITLE ]`.
- One accent: `--graph-accent`. Unused rows recede with opacity. `palette="duo"` / `"multi"` opt into `--graph-accent-2` and `--graph-accent-3`.
- Glyphs do the drawing (`█ ▓ ▒ ░ · - = + | ├ └ ✓`). Tracks that represent a range (meter, stack, bullet, rank) span the frame. Spark, bars, cells, and uptime stay packed at 1ch. Pass `glyphs` (`shade` `ascii` `hash` `bar`, or your own characters). No SVG.
- Numbers use `tabular-nums`. Amounts sit right-aligned.
- Motion is transform and opacity only, 220ms, no loops. `prefers-reduced-motion` sets duration to 0.

## Development

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm registry:build
```

Site: [mdxcn.dev](https://mdxcn.dev). MIT license.
