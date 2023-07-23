"use client"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex justify-center space-y-10 p-4 text-4xl">
        Error 😔
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 text-xl">
        {error.message} <br />
        <Button onClick={() => reset()}>Account</Button>
      </div>
    </div>
  )
}
