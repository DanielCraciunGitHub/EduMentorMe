"use client"

import { Timer } from "@/components/Timer"

const page = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 600)

  return (
    <div className="flex-1 space-y-10">
      <Timer expiryTimestamp={time} />
    </div>
  )
}

export default page
