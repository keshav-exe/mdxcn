"use client"

import { motion, useReducedMotion } from "motion/react"

import {
  fraction,
  Graph,
  GraphBody,
  GraphTick,
  GraphTrack,
} from "@/registry/default/graph-frame/graph-frame"
import {
  fillDelay,
  graphTransition,
  toneClass,
  trackMarks,
  type Glyphs,
  type GraphPalette,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type GraphMeterProps = {
  title: string
  /** `0.67`, `"0.67"`, or `"67%"`. */
  value: number | string
  ticks?: number
  caption?: string
  glyphs?: Glyphs
  palette?: GraphPalette
  corner?: string
  className?: string
}

function GraphMeter({
  title,
  value: valueProp,
  ticks = 14,
  caption,
  glyphs,
  palette,
  corner,
  className,
}: GraphMeterProps) {
  const value = fraction(valueProp)
  const reduce = useReducedMotion()
  const clamped = Math.min(1, Math.max(0, value))
  const filled = Math.round(clamped * ticks)
  const marks = trackMarks(glyphs, {
    empty: "-",
    rest: "=",
    fill: "=",
  })

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody className="flex flex-col gap-4">
        <p className="flex w-full items-center gap-3 tabular-nums">
          <span aria-hidden="true" className="text-graph-frame select-none">
            [
          </span>
          <GraphTrack>
            {Array.from({ length: ticks }, (_, index) => {
              const isFilled = index < filled

              return (
                <GraphTick
                  className={
                    isFilled
                      ? toneClass(palette, "primary")
                      : "text-graph-frame"
                  }
                  key={index}
                >
                  <motion.span
                    className="block w-full"
                    initial={reduce || !isFilled ? false : { opacity: 0 }}
                    transition={graphTransition(reduce, {
                      delay: fillDelay(reduce, index),
                    })}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1 }}
                  >
                    {isFilled ? marks.fill : marks.empty}
                  </motion.span>
                </GraphTick>
              )
            })}
          </GraphTrack>
          <span aria-hidden="true" className="text-graph-frame select-none">
            ]
          </span>
          <span
            className={cn(
              "w-[4ch] shrink-0 text-right",
              toneClass(palette, "primary")
            )}
          >
            {Math.round(clamped * 100)}%
          </span>
        </p>
        {caption ? <p className="text-graph-muted">{caption}</p> : null}
        <span className="sr-only">
          {Math.round(clamped * 100)} percent
          {caption ? ` ${caption}` : ""}
        </span>
      </GraphBody>
    </Graph>
  )
}

export { GraphMeter }
export type { GraphMeterProps }
