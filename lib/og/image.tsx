export const ogSize = { width: 1200, height: 630 }
export const ogType = "image/png"

const bg = "#1c1c1c"
const fg = "#d4d4d4"
const muted = "#858585"
const accent = "#7eadd4"
const frame = "#7a7a7a"

function OgFrame({
  title,
  description,
  kicker = "OPEN SOURCE",
}: {
  title: string
  description: string
  kicker?: string
}) {
  const caption = `[ ${title.toUpperCase()} ]`

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: bg,
        color: fg,
        padding: 48,
        fontFamily: "ui-monospace, monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: frame,
          fontSize: 22,
          marginBottom: 36,
        }}
      >
        <div>+</div>
        <div>+</div>
      </div>
      <div
        style={{
          display: "flex",
          color: muted,
          fontSize: 20,
          marginBottom: 20,
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          display: "flex",
          color: accent,
          fontSize: 56,
          marginBottom: 24,
        }}
      >
        {caption}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 28,
          width: 920,
        }}
      >
        {description}
      </div>
      <div style={{ display: "flex", flexGrow: 1, height: 24 }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          color: frame,
          fontSize: 22,
        }}
      >
        <div>+</div>
        <div
          style={{
            display: "flex",
            color: accent,
            fontSize: 26,
            letterSpacing: 6,
          }}
        >
          . - = # @ # = - .
        </div>
        <div
          style={{
            display: "flex",
            color: muted,
            fontSize: 22,
          }}
        >
          mdx-graphs.kshv.me
        </div>
        <div>+</div>
      </div>
    </div>
  )
}

export { OgFrame }
