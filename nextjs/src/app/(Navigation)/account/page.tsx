"use client"

import { Button } from "@/app/components/ui/button"
import { signOut } from "next-auth/react"
import { FC } from "react"

const page: FC = () => {
  return (
    <div>
      <Button variant="destructive" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  )
}

export default page
