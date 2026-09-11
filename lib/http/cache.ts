export const CACHE_SHORT = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
  "CDN-Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
} as const

export const CACHE_CATALOG = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
  "CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
} as const

export const CACHE_DAY = {
  "Cache-Control":
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
  "CDN-Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
} as const
