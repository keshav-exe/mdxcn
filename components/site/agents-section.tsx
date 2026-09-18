import Link from "next/link"

import { AgentsFlowDemo } from "@/components/site/agents-flow-demo"
import { SiteContainer } from "@/components/site/container"
import {
  InlineCode,
  ProseMuted,
  ProseP,
  TextLink,
} from "@/components/site/prose"
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
                give your agent the same library
              </h2>
              <ProseP>
                install the skill and your agent can choose a graph, fill in
                real props, and place it beside the prose. it writes jsx for
                mdx, <InlineCode>::graph-*</InlineCode> for{" "}
                <TextLink href={COMARK_URL}>comark</TextLink>, or a{" "}
                <TextLink href={KNAP_URL}>knap</TextLink> filter.
              </ProseP>
              <ProseMuted>
                in plain markdown, it pastes the official ascii instead of
                inventing a diagram you cannot reuse.
              </ProseMuted>
            </div>
            <Link
              className="text-foreground underline-offset-4 hover:text-foreground/80 hover:underline"
              href="/agents"
            >
              install the agent skill
            </Link>
          </div>
          <AgentsFlowDemo />
        </div>
      </SiteContainer>
    </section>
  )
}

export { AgentsSection }
