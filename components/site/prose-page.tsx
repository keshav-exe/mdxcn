import type { ReactNode } from "react"

import { SiteContainer } from "@/components/site/container"
import { proseBodyClass } from "@/components/site/prose"
import { cn } from "@/lib/utils"

function ProsePage({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <main id="main">
      <section>
        <SiteContainer
          borderTop={false}
          className="flex flex-col gap-8 py-8 sm:py-16 md:py-24"
        >
          <h1 className="max-w-[16ch] text-4xl font-medium tracking-tighter text-balance sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <div className={cn("flex flex-col gap-4", proseBodyClass)}>
            {children}
          </div>
        </SiteContainer>
      </section>
    </main>
  )
}

export { ProsePage }
