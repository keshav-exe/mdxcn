import { markdownForPath } from "@/lib/agent/pages"
import { MARKDOWN_TYPE } from "@/lib/http/accept"
import { CACHE_DAY } from "@/lib/http/cache"

export const dynamic = "force-static"

export async function GET() {
  const body = await markdownForPath("/agents")

  return new Response(body, {
    headers: {
      "Content-Type": MARKDOWN_TYPE,
      ...CACHE_DAY,
    },
  })
}
