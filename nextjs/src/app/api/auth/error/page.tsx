"use client"

import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import Link from "next/link"
import { FC } from "react"

const page: FC = () => {
  return (
    <Alert
      variant="destructive"
      className="flex flex-col items-center space-y-10"
    >
      <AlertTitle className="text-3xl">OAUTH_CALLBACK_ERROR</AlertTitle>
      <AlertDescription className="text-2xl">
        Likely reasons for this error:
      </AlertDescription>
      <AlertDescription className="text-xl text-red-400">
        1. Attempting to re-authenticate when already logged in to an account
      </AlertDescription>
      <AlertDescription className="text-xl text-red-400">
        2. Login request timed out
      </AlertDescription>
      <AlertDescription className="text-2xl">
        Possible solutions:
      </AlertDescription>
      <AlertDescription className="text-xl text-green-400">
        1. Sign out from the{" "}
        <Link href="/account" className="text-blue-600 underline">
          Account
        </Link>{" "}
        page before signing in.
      </AlertDescription>
      <AlertDescription className="text-xl text-green-400">
        2. Re-attempt to login or sign in.
      </AlertDescription>
    </Alert>
  )
}

export default page
