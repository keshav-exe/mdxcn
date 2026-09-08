import { ImageResponse } from "next/og"

import { OgFrame, ogSize, ogType } from "@/lib/og/image"
import { DOCS_DESCRIPTION } from "@/lib/site"

export const runtime = "nodejs"
export const alt = "markdown graphs docs"
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return new ImageResponse(
    <OgFrame
      description={DOCS_DESCRIPTION}
      kicker="DOCS"
      title="Introduction"
    />,
    { ...size }
  )
}
