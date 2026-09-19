"use client"

import { useState } from "react"

import { Command, CopyBlock } from "@/components/docs/install"
import { SiteCorners, SiteMark, SiteRule } from "@/components/site/corners"
import { useOrigin } from "@/lib/docs/origin"
import {
  skillAgents,
  skillCopyFromRepo,
  skillCurl,
  skillPrompt,
  type SkillAgent,
} from "@/lib/docs/skill"
import { cn } from "@/lib/utils"

function SkillInstall() {
  const origin = useOrigin()
  const [agent, setAgent] = useState<SkillAgent>(skillAgents[0])

  return (
    <div className="flex flex-col gap-6">
      <div className="relative isolate -mx-4 sm:-mx-6 lg:-mx-8">
        <SiteRule className="top-0" />
        <SiteRule className="bottom-0" />
        <SiteRule className="top-1/2 -translate-y-1/2 max-sm:hidden" />
        <SiteRule
          className="left-1/2 -translate-x-1/2 max-sm:hidden"
          orientation="y"
        />
        <SiteCorners />
        <SiteMark className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 max-sm:hidden" />
        <SiteMark className="top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 max-sm:hidden" />
        <SiteMark className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-sm:hidden" />
        <SiteMark className="top-1/2 right-0 translate-x-1/2 -translate-y-1/2 max-sm:hidden" />
        <SiteMark className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 max-sm:hidden" />
        <div aria-label="agent" className="grid sm:grid-cols-2" role="tablist">
          {skillAgents.map((item, index) => {
            const selected = item.id === agent.id
            return (
              <button
                aria-selected={selected}
                className={cn(
                  "flex flex-col gap-1 px-4 py-4 text-left sm:px-6",
                  "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  selected && "bg-muted text-foreground hover:bg-muted",
                  index > 0 &&
                    "max-sm:border-t max-sm:border-dashed max-sm:border-site-rail"
                )}
                key={item.id}
                onClick={() => setAgent(item)}
                role="tab"
                type="button"
              >
                <span className="font-medium text-foreground">{item.name}</span>
                <span className="font-mono">{item.project}</span>
              </button>
            )
          })}
        </div>
      </div>

      <CopyBlock label="project" value={skillCurl(origin, agent.project)} />
      <CopyBlock label="personal" value={skillCurl(origin, agent.personal)} />
      <Command label="from the repo" value={skillCopyFromRepo(agent.project)} />
      <CopyBlock label="prompt" value={skillPrompt(origin, agent.project)} />
    </div>
  )
}

export { SkillInstall }
