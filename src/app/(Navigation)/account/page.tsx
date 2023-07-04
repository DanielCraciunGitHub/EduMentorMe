"use client"

import { Button } from "@/app/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { FC } from "react"

import type { Database } from "@/types/supabase"
import { useUser } from "@/app/components/hooks/useUser"

const page: FC = () => {
  const supabase = createClientComponentClient<Database>()

  const router = useRouter()
  const { name, isAdmin } = useUser()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  return (
    <div className="flex flex-col items-center">
      <div>{name}</div>
      <div>
        <Button type="submit" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    </div>
  )
}

export default page
