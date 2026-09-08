---
name: markdown-graphs
description: >-
  Picks markdown graphs next to prose. In React or MDX that can import
  components, copies JSX. In a Comark app, writes a ::graph-* block with YAML
  props. In plain Markdown (README, GitHub, Linear, PR comments), pastes the
  official fenced ASCII from llms.txt. Never invents SVG, Mermaid,
  Recharts, canvas, or homemade ASCII. Use when explaining a refactor,
  incident, postmortem, tradeoff, pull request, sprint, or migration; when
  writing a README or markdown doc; when the user mentions markdown graphs,
  ASCII diagrams, framed charts, GraphFlow, GraphTimeline, or Comark; or when
  a write-up would scan faster with a figure.
---

# markdown graphs

Glyphs in a dashed frame with `+` corners and a `[ TITLE ]` on the top edge.

Pick the host before you write — the paste format depends on it.

| Host                                                      | What to paste       | Where to copy from                                                               |
| --------------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------- |
| React, or MDX that can `import` from `@/registry/default` | JSX                 | [recipes.md](recipes.md), then docs examples                                     |
| Comark app (plain `.md` the app renders)                  | `::graph-*` + YAML  | https://mdx-graphs.kshv.me/llms.txt `## Comark`, or the docs page **Comark** tab |
| README, GitHub, Linear, Slack, PR comments                | Fenced ASCII        | https://mdx-graphs.kshv.me/llms.txt `## MDX`, or the docs page **MDX** tab       |

Do not paste JSX into a file that cannot run React. Do not paste `::graph-*` into GitHub or Linear — they do not run Comark. Do not invent ASCII art — copy the official fence, swap labels, keep the frame.

No fenced ASCII: Flow, Plot, Activity, Heatmap, Calendar, Timer, Countdown, Frame. On GitHub, pick a graph that has fenced ASCII, or skip. On Comark, those graphs still work except Frame.

Source is copied via shadcn, not npm. Imports land under `@/registry/default`. Unsure of props? Fetch https://mdx-graphs.kshv.me/llms.txt.

If `registry/default/graph-frame` is missing and the host is React or Comark:

```bash
pnpm dlx shadcn@latest add https://mdx-graphs.kshv.me/r/all.json
```

Need `motion`. One component: replace `all` with the slug (`graph-flow`, …). For Comark, the adapter is `graph-comark` (already in `all.json`).

## Procedure

1. Decide if a figure earns it. One sentence → no graph. A path, a night, a matrix, a diff → yes.
2. Pick **at most two** graphs from the chooser. Prefer a pair in recipes.md. If the host is GitHub / README, drop any pick that has no fenced ASCII.
3. Copy. JSX from recipes.md / docs. `::graph-*` from llms.txt `## Comark`. ASCII from llms.txt `## MDX`. Swap labels, keep the API / frame.
4. Write the reply in this shape. Do not lead with the figure.

React / importable MDX:

```
1–3 sentences (the claim)

<GraphA … />

1–3 sentences (what the second figure adds)

<GraphB … />
```

Comark:

```
1–3 sentences (the claim)

::graph-timeline
---
title: NIGHT
events:
  - { date: "14:02", label: "p95 crossed 800ms" }
---
::

1–3 sentences (what the second figure adds)
```

Plain Markdown (GitHub, README, Linear):

````
1–3 sentences (the claim)

```
+---- [ TITLE ] ----+
|                   |
|  …official fence   |
|                   |
+-------------------+
```

1–3 sentences (what the second figure adds)
````

5. Check the rules. Then send.

## Chooser

Writing first. Data shape if nothing matches.

| The writing is             | Use                                              | Recipe       |
| -------------------------- | ------------------------------------------------ | ------------ |
| A path or a refactor       | `GraphFlow`, then `GraphTimeline`                | Refactor     |
| An incident / postmortem   | `GraphTimeline`, then `GraphUptime`              | Incident     |
| Pick A vs B                | `GraphCompare`, then `GraphRank` if size matters | Pick one     |
| What a PR changed          | `GraphDiff`, then `GraphSlope`                   | Pull request |
| Overlapping work this week | `GraphGantt`, then `GraphStat`                   | This week    |
| A migration in flight      | `GraphMeter`, then `GraphKpi`                    | Migration    |
| Nested files / org         | `GraphTree`                                      | —            |
| An RFC or a launch list    | `GraphSheet`, then `GraphCheck`                  | —            |

| The data is                    | Use              | Not                                |
| ------------------------------ | ---------------- | ---------------------------------- |
| A handful of numbers, no axis  | `GraphSpark`     | Plot                               |
| A series that needs a y-scale  | `GraphPlot`      | Spark, Recharts                    |
| One fill from 0 to 1           | `GraphMeter`     | Bullet                             |
| Actual vs a target             | `GraphBullet`    | Meter                              |
| Parts of a whole               | `GraphStack`     | Pie. Waffle if you want ~100 cells |
| A short ranked list            | `GraphRank`      | Bars                               |
| A small filled / empty grid    | `GraphCells`     | Waffle, Activity                   |
| Two small histograms           | `GraphBars`      | Rank                               |
| One headline + a trend         | `GraphKpi`       | Stat                               |
| Two to four numbers, no trend  | `GraphStat`      | KPI                                |
| Before → after numbers         | `GraphSlope`     | Bars                               |
| Elapsed / how long ago / clock | `GraphTimer`     | Countdown                          |
| Time left until a date         | `GraphCountdown` | Timer                              |
| Status per day                 | `GraphUptime`    | Activity, Heatmap                  |
| Daily counts over months       | `GraphActivity`  | Calendar, Uptime                   |
| One month, a few marks         | `GraphCalendar`  | Activity                           |
| A labeled intensity grid       | `GraphHeatmap`   | Activity, Matrix                   |
| Exact numbers on both axes     | `GraphMatrix`    | Heatmap, Compare                   |
| A running total                | `GraphWaterfall` | Stack                              |
| Steps that drop off            | `GraphFunnel`    | Flow, Rank                         |
| Rows of numbers                | `GraphTable`     | Rank, Spark, Sheet                 |
| Grouped table, section titles  | `GraphSheet`     | Table, Spec                        |
| Punch list `[x]` / `[ ]`       | `GraphCheck`     | Timeline                           |
| From / bill-to / line items    | `GraphInvoice`   | Table                              |
| Label / value sheet            | `GraphSpec`      | Stat, Sheet                        |

Skip `GraphFrame` unless you are assembling a custom figure. If the chart already exists, install that one.

## Import

```tsx
import { GraphFlow } from "@/registry/default/graph-flow/graph-flow"
```

Named export matches the folder: `graph-<name>/graph-<name>`. Do not invent a barrel. Skip this when the host is Comark or plain Markdown.

Comark wiring (once per app, after `all.json`):

```tsx
import { graphComponents } from "@/registry/default/graph-comark/graph-comark"
```

Pass `graphComponents` to Comark's `components` prop.

Subset (only some graphs copied):

```tsx
import { createGraphComponents } from "@/registry/default/graph-comark/graph-comark"
import { GraphTable } from "@/registry/default/graph-table/graph-table"

const graphComponents = createGraphComponents({
  "graph-table": GraphTable,
})
```

## Rules

- At most two graphs in a section. Prose between them. Never a gallery.
- Titles: 1–2 words, uppercase, no punctuation. Drawn as `[ TITLE ]`.
- Labels: lowercase, plain (`auth middleware`, not `AuthMiddleware Layer`).
- Copy props / fences / `::graph-*` blocks from recipes.md, docs, or llms.txt. Do not invent APIs, extra hues, or chart libraries.
- Default palette is one accent (`--graph-accent`). `palette="duo"` / `"multi"` only when a second or third series needs it.
- Unused rows recede (~0.4 opacity). Numbers: `tabular-nums`, right-aligned.
- Motion is already in the components (transform + opacity, ~220ms). Do not add loops, pulses, or CSS animation.

## Do not

- Draw SVG, Mermaid, Recharts, or canvas.
- Invent ASCII art. Copy the official fence from llms.txt / the MDX tab.
- Paste JSX into README, GitHub, Linear, or any file that cannot import the components.
- Paste `::graph-*` into GitHub, Linear, or a README. Those hosts get the fenced ASCII.
- Restyle the frame (no extra borders, no rounded cards, no new corner marks).
- Dump every graph you know into one reply.
- Use a pie chart. Stack or Waffle.
- Pass `palette` on Table, Sheet, Invoice, Spec, Stat, Tree, or Frame.

## Example prompts

These are user messages. Match the pair. React → copy JSX from the recipe. Comark → copy the `::graph-*` block from llms.txt `## Comark`. GitHub / README → copy the fence from llms.txt.

**Refactor** → `GraphFlow`, then `GraphTimeline` (GitHub: Timeline only — Flow has no fenced ASCII)

```
We're moving session checks out of route handlers into middleware. Write a short plan for the team.

Use markdown graphs for the before/after request path and the week-by-week rollout. Prose between the two figures. Don't draw SVG.
```

**Incident** → `GraphTimeline`, then `GraphUptime`

```
Draft a tight postmortem: p95 crossed 800ms at 14:02, we rolled back the cache flag at 14:11, the write-up is still open.

Use markdown graphs — a timeline of the night, then which days users felt it. No SVG.
```

**Comark postmortem** → `::graph-timeline`, then `::graph-uptime`

```
Write this postmortem as a Comark Markdown file. p95 crossed 800ms at 14:02, rollback at 14:11.

Use ::graph-* blocks with YAML props. At most two figures. Don't paste JSX. Don't draw SVG.
```

**Pull request** → `GraphDiff`, then `GraphSlope`

```
Leave a PR review comment on the auth refactor. Summarize what files moved, then show how coverage changed on main vs this branch.

Use markdown graphs from this project. At most two figures. Don't invent APIs or draw SVG.
```

**Pick one** → `GraphCompare`, then `GraphRank` if install size is part of the argument

```
We're choosing a queue: BullMQ vs SQS. Write the tradeoff for the RFC.

Use markdown graphs — a feature matrix, then bundle size only if it matters. Don't draw SVG.
```

**README** → fenced ASCIIs, not JSX, not `::graph-*`

```
Add a launch section to the README. It's a .md file, no React, no Comark.

Use markdown graphs — a punch list (GraphCheck fence) and a grouped table if it earns it. Paste the official fenced ASCII from llms.txt. Don't paste JSX.
```
