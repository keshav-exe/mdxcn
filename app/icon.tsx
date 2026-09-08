import { ImageResponse } from "next/og"

import { Mark, MARK_LIGHT } from "@/lib/og/mark"

export const runtime = "nodejs"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(<Mark palette={MARK_LIGHT} size={32} />, size)
}
