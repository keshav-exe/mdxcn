import Link from "next/link"

import { SiteContainer } from "@/components/site/container"
import { InlineCode, ProseLead, TextLink } from "@/components/site/prose"
import { Button } from "@/components/ui/button"
import { COMARK_URL } from "@/lib/docs/comark"

function Hero() {
  return (
    <section>
      <SiteContainer borderTop={false} className="py-8 sm:py-16">
        <div className="flex min-w-0 flex-col items-start gap-8">
          <div className="flex flex-col gap-4">
            <p className="font-mono tracking-wide text-graph-muted uppercase">
              For agents · MDX
            </p>
            <h1 className="max-w-[20ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Markdown Graphs
            </h1>
            <ProseLead>
              ASCII-framed React diagrams you copy into a shadcn project and
              drop next to prose — JSX in MDX, a{" "}
              <InlineCode>::graph-*</InlineCode> block in{" "}
              <TextLink href={COMARK_URL}>Comark</TextLink>, or the official
              fence in a README. A <TextLink href="/docs/skill">skill</TextLink>{" "}
              steers the agent toward a component instead of inventing SVG.
            </ProseLead>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button nativeButton={false} render={<Link href="/agents" />}>
              For agents
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/docs/installation" />}
              variant="outline"
            >
              Install
            </Button>
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}

export { Hero }
