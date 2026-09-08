import type { Metadata } from "next"
import Link from "next/link"

import { InstallCommand } from "@/components/docs/install"
import { DocsPageHeader } from "@/components/docs/page-header"
import { JsonLd } from "@/components/seo/json-ld"
import { SiteCorners, SiteMark, SiteRule } from "@/components/site/corners"
import { components, getComponent } from "@/lib/docs/catalog"
import { isNewSlug } from "@/lib/docs/new"
import { docsJsonLd, pageMeta } from "@/lib/seo"
import { DOCS_DESCRIPTION } from "@/lib/site"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight02Icon } from "@hugeicons/core-free-icons"

export const metadata: Metadata = pageMeta({
  title: "Introduction",
  description: DOCS_DESCRIPTION,
  path: "/docs",
})

const intro = `ASCII-framed graphs you copy into a shadcn project. Built so an agent can place them next to prose — JSX in MDX, ::graph-* in Comark, official fences in a README. One accent. Drawing graphs also take palette="duo" or "multi".`

export default function DocsPage() {
  const extra = [
    "## Components",
    "",
    ...components.map(
      (item) => `- ${item.title} (${item.name}): ${item.description}`
    ),
  ].join("\n")

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <JsonLd data={docsJsonLd()} />
      <DocsPageHeader
        copy={{
          description: intro,
          extra,
          registry: "all",
          title: "Introduction",
        }}
        lead={intro}
        title="Introduction"
        titleClassName="max-w-[20ch]"
      >
        <p className="max-w-[56ch] text-pretty text-muted-foreground">
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/agents"
          >
            For agents
          </Link>{" "}
          is the write and read story.{" "}
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/docs/skill"
          >
            Skill
          </Link>{" "}
          is the SKILL.md.{" "}
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/docs/examples"
          >
            Examples
          </Link>{" "}
          are short write-ups with two graphs each.{" "}
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/docs/comark"
          >
            Comark
          </Link>{" "}
          is <code className="font-mono">::graph-*</code> in a plain{" "}
          <code className="font-mono">.md</code> file.
        </p>
      </DocsPageHeader>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Install</h2>
        <p className="max-w-[56ch] text-pretty text-muted-foreground">
          The CLI copies a registry item into your repo. You can also copy the
          files from GitHub.
        </p>
        <InstallCommand doc={getComponent("graph-table")} name="graph-table" />
        <p>
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/docs/installation"
          >
            Full installation
          </Link>
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight">Components</h2>
        <div className="relative isolate -mx-4 sm:-mx-6 lg:-mx-8">
          <SiteRule className="top-0" />
          <SiteRule className="bottom-0" />
          <SiteCorners />
          <SiteMark className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 max-sm:hidden" />
          <SiteMark className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 max-sm:hidden" />
          <dl className="grid sm:grid-cols-2">
            {components.map((item) => (
              <Link
                href={`/docs/${item.slug}`}
                key={item.slug}
                className={cn(
                  "group flex h-full flex-col justify-between gap-3 px-4 py-5 sm:px-6",
                  "max-sm:[&:not(:first-child)]:border-t max-sm:[&:not(:first-child)]:border-dashed max-sm:[&:not(:first-child)]:border-site-rail",
                  "sm:[&:nth-child(n+3)]:border-t sm:[&:nth-child(n+3)]:border-dashed sm:[&:nth-child(n+3)]:border-site-rail",
                  "sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:border-dashed sm:[&:nth-child(odd)]:border-site-rail"
                )}
              >
                <div className="flex flex-col gap-2">
                  <dt className="flex items-center gap-2 font-medium text-foreground">
                    {item.title}

                    {isNewSlug(item.slug) ? (
                      <span className="font-mono text-[10px] tracking-wide text-graph-accent uppercase">
                        new
                      </span>
                    ) : null}
                  </dt>

                  <dd className="max-w-[40ch] text-pretty text-muted-foreground">
                    {item.description}
                  </dd>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    size={20}
                    strokeWidth={2}
                    className="transition-all duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
