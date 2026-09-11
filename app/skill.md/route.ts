import { readSkillFile } from "@/lib/docs/skill-files"
import { CACHE_DAY } from "@/lib/http/cache"

export const dynamic = "force-static"

export async function GET() {
  const body = await readSkillFile("SKILL.md")
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      ...CACHE_DAY,
    },
  })
}
