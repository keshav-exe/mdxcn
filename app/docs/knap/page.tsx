import type { Metadata } from "next"

import { Command, CopyBlock, InstallCommand } from "@/components/docs/install"
import { DocsPageHeader } from "@/components/docs/page-header"
import {
  InlineCode,
  ProseLead,
  ProseP,
  TextLink,
} from "@/components/site/prose"
import { JsonLd } from "@/components/seo/json-ld"
import {
  KNAP_API_URL,
  KNAP_DESCRIPTION,
  KNAP_REPO,
  KNAP_SUBSET,
  KNAP_URL,
  KNAP_WIRE,
} from "@/lib/docs/knap"
import { pageMeta, webPageJsonLd } from "@/lib/seo"

const extra = `## Install

pnpm dlx shadcn@latest add @mdxcn/all

The filters are graph-knap. all.json already includes them. Install knap yourself.

pnpm add knap

## Wire

${KNAP_WIRE}

## Filters

graph_table, graph_timeline, graph_meter, …, one per graph except Frame. Piped value is the React props object. A string param is the title. Pass comark to emit a ::graph-* block. Graphs with no fenced ASCII (flow, plot, activity, heatmap, calendar, timer, countdown) emit Comark YAML by default.

## CLI

npx knap render uses standardFilters only. Custom graph filters exist in createEngine, not in the CLI.

## Hosts

The output is Markdown. GitHub and a README can open the fence. A Comark app can open ::graph-* if you asked for comark.`

export const metadata: Metadata = pageMeta({
  title: "Knap",
  description: KNAP_DESCRIPTION,
  path: "/docs/knap",
})

export default function KnapDocsPage() {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <JsonLd
        data={webPageJsonLd({
          name: "Knap",
          description: KNAP_DESCRIPTION,
          path: "/docs/knap",
        })}
      />
      <DocsPageHeader
        copy={{
          description: KNAP_DESCRIPTION,
          extra,
          registry: "graph-knap",
          title: "Knap",
        }}
        kicker="graph-knap"
        lead={
          <ProseLead>
            Pipe graph props through a <InlineCode>graph_*</InlineCode> filter;{" "}
            <TextLink href={KNAP_URL}>Knap</TextLink> renders Markdown and these
            filters draw the official fence, or a{" "}
            <InlineCode>::graph-*</InlineCode> block.
          </ProseLead>
        }
        title="Knap"
      />

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Install</h2>
        <ProseP>
          Three names: <TextLink href={KNAP_URL}>Knap</TextLink> is the
          templating language (<InlineCode>pnpm add knap</InlineCode>).{" "}
          <InlineCode>graph-knap</InlineCode> is the filter pack you copy from
          this registry. <InlineCode>graph_*</InlineCode> is what you write in
          templates. Copy the graphs first; <InlineCode>all.json</InlineCode>{" "}
          already includes the filters.
        </ProseP>
        <InstallCommand name="graph-knap" />
        <Command label="Knap" value="pnpm add knap" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Wire</h2>
        <ProseP>
          Spread <InlineCode>graphFilters</InlineCode> into{" "}
          <InlineCode>createEngine</InlineCode> next to{" "}
          <InlineCode>standardFilters</InlineCode>. Filters are synchronous.
          They read <InlineCode>context.rawValue</InlineCode> so arrays stay
          arrays. The <TextLink href={KNAP_URL}>Knap</TextLink> CLI does not
          load custom filters.
        </ProseP>
        <CopyBlock label="Engine" value={KNAP_WIRE} />
        <Command label="Subset" value={KNAP_SUBSET} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Author</h2>
        <ProseP>
          Piped value is the same props object as the React API. A string param
          is the title. Every docs page has a Knap tab with a copy-paste
          template, the JSON, and the Markdown it emits.
        </ProseP>
        <CopyBlock
          label="Template"
          value={`{{ events | graph_timeline:"NIGHT" }}

{{ coverage | graph_meter:"SHIPPED" }}

{{ night | graph_timeline:"comark" }}`}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Format</h2>
        <ProseP>
          Default output is the official fenced ASCII. Pass{" "}
          <InlineCode>comark</InlineCode> to emit a{" "}
          <InlineCode>::graph-*</InlineCode> block instead. Flow, Plot,
          Activity, Heatmap, Calendar, Timer, and Countdown have no ASCII, so
          they emit Comark YAML unless you only wanted a fence, in which case
          pick another graph.
        </ProseP>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Validate</h2>
        <ProseP>
          Merge <InlineCode>graphFilterMetadata</InlineCode> into{" "}
          <InlineCode>validateFilters</InlineCode> so unknown{" "}
          <InlineCode>graph_*</InlineCode> names fail the same way unknown
          standard filters do. Limits, resolvers, and{" "}
          <InlineCode>allowRegex</InlineCode> stay{" "}
          <TextLink href={KNAP_API_URL}>Knap&apos;s</TextLink>.
        </ProseP>
        <CopyBlock
          label="Editor"
          value={`import { parse, standardFilterMetadata, validateFilters } from "knap"
import { graphFilterMetadata } from "@/registry/default/graph-knap/graph-knap"

const parsed = parse(template)
const filterErrors = validateFilters(parsed.ast, {
  ...standardFilterMetadata,
  ...graphFilterMetadata,
})`}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Hosts</h2>
        <ProseP>
          The result is Markdown. GitHub, Linear, Obsidian, and a README can
          open the fence. A Comark app can open{" "}
          <InlineCode>::graph-*</InlineCode> if you asked for it.{" "}
          <TextLink href={KNAP_REPO}>obsidianmd/knap</TextLink> is the language;{" "}
          <InlineCode>graph-knap</InlineCode> is the filter pack.
        </ProseP>
      </section>
    </div>
  )
}
