"use client"

import { Geist, Geist_Mono } from "next/font/google"

import { Button } from "@/components/ui/button"
import { ErrorFrame } from "@/components/site/error-frame"
import { cn } from "@/lib/utils"

import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export default function GlobalError({
  error,
  reset,
  retry,
}: {
  error: Error & { digest?: string }
  reset?: () => void
  retry?: () => void
}) {
  const again = retry ?? reset

  return (
    <html
      className={cn(
        "dark antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans"
      )}
      lang="en"
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <ErrorFrame
          action={
            again ? (
              <Button onClick={again} type="button">
                Try again
              </Button>
            ) : null
          }
          body="The shell failed to render. Try again."
          code="ERROR"
          hint={error.digest}
          title="something broke"
        />
      </body>
    </html>
  )
}
