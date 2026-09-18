"use client"

import type { CSSProperties } from "react"

import { MonoLabel } from "@/components/docs/mono-label"
import { useAccent } from "@/hooks/use-accent"
import { accents, setAccent } from "@/lib/accent"
import { cn } from "@/lib/utils"

function Swatch({
  accent,
  selected,
}: {
  accent: (typeof accents)[number]
  selected: boolean
}) {
  return (
    <button
      aria-checked={selected}
      aria-label={accent.label}
      className={cn(
        "relative flex size-7 items-center justify-center rounded-md",
        selected && "bg-muted"
      )}
      onClick={() => setAccent(accent.id)}
      role="radio"
      type="button"
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-5 overflow-hidden rounded-full",
          accent.id === "theme" && "border border-border"
        )}
        style={{ background: accent.swatch } as CSSProperties}
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
      />
    </button>
  )
}

function AccentPicker() {
  const current = useAccent()
  const solids = accents.filter((item) => item.kind === "solid")
  const gradients = accents.filter((item) => item.kind === "gradient")

  return (
    <div className="flex flex-col gap-2">
      <MonoLabel className="normal-case">accent</MonoLabel>
      <div
        aria-label="accent color"
        className="flex flex-wrap items-center gap-1"
        role="radiogroup"
      >
        {solids.map((accent) => (
          <Swatch
            accent={accent}
            key={accent.id}
            selected={accent.id === current.id}
          />
        ))}
        <span aria-hidden="true" className="mx-1 h-4 w-px bg-graph-frame" />
        {gradients.map((accent) => (
          <Swatch
            accent={accent}
            key={accent.id}
            selected={accent.id === current.id}
          />
        ))}
      </div>
    </div>
  )
}

export { AccentPicker }
