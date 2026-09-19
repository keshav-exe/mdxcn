import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/seo/json-ld"
import { ProsePage } from "@/components/site/prose-page"
import { PRIVACY_PARAS } from "@/lib/agent/copy"
import { pageMeta, webPageJsonLd } from "@/lib/seo"

const description =
  "No accounts. Vercel Analytics on the site. Public GitHub star count. Mail is ordinary email."

export const metadata: Metadata = pageMeta({
  title: "Privacy",
  description,
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: "Privacy · mdxcn",
          description,
          path: "/privacy",
        })}
      />
      <ProsePage title="privacy">
        {PRIVACY_PARAS.map((para) => (
          <p key={para}>{para}</p>
        ))}
        <p>
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/about"
          >
            About
          </Link>
          {" · "}
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/contact"
          >
            Contact
          </Link>
        </p>
      </ProsePage>
    </>
  )
}
