"use client"

import { removeAccountFromDb } from "@/app/api/actions"
import { useAllUsers } from "@/app/components/hooks/useAllUsers"
import { Button } from "@/app/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { FC } from "react"
import { User } from "@/types/types"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"

const page: FC = () => {
  const { data } = useSession()
  const { allUsers } = useAllUsers()

  const user = {
    name: data?.user.name,
    email: data?.user.email,
    role: data?.user.role,
  } as User

  // SERVER ACTION - Removes account from DB then removes session by signing user out
  const deleteAccount = async () => {
    await removeAccountFromDb(user.email)
    signOut()
  }
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col items-center space-y-10">
        <div className="text-4xl">Welcome, {user.name}</div>
        {user.role === "ADMIN" ? (
          <div className="space-y-5">
            <div className="text-3xl flex justify-center">Users Data</div>
            {allUsers ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Login Type</TableHead>
                    <TableHead className="text-right">Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allUsers.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.loginType}</TableCell>
                      <TableCell>{user.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : null}
          </div>
        ) : null}
        <Button onClick={() => signOut()}>Sign out</Button>
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
            <Button variant="destructive" onClick={() => deleteAccount()}>
              Delete Account
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default page
