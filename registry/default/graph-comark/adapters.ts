import type { NumericProps } from "@/registry/default/graph-comark/coerce"

/**
 * Per-tag hints for Markdown props. `numeric` matches catalog rows whose type
 * is `number` or `0 | 1`. `required` is the data the graph cannot render
 * without — used while a stream is still missing its YAML fence.
 */
export type GraphAdapter = {
  numeric?: NumericProps
  required?: readonly string[]
}

export const GRAPH_ADAPTERS = {
  "graph-table": { required: ["headers", "rows"] },
  "graph-sheet": { required: ["headers", "sections"] },
  "graph-invoice": { required: ["items"] },
  "graph-spec": { required: ["rows"] },
  "graph-matrix": { required: ["columns", "rows"] },
  "graph-compare": { required: ["columns", "rows"] },
  "graph-diff": { required: ["rows"] },
  "graph-stat": { required: ["items"] },
  "graph-kpi": { required: ["value", "label", "data"] },
  "graph-spark": { required: ["data"] },
  "graph-plot": {
    numeric: ["height", "progress"],
    required: ["data"],
  },
  "graph-bars": { required: ["from", "to"] },
  "graph-slope": { required: ["fromLabel", "toLabel", "items"] },
  "graph-cells": { required: ["items"] },
  "graph-meter": {
    numeric: ["value", "ticks"],
    required: ["value"],
  },
  "graph-waffle": {
    numeric: ["value", "cells", "columns"],
    required: ["value"],
  },
  "graph-stack": { numeric: ["ticks"], required: ["rows"] },
  "graph-funnel": { numeric: ["ticks"], required: ["steps"] },
  "graph-waterfall": { numeric: ["ticks"], required: ["items"] },
  "graph-rank": { numeric: ["max", "ticks"], required: ["items"] },
  "graph-bullet": { numeric: ["ticks"], required: ["items"] },
  "graph-heatmap": { numeric: ["max"], required: ["columns", "rows"] },
  "graph-activity": {
    numeric: ["max", "weekStartsOn"],
    required: ["days"],
  },
  "graph-calendar": {
    numeric: ["year", "month", "today", "weekStartsOn"],
    required: ["year", "month"],
  },
  "graph-uptime": { numeric: ["columns"], required: ["days"] },
  "graph-flow": { required: ["rows"] },
  "graph-tree": { required: ["nodes"] },
  "graph-timeline": { required: ["events"] },
  "graph-gantt": {
    numeric: ["columns", "progress"],
    required: ["items"],
  },
  "graph-check": { required: ["items"] },
  "graph-timer": {},
  "graph-countdown": { required: ["to"] },
  row: { numeric: ["cols"] },
} as const satisfies Record<string, GraphAdapter>

export type GraphTag = Exclude<keyof typeof GRAPH_ADAPTERS, "row">
