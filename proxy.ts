import { NextResponse, type NextRequest } from "next/server"

import {
  PAGE_TYPES,
  appendVaryAccept,
  isShadcnAccept,
  preferredType,
} from "@/lib/http/accept"

const SKIP =
  /^\/(api\/|_next\/|_vercel\/|r\/|llms\.txt$|skill\.md$|agents\.md$|skill\/|openapi\.json$|sitemap\.xml$|robots\.txt$|\.well-known\/|favicon\.ico$|icon(?:\.svg)?$|apple-icon)|opengraph-image/

function markdownDestination(pathname: string) {
  const clean = pathname.replace(/\.md$/i, "") || "/"
  return clean === "/" ? "/api/markdown" : `/api/markdown${clean}`
}

function withVary(response: NextResponse) {
  appendVaryAccept(response.headers)
  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accept = request.headers.get("accept")

  if (SKIP.test(pathname)) {
    return NextResponse.next()
  }

  if (pathname.endsWith(".md")) {
    const url = request.nextUrl.clone()
    url.pathname = markdownDestination(pathname)
    return withVary(NextResponse.rewrite(url))
  }

  const chosen = preferredType(accept, PAGE_TYPES)

  if (chosen === "text/markdown") {
    const url = request.nextUrl.clone()
    url.pathname = markdownDestination(pathname)
    return withVary(NextResponse.rewrite(url))
  }

  if (chosen === null && accept && !isShadcnAccept(accept)) {
    return new Response(
      "Not Acceptable\n\nAvailable: text/html, text/markdown\n",
      {
        status: 406,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Vary: "Accept",
        },
      }
    )
  }

  return withVary(NextResponse.next())
}

export const config = {
  matcher: [
    "/((?!api/|_next/|_vercel/|r/|favicon\\.ico|icon|apple-icon|.*\\.(?:json|txt|xml|svg|ico|png)$).*)",
  ],
}
