import { ImageResponse } from "next/og"

import { OgFrame, ogSize, ogType } from "@/lib/og/image"
import { COMARK_DESCRIPTION } from "@/lib/docs/comark"

export const runtime = "nodejs"
export const alt = "markdown graphs for comark"
export const size = ogSize
export const contentType = ogType

export default function Image() {
  return new ImageResponse(
    <OgFrame
      description={COMARK_DESCRIPTION}
      kicker="COMARK"
      title="Graphs inside a plain Markdown file"
    />,
    { ...size }
  )
}
