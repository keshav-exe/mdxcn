import { openApiSpec } from "@/lib/agent/openapi"
import { jsonOk } from "@/lib/http/api"
import { CACHE_CATALOG } from "@/lib/http/cache"
import { SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

export async function GET() {
  return jsonOk(openApiSpec(SITE_URL), {
    headers: CACHE_CATALOG,
  })
}
