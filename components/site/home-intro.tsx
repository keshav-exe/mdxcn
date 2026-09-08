import { SiteContainer } from "@/components/site/container"
import {
  InlineCode,
  ProseMuted,
  ProseP,
  proseBodyClass,
  TextLink,
} from "@/components/site/prose"
import {
  HOME_CLI,
  HOME_INSTALL,
  HOME_READ,
  HOME_WHAT,
} from "@/lib/agent/copy"
import { COMARK_URL } from "@/lib/docs/comark"
import { GITHUB_URL } from "@/lib/github"
import { cn } from "@/lib/utils"

function HomeIntro() {
  return (
    <section>
      <SiteContainer className="flex flex-col gap-8">
        <article className={cn("flex min-w-0 flex-col gap-6", proseBodyClass)}>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-balance">
              What this is
            </h2>
            <ProseP>{HOME_WHAT}</ProseP>
            <ProseP>
              When an agent is writing a refactor, an incident, a tradeoff, or a
              PR, it can put at most two graphs next to the prose. React files
              get JSX; a <TextLink href={COMARK_URL}>Comark</TextLink> app gets a{" "}
              <InlineCode>::graph-*</InlineCode> block with YAML props; a README,
              GitHub comment, Linear note, or any plain Markdown that cannot run
              a renderer gets the official fenced ASCII from{" "}
              <TextLink href="/llms.txt">/llms.txt</TextLink>. It should not
              invent SVG, Mermaid, or homemade ASCII.
            </ProseP>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold tracking-tight">Write</h3>
            <ProseP>
              Install the skill into the folder the agent already reads, ask for
              a write-up, and let the chooser pick the graph. Copy props from the{" "}
              <TextLink href="/docs">docs</TextLink> or a recipe, then swap the
              labels.
            </ProseP>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold tracking-tight">Read</h3>
            <ProseP>{HOME_READ}</ProseP>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold tracking-tight">API</h3>
            <ProseP>
              The JSON catalog is at{" "}
              <TextLink href="/api/v1/components">/api/v1/components</TextLink>,
              OpenAPI at{" "}
              <TextLink href="/openapi.json">/openapi.json</TextLink>, and the
              developer portal at{" "}
              <TextLink href="/developers">/developers</TextLink>. Every API
              response includes RateLimit-* headers (1000 GET requests per hour).
            </ProseP>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold tracking-tight">CLI</h3>
            <ProseP>{HOME_CLI}</ProseP>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold tracking-tight">Install</h3>
            <pre className="min-w-0 overflow-x-auto rounded-sm bg-muted/50 p-4 font-mono text-sm text-foreground">
              <code>{HOME_INSTALL}</code>
            </pre>
            <ProseMuted>
              Then copy the skill from{" "}
              <TextLink href="/skill.md">/skill.md</TextLink>, or fetch{" "}
              <TextLink href="/llms.txt">/llms.txt</TextLink> if the skill is not
              installed. Catalog: <TextLink href="/docs">/docs</TextLink>. Comark
              wiring: <TextLink href="/docs/comark">/docs/comark</TextLink>.
              OpenAPI: <TextLink href="/openapi.json">/openapi.json</TextLink>.
            </ProseMuted>
            <ProseMuted>
              Canonical site: mdx-graphs.kshv.me. GitHub:{" "}
              <TextLink href={GITHUB_URL}>keshav-exe/markdown-graphs</TextLink>.
            </ProseMuted>
          </div>
        </article>
      </SiteContainer>
    </section>
  )
}

export { HomeIntro }
