import Link from "next/link"
import { SiteContainer } from "@/components/site/container"
import { Mark, MARK_THEME } from "@/lib/og/mark"
import { GITHUB_URL } from "@/lib/github"

function SiteFooter() {
  return (
    <footer>
      <SiteContainer
        className="flex flex-col gap-24"
        corners={["tl", "tr", "bl", "br"]}
      >
        <div className="flex flex-col gap-8">
          <Link
            aria-label="Homepage"
            className="flex items-center gap-2.5 text-foreground"
            href="/"
          >
            <Mark className="size-4" palette={MARK_THEME} size={16} />
            mdxcn
          </Link>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-6" role="list">
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href="/developers"
                  prefetch={false}
                >
                  developer api
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/agents"
                >
                  for agents
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/comark"
                >
                  comark
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/knap"
                >
                  knap
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/docs"
                >
                  docs
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/docs/examples"
                >
                  examples
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/docs/installation"
                >
                  installation
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/docs/skill"
                >
                  skill
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/about"
                >
                  about
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/contact"
                >
                  contact
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  href="/privacy"
                >
                  privacy
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
                  openapi
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href={GITHUB_URL}
                  rel="noreferrer"
                >
                  source
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href="https://github.com/keshav-exe/markdown-graphs/blob/main/LICENSE"
                  rel="noreferrer"
                >
                  MIT
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-pretty text-muted-foreground">
            {new Date().getFullYear()} mdxcn. mit license.
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
