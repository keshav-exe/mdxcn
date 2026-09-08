import { ImageResponse } from "next/og"

import { Mark, MARK_DARK } from "@/lib/og/mark"

export const runtime = "nodejs"
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(<Mark palette={MARK_DARK} size={180} />, size)
}
