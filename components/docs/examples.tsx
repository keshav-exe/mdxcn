import type { ReactNode } from "react"

import { ComponentPreview } from "@/components/docs/preview"
import {
  Callout,
  Changelog,
  Graph,
  GraphActivity,
  GraphBars,
  GraphBody,
  GraphBullet,
  GraphCalendar,
  GraphCells,
  GraphCheck,
  GraphCompare,
  GraphCountdown,
  GraphDiff,
  GraphFlow,
  GraphFunnel,
  GraphGantt,
  GraphHeatmap,
  GraphInvoice,
  GraphKpi,
  GraphMatrix,
  GraphMeter,
  GraphPlot,
  GraphRank,
  GraphRule,
  GraphSheet,
  GraphSlope,
  GraphSpark,
  GraphSpec,
  GraphStack,
  GraphStat,
  GraphTable,
  GraphTimeline,
  GraphTimer,
  GraphTree,
  GraphUptime,
  GraphWaffle,
  GraphWaterfall,
  Quote,
  Steps,
  Terminal,
} from "@/components/graphs"

type Example = {
  title: string
  description?: string
  code: string
  react?: string
  preview: ReactNode
}

function Examples({ items }: { items: Example[] }) {
  return (
    <div className="flex flex-col gap-16">
      {items.map((item) => (
        <ComponentPreview
          code={item.code}
          description={item.description}
          key={item.title}
          react={item.react}
          title={item.title}
        >
          {item.preview}
        </ComponentPreview>
      ))}
    </div>
  )
}

function tsx(slug: string, names: string, body: string) {
  return `import { ${names} } from "@/registry/default/${slug}/${slug}"

${body.trim()}`
}

const tableExamples: Example[] = [
  {
    title: "research cost",
    code: `<GraphTable title="WHAT THE RESEARCH COST">

| Agent | Tokens | Tool calls | Time |
| --- | ---: | ---: | ---: |
| Inks and paper | 115,207 | 120 | 16m |
| Overprint and drift | 135,218 | 164 | 16m |
| Naming the patterns | 186,716 | 112 | 18m |
| Total | 437,141 | 396 | ~50m |

</GraphTable>`,
    react: tsx(
      "graph-table",
      "GraphTable",
      `<GraphTable title="WHAT THE RESEARCH COST">
  <table>
    <thead>
      <tr>
        <th>Agent</th>
        <th>Tokens</th>
        <th>Tool calls</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Inks and paper</td>
        <td>115,207</td>
        <td>120</td>
        <td>16m</td>
      </tr>
      <tr>
        <td>Overprint and drift</td>
        <td>135,218</td>
        <td>164</td>
        <td>16m</td>
      </tr>
      <tr>
        <td>Naming the patterns</td>
        <td>186,716</td>
        <td>112</td>
        <td>18m</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>Total</td>
        <td>437,141</td>
        <td>396</td>
        <td>~50m</td>
      </tr>
    </tfoot>
  </table>
</GraphTable>`
    ),
    preview: (
      <GraphTable title="WHAT THE RESEARCH COST">
        <table>
          <thead>
            <tr>
              <th>Agent</th>
              <th>Tokens</th>
              <th>Tool calls</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Inks and paper</td>
              <td>115,207</td>
              <td>120</td>
              <td>16m</td>
            </tr>
            <tr>
              <td>Overprint and drift</td>
              <td>135,218</td>
              <td>164</td>
              <td>16m</td>
            </tr>
            <tr>
              <td>Naming the patterns</td>
              <td>186,716</td>
              <td>112</td>
              <td>18m</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>437,141</td>
              <td>396</td>
              <td>~50m</td>
            </tr>
          </tfoot>
        </table>
      </GraphTable>
    ),
  },
  {
    title: "taste, explained",
    code: `<GraphTable title="TASTE, EXPLAINED">

| Decision | Reason |
| --- | --- |
| ease-out on enter | feels snappier |
| 180ms, not 400ms | feels faster, more responsive |
| springs for gestures | they carry your momentum |
| scale 0.97 on press | it makes the UI feel alive |
| no animation at all | you open it hundreds of times |

</GraphTable>`,
    react: tsx(
      "graph-table",
      "GraphTable",
      `<GraphTable title="TASTE, EXPLAINED">
  <table>
    <thead>
      <tr>
        <th>Decision</th>
        <th>Reason</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ease-out on enter</td>
        <td>feels snappier</td>
      </tr>
      <tr>
        <td>180ms, not 400ms</td>
        <td>feels faster, more responsive</td>
      </tr>
      <tr>
        <td>springs for gestures</td>
        <td>they carry your momentum</td>
      </tr>
      <tr>
        <td>scale 0.97 on press</td>
        <td>it makes the UI feel alive</td>
      </tr>
      <tr>
        <td>no animation at all</td>
        <td>you open it hundreds of times</td>
      </tr>
    </tbody>
  </table>
</GraphTable>`
    ),
    preview: (
      <GraphTable title="TASTE, EXPLAINED">
        <table>
          <thead>
            <tr>
              <th>Decision</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ease-out on enter</td>
              <td>feels snappier</td>
            </tr>
            <tr>
              <td>180ms, not 400ms</td>
              <td>feels faster, more responsive</td>
            </tr>
            <tr>
              <td>springs for gestures</td>
              <td>they carry your momentum</td>
            </tr>
            <tr>
              <td>scale 0.97 on press</td>
              <td>it makes the UI feel alive</td>
            </tr>
            <tr>
              <td>no animation at all</td>
              <td>you open it hundreds of times</td>
            </tr>
          </tbody>
        </table>
      </GraphTable>
    ),
  },
]

const sheetExamples: Example[] = [
  {
    title: "rfc",
    code: `<GraphSheet title="RFC">

### Scope

| Item | Owner | Status |
| --- | --- | --- |
| CLI copies files | priya | done |
| Docs previews | jon | now |

### Out of scope

| Item | Owner | Status |
| --- | --- | --- |
| npm package | — | later |
| Figma kit | — | later |

</GraphSheet>`,
    react: tsx(
      "graph-sheet",
      "GraphSheet",
      `<GraphSheet title="RFC">
  <h3>Scope</h3>
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Owner</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>CLI copies files</td>
        <td>priya</td>
        <td>done</td>
      </tr>
      <tr>
        <td>Docs previews</td>
        <td>jon</td>
        <td>now</td>
      </tr>
    </tbody>
  </table>
  <h3>Out of scope</h3>
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Owner</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>npm package</td>
        <td>—</td>
        <td>later</td>
      </tr>
      <tr>
        <td>Figma kit</td>
        <td>—</td>
        <td>later</td>
      </tr>
    </tbody>
  </table>
</GraphSheet>`
    ),
    preview: (
      <GraphSheet title="RFC">
        <h3>Scope</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Owner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CLI copies files</td>
              <td>priya</td>
              <td>done</td>
            </tr>
            <tr>
              <td>Docs previews</td>
              <td>jon</td>
              <td>now</td>
            </tr>
          </tbody>
        </table>
        <h3>Out of scope</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Owner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>npm package</td>
              <td>—</td>
              <td>later</td>
            </tr>
            <tr>
              <td>Figma kit</td>
              <td>—</td>
              <td>later</td>
            </tr>
          </tbody>
        </table>
      </GraphSheet>
    ),
  },
  {
    title: "surface",
    code: `<GraphSheet title="SURFACE">

### Frame

| Name | Kind | Stable |
| --- | --- | --- |
| Graph | primitive | yes |
| GraphBody | primitive | yes |

### Charts

| Name | Kind | Stable |
| --- | --- | --- |
| GraphTable | component | yes |
| GraphSheet | component | new |

</GraphSheet>`,
    react: tsx(
      "graph-sheet",
      "GraphSheet",
      `<GraphSheet title="SURFACE">
  <h3>Frame</h3>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Kind</th>
        <th>Stable</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Graph</td>
        <td>primitive</td>
        <td>yes</td>
      </tr>
      <tr>
        <td>GraphBody</td>
        <td>primitive</td>
        <td>yes</td>
      </tr>
    </tbody>
  </table>
  <h3>Charts</h3>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Kind</th>
        <th>Stable</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>GraphTable</td>
        <td>component</td>
        <td>yes</td>
      </tr>
      <tr>
        <td>GraphSheet</td>
        <td>component</td>
        <td>new</td>
      </tr>
    </tbody>
  </table>
</GraphSheet>`
    ),
    preview: (
      <GraphSheet title="SURFACE">
        <h3>Frame</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Kind</th>
              <th>Stable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Graph</td>
              <td>primitive</td>
              <td>yes</td>
            </tr>
            <tr>
              <td>GraphBody</td>
              <td>primitive</td>
              <td>yes</td>
            </tr>
          </tbody>
        </table>
        <h3>Charts</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Kind</th>
              <th>Stable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GraphTable</td>
              <td>component</td>
              <td>yes</td>
            </tr>
            <tr>
              <td>GraphSheet</td>
              <td>component</td>
              <td>new</td>
            </tr>
          </tbody>
        </table>
      </GraphSheet>
    ),
  },
]

const flowExamples: Example[] = [
  {
    title: "optimistic ui",
    code: `<GraphFlow title="OPTIMISTIC UI">

tap → server → update

tap → **update** → *server syncs*

</GraphFlow>`,
    react: tsx(
      "graph-flow",
      "GraphFlow",
      `<GraphFlow title="OPTIMISTIC UI">
  <p>tap → server → update</p>
  <p>
    tap → <strong>update</strong> → <em>server syncs</em>
  </p>
</GraphFlow>`
    ),
    preview: (
      <GraphFlow title="OPTIMISTIC UI">
        <p>tap → server → update</p>
        <p>
          tap → <strong>update</strong> → <em>server syncs</em>
        </p>
      </GraphFlow>
    ),
  },
  {
    title: "publish path",
    code: `<GraphFlow title="PUBLISH PATH">

write → review → ship

</GraphFlow>`,
    react: tsx(
      "graph-flow",
      "GraphFlow",
      `<GraphFlow title="PUBLISH PATH">
  <p>write → review → ship</p>
</GraphFlow>`
    ),
    preview: (
      <GraphFlow title="PUBLISH PATH">
        <p>write → review → ship</p>
      </GraphFlow>
    ),
  },
]

const barsExamples: Example[] = [
  {
    title: "before / after",
    code: `<GraphBars title="THROUGHPUT" palette="duo">

- before: 2 4 3 5 2
- **after**: 2 4 3 5 2

</GraphBars>`,
    react: tsx(
      "graph-bars",
      "GraphBars",
      `<GraphBars title="THROUGHPUT" palette="duo">
  <ul>
    <li>before: 2 4 3 5 2</li>
    <li>
      <strong>after</strong>: 2 4 3 5 2
    </li>
  </ul>
</GraphBars>`
    ),
    preview: (
      <GraphBars palette="duo" title="THROUGHPUT">
        <ul>
          <li>before: 2 4 3 5 2</li>
          <li>
            <strong>after</strong>: 2 4 3 5 2
          </li>
        </ul>
      </GraphBars>
    ),
  },
  {
    title: "draft to shipped",
    code: `<GraphBars title="DRAFT TO SHIPPED" processor="edit">

- draft: 1 2 2 3 1
- **shipped**: 3 5 4 6 5

</GraphBars>`,
    react: tsx(
      "graph-bars",
      "GraphBars",
      `<GraphBars title="DRAFT TO SHIPPED" processor="edit">
  <ul>
    <li>draft: 1 2 2 3 1</li>
    <li>
      <strong>shipped</strong>: 3 5 4 6 5
    </li>
  </ul>
</GraphBars>`
    ),
    preview: (
      <GraphBars processor="edit" title="DRAFT TO SHIPPED">
        <ul>
          <li>draft: 1 2 2 3 1</li>
          <li>
            <strong>shipped</strong>: 3 5 4 6 5
          </li>
        </ul>
      </GraphBars>
    ),
  },
]

const rankExamples: Example[] = [
  {
    title: "routes",
    code: `<GraphRank title="ROUTES">

- 12,400 /docs
- 4,100 /install
- 860 /plot
- 420 /rank

</GraphRank>`,
    react: tsx(
      "graph-rank",
      "GraphRank",
      `<GraphRank title="ROUTES">
  <ul>
    <li>12,400 /docs</li>
    <li>4,100 /install</li>
    <li>860 /plot</li>
    <li>420 /rank</li>
  </ul>
</GraphRank>`
    ),
    preview: (
      <GraphRank title="ROUTES">
        <ul>
          <li>12,400 /docs</li>
          <li>4,100 /install</li>
          <li>860 /plot</li>
          <li>420 /rank</li>
        </ul>
      </GraphRank>
    ),
  },
  {
    title: "coverage",
    code: `<GraphRank title="COVERAGE" max={100}>

- 100% frame
- 82% plot
- 41% invoice

</GraphRank>`,
    react: tsx(
      "graph-rank",
      "GraphRank",
      `<GraphRank title="COVERAGE" max={100}>
  <ul>
    <li>100% frame</li>
    <li>82% plot</li>
    <li>41% invoice</li>
  </ul>
</GraphRank>`
    ),
    preview: (
      <GraphRank max={100} title="COVERAGE">
        <ul>
          <li>100% frame</li>
          <li>82% plot</li>
          <li>41% invoice</li>
        </ul>
      </GraphRank>
    ),
  },
]

const cellsExamples: Example[] = [
  {
    title: "two ways to learn",
    code: `<GraphCells title="TWO WAYS TO LEARN">

- fragments: 1 0 1 0 0 / 0 1 0 1 0 / 1 0 0 0 1
- a system: 1 1 1 1 1 / 1 1 1 1 1 / 1 1 1 1 1

</GraphCells>`,
    react: tsx(
      "graph-cells",
      "GraphCells",
      `<GraphCells title="TWO WAYS TO LEARN">
  <ul>
    <li>fragments: 1 0 1 0 0 / 0 1 0 1 0 / 1 0 0 0 1</li>
    <li>a system: 1 1 1 1 1 / 1 1 1 1 1 / 1 1 1 1 1</li>
  </ul>
</GraphCells>`
    ),
    preview: (
      <GraphCells title="TWO WAYS TO LEARN">
        <ul>
          <li>fragments: 1 0 1 0 0 / 0 1 0 1 0 / 1 0 0 0 1</li>
          <li>a system: 1 1 1 1 1 / 1 1 1 1 1 / 1 1 1 1 1</li>
        </ul>
      </GraphCells>
    ),
  },
  {
    title: "coverage",
    code: `<GraphCells title="COVERAGE">

- this week: 1 1 1 1 0 / 1 1 0 1 1 / 1 0 1 1 1

</GraphCells>`,
    react: tsx(
      "graph-cells",
      "GraphCells",
      `<GraphCells title="COVERAGE">
  <ul>
    <li>this week: 1 1 1 1 0 / 1 1 0 1 1 / 1 0 1 1 1</li>
  </ul>
</GraphCells>`
    ),
    preview: (
      <GraphCells title="COVERAGE">
        <ul>
          <li>this week: 1 1 1 1 0 / 1 1 0 1 1 / 1 0 1 1 1</li>
        </ul>
      </GraphCells>
    ),
  },
]

const meterExamples: Example[] = [
  {
    title: "shipped",
    description: "Dashes stay empty until the fill animates in.",
    code: `import { GraphMeter } from "@/registry/default/graph-meter/graph-meter"

<GraphMeter title="SHIPPED" value="67%" caption="characters, not a progress bar" />`,
    preview: (
      <GraphMeter
        caption="characters, not a progress bar"
        title="SHIPPED"
        value="67%"
      />
    ),
  },
  {
    title: "coverage",
    description: "Fewer ticks. Tighter meter.",
    code: `import { GraphMeter } from "@/registry/default/graph-meter/graph-meter"

<GraphMeter title="COVERAGE" value={0.92} ticks={10} caption="tests passing" />`,
    preview: (
      <GraphMeter
        caption="tests passing"
        ticks={10}
        title="COVERAGE"
        value={0.92}
      />
    ),
  },
]

const sparkExamples: Example[] = [
  {
    title: "latency",
    description:
      "data can be a string of numbers. The last point is the accent.",
    code: `import { GraphSpark } from "@/registry/default/graph-spark/graph-spark"

<GraphSpark title="LATENCY" data="2 3 4 3 6 5 8 7 9 6 10 8" caption="last point is the accent" />`,
    preview: (
      <GraphSpark
        caption="last point is the accent"
        data="2 3 4 3 6 5 8 7 9 6 10 8"
        title="LATENCY"
      />
    ),
  },
  {
    title: "requests",
    description: "A quieter series.",
    code: `import { GraphSpark } from "@/registry/default/graph-spark/graph-spark"

<GraphSpark
  title="REQUESTS"
  data={[4, 4, 5, 3, 6, 8, 7, 9, 8, 6, 5, 7]}
  caption="last twelve deploys"
/>`,
    preview: (
      <GraphSpark
        caption="last twelve deploys"
        data={[4, 4, 5, 3, 6, 8, 7, 9, 8, 6, 5, 7]}
        title="REQUESTS"
      />
    ),
  },
]

const treeExamples: Example[] = [
  {
    title: "registry",
    code: `<GraphTree title="REGISTRY">

- registry/default
  - graph-frame
    - graph-frame.tsx — ui
    - graph-motion.ts — lib
  - graph-tree
    - **graph-tree.tsx** — ui

</GraphTree>`,
    react: tsx(
      "graph-tree",
      "GraphTree",
      `<GraphTree title="REGISTRY">
  <ul>
    <li>
      registry/default
      <ul>
        <li>
          graph-frame
          <ul>
            <li>graph-frame.tsx — ui</li>
            <li>graph-motion.ts — lib</li>
          </ul>
        </li>
        <li>
          graph-tree
          <ul>
            <li>
              <strong>graph-tree.tsx</strong> — ui
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</GraphTree>`
    ),
    preview: (
      <GraphTree title="REGISTRY">
        <ul>
          <li>
            registry/default
            <ul>
              <li>
                graph-frame
                <ul>
                  <li>graph-frame.tsx — ui</li>
                  <li>graph-motion.ts — lib</li>
                </ul>
              </li>
              <li>
                graph-tree
                <ul>
                  <li>
                    <strong>graph-tree.tsx</strong> — ui
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </GraphTree>
    ),
  },
  {
    title: "team",
    code: `<GraphTree title="ON CALL">

- platform
  - api — priya
  - **workers** — jon
  - edge — mina

</GraphTree>`,
    react: tsx(
      "graph-tree",
      "GraphTree",
      `<GraphTree title="ON CALL">
  <ul>
    <li>
      platform
      <ul>
        <li>api — priya</li>
        <li>
          <strong>workers</strong> — jon
        </li>
        <li>edge — mina</li>
      </ul>
    </li>
  </ul>
</GraphTree>`
    ),
    preview: (
      <GraphTree title="ON CALL">
        <ul>
          <li>
            platform
            <ul>
              <li>api — priya</li>
              <li>
                <strong>workers</strong> — jon
              </li>
              <li>edge — mina</li>
            </ul>
          </li>
        </ul>
      </GraphTree>
    ),
  },
]

const timelineExamples: Example[] = [
  {
    title: "shipped",
    code: `<GraphTimeline title="SHIPPED">

- Mar 12: CLI copies the files
- **Mar 18: Docs, live previews**
- *Apr 02: Registry listed*

</GraphTimeline>`,
    react: tsx(
      "graph-timeline",
      "GraphTimeline",
      `<GraphTimeline title="SHIPPED">
  <ul>
    <li>Mar 12: CLI copies the files</li>
    <li>
      <strong>Mar 18: Docs, live previews</strong>
    </li>
    <li>
      <em>Apr 02: Registry listed</em>
    </li>
  </ul>
</GraphTimeline>`
    ),
    preview: (
      <GraphTimeline title="SHIPPED">
        <ul>
          <li>Mar 12: CLI copies the files</li>
          <li>
            <strong>Mar 18: Docs, live previews</strong>
          </li>
          <li>
            <em>Apr 02: Registry listed</em>
          </li>
        </ul>
      </GraphTimeline>
    ),
  },
  {
    title: "incident",
    code: `<GraphTimeline title="INCIDENT">

- 14:02: p95 crossed 800ms
- **14:11: rolled back the cache flag**
- *14:40: write the postmortem*

</GraphTimeline>`,
    react: tsx(
      "graph-timeline",
      "GraphTimeline",
      `<GraphTimeline title="INCIDENT">
  <ul>
    <li>14:02: p95 crossed 800ms</li>
    <li>
      <strong>14:11: rolled back the cache flag</strong>
    </li>
    <li>
      <em>14:40: write the postmortem</em>
    </li>
  </ul>
</GraphTimeline>`
    ),
    preview: (
      <GraphTimeline title="INCIDENT">
        <ul>
          <li>14:02: p95 crossed 800ms</li>
          <li>
            <strong>14:11: rolled back the cache flag</strong>
          </li>
          <li>
            <em>14:40: write the postmortem</em>
          </li>
        </ul>
      </GraphTimeline>
    ),
  },
]

const checkExamples: Example[] = [
  {
    title: "launch",
    code: `<GraphCheck title="LAUNCH">

- [x] freeze tokens
- [x] ship registry json
- [ ] write the postmortem — still open

</GraphCheck>`,
    react: tsx(
      "graph-check",
      "GraphCheck",
      `<GraphCheck title="LAUNCH">
  <ul>
    <li>[x] freeze tokens</li>
    <li>[x] ship registry json</li>
    <li>[ ] write the postmortem — still open</li>
  </ul>
</GraphCheck>`
    ),
    preview: (
      <GraphCheck title="LAUNCH">
        <ul>
          <li>[x] freeze tokens</li>
          <li>[x] ship registry json</li>
          <li>[ ] write the postmortem — still open</li>
        </ul>
      </GraphCheck>
    ),
  },
  {
    title: "review",
    code: `<GraphCheck title="REVIEW">

- [x] title is a sentence
- [x] numbers are tabular
- [ ] motion respects reduced — check the timer

</GraphCheck>`,
    react: tsx(
      "graph-check",
      "GraphCheck",
      `<GraphCheck title="REVIEW">
  <ul>
    <li>[x] title is a sentence</li>
    <li>[x] numbers are tabular</li>
    <li>[ ] motion respects reduced — check the timer</li>
  </ul>
</GraphCheck>`
    ),
    preview: (
      <GraphCheck title="REVIEW">
        <ul>
          <li>[x] title is a sentence</li>
          <li>[x] numbers are tabular</li>
          <li>[ ] motion respects reduced — check the timer</li>
        </ul>
      </GraphCheck>
    ),
  },
]

const stackExamples: Example[] = [
  {
    title: "bundle",
    code: `<GraphStack title="BUNDLE" palette="multi">

- marketing: 48 js, 22 css, 30 images
- docs: 28 js, 18 css, 54 images

</GraphStack>`,
    react: tsx(
      "graph-stack",
      "GraphStack",
      `<GraphStack title="BUNDLE" palette="multi">
  <ul>
    <li>marketing: 48 js, 22 css, 30 images</li>
    <li>docs: 28 js, 18 css, 54 images</li>
  </ul>
</GraphStack>`
    ),
    preview: (
      <GraphStack palette="multi" title="BUNDLE">
        <ul>
          <li>marketing: 48 js, 22 css, 30 images</li>
          <li>docs: 28 js, 18 css, 54 images</li>
        </ul>
      </GraphStack>
    ),
  },
  {
    title: "tokens",
    code: `<GraphStack title="TOKENS" ticks={28}>

- week: 61 prompt, 27 completion, 12 cached

</GraphStack>`,
    react: tsx(
      "graph-stack",
      "GraphStack",
      `<GraphStack title="TOKENS" ticks={28}>
  <ul>
    <li>week: 61 prompt, 27 completion, 12 cached</li>
  </ul>
</GraphStack>`
    ),
    preview: (
      <GraphStack ticks={28} title="TOKENS">
        <ul>
          <li>week: 61 prompt, 27 completion, 12 cached</li>
        </ul>
      </GraphStack>
    ),
  },
]

const funnelExamples: Example[] = [
  {
    title: "install",
    code: `<GraphFunnel title="INSTALL" stage="ship">

- 12,400 docs
- 4,100 copy
- 860 ship

</GraphFunnel>`,
    react: tsx(
      "graph-funnel",
      "GraphFunnel",
      `<GraphFunnel title="INSTALL" stage="ship">
  <ul>
    <li>12,400 docs</li>
    <li>4,100 copy</li>
    <li>860 ship</li>
  </ul>
</GraphFunnel>`
    ),
    preview: (
      <GraphFunnel stage="ship" title="INSTALL">
        <ul>
          <li>12,400 docs</li>
          <li>4,100 copy</li>
          <li>860 ship</li>
        </ul>
      </GraphFunnel>
    ),
  },
  {
    title: "signup",
    code: `<GraphFunnel title="SIGNUP" ticks={16}>

- 8,000 visit
- 2,400 start
- 960 verify
- 180 paid

</GraphFunnel>`,
    react: tsx(
      "graph-funnel",
      "GraphFunnel",
      `<GraphFunnel title="SIGNUP" ticks={16}>
  <ul>
    <li>8,000 visit</li>
    <li>2,400 start</li>
    <li>960 verify</li>
    <li>180 paid</li>
  </ul>
</GraphFunnel>`
    ),
    preview: (
      <GraphFunnel ticks={16} title="SIGNUP">
        <ul>
          <li>8,000 visit</li>
          <li>2,400 start</li>
          <li>960 verify</li>
          <li>180 paid</li>
        </ul>
      </GraphFunnel>
    ),
  },
]

const ganttExamples: Example[] = [
  {
    title: "launch",
    code: `<GraphGantt title="LAUNCH" stage="build" progress={0.58} ticks={["q1", "q2", "q3", "q4"]}>

- design: 0 0.35 1
- **build**: 0.2 0.75 0.55
- docs: 0.55 0.9 0.2
- ship: 0.85 1

</GraphGantt>`,
    react: tsx(
      "graph-gantt",
      "GraphGantt",
      `<GraphGantt title="LAUNCH" stage="build" progress={0.58} ticks={["q1", "q2", "q3", "q4"]}>
  <ul>
    <li>design: 0 0.35 1</li>
    <li>
      <strong>build</strong>: 0.2 0.75 0.55
    </li>
    <li>docs: 0.55 0.9 0.2</li>
    <li>ship: 0.85 1</li>
  </ul>
</GraphGantt>`
    ),
    preview: (
      <GraphGantt
        progress={0.58}
        stage="build"
        ticks={["q1", "q2", "q3", "q4"]}
        title="LAUNCH"
      >
        <ul>
          <li>design: 0 0.35 1</li>
          <li>
            <strong>build</strong>: 0.2 0.75 0.55
          </li>
          <li>docs: 0.55 0.9 0.2</li>
          <li>ship: 0.85 1</li>
        </ul>
      </GraphGantt>
    ),
  },
  {
    title: "week",
    code: `<GraphGantt title="THIS WEEK" columns={20} ticks={["mon", "wed", "fri"]}>

- **rfc**: 0 0.4
- patch: 0.35 0.8
- review: 0.7 1

</GraphGantt>`,
    react: tsx(
      "graph-gantt",
      "GraphGantt",
      `<GraphGantt title="THIS WEEK" columns={20} ticks={["mon", "wed", "fri"]}>
  <ul>
    <li>
      <strong>rfc</strong>: 0 0.4
    </li>
    <li>patch: 0.35 0.8</li>
    <li>review: 0.7 1</li>
  </ul>
</GraphGantt>`
    ),
    preview: (
      <GraphGantt columns={20} ticks={["mon", "wed", "fri"]} title="THIS WEEK">
        <ul>
          <li>
            <strong>rfc</strong>: 0 0.4
          </li>
          <li>patch: 0.35 0.8</li>
          <li>review: 0.7 1</li>
        </ul>
      </GraphGantt>
    ),
  },
]

const plotExamples: Example[] = [
  {
    title: "p95",
    description: "Last cap is the live point.",
    code: `import { GraphPlot } from "@/registry/default/graph-plot/graph-plot"

<GraphPlot title="P95" data="2 3 3 5 4 7 6 8 5 9 7 6" labels={["jan", "dec"]} />`,
    preview: (
      <GraphPlot
        data="2 3 3 5 4 7 6 8 5 9 7 6"
        labels={["jan", "dec"]}
        title="P95"
      />
    ),
  },
  {
    title: "errors",
    description: "Line only. progress reveals a prefix.",
    code: `import { GraphPlot } from "@/registry/default/graph-plot/graph-plot"

<GraphPlot
  title="ERRORS"
  variant="line"
  height={5}
  progress={0.7}
  data={[1, 1, 4, 2, 8, 3, 2, 1, 5, 2]}
  labels={["mon", "fri"]}
/>`,
    preview: (
      <GraphPlot
        data={[1, 1, 4, 2, 8, 3, 2, 1, 5, 2]}
        height={5}
        labels={["mon", "fri"]}
        progress={0.7}
        title="ERRORS"
        variant="line"
      />
    ),
  },
]

const waffleExamples: Example[] = [
  {
    title: "coverage",
    description: "One hundred cells. Value is how many are lit.",
    code: `import { GraphWaffle } from "@/registry/default/graph-waffle/graph-waffle"

<GraphWaffle title="COVERAGE" value="73%" caption="73 of 100 tests green" />`,
    preview: (
      <GraphWaffle
        caption="73 of 100 tests green"
        title="COVERAGE"
        value="73%"
      />
    ),
  },
  {
    title: "quota",
    description: "Fewer cells. Same 0–1 value.",
    code: `import { GraphWaffle } from "@/registry/default/graph-waffle/graph-waffle"

<GraphWaffle
  title="QUOTA"
  value={0.4}
  cells={40}
  columns={8}
  caption="seats used"
/>`,
    preview: (
      <GraphWaffle
        caption="seats used"
        cells={40}
        columns={8}
        title="QUOTA"
        value={0.4}
      />
    ),
  },
]

const diffExamples: Example[] = [
  {
    title: "bundle",
    code: `<GraphDiff title="BUNDLE" palette="duo">

- vendor: 84 kb
- app: +31 kb
- sourcemaps: -12 kb
- **shipped: 103 kb**

</GraphDiff>`,
    react: tsx(
      "graph-diff",
      "GraphDiff",
      `<GraphDiff title="BUNDLE" palette="duo">
  <ul>
    <li>vendor: 84 kb</li>
    <li>app: +31 kb</li>
    <li>sourcemaps: -12 kb</li>
    <li>
      <strong>shipped: 103 kb</strong>
    </li>
  </ul>
</GraphDiff>`
    ),
    preview: (
      <GraphDiff palette="duo" title="BUNDLE">
        <ul>
          <li>vendor: 84 kb</li>
          <li>app: +31 kb</li>
          <li>sourcemaps: -12 kb</li>
          <li>
            <strong>shipped: 103 kb</strong>
          </li>
        </ul>
      </GraphDiff>
    ),
  },
  {
    title: "headcount",
    code: `<GraphDiff title="HEADCOUNT">

- start: 12
- hired: +3
- left: -1
- **now: 14**

</GraphDiff>`,
    react: tsx(
      "graph-diff",
      "GraphDiff",
      `<GraphDiff title="HEADCOUNT">
  <ul>
    <li>start: 12</li>
    <li>hired: +3</li>
    <li>left: -1</li>
    <li>
      <strong>now: 14</strong>
    </li>
  </ul>
</GraphDiff>`
    ),
    preview: (
      <GraphDiff title="HEADCOUNT">
        <ul>
          <li>start: 12</li>
          <li>hired: +3</li>
          <li>left: -1</li>
          <li>
            <strong>now: 14</strong>
          </li>
        </ul>
      </GraphDiff>
    ),
  },
]

const invoiceExamples: Example[] = [
  {
    title: "studio invoice",
    code: `<GraphInvoice
  title="INVOICE 0041"
  from="mdxcn"
  to="Acme Studio"
>

- No.: 0041
- Issued: Mar 12, 2026
- Due: Apr 11, 2026

| Description | Qty | Rate | Amount |
| --- | --- | --- | --- |
| Design system | 1 | 4,200 | 4,200 |
| Motion pass | 1 | 1,800 | 1,800 |
| Docs rewrite | 8h | 180 | 1,440 |

**Amount due** 7,440

Net 30. Wire to the account on file.

</GraphInvoice>`,
    react: tsx(
      "graph-invoice",
      "GraphInvoice",
      `<GraphInvoice
  title="INVOICE 0041"
  from="mdxcn"
  to="Acme Studio"
>
  <ul>
    <li>No.: 0041</li>
    <li>Issued: Mar 12, 2026</li>
    <li>Due: Apr 11, 2026</li>
  </ul>
  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Qty</th>
        <th>Rate</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Design system</td>
        <td>1</td>
        <td>4,200</td>
        <td>4,200</td>
      </tr>
      <tr>
        <td>Motion pass</td>
        <td>1</td>
        <td>1,800</td>
        <td>1,800</td>
      </tr>
      <tr>
        <td>Docs rewrite</td>
        <td>8h</td>
        <td>180</td>
        <td>1,440</td>
      </tr>
    </tbody>
  </table>
  <p>
    <strong>Amount due</strong> 7,440
  </p>
  <p>Net 30. Wire to the account on file.</p>
</GraphInvoice>`
    ),
    preview: (
      <GraphInvoice
        from="mdxcn"
        title="INVOICE 0041"
        to="Acme Studio"
      >
        <ul>
          <li>No.: 0041</li>
          <li>Issued: Mar 12, 2026</li>
          <li>Due: Apr 11, 2026</li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Design system</td>
              <td>1</td>
              <td>4,200</td>
              <td>4,200</td>
            </tr>
            <tr>
              <td>Motion pass</td>
              <td>1</td>
              <td>1,800</td>
              <td>1,800</td>
            </tr>
            <tr>
              <td>Docs rewrite</td>
              <td>8h</td>
              <td>180</td>
              <td>1,440</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Amount due</strong> 7,440
        </p>
        <p>Net 30. Wire to the account on file.</p>
      </GraphInvoice>
    ),
  },
  {
    title: "quote",
    code: `<GraphInvoice title="QUOTE" from="mdxcn" to="Northwind">

- Valid until: May 01

| Description | Amount |
| --- | --- |
| Registry install | 0 |
| Custom graph | 2,400 |

**Estimate** 2,400

</GraphInvoice>`,
    react: tsx(
      "graph-invoice",
      "GraphInvoice",
      `<GraphInvoice title="QUOTE" from="mdxcn" to="Northwind">
  <ul>
    <li>Valid until: May 01</li>
  </ul>
  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Registry install</td>
        <td>0</td>
      </tr>
      <tr>
        <td>Custom graph</td>
        <td>2,400</td>
      </tr>
    </tbody>
  </table>
  <p>
    <strong>Estimate</strong> 2,400
  </p>
</GraphInvoice>`
    ),
    preview: (
      <GraphInvoice from="mdxcn" title="QUOTE" to="Northwind">
        <ul>
          <li>Valid until: May 01</li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Registry install</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Custom graph</td>
              <td>2,400</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Estimate</strong> 2,400
        </p>
      </GraphInvoice>
    ),
  },
]

const compareExamples: Example[] = [
  {
    title: "plans",
    code: `<GraphCompare title="PLANS" accent="Studio">

| | Solo | Studio |
| --- | --- | --- |
| Registry | yes | yes |
| Accent picker | yes | yes |
| Private source | no | yes |
| Price | $0 | $24 |

</GraphCompare>`,
    react: tsx(
      "graph-compare",
      "GraphCompare",
      `<GraphCompare title="PLANS" accent="Studio">
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Solo</th>
        <th>Studio</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Registry</td>
        <td>yes</td>
        <td>yes</td>
      </tr>
      <tr>
        <td>Accent picker</td>
        <td>yes</td>
        <td>yes</td>
      </tr>
      <tr>
        <td>Private source</td>
        <td>no</td>
        <td>yes</td>
      </tr>
      <tr>
        <td>Price</td>
        <td>$0</td>
        <td>$24</td>
      </tr>
    </tbody>
  </table>
</GraphCompare>`
    ),
    preview: (
      <GraphCompare accent="Studio" title="PLANS">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Solo</th>
              <th>Studio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Registry</td>
              <td>yes</td>
              <td>yes</td>
            </tr>
            <tr>
              <td>Accent picker</td>
              <td>yes</td>
              <td>yes</td>
            </tr>
            <tr>
              <td>Private source</td>
              <td>no</td>
              <td>yes</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>$0</td>
              <td>$24</td>
            </tr>
          </tbody>
        </table>
      </GraphCompare>
    ),
  },
  {
    title: "before after",
    code: `<GraphCompare title="RENDER" accent="This">

| | Mermaid | SVG | This |
| --- | --- | --- | --- |
| Source | .md | .svg | .tsx |
| In git | yes | no | yes |
| Themable | no | no | yes |

</GraphCompare>`,
    react: tsx(
      "graph-compare",
      "GraphCompare",
      `<GraphCompare title="RENDER" accent="This">
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Mermaid</th>
        <th>SVG</th>
        <th>This</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Source</td>
        <td>.md</td>
        <td>.svg</td>
        <td>.tsx</td>
      </tr>
      <tr>
        <td>In git</td>
        <td>yes</td>
        <td>no</td>
        <td>yes</td>
      </tr>
      <tr>
        <td>Themable</td>
        <td>no</td>
        <td>no</td>
        <td>yes</td>
      </tr>
    </tbody>
  </table>
</GraphCompare>`
    ),
    preview: (
      <GraphCompare accent="This" title="RENDER">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Mermaid</th>
              <th>SVG</th>
              <th>This</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Source</td>
              <td>.md</td>
              <td>.svg</td>
              <td>.tsx</td>
            </tr>
            <tr>
              <td>In git</td>
              <td>yes</td>
              <td>no</td>
              <td>yes</td>
            </tr>
            <tr>
              <td>Themable</td>
              <td>no</td>
              <td>no</td>
              <td>yes</td>
            </tr>
          </tbody>
        </table>
      </GraphCompare>
    ),
  },
]

const matrixExamples: Example[] = [
  {
    title: "detect",
    code: `<GraphMatrix title="DETECT" accent="Pos">

| | Pos | Neg |
| --- | --- | --- |
| Pos | 41 | 3 |
| Neg | 2 | 54 |

</GraphMatrix>`,
    react: tsx(
      "graph-matrix",
      "GraphMatrix",
      `<GraphMatrix title="DETECT" accent="Pos">
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Pos</th>
        <th>Neg</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Pos</td>
        <td>41</td>
        <td>3</td>
      </tr>
      <tr>
        <td>Neg</td>
        <td>2</td>
        <td>54</td>
      </tr>
    </tbody>
  </table>
</GraphMatrix>`
    ),
    preview: (
      <GraphMatrix accent="Pos" title="DETECT">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Pos</th>
              <th>Neg</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pos</td>
              <td>41</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Neg</td>
              <td>2</td>
              <td>54</td>
            </tr>
          </tbody>
        </table>
      </GraphMatrix>
    ),
  },
  {
    title: "latency",
    code: `<GraphMatrix title="P95" accent="write">

| | iad | sfo | nrt |
| --- | --- | --- | --- |
| read | 12 | 18 | 41 |
| write | 28 | 33 | 67 |
| queue | 4 | 6 | 9 |

</GraphMatrix>`,
    react: tsx(
      "graph-matrix",
      "GraphMatrix",
      `<GraphMatrix title="P95" accent="write">
  <table>
    <thead>
      <tr>
        <th></th>
        <th>iad</th>
        <th>sfo</th>
        <th>nrt</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>read</td>
        <td>12</td>
        <td>18</td>
        <td>41</td>
      </tr>
      <tr>
        <td>write</td>
        <td>28</td>
        <td>33</td>
        <td>67</td>
      </tr>
      <tr>
        <td>queue</td>
        <td>4</td>
        <td>6</td>
        <td>9</td>
      </tr>
    </tbody>
  </table>
</GraphMatrix>`
    ),
    preview: (
      <GraphMatrix accent="write" title="P95">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>iad</th>
              <th>sfo</th>
              <th>nrt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>read</td>
              <td>12</td>
              <td>18</td>
              <td>41</td>
            </tr>
            <tr>
              <td>write</td>
              <td>28</td>
              <td>33</td>
              <td>67</td>
            </tr>
            <tr>
              <td>queue</td>
              <td>4</td>
              <td>6</td>
              <td>9</td>
            </tr>
          </tbody>
        </table>
      </GraphMatrix>
    ),
  },
]

const statExamples: Example[] = [
  {
    title: "this week",
    code: `<GraphStat title="THIS WEEK">

- 12,400 docs
- 4,100 copies
- **860 shipped**

</GraphStat>`,
    react: tsx(
      "graph-stat",
      "GraphStat",
      `<GraphStat title="THIS WEEK">
  <ul>
    <li>12,400 docs</li>
    <li>4,100 copies</li>
    <li>
      <strong>860 shipped</strong>
    </li>
  </ul>
</GraphStat>`
    ),
    preview: (
      <GraphStat title="THIS WEEK">
        <ul>
          <li>12,400 docs</li>
          <li>4,100 copies</li>
          <li>
            <strong>860 shipped</strong>
          </li>
        </ul>
      </GraphStat>
    ),
  },
  {
    title: "latency",
    code: `<GraphStat title="P95">

- 142ms read — −18ms
- **410ms write — +22ms**

</GraphStat>`,
    react: tsx(
      "graph-stat",
      "GraphStat",
      `<GraphStat title="P95">
  <ul>
    <li>142ms read — −18ms</li>
    <li>
      <strong>410ms write — +22ms</strong>
    </li>
  </ul>
</GraphStat>`
    ),
    preview: (
      <GraphStat title="P95">
        <ul>
          <li>142ms read — −18ms</li>
          <li>
            <strong>410ms write — +22ms</strong>
          </li>
        </ul>
      </GraphStat>
    ),
  },
]

const kpiExamples: Example[] = [
  {
    title: "reads",
    description:
      "The number is the headline. The spark is the last twelve points.",
    code: `import { GraphKpi } from "@/registry/default/graph-kpi/graph-kpi"

<GraphKpi
  title="READS"
  value="12,400"
  label="this week"
  hint="+18%"
  data="4 5 5 6 8 7 9 8 11 10 12 14"
/>`,
    preview: (
      <GraphKpi
        data="4 5 5 6 8 7 9 8 11 10 12 14"
        hint="+18%"
        label="this week"
        title="READS"
        value="12,400"
      />
    ),
  },
  {
    title: "latency",
    description: "A latency number with a falling series.",
    code: `import { GraphKpi } from "@/registry/default/graph-kpi/graph-kpi"

<GraphKpi
  title="P95"
  value="142ms"
  label="read"
  hint="−18ms"
  data={[8, 7, 9, 6, 5, 7, 4, 5, 3, 4, 3, 2]}
/>`,
    preview: (
      <GraphKpi
        data={[8, 7, 9, 6, 5, 7, 4, 5, 3, 4, 3, 2]}
        hint="−18ms"
        label="read"
        title="P95"
        value="142ms"
      />
    ),
  },
]

const specExamples: Example[] = [
  {
    title: "type",
    code: `<GraphSpec title="TYPE">

- Family: Geist Mono
- Size: 14 / 21
- Tracking: +0.02em
- Figures: tabular
- **Accent: --graph-accent**

</GraphSpec>`,
    react: tsx(
      "graph-spec",
      "GraphSpec",
      `<GraphSpec title="TYPE">
  <ul>
    <li>Family: Geist Mono</li>
    <li>Size: 14 / 21</li>
    <li>Tracking: +0.02em</li>
    <li>Figures: tabular</li>
    <li>
      <strong>Accent: --graph-accent</strong>
    </li>
  </ul>
</GraphSpec>`
    ),
    preview: (
      <GraphSpec title="TYPE">
        <ul>
          <li>Family: Geist Mono</li>
          <li>Size: 14 / 21</li>
          <li>Tracking: +0.02em</li>
          <li>Figures: tabular</li>
          <li>
            <strong>Accent: --graph-accent</strong>
          </li>
        </ul>
      </GraphSpec>
    ),
  },
  {
    title: "ship to",
    code: `<GraphSpec title="SHIP TO">

- Name: A. Rao
- City: Bengaluru
- Carrier: Delhivery
- **ETA: Thu**

</GraphSpec>`,
    react: tsx(
      "graph-spec",
      "GraphSpec",
      `<GraphSpec title="SHIP TO">
  <ul>
    <li>Name: A. Rao</li>
    <li>City: Bengaluru</li>
    <li>Carrier: Delhivery</li>
    <li>
      <strong>ETA: Thu</strong>
    </li>
  </ul>
</GraphSpec>`
    ),
    preview: (
      <GraphSpec title="SHIP TO">
        <ul>
          <li>Name: A. Rao</li>
          <li>City: Bengaluru</li>
          <li>Carrier: Delhivery</li>
          <li>
            <strong>ETA: Thu</strong>
          </li>
        </ul>
      </GraphSpec>
    ),
  },
]

function activityDays(start: string, length: number) {
  const [year, month, day] = start.split("-").map(Number)
  const origin = Date.UTC(year, (month ?? 1) - 1, day)
  return Array.from({ length }, (_, index) => {
    const time = origin + index * 86_400_000
    const date = new Date(time).toISOString().slice(0, 10)
    const dow = new Date(time).getUTCDay()
    const week = Math.floor(index / 7)
    let count = 0
    if (dow > 0 && dow < 6) {
      const pulse = (week + dow) % 9
      count =
        pulse === 0
          ? 12
          : pulse === 4
            ? 7
            : pulse % 3 === 0
              ? 3
              : index % 5 === 0
                ? 1
                : 0
    } else if (index % 13 === 0) {
      count = 2
    }
    return { date, count }
  })
}

const yearActivity = activityDays("2025-09-01", 371)
const quarterActivity = activityDays("2026-06-01", 91)

const uptimeQuarter = Array.from({ length: 90 }, (_, index) => {
  if (index === 41 || index === 42) {
    return "down" as const
  }
  if (index === 18 || index === 60 || index === 61) {
    return "degraded" as const
  }
  return "ok" as const
})

const activityExamples: Example[] = [
  {
    title: "year",
    description:
      "Dated counts. The grid, month labels, and intensity scale are derived.",
    code: `import { GraphActivity } from "@/registry/default/graph-activity/graph-activity"

function activityDays(start: string, length: number) {
  const [year, month, day] = start.split("-").map(Number)
  const origin = Date.UTC(year, month - 1, day)
  return Array.from({ length }, (_, index) => {
    const time = origin + index * 86_400_000
    const date = new Date(time).toISOString().slice(0, 10)
    const dow = new Date(time).getUTCDay()
    const week = Math.floor(index / 7)
    let count = 0
    if (dow > 0 && dow < 6) {
      const pulse = (week + dow) % 9
      count =
        pulse === 0 ? 12 : pulse === 4 ? 7 : pulse % 3 === 0 ? 3 : index % 5 === 0 ? 1 : 0
    }
    return { date, count }
  })
}

<GraphActivity
  title="COMMITS"
  days={activityDays("2025-09-01", 371)}
/>`,
    preview: <GraphActivity days={yearActivity} title="COMMITS" />,
  },
  {
    title: "quarter",
    description:
      'Shorter range. glyphs="ascii" swaps the block characters for .- =#@.',
    code: `import { GraphActivity } from "@/registry/default/graph-activity/graph-activity"

<GraphActivity
  title="SHIPPED"
  weekStartsOn={1}
  glyphs="ascii"
  days={activityDays("2026-06-01", 91)}
  caption="Jun – Aug"
/>`,
    preview: (
      <GraphActivity
        caption="Jun – Aug"
        days={quarterActivity}
        glyphs="ascii"
        title="SHIPPED"
        weekStartsOn={1}
      />
    ),
  },
]

const heatmapExamples: Example[] = [
  {
    title: "punchcard",
    code: `<GraphHeatmap title="DEPLOYS" palette="duo">

| | 0 | 4 | 8 | 12 | 16 | 20 |
| --- | --- | --- | --- | --- | --- | --- |
| Mon | 0 | 1 | 4 | 8 | 6 | 1 |
| Tue | 0 | 0 | 5 | 9 | 4 | 2 |
| Wed | 1 | 0 | 6 | 12 | 5 | 1 |
| Thu | 0 | 2 | 4 | 7 | 8 | 3 |
| Fri | 0 | 1 | 3 | 5 | 2 | 0 |
| Sat | 0 | 0 | 1 | 0 | 0 | 0 |
| Sun | 0 | 0 | 0 | 1 | 0 | 0 |

</GraphHeatmap>`,
    react: tsx(
      "graph-heatmap",
      "GraphHeatmap",
      `<GraphHeatmap title="DEPLOYS" palette="duo">
  <table>
    <thead>
      <tr>
        <th></th>
        <th>0</th>
        <th>4</th>
        <th>8</th>
        <th>12</th>
        <th>16</th>
        <th>20</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Mon</td>
        <td>0</td>
        <td>1</td>
        <td>4</td>
        <td>8</td>
        <td>6</td>
        <td>1</td>
      </tr>
      <tr>
        <td>Tue</td>
        <td>0</td>
        <td>0</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>2</td>
      </tr>
      <tr>
        <td>Wed</td>
        <td>1</td>
        <td>0</td>
        <td>6</td>
        <td>12</td>
        <td>5</td>
        <td>1</td>
      </tr>
      <tr>
        <td>Thu</td>
        <td>0</td>
        <td>2</td>
        <td>4</td>
        <td>7</td>
        <td>8</td>
        <td>3</td>
      </tr>
      <tr>
        <td>Fri</td>
        <td>0</td>
        <td>1</td>
        <td>3</td>
        <td>5</td>
        <td>2</td>
        <td>0</td>
      </tr>
      <tr>
        <td>Sat</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>
      <tr>
        <td>Sun</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
      </tr>
    </tbody>
  </table>
</GraphHeatmap>`
    ),
    preview: (
      <GraphHeatmap palette="duo" title="DEPLOYS">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>0</th>
              <th>4</th>
              <th>8</th>
              <th>12</th>
              <th>16</th>
              <th>20</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mon</td>
              <td>0</td>
              <td>1</td>
              <td>4</td>
              <td>8</td>
              <td>6</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Tue</td>
              <td>0</td>
              <td>0</td>
              <td>5</td>
              <td>9</td>
              <td>4</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Wed</td>
              <td>1</td>
              <td>0</td>
              <td>6</td>
              <td>12</td>
              <td>5</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Thu</td>
              <td>0</td>
              <td>2</td>
              <td>4</td>
              <td>7</td>
              <td>8</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Fri</td>
              <td>0</td>
              <td>1</td>
              <td>3</td>
              <td>5</td>
              <td>2</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Sat</td>
              <td>0</td>
              <td>0</td>
              <td>1</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Sun</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>1</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </GraphHeatmap>
    ),
  },
  {
    title: "coverage",
    code: `<GraphHeatmap title="TESTS" max={10} legend={false}>

| | a | b | c | d |
| --- | --- | --- | --- | --- |
| auth | 10 | 8 | 4 | 2 |
| billing | 6 | 10 | 7 | 1 |
| docs | 2 | 3 | 9 | 8 |

</GraphHeatmap>`,
    react: tsx(
      "graph-heatmap",
      "GraphHeatmap",
      `<GraphHeatmap title="TESTS" max={10} legend={false}>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>a</th>
        <th>b</th>
        <th>c</th>
        <th>d</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>auth</td>
        <td>10</td>
        <td>8</td>
        <td>4</td>
        <td>2</td>
      </tr>
      <tr>
        <td>billing</td>
        <td>6</td>
        <td>10</td>
        <td>7</td>
        <td>1</td>
      </tr>
      <tr>
        <td>docs</td>
        <td>2</td>
        <td>3</td>
        <td>9</td>
        <td>8</td>
      </tr>
    </tbody>
  </table>
</GraphHeatmap>`
    ),
    preview: (
      <GraphHeatmap legend={false} max={10} title="TESTS">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>a</th>
              <th>b</th>
              <th>c</th>
              <th>d</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>auth</td>
              <td>10</td>
              <td>8</td>
              <td>4</td>
              <td>2</td>
            </tr>
            <tr>
              <td>billing</td>
              <td>6</td>
              <td>10</td>
              <td>7</td>
              <td>1</td>
            </tr>
            <tr>
              <td>docs</td>
              <td>2</td>
              <td>3</td>
              <td>9</td>
              <td>8</td>
            </tr>
          </tbody>
        </table>
      </GraphHeatmap>
    ),
  },
]

const calendarExamples: Example[] = [
  {
    title: "marked days",
    description: "month is 1–12. today is passed in so render stays stable.",
    code: `import { GraphCalendar } from "@/registry/default/graph-calendar/graph-calendar"

<GraphCalendar year={2026} month={8} today={27} marks="12 18 27" />`,
    preview: (
      <GraphCalendar marks="12 18 27" month={8} today={27} year={2026} />
    ),
  },
  {
    title: "sunday start",
    description: "weekStartsOn 0 matches a US calendar.",
    code: `import { GraphCalendar } from "@/registry/default/graph-calendar/graph-calendar"

<GraphCalendar
  title="SHIP WEEK"
  year={2026}
  month={3}
  weekStartsOn={0}
  marks={[{ day: 12, accent: true }, { day: 18 }]}
/>`,
    preview: (
      <GraphCalendar
        marks={[{ day: 12, accent: true }, { day: 18 }]}
        month={3}
        title="SHIP WEEK"
        weekStartsOn={0}
        year={2026}
      />
    ),
  },
]

const waterfallExamples: Example[] = [
  {
    title: "margin",
    code: `<GraphWaterfall title="MARGIN" palette="duo">

- Revenue: 48
- Refunds: -6
- Hosting: -4
- Profit: 38

</GraphWaterfall>`,
    react: tsx(
      "graph-waterfall",
      "GraphWaterfall",
      `<GraphWaterfall title="MARGIN" palette="duo">
  <ul>
    <li>Revenue: 48</li>
    <li>Refunds: -6</li>
    <li>Hosting: -4</li>
    <li>Profit: 38</li>
  </ul>
</GraphWaterfall>`
    ),
    preview: (
      <GraphWaterfall palette="duo" title="MARGIN">
        <ul>
          <li>Revenue: 48</li>
          <li>Refunds: -6</li>
          <li>Hosting: -4</li>
          <li>Profit: 38</li>
        </ul>
      </GraphWaterfall>
    ),
  },
  {
    title: "headcount",
    code: `<GraphWaterfall title="TEAM">

- Start: 12
- Hired: 4
- Left: -2
- Now: 14

</GraphWaterfall>`,
    react: tsx(
      "graph-waterfall",
      "GraphWaterfall",
      `<GraphWaterfall title="TEAM">
  <ul>
    <li>Start: 12</li>
    <li>Hired: 4</li>
    <li>Left: -2</li>
    <li>Now: 14</li>
  </ul>
</GraphWaterfall>`
    ),
    preview: (
      <GraphWaterfall title="TEAM">
        <ul>
          <li>Start: 12</li>
          <li>Hired: 4</li>
          <li>Left: -2</li>
          <li>Now: 14</li>
        </ul>
      </GraphWaterfall>
    ),
  },
]

const uptimeExamples: Example[] = [
  {
    title: "ninety days",
    description:
      "One glyph per day, wrapped every 30. Percent is the share of ok days.",
    code: `import { GraphUptime } from "@/registry/default/graph-uptime/graph-uptime"

<GraphUptime
  title="API"
  from="Jun 1"
  to="Aug 29"
  days={Array.from({ length: 90 }, (_, index) =>
    index === 41 || index === 42
      ? "down"
      : index === 18 || index === 60
        ? "degraded"
        : "ok"
  )}
/>`,
    preview: (
      <GraphUptime days={uptimeQuarter} from="Jun 1" title="API" to="Aug 29" />
    ),
  },
  {
    title: "incident window",
    description:
      "days as one string. empty days sit as dashes so a gap stays visible.",
    code: `import { GraphUptime } from "@/registry/default/graph-uptime/graph-uptime"

<GraphUptime
  title="WEBHOOKS"
  from="Mon"
  to="Fri"
  days="ok ok ok degraded ok empty empty ok down ok ok ok"
/>`,
    preview: (
      <GraphUptime
        days="ok ok ok degraded ok empty empty ok down ok ok ok"
        from="Mon"
        title="WEBHOOKS"
        to="Fri"
      />
    ),
  },
]

const slopeExamples: Example[] = [
  {
    title: "traffic",
    code: `<GraphSlope title="TRAFFIC" palette="duo" fromLabel="2025" toLabel="2026">

- docs: 8,200 → 12,400
- copy: 5,100 → 4,100
- ship: 640 → 860

</GraphSlope>`,
    react: tsx(
      "graph-slope",
      "GraphSlope",
      `<GraphSlope title="TRAFFIC" palette="duo" fromLabel="2025" toLabel="2026">
  <ul>
    <li>docs: 8,200 → 12,400</li>
    <li>copy: 5,100 → 4,100</li>
    <li>ship: 640 → 860</li>
  </ul>
</GraphSlope>`
    ),
    preview: (
      <GraphSlope fromLabel="2025" palette="duo" title="TRAFFIC" toLabel="2026">
        <ul>
          <li>docs: 8,200 → 12,400</li>
          <li>copy: 5,100 → 4,100</li>
          <li>ship: 640 → 860</li>
        </ul>
      </GraphSlope>
    ),
  },
  {
    title: "latency",
    code: `<GraphSlope title="P95" fromLabel="before" toLabel="after">

- read: 160 → 142
- write: 388 → 410
- cache: 12 → 12

</GraphSlope>`,
    react: tsx(
      "graph-slope",
      "GraphSlope",
      `<GraphSlope title="P95" fromLabel="before" toLabel="after">
  <ul>
    <li>read: 160 → 142</li>
    <li>write: 388 → 410</li>
    <li>cache: 12 → 12</li>
  </ul>
</GraphSlope>`
    ),
    preview: (
      <GraphSlope fromLabel="before" title="P95" toLabel="after">
        <ul>
          <li>read: 160 → 142</li>
          <li>write: 388 → 410</li>
          <li>cache: 12 → 12</li>
        </ul>
      </GraphSlope>
    ),
  },
]

const bulletExamples: Example[] = [
  {
    title: "targets",
    code: `<GraphBullet title="BUDGET">

- Design: 42 / 40
- Motion: 18 / 24
- Docs: 9 / 12

</GraphBullet>`,
    react: tsx(
      "graph-bullet",
      "GraphBullet",
      `<GraphBullet title="BUDGET">
  <ul>
    <li>Design: 42 / 40</li>
    <li>Motion: 18 / 24</li>
    <li>Docs: 9 / 12</li>
  </ul>
</GraphBullet>`
    ),
    preview: (
      <GraphBullet title="BUDGET">
        <ul>
          <li>Design: 42 / 40</li>
          <li>Motion: 18 / 24</li>
          <li>Docs: 9 / 12</li>
        </ul>
      </GraphBullet>
    ),
  },
  {
    title: "capacity",
    code: `<GraphBullet title="LOAD">

- CPU: 72 / 80 of 100
- RAM: 34 / 64 of 100
- SSD: 91 / 90 of 100

</GraphBullet>`,
    react: tsx(
      "graph-bullet",
      "GraphBullet",
      `<GraphBullet title="LOAD">
  <ul>
    <li>CPU: 72 / 80 of 100</li>
    <li>RAM: 34 / 64 of 100</li>
    <li>SSD: 91 / 90 of 100</li>
  </ul>
</GraphBullet>`
    ),
    preview: (
      <GraphBullet title="LOAD">
        <ul>
          <li>CPU: 72 / 80 of 100</li>
          <li>RAM: 34 / 64 of 100</li>
          <li>SSD: 91 / 90 of 100</li>
        </ul>
      </GraphBullet>
    ),
  },
]

const timerExamples: Example[] = [
  {
    title: "incident",
    description: "Counts up from a start time.",
    code: `import { GraphTimer } from "@/registry/default/graph-timer/graph-timer"

<GraphTimer
  title="INCIDENT"
  kind="elapsed"
  at="2026-08-27T08:00:00Z"
  caption="api"
/>`,
    preview: (
      <GraphTimer
        at="2026-08-27T08:00:00Z"
        caption="api"
        kind="elapsed"
        title="INCIDENT"
      />
    ),
  },
  {
    title: "last deploy",
    description: "How long since the last deploy.",
    code: `import { GraphTimer } from "@/registry/default/graph-timer/graph-timer"

<GraphTimer
  title="SHIPPED"
  kind="ago"
  at="2026-08-27T12:00:00Z"
  caption="last deploy"
/>`,
    preview: (
      <GraphTimer
        at="2026-08-27T12:00:00Z"
        caption="last deploy"
        kind="ago"
        title="SHIPPED"
      />
    ),
  },
  {
    title: "local",
    description: "The time of day, updating every second.",
    code: `import { GraphTimer } from "@/registry/default/graph-timer/graph-timer"

<GraphTimer
  title="LOCAL"
  kind="clock"
/>`,
    preview: <GraphTimer kind="clock" title="LOCAL" />,
  },
]

const countdownExamples: Example[] = [
  {
    title: "freeze",
    description: "Until New Year's. After that it says open.",
    code: `import { GraphCountdown } from "@/registry/default/graph-countdown/graph-countdown"

<GraphCountdown
  title="FREEZE"
  to="2027-01-01T00:00:00Z"
  done="open"
  caption="until launch"
/>`,
    preview: (
      <GraphCountdown
        caption="until launch"
        done="open"
        title="FREEZE"
        to="2027-01-01T00:00:00Z"
      />
    ),
  },
  {
    title: "closed",
    description: "The date has passed, so the frame shows the label you set.",
    code: `import { GraphCountdown } from "@/registry/default/graph-countdown/graph-countdown"

<GraphCountdown
  title="WINDOW"
  to="2020-01-01T00:00:00Z"
  done="closed"
/>`,
    preview: (
      <GraphCountdown done="closed" title="WINDOW" to="2020-01-01T00:00:00Z" />
    ),
  },
]

const frameExamples: Example[] = [
  {
    title: "titled frame",
    description: "Compose Graph, GraphTitle, GraphBody, and GraphRule.",
    code: `import {
  Graph,
  GraphBody,
  GraphRule,
} from "@/registry/default/graph-frame/graph-frame"

<Graph title="USAGE">
  <GraphBody className="flex flex-col gap-4">
    <p>Content goes inside the frame.</p>
    <GraphRule />
    <p className="text-graph-muted">Same dashed border as the other graphs.</p>
  </GraphBody>
</Graph>`,
    preview: (
      <Graph title="USAGE">
        <GraphBody className="flex flex-col gap-4">
          <p>Content goes inside the frame.</p>
          <GraphRule />
          <p className="text-graph-muted">
            Same dashed border as the other graphs.
          </p>
        </GraphBody>
      </Graph>
    ),
  },
  {
    title: "untitled",
    description:
      "Skip title and the top edge stays a dashed line. corner swaps the +.",
    code: `import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"

<Graph corner="*">
  <GraphBody>
    <p>Corners still sit on the frame. Caption is optional.</p>
  </GraphBody>
</Graph>`,
    preview: (
      <Graph corner="*">
        <GraphBody>
          <p>Corners still sit on the frame. Caption is optional.</p>
        </GraphBody>
      </Graph>
    ),
  },
]

const calloutExamples: Example[] = [
  {
    title: "warning",
    description:
      "type sets the frame title and the glyph. The body is Markdown — write it like a paragraph.",
    code: `import { Callout } from "@/registry/default/callout/callout"

<Callout type="warning">
  The CLI copies files into registry/default. It does not add an npm
  dependency, so there is nothing to update later — edit the source.
</Callout>`,
    preview: (
      <Callout type="warning">
        <p>
          The CLI copies files into registry/default. It does not add an npm
          dependency, so there is nothing to update later — edit the source.
        </p>
      </Callout>
    ),
  },
  {
    title: "tip with a title",
    description: "title overrides the type on the frame. Lists work.",
    code: `import { Callout } from "@/registry/default/callout/callout"

<Callout type="tip" title="Palette">
  One accent is the default. Opt in when a second series needs its own hue:

  - palette="duo" for two series
  - palette="multi" for three
</Callout>`,
    preview: (
      <Callout title="Palette" type="tip">
        <p>
          One accent is the default. Opt in when a second series needs its own
          hue:
        </p>
        <ul>
          <li>palette=&quot;duo&quot; for two series</li>
          <li>palette=&quot;multi&quot; for three</li>
        </ul>
      </Callout>
    ),
  },
]

const quoteExamples: Example[] = [
  {
    title: "attributed",
    description: "by is the name. source is muted after it. No frame title.",
    code: `import { Quote } from "@/registry/default/quote/quote"

<Quote by="Paul Graham" source="Taste for Makers">
  A thousand barely audible voices all singing in tune.
</Quote>`,
    preview: (
      <Quote by="Paul Graham" source="Taste for Makers">
        A thousand barely audible voices all singing in tune.
      </Quote>
    ),
  },
  {
    title: "titled",
    description: "Pass title when the quote belongs to a section.",
    code: `import { Quote } from "@/registry/default/quote/quote"

<Quote title="PRINCIPLE" by="Dieter Rams">
  Good design is as little design as possible.
</Quote>`,
    preview: (
      <Quote by="Dieter Rams" title="PRINCIPLE">
        Good design is as little design as possible.
      </Quote>
    ),
  },
]

const stepsExamples: Example[] = [
  {
    title: "install",
    code: `<Steps title="INSTALL">

1. Copy the source

   Run the shadcn CLI. Files land under registry/default.

2. **Register it**

   Export the component from mdx-components.tsx.

3. *Write*

   Use it between paragraphs. No import line.

</Steps>`,
    react: tsx(
      "steps",
      "Steps",
      `<Steps title="INSTALL">
  <ol>
    <li>
      <p>Copy the source</p>
      <p>Run the shadcn CLI. Files land under registry/default.</p>
    </li>
    <li>
      <p>
        <strong>Register it</strong>
      </p>
      <p>Export the component from mdx-components.tsx.</p>
    </li>
    <li>
      <p>
        <em>Write</em>
      </p>
      <p>Use it between paragraphs. No import line.</p>
    </li>
  </ol>
</Steps>`
    ),
    preview: (
      <Steps title="INSTALL">
        <ol>
          <li>
            <p>Copy the source</p>
            <p>Run the shadcn CLI. Files land under registry/default.</p>
          </li>
          <li>
            <p>
              <strong>Register it</strong>
            </p>
            <p>Export the component from mdx-components.tsx.</p>
          </li>
          <li>
            <p>
              <em>Write</em>
            </p>
            <p>Use it between paragraphs. No import line.</p>
          </li>
        </ol>
      </Steps>
    ),
  },
  {
    title: "runbook",
    code: `<Steps title="ROLLBACK">

1. Flip the flag — cache.v2 to off in the dashboard.
2. Watch p95 — Two minutes. It should drop under 300ms.
3. Write it down — Open the postmortem before you leave.

</Steps>`,
    react: tsx(
      "steps",
      "Steps",
      `<Steps title="ROLLBACK">
  <ol>
    <li>Flip the flag — cache.v2 to off in the dashboard.</li>
    <li>Watch p95 — Two minutes. It should drop under 300ms.</li>
    <li>Write it down — Open the postmortem before you leave.</li>
  </ol>
</Steps>`
    ),
    preview: (
      <Steps title="ROLLBACK">
        <ol>
          <li>Flip the flag — cache.v2 to off in the dashboard.</li>
          <li>Watch p95 — Two minutes. It should drop under 300ms.</li>
          <li>Write it down — Open the postmortem before you leave.</li>
        </ol>
      </Steps>
    ),
  },
]

const terminalExamples: Example[] = [
  {
    title: "install",
    description:
      "Put the session in a fenced block so Markdown leaves it alone. $ marks a command, ✓ a pass.",
    code: `import { Terminal } from "@/registry/default/terminal/terminal"

<Terminal title="SHELL">
\`\`\`
$ pnpm dlx shadcn@latest add @mdxcn/callout
✓ registry/default/callout/callout.tsx
✓ registry/default/graph-frame/graph-frame.tsx
  2 files written, 0 conflicts
\`\`\`
</Terminal>`,
    preview: (
      <Terminal title="SHELL">
        {`$ pnpm dlx shadcn@latest add @mdxcn/callout
✓ registry/default/callout/callout.tsx
✓ registry/default/graph-frame/graph-frame.tsx
  2 files written, 0 conflicts`}
      </Terminal>
    ),
  },
  {
    title: "comment and output",
    description: "# lines are comments. Plain lines are output, muted.",
    code: `import { Terminal } from "@/registry/default/terminal/terminal"

<Terminal title="TESTS" prompt=">">
\`\`\`
# run the suite once
> pnpm test
 RUN  v3.2.7
 ✓ lib/http/accept.test.ts (12)
 ✓ lib/agent/copy.test.ts (4)
 Test Files  2 passed (2)
\`\`\`
</Terminal>`,
    preview: (
      <Terminal prompt=">" title="TESTS">
        {`# run the suite once
> pnpm test
 RUN  v3.2.7
 ✓ lib/http/accept.test.ts (12)
 ✓ lib/agent/copy.test.ts (4)
 Test Files  2 passed (2)`}
      </Terminal>
    ),
  },
]

const changelogExamples: Example[] = [
  {
    title: "release",
    code: `<Changelog version="1.2.0" date="Mar 12">

- added: Callout, Quote, Steps, Terminal, Changelog
- changed: Graphs read MDX children as well as arrays
- fixed: Timeline connector on Safari
- removed: The legacy accent prop

</Changelog>`,
    react: tsx(
      "changelog",
      "Changelog",
      `<Changelog version="1.2.0" date="Mar 12">
  <ul>
    <li>added: Callout, Quote, Steps, Terminal, Changelog</li>
    <li>changed: Graphs read MDX children as well as arrays</li>
    <li>fixed: Timeline connector on Safari</li>
    <li>removed: The legacy accent prop</li>
  </ul>
</Changelog>`
    ),
    preview: (
      <Changelog date="Mar 12" version="1.2.0">
        <ul>
          <li>added: Callout, Quote, Steps, Terminal, Changelog</li>
          <li>changed: Graphs read MDX children as well as arrays</li>
          <li>fixed: Timeline connector on Safari</li>
          <li>removed: The legacy accent prop</li>
        </ul>
      </Changelog>
    ),
  },
  {
    title: "titled",
    code: `<Changelog title="CHANGELOG" version="0.9.0" date="Feb 02">

- added: Knap filters
- fixed: Uptime wraps at 30 days on narrow screens

</Changelog>`,
    react: tsx(
      "changelog",
      "Changelog",
      `<Changelog title="CHANGELOG" version="0.9.0" date="Feb 02">
  <ul>
    <li>added: Knap filters</li>
    <li>fixed: Uptime wraps at 30 days on narrow screens</li>
  </ul>
</Changelog>`
    ),
    preview: (
      <Changelog date="Feb 02" title="CHANGELOG" version="0.9.0">
        <ul>
          <li>added: Knap filters</li>
          <li>fixed: Uptime wraps at 30 days on narrow screens</li>
        </ul>
      </Changelog>
    ),
  },
]

export const examplesBySlug: Record<string, Example[]> = {
  callout: calloutExamples,
  quote: quoteExamples,
  steps: stepsExamples,
  terminal: terminalExamples,
  changelog: changelogExamples,
  "graph-table": tableExamples,
  "graph-sheet": sheetExamples,
  "graph-flow": flowExamples,
  "graph-bars": barsExamples,
  "graph-rank": rankExamples,
  "graph-cells": cellsExamples,
  "graph-meter": meterExamples,
  "graph-spark": sparkExamples,
  "graph-tree": treeExamples,
  "graph-timeline": timelineExamples,
  "graph-check": checkExamples,
  "graph-stack": stackExamples,
  "graph-funnel": funnelExamples,
  "graph-gantt": ganttExamples,
  "graph-plot": plotExamples,
  "graph-waffle": waffleExamples,
  "graph-diff": diffExamples,
  "graph-invoice": invoiceExamples,
  "graph-compare": compareExamples,
  "graph-matrix": matrixExamples,
  "graph-stat": statExamples,
  "graph-kpi": kpiExamples,
  "graph-spec": specExamples,
  "graph-activity": activityExamples,
  "graph-heatmap": heatmapExamples,
  "graph-calendar": calendarExamples,
  "graph-waterfall": waterfallExamples,
  "graph-uptime": uptimeExamples,
  "graph-slope": slopeExamples,
  "graph-bullet": bulletExamples,
  "graph-timer": timerExamples,
  "graph-countdown": countdownExamples,
  "graph-frame": frameExamples,
}

export { Examples }
