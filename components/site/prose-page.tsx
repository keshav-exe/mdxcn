import type { ReactNode } from "react"

import { SiteContainer } from "@/components/site/container"
import { proseBodyClass } from "@/components/site/prose"
import { cn } from "@/lib/utils"

function ProsePage({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children: ReactNode
}) {
  return (
    <main id="main">
      <section>
        <SiteContainer
          borderTop={false}
          className="flex flex-col gap-8 py-8 sm:py-16"
        >
          <div className="flex flex-col gap-4">
            <p className="font-mono tracking-wide text-graph-muted uppercase">
              {kicker}
            </p>
            <h1 className="max-w-[20ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {title}
            </h1>
          </div>
          <div className={cn("flex flex-col gap-4", proseBodyClass)}>{children}</div>
        </SiteContainer>
      </section>
    </main>
  )
}

export { ProsePage }
