"use client"

import dynamic from "next/dynamic"

const ShowcaseSection = dynamic(
  () =>
    import("@/components/site/showcase").then((mod) => ({
      default: mod.ShowcaseSection,
    })),
  { ssr: false }
)

const HomeGraphDemos = dynamic(
  () =>
    import("@/components/site/home-graph-demos").then((mod) => ({
      default: mod.HomeGraphDemos,
    })),
  { ssr: false }
)

function HomeClientSections() {
  return (
    <>
      <HomeGraphDemos />
      <ShowcaseSection />
    </>
  )
}

export { HomeClientSections }
