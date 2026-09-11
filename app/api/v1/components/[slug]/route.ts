import { toComponentDetail } from "@/lib/agent/openapi"
import { components, getComponent } from "@/lib/docs/catalog"
import { apiNotFound, jsonOk, methodNotAllowed } from "@/lib/http/api"
import { CACHE_CATALOG } from "@/lib/http/cache"

export const dynamic = "force-static"

export function generateStaticParams() {
  return components.map((item) => ({ slug: item.slug }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const item = getComponent(slug)

  if (!item) {
    return apiNotFound(`/api/v1/components/${slug}`)
  }

  return jsonOk(toComponentDetail(item), {
    headers: CACHE_CATALOG,
  })
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  return methodNotAllowed(`/api/v1/components/${slug}`)
}
