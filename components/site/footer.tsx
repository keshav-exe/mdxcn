import Link from "next/link"

import { SiteContainer } from "@/components/site/container"
import { ProseMuted } from "@/components/site/prose"
import { Button } from "@/components/ui/button"
import { Mark, MARK_THEME } from "@/lib/og/mark"
import { GITHUB_URL } from "@/lib/github"
import { usd, CELL_USD } from "@/lib/sponsors"

function SiteFooter() {
  return (
    <footer>
      <SiteContainer
        className="flex flex-col gap-8"
        corners={["tl", "tr", "bl", "br"]}
      >
        <div className="flex flex-col gap-8">
          <Link
            aria-label="Homepage"
            className="flex items-center gap-2.5 text-foreground"
            href="/"
          >
            <Mark className="size-4" palette={MARK_THEME} size={16} />
            markdown graphs
          </Link>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-6" role="list">
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href="/developers"
                  prefetch={false}
                >
                  Developer API
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/agents"
                >
                  For agents
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/comark"
                >
                  Comark
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/docs"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/docs/examples"
                >
                  Examples
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/docs/installation"
                >
                  Installation
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/docs/skill"
                >
                  Skill
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/sponsor"
                >
                  Sponsor
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/privacy"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/llms.txt"
                >
                  llms.txt
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/openapi.json"
                >
                  OpenAPI
                </Link>
              </li>
              <li>
                <a
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href={GITHUB_URL}
                  rel="noreferrer"
                >
                  Source
                </a>
              </li>
              <li>
                <a
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href="https://x.com/kshvbgde"
                  rel="noreferrer"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href="https://github.com/keshav-exe/markdown-graphs/blob/main/LICENSE"
                  rel="noreferrer"
                >
                  MIT
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-4 border-t border-dashed border-graph-frame pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ProseMuted className="max-w-none">
            Four homepage cells. {usd(CELL_USD)} a cell per month.
          </ProseMuted>
          <Button
            nativeButton={false}
            render={<Link href="/sponsor" />}
            variant="outline"
          >
            Sponsor
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-pretty text-muted-foreground">
            {new Date().getFullYear()} Markdown Graphs. MIT license.
          </p>
          <p className="text-pretty text-muted-foreground">
            {" "}
            <Link
              className="text-foreground hover:text-foreground"
              href="https://x.com/kshvbgde"
            >
              @kshvbgde
            </Link>
          </p>
        </div>
      </SiteContainer>
    </footer>
  )
}

export { SiteFooter }
