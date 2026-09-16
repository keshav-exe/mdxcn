import type { Metadata } from "next"

import { CopyBlock } from "@/components/docs/install"
import { SkillInstall } from "@/components/docs/skill-install"
import {
  GraphCheck,
  GraphCompare,
  GraphFlow,
  GraphSpec,
} from "@/components/graphs"
import { JsonLd } from "@/components/seo/json-ld"
import { SiteContainer } from "@/components/site/container"
import {
  InlineCode,
  ProseLead,
  ProseMuted,
  ProseP,
  proseMutedClass,
  TextLink,
} from "@/components/site/prose"
import { Button } from "@/components/ui/button"
import { components } from "@/lib/docs/catalog"
import { COMARK_URL } from "@/lib/docs/comark"
import { KNAP_URL } from "@/lib/docs/knap"
import { skillExamples } from "@/lib/docs/skill"
import { agentsJsonLd, pageMeta } from "@/lib/seo"
import { AGENTS_DESCRIPTION } from "@/lib/site"
import { cn } from "@/lib/utils"

const tries = skillExamples.filter((item) =>
  ["Refactor", "Comark", "Knap", "README"].includes(item.label)
)

const kit = [
  {
    name: "Skill",
    detail:
      "When to use a figure, which one, and whether to write JSX, a ::graph-* block, a graph_* filter, or the official fence. The same two files work in Cursor, Claude Code, Codex, or OpenCode.",
  },
  {
    name: "Recipes",
    detail:
      "Worked write-ups with real props: copy the JSX, swap the labels, keep at most two graphs with prose between them.",
  },
  {
    name: "Comark",
    detail:
      "::graph-* blocks with YAML props for the same graphs without MDX; GitHub still gets the fence.",
  },
  {
    name: "Knap",
    detail:
      "graph_* filters that turn a props object into the official fence, or a ::graph-* block when you pass comark.",
  },
  {
    name: "Fenced ASCII",
    detail:
      "Official fences that survive GitHub, Linear, and PR comments — swap labels, keep the frame, and do not invent a new drawing.",
  },
  {
    name: "llms.txt",
    detail:
      "Chooser plus ASCII, Comark, and Knap blocks in one file when the skill is not installed.",
  },
]

export const metadata: Metadata = pageMeta({
  title: "For agents",
  description: AGENTS_DESCRIPTION,
  path: "/agents",
})

export default function AgentsPage() {
  return (
    <main id="main">
      <JsonLd data={agentsJsonLd()} />
      <section>
        <SiteContainer
          borderTop={false}
          className="flex flex-col gap-8 py-8 sm:py-16"
        >
          <div className="flex flex-col gap-4">
            <p className="font-mono tracking-wide text-graph-muted uppercase">
              Skill · llms.txt · Comark · Knap
            </p>
            <h1 className="max-w-[16ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              For agents
            </h1>
            <ProseLead>
              When a write-up needs a figure, the skill picks which graph to
              use. Emit JSX in MDX, a <InlineCode>::graph-*</InlineCode> block
              in a <TextLink href={COMARK_URL}>Comark</TextLink> app, a{" "}
              <InlineCode>graph_*</InlineCode> filter in{" "}
              <TextLink href={KNAP_URL}>Knap</TextLink>, or the official fence
              in a README, PR, or Linear note.
            </ProseLead>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button nativeButton={false} render={<a href="#install" />}>
              Install the skill
            </Button>
            <Button
              nativeButton={false}
              render={<a href="/llms.txt" />}
              variant="outline"
            >
              Fetch llms.txt
            </Button>
          </div>
        </SiteContainer>
      </section>

      <section>
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[24ch] text-2xl font-semibold tracking-tight text-balance">
              Writing and reading the same figure
            </h2>
            <ProseP>
              On write, the agent emits at most two graphs next to the claim —
              JSX for React, YAML for a{" "}
              <TextLink href={COMARK_URL}>Comark</TextLink> app, a{" "}
              <InlineCode>graph_*</InlineCode> filter in{" "}
              <TextLink href={KNAP_URL}>Knap</TextLink>, or the official fence
              from <TextLink href="/llms.txt">/llms.txt</TextLink> when the host
              cannot run a renderer.
            </ProseP>
            <ProseMuted>
              On read, the figure is still characters in the file, so opening
              the MDX shows labels and values instead of a screenshot, and the
              agent can edit the frame the same way it wrote it.
            </ProseMuted>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <GraphCompare
              columns={["JSX", "ASCII", "Comark", "Knap"]}
              rows={[
                { label: "MDX / React", values: [true, false, true, false] },
                { label: "App .md file", values: [false, false, true, true] },
                {
                  label: "README / GitHub",
                  values: [false, true, false, true],
                },
                { label: "Edit the labels", values: [true, true, true, true] },
              ]}
              title="HOST"
            />
            <GraphFlow
              rows={[
                {
                  nodes: [
                    { label: "write-up" },
                    { label: "chooser" },
                    { label: "JSX / YAML / filter", tone: "accent" },
                  ],
                },
                {
                  nodes: [
                    { label: "open the file" },
                    { label: "read the frame" },
                    { label: "edit labels", tone: "accent" },
                  ],
                },
              ]}
              title="LOOP"
            />
          </div>
        </SiteContainer>
      </section>

      <section>
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[28ch] text-2xl font-semibold tracking-tight text-balance">
              What goes in the agent&apos;s folder
            </h2>
            <ProseP>
              There are {components.length} graphs; most ship an official fenced
              ASCII for hosts that cannot run React. The skill should pick at
              most two per write-up.
            </ProseP>
          </div>
          <dl className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            {kit.map((entry) => (
              <div className="flex flex-col gap-2" key={entry.name}>
                <dt className="font-medium">{entry.name}</dt>
                <dd className={cn(proseMutedClass, "max-w-[40ch]")}>
                  {entry.detail}
                </dd>
              </div>
            ))}
          </dl>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <GraphSpec
              rows={[
                { label: "/skill.md", value: "the skill", accent: true },
                { label: "/skill/recipes.md", value: "jsx recipes" },
                {
                  label: "/llms.txt",
                  value: "chooser + ASCII + Comark + Knap",
                },
                { label: "/comark", value: "plain .md host" },
                { label: "/knap", value: "data → markdown" },
                { label: "/developers", value: "api + openapi" },
              ]}
              title="FETCH"
            />
            <GraphCheck
              items={[
                { label: "at most two graphs", done: true },
                { label: "prose between them", done: true },
                { label: "official fence, not homemade", done: true },
                { label: "no SVG", done: true },
              ]}
              title="RULES"
            />
          </div>
        </SiteContainer>
      </section>

      <section id="install">
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[24ch] text-2xl font-semibold tracking-tight text-balance">
              Install the skill
            </h2>
            <ProseP>
              A project copy travels with the repo; a personal copy stays on
              this machine. If the host is React,{" "}
              <TextLink href="/docs/installation">
                install the components
              </TextLink>{" "}
              first — the graphs still need to live in the project.
            </ProseP>
          </div>
          <SkillInstall />
          <ProseMuted>
            The chooser table and full skill file are on{" "}
            <TextLink href="/docs/skill">Skill</TextLink>.
          </ProseMuted>
        </SiteContainer>
      </section>

      <section>
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[20ch] text-2xl font-semibold tracking-tight text-balance">
              Try a prompt
            </h2>
            <ProseP>
              Paste one of these after install. Each should pick two graphs and
              put prose between them.
            </ProseP>
          </div>
          <div className="flex flex-col gap-6">
            {tries.map((item) => (
              <CopyBlock
                key={item.label}
                label={`${item.label} · ${item.hint}`}
                value={item.prompt}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <TextLink href="/docs/skill">All prompts</TextLink>
            <TextLink href="/docs/examples">Examples</TextLink>
            <TextLink href="/docs">Library</TextLink>
            <TextLink href="/comark">Comark</TextLink>
            <TextLink href="/knap">Knap</TextLink>
          </div>
        </SiteContainer>
      </section>
    </main>
  )
}
