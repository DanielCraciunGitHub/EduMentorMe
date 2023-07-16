"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

export function Provider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <GoogleReCaptchaProvider reCaptchaKey="6LcygB4nAAAAACitnlPfPUIxZq6W5zpSSWvFi_vg">
        {children}
      </GoogleReCaptchaProvider>
    </NextThemesProvider>
  )
}
