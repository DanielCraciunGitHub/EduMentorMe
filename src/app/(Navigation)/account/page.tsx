"use client"

import { FC } from "react"

import { useUserStore } from "@/app/components/hooks/useUserStore"

import DeleteAccountButton from "./DeleteAccountButton"
import SignOutButton from "./SignOutButton"

const page: FC = () => {
  const { user } = useUserStore()

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col items-center space-y-10">
        <div className="text-3xl">Welcome, {user?.name}</div>
        <SignOutButton />
      </div>
      <div className="flex justify-center">
        <DeleteAccountButton />
      </div>
    </div>
  )
}

export default page
