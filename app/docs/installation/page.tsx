import type { Metadata } from "next"

import { Callout, Steps } from "@/components/graphs"
import { Command, InstallCommand } from "@/components/docs/install"
import { DocsPageHeader } from "@/components/docs/page-header"
import { NamespaceSetup } from "@/components/docs/namespace"
import { JsonLd } from "@/components/seo/json-ld"
import { InlineCode, ProseLead, ProseP, TextLink } from "@/components/site/prose"
import { COMARK_URL } from "@/lib/docs/comark"
import { KNAP_URL } from "@/lib/docs/knap"
import { getComponent } from "@/lib/docs/catalog"
import { installationJsonLd, pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
  title: "installation",
  description:
    "copy the source into a shadcn project. then give the agent the skill.",
  path: "/docs/installation",
})

const description =
  "these are source files, not an npm package. you need an existing shadcn project and the motion dependency."

const extra = `## one component

run the shadcn cli against this site's registry, or copy the files from github.

pnpm dlx shadcn@latest add $ORIGIN/r/graph-table.json

## everything

installs every graph and the shared frame code into registry/default.

pnpm dlx shadcn@latest add $ORIGIN/r/all.json

## namespace

add the registry once in components.json, then install components by name.

pnpm dlx shadcn@latest registry add @mdxcn=$ORIGIN/r/{name}.json

then:

pnpm dlx shadcn@latest add @mdxcn/graph-table

## import

files land under @/registry. add your own barrel export if you want a shorter import path.

import { GraphTable } from "@/registry/default/graph-table/graph-table"

## mdx

register the parent once in mdx-components.tsx. the mdx tab is the framed figure — copy it into notion or a readme. wrap the children in the parent when you want it live.

## agents

$ORIGIN/agents is write vs read — markdown in mdx and in notion, ::graph-* in comark, graph_* in knap, official ascii in a readme. $ORIGIN/docs/skill is the skill.md. $ORIGIN/llms.txt is the chooser, recipes, fenced ascii blocks, comark blocks, and knap filters in one file.`

export default function InstallationPage() {
  const table = getComponent("graph-table")

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <JsonLd data={installationJsonLd()} />
      <DocsPageHeader
        copy={{
          description,
          extra,
          registry: "all",
          title: "installation",
        }}
        lead={
          <ProseLead>
            these are source files, not an npm package. you need an existing{" "}
            <TextLink href="https://ui.shadcn.com">shadcn</TextLink> project and
            the <InlineCode>motion</InlineCode> dependency.
          </ProseLead>
        }
        title="installation"
      />

      <div className="flex flex-col gap-6 lg:gap-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">
            one component
          </h2>
          <ProseP>
            run the shadcn cli against this site&apos;s registry, or copy the
            files from github. they land under{" "}
            <InlineCode>registry/default</InlineCode>.
          </ProseP>
          <InstallCommand doc={table} name="graph-table" />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">everything</h2>
          <ProseP>
            installs every graph and the shared frame code into{" "}
            <InlineCode>registry/default</InlineCode>.{" "}
            <InlineCode>graph-comark</InlineCode> and{" "}
            <InlineCode>graph-knap</InlineCode> are already in{" "}
            <InlineCode>all.json</InlineCode>.
          </ProseP>
          <InstallCommand name="all" />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">namespace</h2>
          <ProseP>
            add the registry once in <InlineCode>components.json</InlineCode>,
            then install components by name as{" "}
            <InlineCode>@mdxcn/graph-table</InlineCode>.
          </ProseP>
          <NamespaceSetup />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">import</h2>
          <ProseP>
            files land under <InlineCode>@/registry</InlineCode>. add your own
            barrel export if you want a shorter import path.
          </ProseP>
          <Command
            label="import"
            value={`import { GraphTable } from "@/registry/default/graph-table/graph-table"`}
          />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">mdx</h2>
          <ProseP>
            register the parent once. lists and tables inside the tag do not
            need extra imports. the mdx tab is the framed figure — paste that
            into notion or a readme. wrap the children in the parent when you
            want it live.
          </ProseP>
          <Callout type="tip">
            register the parent once in{" "}
            <InlineCode>mdx-components.tsx</InlineCode>. the mdx tab is the
            framed drawing. copy that into notion or a readme. react is the
            other tab.
          </Callout>
          <Steps title="mdx">
            <ol>
              <li>
                <p>copy the files</p>
                <p>cli or github. they land under registry/default.</p>
              </li>
              <li>
                <p>
                  <strong>register the parent</strong>
                </p>
                <p>
                  once in mdx-components.tsx. lists and tables inside do not
                  need their own imports.
                </p>
              </li>
              <li>
                <p>
                  <em>paste</em>
                </p>
                <p>
                  the mdx tab is the framed figure. paste it into notion or a
                  readme. wrap the children in the parent when you want it live.
                </p>
              </li>
            </ol>
          </Steps>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">agents</h2>
          <ProseP>
            a skill file so the agent picks a component instead of drawing svg.
            markdown in mdx and in notion. a <InlineCode>::graph-*</InlineCode>{" "}
            block in <TextLink href={COMARK_URL}>comark</TextLink>. a{" "}
            <InlineCode>graph_*</InlineCode> filter in{" "}
            <TextLink href={KNAP_URL}>knap</TextLink>. official ascii in a
            readme. <TextLink href="/agents">for agents</TextLink> is the write
            and read story. <TextLink href="/docs/skill">skill</TextLink> is the
            install. <TextLink href="/llms.txt">/llms.txt</TextLink> is the
            chooser plus the ascii, comark, and knap blocks, in one file.
          </ProseP>
        </section>
      </div>
    </div>
  )
}
