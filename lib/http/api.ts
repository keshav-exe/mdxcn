import { PROBLEM_TYPE } from "@/lib/http/accept"
import {
  notFoundProblem,
  problem,
  problemResponse,
  type Problem,
} from "@/lib/http/problem"
import { rateLimitHeaders } from "@/lib/http/rate-limit"
import { SITE_URL } from "@/lib/site"

type JsonInit = ResponseInit & {
  rateRemaining?: number
}

function apiHeaders(init?: JsonInit) {
  return {
    ...rateLimitHeaders(init?.rateRemaining),
    ...(init?.headers ?? {}),
  }
}

export function jsonOk<T>(body: T, init?: JsonInit) {
  const { rateRemaining, ...rest } = init ?? {}

  return Response.json(body, {
    ...rest,
    headers: apiHeaders({ ...rest, rateRemaining }),
  })
}

export function jsonProblem(body: Problem, init?: JsonInit) {
  const { rateRemaining, ...rest } = init ?? {}

  return problemResponse(body, apiHeaders({ ...rest, rateRemaining }))
}

export function apiNotFound(instance: string) {
  return jsonProblem(notFoundProblem(instance))
}

export function methodNotAllowed(instance: string, allow = "GET") {
  return jsonProblem(
    problem({
      status: 405,
      title: "Method not allowed",
      detail: `Use ${allow} on this endpoint.`,
      instance,
      code: "method_not_allowed",
    }),
    { headers: { Allow: allow } }
  )
}

export function rateLimited(instance: string, retryAfter = 60) {
  return problemResponse(
    problem({
      status: 429,
      title: "Too many requests",
      detail: `Wait ${retryAfter} seconds, then retry with backoff.`,
      instance,
      code: "rate_limited",
      hrefs: {
        policy: `${SITE_URL}/developers/deprecation`,
      },
    }),
    {
      ...rateLimitHeaders(0),
      "Retry-After": String(retryAfter),
      "Content-Type": PROBLEM_TYPE,
    }
  )
}
