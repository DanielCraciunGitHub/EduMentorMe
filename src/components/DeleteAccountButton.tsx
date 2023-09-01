"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import type { Database } from "@/types/supabase"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/dialog"
import { SpinnerButton } from "@/components/SpinnerButton"
import { sendError } from "@/app/_actions/discord"

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
      await supabase.auth.signOut()
      router.refresh()
      router.replace("/login")
    } catch (err: any) {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      await sendError({
        location: "DeleteAccountButton()",
        errMsg: err.message,
        userId: user?.id,
      })
      setIsError(true)
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete Account</AlertDialogTrigger>
      <AlertDialogContent className="border-muted-foreground/50">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <SpinnerButton
            state={isDeletingAccount}
            name="Delete Account"
            variant="destructive"
            type="submit"
            onClick={handleDeleteAccount}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
