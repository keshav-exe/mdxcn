import type { Metadata } from "next"

import { DocsLink, ErrorFrame, HomeLink } from "@/components/site/error-frame"

export const metadata: Metadata = {
  title: "not found",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <ErrorFrame
      action={
        <>
          <DocsLink />
          <HomeLink />
        </>
      }
      body="That URL is not a page. Look next at /docs."
      code="404"
      title="not found"
    />
  )
}
