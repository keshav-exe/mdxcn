# Recipe JSX

Load this after [SKILL.md](SKILL.md) when you are about to write a figure in React, or in MDX that can import `@/registry/default`.

If the host is Comark, do not paste this JSX. Fetch https://mdx-graphs.kshv.me/llms.txt and copy the matching `::graph-*` block from `## Comark`.

If the host is plain Markdown that cannot run a renderer (README, GitHub, Linear, PR comments, a `.md` file with no Comark), do not paste this JSX. Fetch https://mdx-graphs.kshv.me/llms.txt and copy the matching fenced ASCII from `## MDX`. Swap labels, keep the frame.

Copy a pair. Swap labels for the user's names. Keep the props. Two graphs per section, prose between them. Do not add a third.

## Refactor

Walk through a change. Path first, then the weeks.

```tsx
import { GraphFlow } from "@/registry/default/graph-flow/graph-flow"
import { GraphTimeline } from "@/registry/default/graph-timeline/graph-timeline"

<GraphFlow
  title="AUTH"
  rows={[
    {
      nodes: [
        { label: "request" },
        { label: "handler" },
        { label: "session util", tone: "muted" },
      ],
    },
    {
      nodes: [
        { label: "request" },
        { label: "middleware", tone: "accent" },
        { label: "handler" },
      ],
    },
  ]}
/>

<GraphTimeline
  title="PLAN"
  events={[
    { date: "w1", label: "extract session helper", state: "done" },
    { date: "w2", label: "move checks to middleware", state: "now" },
    { date: "w3", label: "delete the old util", state: "next" },
  ]}
/>
```

## Incident

What happened, then which days took the hit.

```tsx
import { GraphTimeline } from "@/registry/default/graph-timeline/graph-timeline"
import { GraphUptime } from "@/registry/default/graph-uptime/graph-uptime"

<GraphTimeline
  title="INCIDENT"
  events={[
    { date: "14:02", label: "p95 crossed 800ms" },
    { date: "14:11", label: "rolled back the cache flag", state: "now" },
    { date: "14:40", label: "write the postmortem", state: "next" },
  ]}
/>

<GraphUptime
  title="API"
  from="Aug 14"
  to="Aug 27"
  days={[
    "ok",
    "ok",
    "ok",
    "ok",
    "ok",
    "degraded",
    "ok",
    "ok",
    "down",
    "down",
    "ok",
    "ok",
    "ok",
    "ok",
  ]}
/>
```

## Pick one

A matrix, then sizes if they matter.

```tsx
import { GraphCompare } from "@/registry/default/graph-compare/graph-compare"
import { GraphRank } from "@/registry/default/graph-rank/graph-rank"

<GraphCompare
  title="QUEUE"
  columns={["BullMQ", "SQS"]}
  accent="BullMQ"
  rows={[
    { label: "in-process", values: [true, false] },
    { label: "retries", values: [true, true] },
    { label: "ops", values: ["redis", "aws"] },
    { label: "local", values: [true, false] },
  ]}
/>

<GraphRank
  title="INSTALL"
  items={[
    { label: "bullmq", value: 48, display: "48 kb" },
    { label: "ioredis", value: 31, display: "31 kb" },
    { label: "aws sdk", value: 120, display: "120 kb" },
  ]}
/>
```

## Pull request

What moved, and what the numbers did.

```tsx
import { GraphDiff } from "@/registry/default/graph-diff/graph-diff"
import { GraphSlope } from "@/registry/default/graph-slope/graph-slope"

<GraphDiff
  title="FILES"
  palette="duo"
  rows={[
    { label: "auth.ts", value: "new", sign: "add" },
    { label: "session.ts", value: "moved" },
    { label: "legacy-auth.ts", value: "gone", sign: "remove" },
  ]}
/>

<GraphSlope
  title="COVERAGE"
  fromLabel="main"
  toLabel="this pr"
  items={[
    { label: "auth", from: 41, to: 88 },
    { label: "billing", from: 72, to: 74 },
    { label: "docs", from: 11, to: 40 },
  ]}
/>
```

## This week

Overlapping work, then the board counts.

```tsx
import { GraphGantt } from "@/registry/default/graph-gantt/graph-gantt"
import { GraphStat } from "@/registry/default/graph-stat/graph-stat"

<GraphGantt
  title="THIS WEEK"
  columns={20}
  ticks={["mon", "wed", "fri"]}
  stage="patch"
  items={[
    { label: "rfc", start: 0, end: 0.4, complete: 1 },
    { label: "patch", start: 0.35, end: 0.8, complete: 0.55 },
    { label: "review", start: 0.7, end: 1, complete: 0 },
  ]}
/>

<GraphStat
  title="BOARD"
  items={[
    { value: "4", label: "in review" },
    { value: "2", label: "blocked" },
    { value: "9", label: "shipped", accent: true },
  ]}
/>
```

## Migration

How far the job is, and the count behind it.

```tsx
import { GraphMeter } from "@/registry/default/graph-meter/graph-meter"
import { GraphKpi } from "@/registry/default/graph-kpi/graph-kpi"

<GraphMeter
  title="ROWS"
  value={0.67}
  caption="users table"
/>

<GraphKpi
  title="MIGRATED"
  value="1.2M"
  label="of 1.8M rows"
  hint="67%"
  data={[2, 3, 3, 5, 8, 9, 11, 12, 14, 16, 18, 21]}
/>
```
