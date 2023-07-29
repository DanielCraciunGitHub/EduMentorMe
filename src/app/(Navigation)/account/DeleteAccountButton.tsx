"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import type { Database } from "@/types/supabase"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SpinnerButton } from "@/components/SpinnerButton"

export default function DeleteAccountButton() {
  const supabase = createClientComponentClient<Database>()
  const [isDeletingAccount, setIsDeletingAccount] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (isError) {
      throw new Error("Account Deletion Failure | Please try again later.")
    }
  }, [isError])

  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true)
    try {
      await supabase.rpc("delete_user")
      router.refresh()
      router.replace("/login")
    } catch {
      setIsError(true)
    }
  }
  return (
    <Dialog>
      <DialogTrigger>Delete Account</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <SpinnerButton
          state={isDeletingAccount}
          name="Delete Account"
          variant="destructive"
          type="submit"
          onClick={handleDeleteAccount}
        />
      </DialogContent>
    </Dialog>
  )
}
