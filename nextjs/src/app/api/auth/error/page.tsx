"use client"

import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { FC } from "react"

const page: FC = () => {
  const { data } = useSession()
  return (
    <Alert
      variant="destructive"
      className="flex flex-col items-center space-y-10"
    >
      <AlertTitle className="text-3xl">OAUTH_CALLBACK_ERROR</AlertTitle>
      <AlertDescription className="text-xl">
        Likely reason for this error:
      </AlertDescription>
      <AlertDescription className="text-xl text-red-400">
        Attempting to re-authenticate when already logged in to an account
      </AlertDescription>
      <AlertDescription className="text-xl">
        You are currently signed in as <b>{data?.user.email}</b>.
      </AlertDescription>
      <AlertDescription className="text-xl">
        Make sure to sign out through the{" "}
        <Link href="/account" className="text-blue-600 underline">
          Account
        </Link>{" "}
        page before logging in.
      </AlertDescription>
    </Alert>
  )
}

export default page
