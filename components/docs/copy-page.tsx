"use client"

import { CopyButton } from "@/components/docs/copy-button"
import { useOrigin } from "@/lib/docs/origin"
import { pageMarkdown, type PageCopy } from "@/lib/docs/prompt"

function CopyPage(props: PageCopy) {
  const origin = useOrigin()
  const text = pageMarkdown({ origin, ...props })

  return <CopyButton caption="copy page" label="copy page" text={text} />
}

export { CopyPage }
