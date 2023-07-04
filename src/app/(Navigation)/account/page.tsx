"use client"

import { Button } from "@/app/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { FC } from "react"

import type { Database } from "@/types/supabase"
import { useUserStore } from "@/app/components/hooks/useUserStore"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"

const page: FC = () => {
  const supabase = createClientComponentClient<Database>()

  const router = useRouter()
  const { user } = useUserStore()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  const handleDeleteAccount = async () => {
    await supabase.rpc("delete_user")
    router.refresh()
  }
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col items-center space-y-10">
        <div className="text-3xl">Welcome, {user?.name}</div>
        <Button type="submit" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
      <div className="flex justify-center">
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
      </div>
    </div>
  )
}

export default page
