import { SiteContainer } from "@/components/site/container"
import { HeroInstall } from "@/components/site/hero-install"
import { ProseLead } from "@/components/site/prose"

function Hero() {
  return (
    <section>
      <SiteContainer borderTop={false} className="py-8 sm:py-16 md:py-24 lg:py-32 max-w-4xl mx-auto w-full">
        <div className="flex min-w-0 flex-col items-center justify-center text-center gap-4">
          <h1 className="text-4xl font-medium tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            tastefully crafted markdown friendly charts and graphs
          </h1>
          <ProseLead>
            markdown-graphs is a free, open-source collection of react and
            markdown friendly charts and graphs. install any component with the
            shadcn cli.
          </ProseLead>
          <HeroInstall />
        </div>
      </SiteContainer>
    </section>
  )
}

export { Hero }
