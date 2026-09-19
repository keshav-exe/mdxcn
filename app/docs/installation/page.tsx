import type { Metadata } from "next"

import { Callout, Steps, Terminal } from "@/components/graphs"
import { Command, InstallCommand } from "@/components/docs/install"
import { DocsPageHeader } from "@/components/docs/page-header"
import { NamespaceSetup } from "@/components/docs/namespace"
import { JsonLd } from "@/components/seo/json-ld"
import { InlineCode, ProseP, TextLink } from "@/components/site/prose"
import { COMARK_URL } from "@/lib/docs/comark"
import { KNAP_URL } from "@/lib/docs/knap"
import { getComponent } from "@/lib/docs/catalog"
import { installationJsonLd, pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
  title: "Installation",
  description:
    "Copy the source into a shadcn project. Then give the agent the skill.",
  path: "/docs/installation",
})

const description =
  "These are source files, not an npm package. You need an existing shadcn project and the motion dependency."

const extra = `## One component

Run the shadcn CLI against this site's registry, or copy the files from GitHub.

pnpm dlx shadcn@latest add $ORIGIN/r/graph-table.json

## Everything

Installs every graph and the shared frame code into registry/default.

pnpm dlx shadcn@latest add $ORIGIN/r/all.json

## Namespace

Add the registry once in components.json, then install components by name.

pnpm dlx shadcn@latest registry add @mdxcn=$ORIGIN/r/{name}.json

Then:

pnpm dlx shadcn@latest add @mdxcn/graph-table

## Import

Files land under @/registry. Add your own barrel export if you want a shorter import path.

import { GraphTable } from "@/registry/default/graph-table/graph-table"

## Agents

$ORIGIN/agents is write vs read — markdown in MDX and in Notion, ::graph-* in Comark, graph_* in Knap, official ASCII in a README. $ORIGIN/docs/skill is the SKILL.md. Same files in Cursor, Claude Code, Codex, OpenCode, or any agent that loads Agent Skills. $ORIGIN/llms.txt is the chooser, recipes, fenced ASCII blocks, Comark blocks, and Knap filters in one file.`

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
          title: "Installation",
        }}
        lead={
          <>
            These are source files, not an npm package. You need an existing{" "}
            <TextLink href="https://ui.shadcn.com">shadcn</TextLink> project and
            the <InlineCode>motion</InlineCode> dependency.
          </>
        }
        title="Installation"
      />

      <Callout type="tip">
        Register the parent once in <InlineCode>mdx-components.tsx</InlineCode>.
        The MDX tab is the framed drawing. Copy that into Notion or a README.
        React is the other tab.
      </Callout>

      <Steps title="MDX">
        <ol>
          <li>
            <p>Copy the files</p>
            <p>CLI or GitHub. They land under registry/default.</p>
          </li>
          <li>
            <p>
              <strong>Register the parent</strong>
            </p>
            <p>
              Once in mdx-components.tsx. Lists and tables inside do not need
              their own imports.
            </p>
          </li>
          <li>
            <p>
              <em>Paste</em>
            </p>
            <p>
              The MDX tab is the framed figure. Paste it into Notion or a
              README. Wrap the children in the parent when you want it live.
            </p>
          </li>
        </ol>
      </Steps>

      <div className="flex flex-col gap-6 lg:gap-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">
            One component
          </h2>
          <ProseP>
            Run the shadcn CLI against this site&apos;s registry, or copy the
            files from GitHub.
          </ProseP>
          <Terminal title="CLI">
            {`$ pnpm dlx shadcn@latest add @mdxcn/graph-tree
✓ registry/default/graph-tree/graph-tree.tsx
✓ registry/default/graph-frame/graph-frame.tsx`}
          </Terminal>
          <InstallCommand doc={table} name="graph-table" />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Everything</h2>
          <ProseP>
            Installs every graph and the shared frame code into{" "}
            <InlineCode>registry/default</InlineCode>.
          </ProseP>
          <InstallCommand name="all" />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Namespace</h2>
          <ProseP>
            Add the registry once in <InlineCode>components.json</InlineCode>,
            then install components by name.
          </ProseP>
          <NamespaceSetup />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Import</h2>
          <ProseP>
            Files land under <InlineCode>@/registry</InlineCode>. Add your own
            barrel export if you want a shorter import path.
          </ProseP>
          <Command
            label="Import"
            value={`import { GraphTable } from "@/registry/default/graph-table/graph-table"`}
          />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Agents</h2>
          <ProseP>
            A skill file so the agent picks a component instead of drawing SVG.
            Markdown in MDX and in Notion. A <InlineCode>::graph-*</InlineCode>{" "}
            block in <TextLink href={COMARK_URL}>Comark</TextLink>. A{" "}
            <InlineCode>graph_*</InlineCode> filter in{" "}
            <TextLink href={KNAP_URL}>Knap</TextLink>. Official ASCII in a
            README. <TextLink href="/agents">For agents</TextLink> is the write
            and read story. <TextLink href="/docs/skill">Skill</TextLink> is the
            install. <TextLink href="/llms.txt">/llms.txt</TextLink> is the
            chooser plus the ASCII, Comark, and Knap blocks, in one file.
          </ProseP>
        </section>
      </div>
    </div>
  )
}
