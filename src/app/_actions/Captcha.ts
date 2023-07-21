"use server"

import { env } from "@/env.mjs"
import axios from "axios"

export async function verifyCaptchaAction(token: string) {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${token}`
  )
  if (res.data.score > 0.5) {
    return true
  } else {
    return false
  }
}
