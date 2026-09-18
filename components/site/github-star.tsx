"use client"

import { GithubIcon } from "../icons/github"
import { GITHUB_URL } from "@/lib/github"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "../ui/button"

function GithubStarLink({
  stars,
  className,
}: {
  stars: number | null
  className?: string
}) {
  const count =
    stars === null ? null : new Intl.NumberFormat("en-US").format(stars)

  return (
    <Link
      aria-label={count ? `Star on GitHub, ${count} stars` : "Star on GitHub"}
      href={GITHUB_URL}
      rel="noreferrer"
      className="flex items-center gap-2"
    >
      <Button variant="ghost" className={cn("flex shrink-0 items-center gap-2 text-muted-foreground group hover:text-foreground", "transition-all duration-300", className)}>
        <GithubIcon className="size-4 shrink-0 group-hover:text-yellow-500" />
        {count &&
          <span className="flex items-center gap-1 group-hover:text-yellow-500 tabular-nums">
            [{count}]
          </span>
        }
      </Button>
    </Link>
  )
}

export { GithubStarLink }
