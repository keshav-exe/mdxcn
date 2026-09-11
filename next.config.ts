import type { NextConfig } from "next"

const REGISTRY_CACHE = [
  {
    key: "Cache-Control",
    value:
      "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
  },
  {
    key: "CDN-Cache-Control",
    value: "public, s-maxage=86400, stale-while-revalidate=604800",
  },
] as const

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "markdown-graphs.vercel.app" }],
        destination: "https://mdx-graphs.kshv.me/:path*",
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [
            {
              type: "header",
              key: "accept",
              value: "(.*)application/vnd\\.shadcn\\.v1\\+json(.*)",
            },
          ],
          destination: "/r/registry.json",
        },
        {
          source: "/",
          has: [
            {
              type: "header",
              key: "user-agent",
              value: "shadcn",
            },
          ],
          destination: "/r/registry.json",
        },
      ],
    }
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [{ key: "Vary", value: "Accept, User-Agent" }],
      },
      {
        source: "/r/:path*",
        headers: [...REGISTRY_CACHE],
      },
    ]
  },
}

export default nextConfig
