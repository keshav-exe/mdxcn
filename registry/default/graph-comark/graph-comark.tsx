"use client"

import type { ComponentType } from "react"

import {
  GRAPH_ADAPTERS,
  type GraphTag,
} from "@/registry/default/graph-comark/adapters"
import { fromMarkdown } from "@/registry/default/graph-comark/from-markdown"
import { GraphRow } from "@/registry/default/graph-comark/layout"
import { GraphActivity } from "@/registry/default/graph-activity/graph-activity"
import { GraphBars } from "@/registry/default/graph-bars/graph-bars"
import { GraphBullet } from "@/registry/default/graph-bullet/graph-bullet"
import { GraphCalendar } from "@/registry/default/graph-calendar/graph-calendar"
import { GraphCells } from "@/registry/default/graph-cells/graph-cells"
import { GraphCheck } from "@/registry/default/graph-check/graph-check"
import { GraphCompare } from "@/registry/default/graph-compare/graph-compare"
import { GraphCountdown } from "@/registry/default/graph-countdown/graph-countdown"
import { GraphDiff } from "@/registry/default/graph-diff/graph-diff"
import { GraphFlow } from "@/registry/default/graph-flow/graph-flow"
import { GraphFunnel } from "@/registry/default/graph-funnel/graph-funnel"
import { GraphGantt } from "@/registry/default/graph-gantt/graph-gantt"
import { GraphHeatmap } from "@/registry/default/graph-heatmap/graph-heatmap"
import { GraphInvoice } from "@/registry/default/graph-invoice/graph-invoice"
import { GraphKpi } from "@/registry/default/graph-kpi/graph-kpi"
import { GraphMatrix } from "@/registry/default/graph-matrix/graph-matrix"
import { GraphMeter } from "@/registry/default/graph-meter/graph-meter"
import { GraphPlot } from "@/registry/default/graph-plot/graph-plot"
import { GraphRank } from "@/registry/default/graph-rank/graph-rank"
import { GraphSheet } from "@/registry/default/graph-sheet/graph-sheet"
import { GraphSlope } from "@/registry/default/graph-slope/graph-slope"
import { GraphSpark } from "@/registry/default/graph-spark/graph-spark"
import { GraphSpec } from "@/registry/default/graph-spec/graph-spec"
import { GraphStack } from "@/registry/default/graph-stack/graph-stack"
import { GraphStat } from "@/registry/default/graph-stat/graph-stat"
import { GraphTable } from "@/registry/default/graph-table/graph-table"
import { GraphTimeline } from "@/registry/default/graph-timeline/graph-timeline"
import { GraphTimer } from "@/registry/default/graph-timer/graph-timer"
import { GraphTree } from "@/registry/default/graph-tree/graph-tree"
import { GraphUptime } from "@/registry/default/graph-uptime/graph-uptime"
import { GraphWaffle } from "@/registry/default/graph-waffle/graph-waffle"
import { GraphWaterfall } from "@/registry/default/graph-waterfall/graph-waterfall"

type AnyGraph = ComponentType<Record<string, unknown>>

export type GraphComponentMap = {
  [K in GraphTag]?: AnyGraph
}

/** Wrap the graphs you installed. Pass the result to Comark's `components` prop. */
export function createGraphComponents(installed: GraphComponentMap) {
  const out: Record<string, AnyGraph> = {
    row: fromMarkdown(GraphRow, GRAPH_ADAPTERS.row),
  }

  for (const [tag, Component] of Object.entries(installed)) {
    if (!Component) continue
    const adapter = GRAPH_ADAPTERS[tag as GraphTag]
    out[tag] = fromMarkdown(Component as AnyGraph, adapter)
  }

  return out
}

/** Full tag map after `shadcn add …/r/all.json`. Same shape as the demo repo. */
export const graphComponents = createGraphComponents({
  "graph-table": GraphTable,
  "graph-sheet": GraphSheet,
  "graph-invoice": GraphInvoice,
  "graph-spec": GraphSpec,
  "graph-matrix": GraphMatrix,
  "graph-compare": GraphCompare,
  "graph-diff": GraphDiff,
  "graph-stat": GraphStat,
  "graph-kpi": GraphKpi,
  "graph-spark": GraphSpark,
  "graph-plot": GraphPlot,
  "graph-bars": GraphBars,
  "graph-slope": GraphSlope,
  "graph-cells": GraphCells,
  "graph-meter": GraphMeter,
  "graph-waffle": GraphWaffle,
  "graph-stack": GraphStack,
  "graph-funnel": GraphFunnel,
  "graph-waterfall": GraphWaterfall,
  "graph-rank": GraphRank,
  "graph-bullet": GraphBullet,
  "graph-heatmap": GraphHeatmap,
  "graph-activity": GraphActivity,
  "graph-calendar": GraphCalendar,
  "graph-uptime": GraphUptime,
  "graph-flow": GraphFlow,
  "graph-tree": GraphTree,
  "graph-timeline": GraphTimeline,
  "graph-gantt": GraphGantt,
  "graph-check": GraphCheck,
  "graph-timer": GraphTimer,
  "graph-countdown": GraphCountdown,
} as GraphComponentMap)

export const graphTags = Object.keys(graphComponents)
