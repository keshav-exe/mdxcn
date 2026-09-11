import { components } from "@/lib/docs/catalog"
import { chooserMarkdown } from "@/lib/docs/chooser"
import { CACHE_DAY } from "@/lib/http/cache"

export const dynamic = "force-static"

export async function GET() {
  return new Response(chooserMarkdown(components), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      ...CACHE_DAY,
    },
  })
}
