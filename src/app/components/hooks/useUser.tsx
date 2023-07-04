"use client"

import { Database, Row } from "@/types/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"

export function useUser() {
  const supabase = createClientComponentClient<Database>()

  const [user, setUser] = useState<Row | null>(null)

  useEffect(() => {
    const handleSetUser = async () => {
      const { data } = await supabase.from("users").select().single()
      setUser(data)
    }
    handleSetUser()
  }, [])
  return { user }
}
