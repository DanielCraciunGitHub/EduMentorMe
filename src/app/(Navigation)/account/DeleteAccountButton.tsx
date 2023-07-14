"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { type Database } from "@/types/supabase"

export default function DeleteAccountButton() {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const handleDeleteAccount = async () => {
    // runs custom made postgres function
    await supabase.rpc("delete_user")
    await supabase.auth.signOut()
    router.refresh()
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
        <Button
          variant="destructive"
          onClick={handleDeleteAccount}
          type="submit"
        >
          Delete Account
        </Button>
      </DialogContent>
    </Dialog>
  )
}
