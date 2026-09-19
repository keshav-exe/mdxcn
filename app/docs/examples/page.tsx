import type { Metadata } from "next"
import Link from "next/link"

import { RecipeList } from "@/components/docs/recipe-card"
import { DocsPageHeader } from "@/components/docs/page-header"
import { JsonLd } from "@/components/seo/json-ld"
import { Callout } from "@/components/graphs"
import { recipes, recipeCopy } from "@/lib/docs/recipes"
import { pageMeta } from "@/lib/seo"
import { SITE_AUTHOR, SITE_NAME_SHORT, SITE_URL } from "@/lib/site"

const description =
  "Short write-ups with two graphs each. A refactor, an incident, a tradeoff, a pull request."

export const metadata: Metadata = pageMeta({
  title: "Examples",
  description,
  path: "/docs/examples",
})

const extra = [
  "## Examples",
  "",
  ...recipes.flatMap((item) => [
    `### ${item.title}`,
    "",
    item.story,
    "",
    recipeCopy(item),
    "",
  ]),
].join("\n")

export default function ExamplesPage() {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "mdxcn examples",
          description,
          url: `${SITE_URL}/docs/examples`,
          author: {
            "@type": "Person",
            name: SITE_AUTHOR.name,
            url: SITE_AUTHOR.url,
          },
          isPartOf: {
            "@type": "SoftwareSourceCode",
            name: SITE_NAME_SHORT,
            url: SITE_URL,
          },
        }}
      />
      <DocsPageHeader
        copy={{
          description,
          extra,
          title: "Examples",
        }}
        lead={
          <>
            {description} Copy the MDX tab — it is the framed figure. Paste it
            into Notion or a README and the drawing is still there. Each graph
            has its own page if you want the props.
          </>
        }
        title="Examples"
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
          {recipes.map((item) => (
            <li key={item.slug}>
              <a
                className="hover:text-foreground hover:underline"
                href={`#${item.slug}`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </DocsPageHeader>

      <Callout type="tip">
        Copy is the framed figure from the MDX tab. Paste it into Notion or a
        README and the drawing is still there.
      </Callout>

      <RecipeList />

      <p className="max-w-[56ch] text-pretty text-muted-foreground">
        Give this to an agent:{" "}
        <Link
          className="text-foreground underline-offset-4 hover:underline"
          href="/agents"
        >
          For agents
        </Link>
        . Install:{" "}
        <Link
          className="text-foreground underline-offset-4 hover:underline"
          href="/docs/skill"
        >
          Skill
        </Link>
        . Every graph in one file, including the fenced ASCII blocks:{" "}
        <Link
          className="text-foreground underline-offset-4 hover:underline"
          href="/llms.txt"
        >
          /llms.txt
        </Link>
        .
      </p>
    </div>
  )
}
