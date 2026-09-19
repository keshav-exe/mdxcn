"use client"

import { Children, isValidElement, type ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

import {
  childItems,
  defineItem,
  Graph,
  GraphBody,
  isHost,
  itemText,
  listItems,
  splitDash,
  textOf,
} from "@/registry/default/graph-frame/graph-frame"
import {
  fadeUp,
  staggerList,
  toneClass,
  type GraphPalette,
} from "@/registry/default/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type CheckItem = {
  /** Falls back to the child text: `<Task done>freeze tokens</Task>`. */
  label?: string
  done?: boolean
  note?: string
}

type GraphCheckProps = {
  title: string
  /** Data form. Or write `<Task />` children. */
  items?: CheckItem[]
  children?: ReactNode
  palette?: GraphPalette
  corner?: string
  className?: string
}

/** `<Task done>ship registry json</Task>` inside `<GraphCheck>`. */
const Task = defineItem<CheckItem>("Task")

function checksOf(children: ReactNode): CheckItem[] {
  const listed = listItems(children).map((item) => {
    const content = (item.props as { children?: ReactNode }).children
    const box = Children.toArray(content).find(
      (child) =>
        isValidElement(child) &&
        isHost(child, "input") &&
        (child.props as { type?: string }).type === "checkbox"
    )
    const text = itemText(item)
    const marked = /^\s*\[x\]/i.test(text)
    const done =
      marked ||
      (isValidElement(box) &&
        Boolean((box.props as { checked?: boolean }).checked))
    const label = text.replace(/^\s*\[[xX ]\]\s*/, "")
    const { label: name, rest } = splitDash(label)
    return { label: name, done, note: rest || undefined }
  })
  if (listed.length > 0) {
    return listed
  }

  return childItems(children, Task).map((entry) => ({
    ...entry,
    label: entry.label ?? textOf(entry.children),
  }))
}

function GraphCheck({
  title,
  items: itemsProp,
  children,
  palette,
  corner,
  className,
}: GraphCheckProps) {
  const reduce = useReducedMotion()
  const item = fadeUp(reduce)
  const list = staggerList(reduce, 0.05)
  const items = (itemsProp ?? checksOf(children)).map((entry) => ({
    ...entry,
    label: entry.label ?? "",
  }))

  return (
    <Graph title={title} className={className} corner={corner}>
      <GraphBody>
        <motion.ul
          className="flex flex-col gap-2"
          initial={reduce ? false : "hidden"}
          role="list"
          variants={list}
          viewport={{ once: true, amount: 0.4 }}
          whileInView="show"
        >
          {items.map((entry) => {
            const done = Boolean(entry.done)
            const mark = done ? "[x]" : "[ ]"

            return (
              <motion.li
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3"
                key={entry.label}
                variants={item}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "select-none",
                    done ? toneClass(palette, "primary") : "text-graph-muted"
                  )}
                >
                  {mark}
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span
                    className={done ? "text-foreground" : "text-graph-muted"}
                  >
                    {entry.label}
                  </span>
                  {entry.note ? (
                    <span className="text-graph-muted">{entry.note}</span>
                  ) : null}
                </span>
              </motion.li>
            )
          })}
        </motion.ul>
        <span className="sr-only">
          {items.filter((entry) => entry.done).length} of {items.length} done
        </span>
      </GraphBody>
    </Graph>
  )
}

export { GraphCheck, Task }
export type { CheckItem, GraphCheckProps }
