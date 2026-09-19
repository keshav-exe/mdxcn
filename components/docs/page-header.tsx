import type { ReactNode } from "react"

import { CopyPage } from "@/components/docs/copy-page"
import { proseLeadClass } from "@/components/site/prose"
import type { PageCopy } from "@/lib/docs/prompt"
import { cn } from "@/lib/utils"

type DocsPageHeaderProps = {
  title: string
  titleClassName?: string
  kicker?: string
  lead?: ReactNode
  children?: ReactNode
  copy: PageCopy
}

function DocsPageHeader({
  title,
  titleClassName,
  kicker,
  lead,
  children,
  copy,
}: DocsPageHeaderProps) {
  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-6">
        <h1
          className={cn(
            "text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
            titleClassName
          )}
        >
          {title}
        </h1>
        <CopyPage {...copy} />
      </div>
      {kicker ? <p className="font-mono text-graph-accent">{kicker}</p> : null}
      {lead ? (
        <div className={cn(proseLeadClass, "flex flex-col gap-4")}>{lead}</div>
      ) : null}
      {children}
    </header>
  )
}

export { DocsPageHeader }
export type { DocsPageHeaderProps }
