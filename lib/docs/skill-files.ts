import { readFile } from "node:fs/promises"
import { join } from "node:path"

export async function readSkillFile(name: "SKILL.md" | "recipes.md") {
  return readFile(join(process.cwd(), "skills/mdxcn", name), "utf8")
}
