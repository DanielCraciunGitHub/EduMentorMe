import { NextRequest, NextResponse } from "next/server"
import { env } from "@/env.mjs"

import { googleReCaptchaSchema } from "@/lib/validations/auth"
import { sendError } from "@/app/_actions/discord"

export async function POST(req: NextRequest) {
  try {
    const token: string = await req.json()

    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      {
        method: "POST",
      }
    )

    const data = googleReCaptchaSchema.parse(await res.json())

    if (data.score > 0.6) {
      return NextResponse.json({})
    }
    throw new Error("ReCaptcha verification failed")
  } catch (err: any) {
    await sendError({ location: "api/auth/captcha", errMsg: err.message })

    throw new Error("Internal server error")
  }
}
