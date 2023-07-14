"use client"

import { useUserStore } from "@/hooks/useUserStore"

const WelcomeUser = () => {
  const { user } = useUserStore()

  return <div className="text-3xl">Welcome, {user?.name}</div>
}

export default WelcomeUser
