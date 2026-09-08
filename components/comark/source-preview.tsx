"use client"

import { useState, type ReactNode } from "react"

import { CopyButton } from "@/components/docs/copy-button"
import { FrameBox } from "@/components/site/corners"
import { cn } from "@/lib/utils"

function SourcePreview({
  source,
  children,
}: {
  source: string
  children: ReactNode
}) {
  const [tab, setTab] = useState<"rendered" | "source">("rendered")

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div
        aria-label="Rendered or source"
        className="flex flex-wrap items-center gap-1"
        role="tablist"
      >
        {(
          [
            ["rendered", "Rendered"],
            ["source", "Source"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            aria-controls={`comark-preview-${id}`}
            aria-selected={tab === id}
            className={cn(
              "relative px-2 py-1 text-muted-foreground hover:text-foreground",
              tab === id && "bg-muted text-foreground"
            )}
            id={`comark-preview-tab-${id}`}
            onClick={() => setTab(id)}
            role="tab"
            type="button"
          >
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
            />
            {label}
          </button>
        ))}
      </div>
      {tab === "rendered" ? (
        <div
          className="flex min-w-0 flex-col gap-8"
          id="comark-preview-rendered"
          role="tabpanel"
        >
          {children}
        </div>
      ) : (
        <FrameBox
          className="min-w-0"
          id="comark-preview-source"
          role="tabpanel"
        >
          <div className="absolute top-2 right-2 z-20">
            <CopyButton label="Copy source" text={source} />
          </div>
          <pre className="scrollbar-graph max-h-96 overflow-auto p-4 pr-12 text-muted-foreground">
            <code>{source}</code>
          </pre>
        </FrameBox>
      )}
    </div>
  )
}

export { SourcePreview }
