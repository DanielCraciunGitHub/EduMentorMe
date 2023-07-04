"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { useUserListener } from "./hooks/useUserListener"

export function Provider({ children, ...props }: ThemeProviderProps) {
  const listener = useUserListener() // temp solution
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
