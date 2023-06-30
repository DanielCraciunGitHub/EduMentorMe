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
      <AlertTitle className="text-3xl">ERROR</AlertTitle>
      <AlertDescription className="text-2xl">Actions to take:</AlertDescription>
      <AlertDescription className="text-xl text-green-400">
        1. Sign out from the{" "}
        <Link href="/account" className="text-blue-600 underline">
          Account
        </Link>{" "}
        page before signing in with another account.
      </AlertDescription>
      <AlertDescription className="text-xl text-green-400">
        2. Re-attempt to login or sign up.
      </AlertDescription>
    </Alert>
  )
}

export default page
