import type { Metadata } from "next"

import { GraphSpec } from "@/components/graphs"
import { JsonLd } from "@/components/seo/json-ld"
import {
  LandingHero,
  LandingLinks,
  LandingSection,
} from "@/components/site/landing"
import { ProseP } from "@/components/site/prose"
import { CONTACT_PARAS } from "@/lib/agent/copy"
import { GITHUB_URL } from "@/lib/github"
import { pageMeta, webPageJsonLd } from "@/lib/seo"
import { SITE_AUTHOR, SITE_EMAIL } from "@/lib/site"

const description = `Mail ${SITE_EMAIL} for the library and the site. Bugs go to GitHub.`

export const metadata: Metadata = pageMeta({
  title: "contact",
  description,
  path: "/contact",
})

export default function ContactPage() {
  return (
    <main id="main">
      <JsonLd
        data={webPageJsonLd({
          name: "Contact mdxcn",
          description,
          path: "/contact",
        })}
      />
      <LandingHero
        actions={[
          { href: `mailto:${SITE_EMAIL}`, label: "mail keshav" },
          { href: `${GITHUB_URL}/issues`, label: "open an issue" },
        ]}
        figure={
          <GraphSpec
            rows={[
              { label: "mail", value: SITE_EMAIL, accent: true },
              { label: "bugs", value: "github issues" },
              { label: "x", value: "@kshvbgde" },
              { label: "desk", value: "none" },
              { label: "sla", value: "none" },
            ]}
            title="channels"
          />
        }
        lead={CONTACT_PARAS[0]}
        title="mail the author, not a desk"
      />
      <LandingSection title="where to write">
        {CONTACT_PARAS.slice(1).map((para) => (
          <ProseP key={para}>{para}</ProseP>
        ))}
        <LandingLinks
          items={[
            { href: "/about", label: "about" },
            { href: "/privacy", label: "privacy" },
            { href: SITE_AUTHOR.x, label: "x" },
          ]}
        />
      </LandingSection>
    </main>
  )
}
