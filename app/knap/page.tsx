import type { Metadata } from "next"
import Link from "next/link"

import { SourcePreview } from "@/components/comark/source-preview"
import { Command } from "@/components/docs/install"
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
import {
  GraphCheck,
  GraphCompare,
  GraphTimeline,
  GraphUptime,
} from "@/components/graphs"
import {
  KNAP_API_URL,
  KNAP_DEMO_DATA,
  KNAP_DEMO_TEMPLATE,
  KNAP_DESCRIPTION,
  KNAP_REPO,
  KNAP_URL,
} from "@/lib/docs/knap"
import { pageMeta, webPageJsonLd } from "@/lib/seo"
import { scopedRegistryInstall } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = pageMeta({
  title: "Knap",
  description: KNAP_DESCRIPTION,
  path: "/knap",
})

const steps = [
  {
    name: "Data",
    detail: (
      <>
        Pass plain JSON (or any variables{" "}
        <TextLink href={KNAP_API_URL}>Knap</TextLink> can resolve). The filter
        reads the typed value, not a schema this library invented.
      </>
    ),
  },
  {
    name: "Filter",
    detail: (
      <>
        Pipe the graph props through <InlineCode>graph_timeline</InlineCode>,{" "}
        <InlineCode>graph_meter</InlineCode>, and the rest. A string param is
        the title. Pass <InlineCode>comark</InlineCode> for a{" "}
        <InlineCode>::graph-*</InlineCode> block.
      </>
    ),
  },
  {
    name: "Markdown",
    detail: (
      <>
        Output is the official fenced ASCII, the same drawing as the MDX tab.
        Obsidian, GitHub, and a README can open it. Graphs with no ASCII emit
        Comark YAML instead.
      </>
    ),
  },
]

export default function KnapPage() {
  return (
    <main id="main">
      <JsonLd
        data={webPageJsonLd({
          name: "Knap",
          description: KNAP_DESCRIPTION,
          path: "/knap",
        })}
      />
      <section>
        <SiteContainer
          borderTop={false}
          className="flex flex-col gap-8 py-8 sm:py-16"
        >
          <div className="flex flex-col gap-4">
            <p className="font-mono tracking-wide text-graph-muted uppercase">
              Knap · data → .md
            </p>
            <h1 className="max-w-[18ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Graphs from a Knap template
            </h1>
            <ProseLead>
              Pipe a props object through a <InlineCode>graph_*</InlineCode>{" "}
              filter; <TextLink href={KNAP_URL}>Knap</TextLink> renders Markdown
              and these filters draw the official fence. No SVG. The Knap CLI
              does not load custom filters. Wire them in your app.
            </ProseLead>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button nativeButton={false} render={<Link href="/docs/knap" />}>
              Read the wiring
            </Button>
            <Button
              nativeButton={false}
              render={<a href={KNAP_URL} rel="noreferrer" target="_blank" />}
              variant="outline"
            >
              knap.md
            </Button>
          </div>
        </SiteContainer>
      </section>

      <section>
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[28ch] text-2xl font-semibold tracking-tight text-balance">
              Template and the frames it produces
            </h2>
            <ProseP>
              Same incident as the Comark landing. Here the source is a{" "}
              <TextLink href={KNAP_URL}>Knap</TextLink> template; the rendered
              side is the React graphs. Toggle to read the template that emitted
              the fences.
            </ProseP>
          </div>
          <SourcePreview source={KNAP_DEMO_TEMPLATE}>
            <ProseMuted>
              p95 crossed 800ms at {KNAP_DEMO_DATA.start}. Rollback at{" "}
              {KNAP_DEMO_DATA.rollback}.
            </ProseMuted>
            <GraphTimeline events={[...KNAP_DEMO_DATA.events]} title="NIGHT" />
            <ProseMuted>
              Same night, and the two days users felt it.
            </ProseMuted>
            <GraphUptime
              days={[...KNAP_DEMO_DATA.uptime.days]}
              from={KNAP_DEMO_DATA.uptime.from}
              title={KNAP_DEMO_DATA.uptime.title}
              to={KNAP_DEMO_DATA.uptime.to}
            />
          </SourcePreview>
        </SiteContainer>
      </section>

      <section>
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[24ch] text-2xl font-semibold tracking-tight text-balance">
              How the pieces fit
            </h2>
            <ProseP>
              You own three files: templating stays in{" "}
              <TextLink href={KNAP_URL}>Knap</TextLink>, the graphs stay copied
              via shadcn if you also render React, and the filters are the only
              new piece.
            </ProseP>
          </div>
          <dl className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {steps.map((entry) => (
              <div className="flex flex-col gap-2" key={entry.name}>
                <dt className="font-medium">{entry.name}</dt>
                <dd className={cn(proseMutedClass, "max-w-[40ch]")}>
                  {entry.detail}
                </dd>
              </div>
            ))}
          </dl>
        </SiteContainer>
      </section>

      <section>
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[24ch] text-2xl font-semibold tracking-tight text-balance">
              Where each format belongs
            </h2>
            <ProseP>
              Knap is a generator. It writes the fence a README can paste, or
              the <InlineCode>::graph-*</InlineCode> block a{" "}
              <TextLink href="/comark">Comark</TextLink> app can render. It does
              not draw the React frame itself.
            </ProseP>
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
                {
                  label: "Data in, Markdown out",
                  values: [false, false, false, true],
                },
              ]}
              title="HOST"
            />
            <GraphCheck
              items={[
                { label: "same props as React", done: true },
                { label: "official fence, not homemade", done: true },
                { label: "comark param → ::graph-*", done: true },
                {
                  label: "CLI loads graph filters",
                  note: "wire createEngine",
                },
              ]}
              title="FILTER"
            />
          </div>
        </SiteContainer>
      </section>

      <section>
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[24ch] text-2xl font-semibold tracking-tight text-balance">
              Install the filters
            </h2>
            <ProseP>
              <InlineCode>all.json</InlineCode> already includes them; if the
              graphs are already in the repo, add{" "}
              <InlineCode>graph-knap</InlineCode> alone. Install{" "}
              <InlineCode>knap</InlineCode> yourself, then spread{" "}
              <InlineCode>graphFilters</InlineCode> into{" "}
              <InlineCode>createEngine</InlineCode>. Full wiring lives on the{" "}
              <TextLink href="/docs/knap">docs page</TextLink>.
            </ProseP>
          </div>
          <Command
            label="Adapter"
            value={scopedRegistryInstall("graph-knap")}
          />
          <Command label="Knap" value="pnpm add knap" />
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <TextLink href="/docs/knap">Wiring</TextLink>
            <TextLink href="/docs/skill">Skill</TextLink>
            <TextLink href={KNAP_URL}>knap.md</TextLink>
            <TextLink href={KNAP_API_URL}>API</TextLink>
            <TextLink href={KNAP_REPO}>obsidianmd/knap</TextLink>
          </div>
        </SiteContainer>
      </section>
    </main>
  )
}
