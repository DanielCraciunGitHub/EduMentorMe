import { NextRequest, NextResponse } from "next/server"
import { env } from "@/env.mjs"

import { googleReCaptchaSchema } from "@/lib/validations/auth"

export async function POST(req: NextRequest) {
  const token = await req.json()

  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: "POST",
    }
  )
  if (res.ok) {
    const data = googleReCaptchaSchema.parse(await res.json())

    if (data.score > 0.6) {
      return NextResponse.json({ success: true })
    }
  }
  return NextResponse.json({ success: false })
}
