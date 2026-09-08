import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type GraphRowProps = {
  cols?: number
  className?: string
  children?: ReactNode
}

/**
 * Nested Comark blocks. `::row{cols=2}` puts two figures on one line.
 * Collapses to a single column on small screens.
 */
function GraphRow({ cols = 2, className, children }: GraphRowProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        cols <= 1 && "grid-cols-1",
        cols === 2 && "grid-cols-1 sm:grid-cols-2",
        cols >= 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  )
}

export { GraphRow }
export type { GraphRowProps }
