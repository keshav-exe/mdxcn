import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

function MonoLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "font-mono tracking-wide text-graph-accent",
        className
      )}
    >
      {children}
    </p>
  )
}

export { MonoLabel }
