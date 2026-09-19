"use client"

import { Button } from "@/components/ui/button"
import { ErrorFrame } from "@/components/site/error-frame"

export default function ErrorPage({
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
    <ErrorFrame
      action={
        again ? (
          <Button onClick={again} type="button">
            Try again
          </Button>
        ) : null
      }
      body="Something broke while rendering. Try again."
      code="ERROR"
      hint={error.digest}
      title="something broke"
    />
  )
}
