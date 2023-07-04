"use client"

import { Database } from "@/types/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect } from "react"
import { useUserStore } from "@/app/components/hooks/useUserStore"

export function useUserListener() {
  const supabase = createClientComponentClient<Database>()
  const { setUser } = useUserStore()

  // A hook that acts as an event listener when defined in the root layout
  useEffect(() => {
    // populates the state on page load/reload with local values
    const init = async () => {
      const { data } = await supabase
        .from("users")
        .select("name, is_admin")
        .single()
      localStorage.setItem("local", JSON.stringify(data))
      if (data) {
        setUser(data?.name, true, data?.is_admin)
      } else {
        setUser("", false, null)
      }
    }
    init()
    // updates state and local storage depending on authentication level change
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        init()
      } else if (event === "SIGNED_OUT") {
        localStorage.removeItem("local")
        setUser("", false, null)
      }
    })
    // updates state and local storage based on db changes
    const channel = supabase
      .channel("realtime data")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          localStorage.setItem("local", JSON.stringify(payload.new))
          setUser(payload.new.name, true, payload.new.is_admin)
        }
      )
      .subscribe()
    // clears the hook on unmount
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])
}
