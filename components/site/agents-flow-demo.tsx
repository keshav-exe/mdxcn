"use client"

import dynamic from "next/dynamic"

const GraphFlow = dynamic(
  () =>
    import("@/components/graphs").then((mod) => ({
      default: mod.GraphFlow,
    })),
  { ssr: false }
)

function AgentsFlowDemo() {
  return (
    <GraphFlow
      rows={[
        {
          nodes: [
            { label: "write-up" },
            { label: "chooser" },
            { label: "JSX / YAML / filter", tone: "accent" },
          ],
        },
        {
          nodes: [
            { label: "open the file" },
            { label: "read the frame" },
            { label: "edit labels", tone: "accent" },
          ],
        },
      ]}
      title="loop"
    />
  )
}

export { AgentsFlowDemo }
