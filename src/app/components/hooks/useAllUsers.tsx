import { getAllDataFromDb } from "@/app/api/actions"
import { User } from "@/types/types"
import { useEffect, useState } from "react"

export const useAllUsers = () => {
  const [allUsers, setAllUsers] = useState<User[]>([])

  useEffect(() => {
    const handleSetUsers = async () => {
      const allUsers = await getAllDataFromDb()
      if (allUsers) {
        const users = allUsers.map(
          (user) =>
            ({
              name: user.name,
              email: user.email,
              loginType: user.loginType,
              role: user.role,
            } as User)
        )
        setAllUsers(users)
      }
    }
    handleSetUsers()
  }, [])
  return { allUsers }
}
