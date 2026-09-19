import type { Metadata } from "next"

import { GraphSpec } from "@/components/graphs"
import { JsonLd } from "@/components/seo/json-ld"
import {
  LandingHero,
  LandingLinks,
  LandingSection,
} from "@/components/site/landing"
import { ProseP } from "@/components/site/prose"
import { ABOUT_PARAS } from "@/lib/agent/copy"
import { GITHUB_URL } from "@/lib/github"
import { pageMeta, webPageJsonLd } from "@/lib/seo"
import { SITE_EMAIL } from "@/lib/site"

const description =
  "Open-source ASCII-framed React diagrams for MDX. Source on GitHub, MIT license, copied with the shadcn CLI."

export const metadata: Metadata = pageMeta({
  title: "About",
  description,
  path: "/about",
})

export default function AboutPage() {
  return (
    <main id="main">
      <JsonLd
        data={webPageJsonLd({
          name: "About mdxcn",
          description,
          path: "/about",
        })}
      />
      <LandingHero
        actions={[
          { href: "/contact", label: "contact" },
          { href: GITHUB_URL, label: "github" },
        ]}
        figure={
          <GraphSpec
            rows={[
              { label: "license", value: "mit", accent: true },
              { label: "install", value: "shadcn cli" },
              { label: "registry", value: "@mdxcn" },
              { label: "skill", value: "skills/mdxcn" },
              { label: "site", value: "mdxcn.dev" },
              { label: "mail", value: SITE_EMAIL },
            ]}
            title="SPEC"
          />
        }
        lead={ABOUT_PARAS[0]}
        title="open source, copied into your repo"
      />
      <LandingSection title="what it is">
        {ABOUT_PARAS.slice(1).map((para) => (
          <ProseP key={para}>{para}</ProseP>
        ))}
        <LandingLinks
          items={[
            { href: "/contact", label: "contact" },
            { href: "/privacy", label: "privacy" },
            { href: GITHUB_URL, label: "github" },
          ]}
        />
      </LandingSection>
    </main>
  )
}
