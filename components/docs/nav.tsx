"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dialog } from "@base-ui/react/dialog"
import { Cancel01Icon, MenuIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { AccentPicker } from "@/components/site/accent-picker"
import { SiteRule } from "@/components/site/corners"
import { MonoLabel } from "@/components/docs/mono-label"
import { components, getStarted } from "@/lib/docs/catalog"
import { isNewSlug } from "@/lib/docs/new"
import { cn } from "@/lib/utils"

function DocsNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <nav aria-label="Docs" className="text-base sm:text-sm">
        <div className="flex flex-col gap-8">
          <NavGroup label="get started">
            {getStarted.map((item) => (
              <NavItem
                href={item.href}
                isNew={item.isNew}
                key={item.href}
                onNavigate={onNavigate}
              >
                {item.label}
              </NavItem>
            ))}
          </NavGroup>
          <NavGroup label="components">
            {components.map((item) => (
              <NavItem
                href={`/docs/${item.slug}`}
                isNew={isNewSlug(item.slug)}
                key={item.slug}
                onNavigate={onNavigate}
              >
                {item.title}
              </NavItem>
            ))}
          </NavGroup>
        </div>
      </nav>

      <div className="px-4">
        <AccentPicker />
      </div>
    </div>
  )
}

function NavGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <MonoLabel className="px-4 py-3">{label}</MonoLabel>
      <ul className="flex flex-col" role="list">
        {children}
      </ul>
    </div>
  )
}

function NavItem({
  href,
  children,
  isNew = false,
  onNavigate,
}: {
  href: string
  children: ReactNode
  isNew?: boolean
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <li>
      <Link
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center justify-between gap-2 px-4 py-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground",
          active && "bg-muted text-foreground hover:bg-muted"
        )}
        href={href}
        onClick={onNavigate}
        prefetch={false}
      >
        <span className="min-w-0 truncate">{children}</span>
        {isNew ? (
          <span className="shrink-0 font-mono text-[10px] tracking-wide text-graph-accent">
            new
          </span>
        ) : null}
      </Link>
    </li>
  )
}

function ScrollFade({ edge }: { edge: "top" | "bottom" }) {
  const isTop = edge === "top"
  const mask = `linear-gradient(to ${isTop ? "bottom" : "top"}, black, transparent)`

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10 h-10",
        isTop ? "top-0" : "bottom-0"
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          isTop
            ? "bg-linear-to-b from-background from-20% to-background/0"
            : "bg-linear-to-t from-background from-20% to-background/0"
        )}
      />
      <div
        className="absolute inset-0 backdrop-blur-[8px]"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />
    </div>
  )
}

function DocsSidebar() {
  return (
    <aside className="sticky top-14 isolate max-h-[calc(100dvh-3.5rem)] w-64 shrink-0 max-lg:hidden sm:top-16 sm:max-h-[calc(100dvh-4rem)]">
      <SiteRule className="right-0" orientation="y" />
      <div className="scrollbar-none max-h-[calc(100dvh-3.5rem)] overflow-y-auto py-10 sm:max-h-[calc(100dvh-4rem)]">
        <DocsNav />
      </div>
      <ScrollFade edge="top" />
      <ScrollFade edge="bottom" />
    </aside>
  )
}

function DocsMobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root
      onOpenChange={(next) => {
        setOpen(next)
      }}
      open={open}
    >
      <Dialog.Trigger
        aria-label="Open docs menu"
        className="relative flex items-center gap-2 py-1 text-foreground"
      >
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
        />
        <HugeiconsIcon
          className="size-4 shrink-0"
          icon={MenuIcon}
          size={16}
          strokeWidth={1.5}
        />
        <span>docs</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup
          className={cn(
            "graph-motion fixed inset-0 z-50 flex flex-col gap-8 overflow-y-auto bg-background p-4",
            "origin-top-left transition-[opacity,transform] duration-200 ease-out-cubic",
            "data-starting-style:scale-95 data-starting-style:opacity-0",
            "data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-150"
          )}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-foreground">docs</Dialog.Title>
            <Dialog.Close
              aria-label="Close docs menu"
              className="relative size-8 text-foreground"
            >
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
              />
              <HugeiconsIcon
                className="size-4 shrink-0"
                icon={Cancel01Icon}
                size={16}
                strokeWidth={1.5}
              />
            </Dialog.Close>
          </div>
          <DocsNav onNavigate={() => setOpen(false)} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { DocsMobileNav, DocsNav, DocsSidebar }
