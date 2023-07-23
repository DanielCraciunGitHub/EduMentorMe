"use server"

import { env } from "@/env.mjs"

export async function verifyCaptchaAction(token: string) {
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: "POST",
    }
  )
  if (res.ok) {
    const data = await res.json()
    console.log(data)

    if (data.score > 0.6) {
      return true
    }
  }
  return false
}
