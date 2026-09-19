"use client"

import { CopyMark, useCopied } from "@/components/docs/copy-button"
import { FrameBox } from "@/components/site/corners"
import { useOrigin } from "@/lib/docs/origin"
import { SITE_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

function HeroInstall({
  command,
  item = "all",
  className,
}: {
  command?: string
  item?: string
  className?: string
}) {
  const origin = useOrigin()
  const value =
    command ?? `pnpm dlx shadcn@latest add ${origin || SITE_URL}/r/${item}.json`
  const { copied, copy } = useCopied()

  return (
    <div
      className={cn(
        "mt-4 flex w-full max-w-xl flex-col gap-3 sm:mt-6 sm:flex-row sm:items-stretch",
        className
      )}
    >
      <FrameBox
        aria-label={copied ? "copied" : "copy install command"}
        as="button"
        className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2.5 text-left font-mono text-sm text-muted-foreground hover:bg-muted/40 sm:py-0"
        onClick={() => copy(value)}
        tone="frame"
        type="button"
      >
        <pre className="graph-scroll-x min-w-0 flex-1 py-2.5 sm:py-3">
          <code>{value}</code>
        </pre>
        <span className="pointer-events-none shrink-0 pr-1">
          <CopyMark copied={copied} />
        </span>
      </FrameBox>
    </div>
  )
}

export { HeroInstall }
