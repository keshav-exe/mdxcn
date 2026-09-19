import { Graph, GraphBody } from "@/registry/default/graph-frame/graph-frame"
import { cn } from "@/lib/utils"

type PipelineNode = {
  label: string
  hint?: string
  accent?: boolean
  wide?: boolean
}

type PipelineStage = {
  id: string
  name: string
  nodes: PipelineNode[]
  fanIn?: boolean
}

type PipelinePlate = {
  dwg: string
  rev: string
  scale?: string
}

function PipelineNodeBox({ node }: { node: PipelineNode }) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-0.5 border border-dashed px-2.5 py-2",
        node.wide && "w-full",
        node.accent
          ? "border-graph-accent text-graph-accent"
          : "border-graph-frame text-foreground"
      )}
    >
      <span className="font-mono text-[11px] tracking-wide uppercase">
        {node.label}
      </span>
      {node.hint ? (
        <span className="font-mono text-[10px] tracking-normal text-graph-muted normal-case">
          {node.hint}
        </span>
      ) : null}
    </div>
  )
}

function PipelineNodes({ nodes }: { nodes: PipelineNode[] }) {
  const wide = nodes.length === 1 && (nodes[0]?.wide || nodes[0]?.accent)

  return (
    <div
      className={cn(
        "grid min-w-0 gap-2",
        wide
          ? "grid-cols-1"
          : nodes.length > 2
            ? "grid-cols-2 sm:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2"
      )}
    >
      {nodes.map((node) => (
        <PipelineNodeBox key={`${node.label}-${node.hint ?? ""}`} node={node} />
      ))}
    </div>
  )
}

function StageJoin({ fanIn }: { fanIn?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="relative col-start-2 flex h-6 items-start justify-center"
    >
      {fanIn ? (
        <span className="absolute top-0 right-[8%] left-[8%] graph-rule h-px" />
      ) : null}
      <span className="h-6 graph-rule-y w-px" />
    </div>
  )
}

function PipelineFigure({
  title,
  label,
  stages,
  plate,
  rail,
}: {
  title: string
  label: string
  stages: PipelineStage[]
  plate?: PipelinePlate
  rail?: string
}) {
  return (
    <Graph className="min-w-0" title={title}>
      <GraphBody
        className={cn(
          "relative overflow-hidden graph-grid px-4 py-6 sm:px-6 sm:py-7",
          rail && "sm:pr-10"
        )}
      >
        <div
          aria-label={label}
          className="pointer-events-none relative select-none"
          role="img"
        >
          {rail ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 -right-1 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.28em] text-graph-muted uppercase [writing-mode:vertical-rl] sm:block"
            >
              {rail}
            </span>
          ) : null}
          <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-x-3 gap-y-0 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-x-4">
            {stages.map((stage, index) => (
              <div className="contents" key={stage.id}>
                {index > 0 ? (
                  <>
                    <span aria-hidden="true" className="flex justify-center">
                      <span className="h-6 graph-rule-y w-px" />
                    </span>
                    <StageJoin fanIn={stage.fanIn} />
                  </>
                ) : null}
                <div className="flex flex-col gap-0.5 pt-1 font-mono text-[10px] leading-tight tracking-widest text-graph-muted uppercase tabular-nums">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{stage.name}</span>
                </div>
                <PipelineNodes nodes={stage.nodes} />
              </div>
            ))}
          </div>
          {plate ? (
            <dl className="mt-8 ml-auto grid w-max grid-cols-[auto_auto] gap-x-4 gap-y-1 border border-dashed border-graph-frame px-2.5 py-2 font-mono text-[10px] tracking-wider text-graph-muted uppercase tabular-nums">
              <dt>dwg</dt>
              <dd className="text-foreground">{plate.dwg}</dd>
              <dt>rev</dt>
              <dd className="text-foreground">{plate.rev}</dd>
              <dt>scale</dt>
              <dd className="text-foreground">{plate.scale ?? "nts"}</dd>
            </dl>
          ) : null}
        </div>
      </GraphBody>
    </Graph>
  )
}

export { PipelineFigure }
export type { PipelineNode, PipelinePlate, PipelineStage }
