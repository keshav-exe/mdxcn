import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { MARK_DARK } from "@/lib/og/mark"
import { REGISTRY_SCOPE, SITE_DESCRIPTION, SITE_HOST } from "@/lib/site"

export const OG_SIZE = { width: 1200, height: 630 }

const monoPath = join(
  process.cwd(),
  "lib/og/geist-mono-latin-400-normal.ttf"
)

function OgMark({ accent, ink, tile }: { accent: string; ink: string; tile: string }) {
  return (
    <svg height="280" viewBox="0 0 32 32" width="280">
      <rect fill={tile} height="32" width="32" />
      <rect
        fill="none"
        height="23"
        stroke={ink}
        strokeDasharray="2 2"
        strokeWidth="1"
        width="23"
        x="4.5"
        y="4.5"
      />
      <g fill={tile}>
        <rect height="5" width="5" x="2" y="2" />
        <rect height="5" width="5" x="25" y="2" />
        <rect height="5" width="5" x="2" y="25" />
        <rect height="5" width="5" x="25" y="25" />
      </g>
      <path
        d="M4.5 2v5M2 4.5h5M27.5 2v5M25 4.5h5M4.5 25v5M2 27.5h5M27.5 25v5M25 27.5h5"
        fill="none"
        stroke={ink}
        strokeWidth="1"
      />
      <rect fill={ink} height="6" width="4" x="8" y="18" />
      <rect fill={ink} height="11" width="4" x="14" y="13" />
      <rect fill={accent} height="16" width="4" x="20" y="8" />
    </svg>
  )
}

export async function openGraphImageResponse() {
  const font = await readFile(monoPath)
  const { tile, ink, accent } = MARK_DARK
  const muted = "#8a8a8a"
  const install = `pnpm dlx shadcn@latest add ${REGISTRY_SCOPE}/all`

  return new ImageResponse(
    (
      <div
        style={{
          background: tile,
          color: ink,
          display: "flex",
          flexDirection: "column",
          fontFamily: "Geist Mono",
          height: "100%",
          justifyContent: "space-between",
          padding: "48px 56px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: `1px dashed ${muted}`,
            inset: 24,
            pointerEvents: "none",
            position: "absolute",
          }}
        />
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 22,
            justifyContent: "space-between",
            letterSpacing: "0.08em",
          }}
        >
          <span style={{ color: muted }}>
            open source · mdx · comark · readme
          </span>
          <span style={{ color: muted }}>{SITE_HOST}</span>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flex: 1,
            gap: 48,
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 28,
              maxWidth: 720,
            }}
          >
            <div
              style={{
                color: accent,
                fontSize: 72,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              [ mdxcn ]
            </div>
            <div
              style={{
                color: ink,
                fontSize: 30,
                letterSpacing: "-0.02em",
                lineHeight: 1.45,
                maxWidth: 680,
              }}
            >
              {SITE_DESCRIPTION}
            </div>
          </div>
          <OgMark accent={accent} ink={ink} tile={tile} />
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 22,
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: accent, letterSpacing: "0.2em" }}>
            . - = # @ # = - .
          </span>
          <span style={{ color: muted }}>{install}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        {
          name: "Geist Mono",
          data: font,
          style: "normal",
          weight: 400,
        },
      ],
    }
  )
}
