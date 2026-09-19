import { jsonOk, methodNotAllowed } from "@/lib/http/api"
import { CACHE_SHORT } from "@/lib/http/cache"
import { SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

export async function GET() {
  return jsonOk(
    {
      ok: true,
      service: "mdxcn",
      version: "1.0.0",
      url: SITE_URL,
    },
    {
      headers: CACHE_SHORT,
    }
  )
}

export async function POST() {
  return methodNotAllowed("/api/v1/health")
}
