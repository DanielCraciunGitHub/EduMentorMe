"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Loader2 } from "lucide-react"

import { type Database } from "@/types/supabase"
import { Button } from "@/components/ui/button"

const SignOutButton = () => {
  const supabase = createClientComponentClient<Database>()
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false)

  const router = useRouter()
  const handleSignOut = async () => {
    setIsSigningOut(true)

    await supabase.auth.signOut()
    router.refresh()
    router.push("/login")
  }
  return (
    <Button type="submit" onClick={handleSignOut}>
      {isSigningOut ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <span>Sign out</span>
      )}
    </Button>
  )
}

export default SignOutButton
