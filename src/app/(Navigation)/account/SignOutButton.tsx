"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { SpinnerButton } from "@/components/SpinnerButton"
import { sendError } from "@/app/_actions/discord"

const SignOutButton = () => {
  const supabase = createClientComponentClient()
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    if (isError) {
      throw new Error("Sign Out Failure | Please try again later.")
    }
  }, [isError])

  const router = useRouter()
  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await supabase.auth.signOut()
      router.refresh()
      router.push("/login")
    } catch (err: any) {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      await sendError({
        location: "SignOutButton()",
        errMsg: err.message,
        userId: user?.id,
      })
      setIsError(true)
    }
  }
  return (
    <SpinnerButton
      name="Sign out"
      state={isSigningOut}
      onClick={handleSignOut}
      type="submit"
    />
  )
}

export default SignOutButton
