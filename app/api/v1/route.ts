import { apiIndex } from "@/lib/agent/openapi"
import { jsonOk, methodNotAllowed } from "@/lib/http/api"
import { CACHE_CATALOG } from "@/lib/http/cache"
import { SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

export async function GET() {
  return jsonOk(apiIndex(SITE_URL), {
    headers: CACHE_CATALOG,
  })
}

export async function POST() {
  return methodNotAllowed("/api/v1")
}
