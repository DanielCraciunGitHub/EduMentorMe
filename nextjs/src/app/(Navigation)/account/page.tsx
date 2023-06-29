"use client"

import { Button } from "@/app/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { FC } from "react"

const page: FC = () => {
  const session = useSession()

  return (
    <div className="flex flex-col items-center">
      {session.data?.user.role === "ADMIN" ? (
        <div>ADMIN</div>
      ) : (
        <div>USER {session.data?.user.email}</div>
      )}
      <Button variant="destructive" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  )
}

export default page
