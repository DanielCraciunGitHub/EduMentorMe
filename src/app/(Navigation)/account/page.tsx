"use client"

import { Button } from "@/app/components/ui/button"
import type { Database } from "@/types/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { FC } from "react"

const page: FC = () => {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <Button type="submit" onClick={handleSignOut}>
      Sign out
    </Button>
  )
}

export default page
