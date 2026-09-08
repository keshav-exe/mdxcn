"use client"

import { Command, CopyBlock } from "@/components/docs/install"
import { useOrigin } from "@/lib/docs/origin"

function NamespaceSetup() {
  const origin = useOrigin()
  const host = origin || "<origin>"
  const add = `pnpm dlx shadcn@latest registry add @mdx-graphs=${host}/r/{name}.json`
  const config = `{
  "registries": {
    "@mdx-graphs": "${host}/r/{name}.json"
  }
}`

  return (
    <div className="flex flex-col gap-6">
      <Command label="CLI" value={add} />
      <CopyBlock label="components.json" value={config} />
      <Command
        label="Then"
        value="pnpm dlx shadcn@latest add @mdx-graphs/graph-table"
      />
    </div>
  )
}

export { NamespaceSetup }
