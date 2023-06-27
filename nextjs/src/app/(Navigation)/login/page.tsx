"use client"

import { FC } from "react"
import { signIn, useSession, signOut } from "next-auth/react"
import { Button } from "@/app/components/ui/button"
import Image from "next/image"

const page: FC = () => {
  const { data: session, status } = useSession()
  if (status === "authenticated") {
    return (
      <div>
        <Image
          src={session.user?.image as string}
          alt={session.user?.name as string}
          width={40}
          height={40}
          className="rounded"
        />
        <Button onClick={() => signOut()}>Sign Out</Button>
        <div>{`I have this information about you: ${session.expires}`}</div>
      </div>
    )
  }
  return (
    <div className="flex flex-grow items-center justify-center">
      <Button type="submit" variant="outline" onClick={() => signIn("google")}>
        Sign in with Google
      </Button>
    </div>
  )
}

export default page
