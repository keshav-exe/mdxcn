"use client"

import { useState, type ReactNode } from "react"
import { Accordion } from "@base-ui/react/accordion"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { CopyButton } from "@/components/docs/copy-button"
import { FrameBox } from "@/components/site/corners"
import { SiteContainer } from "@/components/site/container"
import {
  InlineCode,
  ProseMuted,
  ProseP,
  TextLink,
} from "@/components/site/prose"
import { HOME_INSTALL } from "@/lib/agent/copy"
import { COMARK_URL } from "@/lib/docs/comark"
import { KNAP_URL } from "@/lib/docs/knap"
import { GITHUB_URL } from "@/lib/github"
import { cn } from "@/lib/utils"

type FaqItem = {
  id: string
  title: string
  content: ReactNode
}

const faqItems: FaqItem[] = [
  {
    id: "what",
    title: "what is markdown graphs?",
    content: (
      <ProseP>
        a collection of react charts and diagrams drawn with text characters.
        each component is accessible, themeable, and framed to look at home
        beside markdown prose.
      </ProseP>
    ),
  },
  {
    id: "formats",
    title: "where can i use them?",
    content: (
      <ProseP>
        use the react component in jsx or mdx. for readme files, issues, and
        pull requests, paste the official ascii version.{" "}
        <TextLink href={COMARK_URL}>comark</TextLink> uses{" "}
        <InlineCode>::graph-*</InlineCode> blocks, while{" "}
        <TextLink href={KNAP_URL}>knap</TextLink> uses{" "}
        <InlineCode>graph_*</InlineCode> filters.
      </ProseP>
    ),
  },
  {
    id: "install",
    title: "how do i install a graph?",
    content: (
      <>
        <div className="flex items-start gap-2">
          <pre className="graph-scroll-x min-w-0 flex-1 font-mono text-sm text-muted-foreground">
            <code>{HOME_INSTALL}</code>
          </pre>
          <CopyButton label="copy install command" text={HOME_INSTALL} />
        </div>
        <ProseMuted>
          the shadcn cli copies the source into your project, so you own and can
          edit every component. nothing is loaded from a runtime package.{" "}
          <TextLink href={GITHUB_URL}>view the source on github</TextLink>.
        </ProseMuted>
      </>
    ),
  },
  {
    id: "agents",
    title: "how do agents know which graph to use?",
    content: (
      <ProseP>
        install the <TextLink href="/docs/skill">agent skill</TextLink>. it
        chooses a graph for the job, uses a tested recipe, and emits the right
        format for the file it is editing. without the skill,{" "}
        <TextLink href="/llms.txt">/llms.txt</TextLink> provides the same
        chooser and examples.
      </ProseP>
    ),
  },
  {
    id: "read",
    title: "can agents edit the result later?",
    content: (
      <ProseP>
        yes. labels, values, and structure remain as jsx, yaml, or ascii in the
        file. an agent can read and update them without interpreting an opaque
        image or generated svg.
      </ProseP>
    ),
  },
  {
    id: "api",
    title: "is there an api?",
    content: (
      <ProseP>
        yes. browse the json catalog at{" "}
        <TextLink href="/api/v1/components">/api/v1/components</TextLink>, read
        the <TextLink href="/openapi.json">openapi schema</TextLink>, or start
        from the <TextLink href="/developers">developer guide</TextLink>.
      </ProseP>
    ),
  },
]

const defaultFaqId = faqItems[0]?.id ?? "what"

function HomeFaq() {
  const [open, setOpen] = useState(defaultFaqId)

  return (
    <section>
      <SiteContainer className="flex flex-col gap-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[20ch] text-2xl font-semibold tracking-tight text-balance">
              questions
            </h2>
            <ProseMuted>
              what you install, where it works, and how agents use it. browse
              every component in the <TextLink href="/docs">library</TextLink>.
            </ProseMuted>
          </div>

          <FrameBox className="min-w-0">
            <Accordion.Root
              className="flex min-w-0 flex-col"
              onValueChange={(next) => {
                if (next[0]) {
                  setOpen(next[0])
                }
              }}
              value={[open]}
            >
              {faqItems.map((item, index) => (
                <Accordion.Item
                  className={cn(
                    index > 0 && "border-t border-dashed border-graph-frame"
                  )}
                  key={item.id}
                  value={item.id}
                >
                  <Accordion.Header>
                    <Accordion.Trigger
                      className={cn(
                        "relative flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5",
                        "text-muted-foreground hover:text-foreground",
                        "data-panel-open:text-foreground",
                        "focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:outline-none",
                        "data-panel-open:[&_svg]:rotate-45"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-1/2 pointer-fine:hidden"
                      />
                      <span className="min-w-0 font-medium text-pretty">
                        {item.title}
                      </span>
                      <HugeiconsIcon
                        className="size-4 shrink-0 text-graph-muted transition-transform duration-200 ease-out"
                        icon={Add01Icon}
                        size={16}
                        strokeWidth={1.5}
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel
                    className={cn(
                      "h-[var(--accordion-panel-height)] overflow-hidden",
                      "transition-[height] duration-200 ease-out",
                      "data-ending-style:h-0 data-starting-style:h-0"
                    )}
                  >
                    <div className="flex flex-col gap-3 px-4 pb-5 sm:px-5">
                      {item.content}
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </FrameBox>
        </div>
      </SiteContainer>
    </section>
  )
}

export { HomeFaq }
