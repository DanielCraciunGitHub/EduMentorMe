import { setTimeout } from "timers/promises"

import { getCurrentUser } from "@/lib/getCurrentUser"

const WelcomeUser = async () => {
  const user = await getCurrentUser()
  await setTimeout(500)

  return <div className="text-3xl">Welcome, {user?.name ?? "User"}</div>
}

export default WelcomeUser
