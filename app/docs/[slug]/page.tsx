import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CopyPage } from "@/components/docs/copy-page"
import { Examples, examplesBySlug } from "@/components/docs/examples"
import { InstallCommand } from "@/components/docs/install"
import { DocsPageHeader } from "@/components/docs/page-header"
import { PropsTable } from "@/components/docs/props-table"
import { JsonLd } from "@/components/seo/json-ld"
import { components, getComponent } from "@/lib/docs/catalog"
import { componentJsonLd, pageMeta } from "@/lib/seo"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return components.map((item) => ({ slug: item.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = getComponent(slug)

  if (!item) {
    return {}
  }

  return pageMeta({
    title: item.title,
    description: item.description,
    path: `/docs/${slug}`,
  })
}

export default async function ComponentDocPage({ params }: PageProps) {
  const { slug } = await params
  const item = getComponent(slug)

  if (!item) {
    notFound()
  }

  const examples = examplesBySlug[slug] ?? []
  const exampleNotes = examples.map(({ title, description, code }) => ({
    title,
    description,
    code,
  }))

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <JsonLd data={componentJsonLd(item)} />
      <DocsPageHeader
        copy={{
          description: item.description,
          doc: item,
          examples: exampleNotes,
          kicker: item.name,
          title: item.title,
        }}
        kicker={item.name}
        lead={item.description}
        title={item.title}
      />

      {examples[0] ? <Examples items={[examples[0]]} /> : null}

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Install</h2>
        <InstallCommand
          doc={item}
          example={examples[0]?.code}
          name={item.registry}
        />
      </section>

      {examples.length > 1 ? <Examples items={examples.slice(1)} /> : null}

      <PropsTable rows={item.props} />
    </div>
  )
}
