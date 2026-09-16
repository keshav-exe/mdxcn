import Link from "next/link"

import { AgentsFlowDemo } from "@/components/site/agents-flow-demo"
import { SiteContainer } from "@/components/site/container"
import {
  InlineCode,
  ProseMuted,
  ProseP,
  TextLink,
} from "@/components/site/prose"
import { Button } from "@/components/ui/button"
import { COMARK_URL } from "@/lib/docs/comark"
import { KNAP_URL } from "@/lib/docs/knap"

function AgentsSection() {
  return (
    <section>
      <SiteContainer className="flex flex-col gap-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="max-w-[20ch] text-2xl font-semibold tracking-tight text-balance">
                For agents
              </h2>
              <ProseP>
                The figure stays in the file as JSX the agent wrote, a{" "}
                <InlineCode>::graph-*</InlineCode> block{" "}
                <TextLink href={COMARK_URL}>Comark</TextLink> can render, a{" "}
                <TextLink href={KNAP_URL}>Knap</TextLink> filter can emit, or
                ASCII it can read back later — not SVG, and not a homemade
                fence.
              </ProseP>
              <ProseMuted>
                A skill picks the graph and recipes supply real props;{" "}
                <TextLink href="/llms.txt">/llms.txt</TextLink> carries the
                chooser plus the ASCII, Comark, and Knap blocks when the skill
                is not installed.
              </ProseMuted>
            </div>
            <Button nativeButton={false} render={<Link href="/agents" />}>
              How agents use this
            </Button>
          </div>
          <AgentsFlowDemo />
        </div>
      </SiteContainer>
    </section>
  )
}

export { AgentsSection }
