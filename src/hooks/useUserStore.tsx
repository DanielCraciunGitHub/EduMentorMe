import { create } from "zustand"

interface UserState {
  user: User
  setUser: (user: User) => void
}
type User = {
  name: string | null
  is_admin: boolean | null
} | null

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set(() => ({ user })),
}))
