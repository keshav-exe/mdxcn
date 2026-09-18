import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { PlusIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"

const cornerClass = {
  tl: "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  tr: "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  bl: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  br: "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
} as const

type Corner = keyof typeof cornerClass

const ALL_CORNERS: Corner[] = ["tl", "tr", "bl", "br"]

const markClass =
  "pointer-events-none absolute z-20 flex size-4 items-center justify-center bg-background select-none"

function CornerPlusMark() {
  return (
    <HugeiconsIcon
      className="size-4"
      icon={PlusIcon}
      size={16}
      strokeWidth={2}
    />
  )
}

function SiteMark({
  mark = <CornerPlusMark />,
  tone = "rail",
  className,
}: {
  mark?: ReactNode
  tone?: "rail" | "frame"
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        markClass,
        tone === "frame" ? "text-graph-frame" : "text-site-rail",
        className
      )}
    >
      {mark}
    </span>
  )
}

function SiteCorners({
  mark = <CornerPlusMark />,
  corners = ALL_CORNERS,
  tone = "rail",
  className,
}: {
  mark?: ReactNode
  corners?: readonly Corner[]
  tone?: "rail" | "frame"
  className?: string
}) {
  return (
    <>
      {corners.map((corner) => (
        <SiteMark
          className={cn(cornerClass[corner], className)}
          key={corner}
          mark={mark}
          tone={tone}
        />
      ))}
    </>
  )
}

function SiteRule({
  className,
  orientation = "x",
}: {
  className?: string
  orientation?: "x" | "y"
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-10",
        orientation === "x"
          ? "inset-x-0 site-rule h-px"
          : "inset-y-0 site-rule-y w-px",
        className
      )}
    />
  )
}

type FrameBoxProps<T extends ElementType = "div"> = {
  as?: T
  corners?: readonly Corner[]
  tone?: "rail" | "frame"
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">

function FrameBox<T extends ElementType = "div">({
  as,
  className,
  corners = ALL_CORNERS,
  tone = "frame",
  children,
  ...props
}: FrameBoxProps<T>) {
  const Comp = as ?? "div"

  return (
    <Comp
      className={cn(
        "relative isolate",
        tone === "frame" ? "graph-frame" : "site-rail",
        className
      )}
      {...props}
    >
      <SiteCorners corners={corners} tone={tone} />
      {children}
    </Comp>
  )
}

export { ALL_CORNERS, FrameBox, SiteCorners, SiteMark, SiteRule }
export type { Corner }
