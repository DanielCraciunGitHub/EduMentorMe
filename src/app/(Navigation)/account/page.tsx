"use client"

import { Button } from "@/app/components/ui/button"
import type { Database, Row } from "@/types/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"

const page: FC = () => {
  const supabase = createClientComponentClient<Database>()

  const router = useRouter()
  const [user, setUser] = useState<Row | null>(null)

  useEffect(() => {
    const handleSetUser = async () => {
      const { data } = await supabase.from("users").select().single()
      setUser(data)
    }
    handleSetUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  return (
    <div className="flex flex-col items-center">
      <div>{user?.email}</div>
      <div>
        <Button type="submit" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    </div>
  )
}

export default page
