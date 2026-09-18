import { SiteRule } from "@/components/site/corners"

function DesktopHint() {
  return (
    <div className="relative lg:hidden">
      <div className="relative isolate mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SiteRule className="left-0" orientation="y" />
        <SiteRule className="right-0" orientation="y" />
        <SiteRule className="bottom-0" />
        <p className="py-3 font-mono text-pretty text-graph-muted text-center text-sm">
          view on a desktop screen for a better experience.
        </p>
      </div>
    </div>
  )
}

export { DesktopHint }
