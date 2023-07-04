"use client"

import { Database } from "@/types/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect } from "react"

export function useUserListener() {
  const supabase = createClientComponentClient<Database>()
  // A hook that acts as an event listener when defined in the root layout
  useEffect(() => {
    // updates local storage depending on authentication level
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        const { data } = await supabase
          .from("users")
          .select("name, is_admin")
          .single()
        localStorage.setItem("local", JSON.stringify(data))
      } else if (event === "SIGNED_OUT") {
        localStorage.removeItem("local")
      }
    })
    // updates the local storage based on realtime updates to the db
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
        }
      )
      .subscribe()
    // clears the hook on unmount
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])
}
