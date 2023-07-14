"use client"

import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { type Database } from "@/types/supabase"
import { Button } from "@/components/ui/button"

const SignOutButton = () => {
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

export default SignOutButton
