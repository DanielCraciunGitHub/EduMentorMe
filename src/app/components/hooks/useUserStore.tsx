import { create } from "zustand"

interface UserState {
  name: string | null
  authenticated: boolean | null
  isAdmin: boolean | null
  setUser: (
    name: string | null | undefined,
    authenticated: boolean,
    isAdmin: boolean | null | undefined
  ) => void
}

export const useUserStore = create<UserState>((set) => ({
  name: null,
  authenticated: null,
  isAdmin: null,
  setUser: (
    name: string | null | undefined,
    authenticated: boolean,
    isAdmin: boolean | null | undefined
  ) => set(() => ({ name, authenticated, isAdmin })),
}))
