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
  COMARK_DEMO_REPO,
  COMARK_DEMO_SOURCE,
  COMARK_DEMO_URL,
  COMARK_DESCRIPTION,
  COMARK_URL,
} from "@/lib/docs/comark"
import { pageMeta, webPageJsonLd } from "@/lib/seo"
import { scopedRegistryInstall } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = pageMeta({
  title: "Comark",
  description: COMARK_DESCRIPTION,
  path: "/comark",
})

const steps = [
  {
    name: "Parse",
    detail: (
      <>
        <TextLink href={COMARK_URL}>Comark</TextLink> turns the{" "}
        <InlineCode>.md</InlineCode> file into a{" "}
        <InlineCode>MarkdownDocument</InlineCode> — on the server, in a worker,
        or as tokens stream in.
      </>
    ),
  },
  {
    name: "Coerce",
    detail: (
      <>
        Markdown attributes arrive as strings, so the adapter turns{" "}
        <InlineCode>value=&quot;0.86&quot;</InlineCode> into{" "}
        <InlineCode>0.86</InlineCode>, maps <InlineCode>class</InlineCode> to{" "}
        <InlineCode>className</InlineCode>, and holds off until required props
        exist so <InlineCode>rows.map</InlineCode> does not throw mid-stream.
      </>
    ),
  },
  {
    name: "Render",
    detail: (
      <>
        Each <InlineCode>::graph-*</InlineCode> tag is already on the allowlist,
        and the same React graph you copied from the registry draws the frame.
      </>
    ),
  },
]

export default function ComarkPage() {
  return (
    <main id="main">
      <JsonLd
        data={webPageJsonLd({
          name: "Comark",
          description: COMARK_DESCRIPTION,
          path: "/comark",
        })}
      />
      <section>
        <SiteContainer
          borderTop={false}
          className="flex flex-col gap-8 py-8 sm:py-16"
        >
          <div className="flex flex-col gap-4">
            <p className="font-mono tracking-wide text-graph-muted uppercase">
              Comark · no MDX
            </p>
            <h1 className="max-w-[18ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Graphs inside a plain Markdown file
            </h1>
            <ProseLead>
              Put <InlineCode>::graph-*</InlineCode> blocks in a{" "}
              <InlineCode>.md</InlineCode> file;{" "}
              <TextLink href={COMARK_URL}>Comark</TextLink> parses them and
              these graphs draw the frames — no MDX, no compile step.{" "}
              <TextLink href={COMARK_DEMO_REPO}>
                Sébastien Chopin&apos;s demo
              </TextLink>{" "}
              is the reference implementation; the adapter here is{" "}
              <InlineCode>graph-comark</InlineCode>.
            </ProseLead>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button nativeButton={false} render={<Link href="/docs/comark" />}>
              Read the wiring
            </Button>
            <Button
              nativeButton={false}
              render={
                <a href={COMARK_DEMO_URL} rel="noreferrer" target="_blank" />
              }
              variant="outline"
            >
              Open the demo report
            </Button>
          </div>
        </SiteContainer>
      </section>

      <section>
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[28ch] text-2xl font-semibold tracking-tight text-balance">
              Source and rendered view of the same file
            </h2>
            <ProseP>
              The source is CommonMark plus{" "}
              <TextLink href={COMARK_URL}>Comark</TextLink> component blocks; the
              rendered side uses the same graphs as the docs. Toggle to read the
              Markdown that produced them.
            </ProseP>
          </div>
          <SourcePreview source={COMARK_DEMO_SOURCE}>
            <ProseMuted>
              p95 crossed 800ms at 14:02. Rollback at 14:11.
            </ProseMuted>
            <GraphTimeline
              events={[
                { date: "14:02", label: "p95 crossed 800ms" },
                {
                  date: "14:11",
                  label: "rolled back the cache flag",
                  state: "now",
                },
                {
                  date: "14:40",
                  label: "write the postmortem",
                  state: "next",
                },
              ]}
              title="NIGHT"
            />
            <ProseMuted>
              Same night — and the two days users felt it.
            </ProseMuted>
            <GraphUptime
              days={[
                "ok",
                "ok",
                "ok",
                "ok",
                "ok",
                "degraded",
                "ok",
                "ok",
                "down",
                "down",
                "ok",
                "ok",
                "ok",
                "ok",
              ]}
              from="Aug 14"
              title="API"
              to="Aug 27"
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
              You own three files: parsing stays in{" "}
              <TextLink href={COMARK_URL}>Comark</TextLink>, the graphs stay
              copied via shadcn, and the adapter is the only new piece.
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
              Use JSX in MDX, the fenced ASCII on GitHub and READMEs, and{" "}
              <TextLink href={COMARK_URL}>Comark</TextLink> when you need a plain{" "}
              <InlineCode>.md</InlineCode> file that can stream as it arrives.
            </ProseP>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <GraphCompare
              columns={["JSX", "ASCII", "Comark"]}
              rows={[
                { label: "MDX / React", values: [true, false, true] },
                { label: "App .md file", values: [false, false, true] },
                { label: "README / GitHub", values: [false, true, false] },
                { label: "Streaming tokens", values: [false, false, true] },
              ]}
              title="HOST"
            />
            <GraphCheck
              items={[
                { label: "auto-close dangling ::", done: true },
                { label: "YAML all-or-nothing", done: true },
                {
                  label: "empty frame until props land",
                  done: true,
                },
                {
                  label: "incomplete YAML can throw",
                  note: "hold last good tree",
                },
              ]}
              title="STREAM"
            />
          </div>
        </SiteContainer>
      </section>

      <section>
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[24ch] text-2xl font-semibold tracking-tight text-balance">
              Install the adapter
            </h2>
            <ProseP>
              <InlineCode>all.json</InlineCode> already includes it; if the
              graphs are already in the repo, add{" "}
              <InlineCode>graph-comark</InlineCode> alone. Pass{" "}
              <InlineCode>graphComponents</InlineCode> to{" "}
              <TextLink href={COMARK_URL}>Comark</TextLink>. Streaming caveats
              and the full wiring live on the{" "}
              <TextLink href="/docs/comark">docs page</TextLink>.
            </ProseP>
          </div>
          <Command
            label="Adapter"
            value={scopedRegistryInstall("graph-comark")}
          />
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <TextLink href="/docs/comark">Wiring</TextLink>
            <TextLink href="/docs/skill">Skill</TextLink>
            <TextLink href={COMARK_URL}>comark.dev</TextLink>
            <TextLink href={COMARK_DEMO_REPO}>atinux/comark-graphs-demo</TextLink>
          </div>
        </SiteContainer>
      </section>
    </main>
  )
}
