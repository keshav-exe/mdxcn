import { toComponentJson } from "@/lib/agent/openapi"
import { components } from "@/lib/docs/catalog"
import { jsonOk, methodNotAllowed } from "@/lib/http/api"
import { CACHE_CATALOG } from "@/lib/http/cache"

export const dynamic = "force-static"

export async function GET() {
  return jsonOk(
    {
      components: components.map(toComponentJson),
    },
    {
      headers: CACHE_CATALOG,
    }
  )
}

export async function POST() {
  return methodNotAllowed("/api/v1/components")
}
