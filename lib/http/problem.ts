import { PROBLEM_TYPE } from "@/lib/http/accept"
import { SITE_URL } from "@/lib/site"

export type Problem = {
  type: string
  title: string
  status: number
  detail: string
  instance?: string
  code: string
  hrefs?: Record<string, string>
}

export function problem({
  status,
  title,
  detail,
  instance,
  code,
  type = `${SITE_URL}/about#errors`,
  hrefs,
}: {
  status: number
  title: string
  detail: string
  instance?: string
  code: string
  type?: string
  hrefs?: Record<string, string>
}): Problem {
  return {
    type,
    title,
    status,
    detail,
    ...(instance ? { instance } : {}),
    code,
    ...(hrefs ? { hrefs } : {}),
  }
}

export function problemResponse(body: Problem, headers?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status: body.status,
    headers: {
      "Content-Type": PROBLEM_TYPE,
      "Cache-Control": "no-store",
      ...headers,
    },
  })
}

export function notFoundProblem(instance?: string) {
  return problem({
    status: 404,
    title: "Not found",
    detail: "That URL is not a page or a catalog item.",
    instance,
    code: "not_found",
    hrefs: {
      docs: `${SITE_URL}/docs`,
    },
  })
}
