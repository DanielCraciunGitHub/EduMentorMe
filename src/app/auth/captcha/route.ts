import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { token } = await request.json()

  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  )

  if (res.data.success) {
    return NextResponse.json({ status: 200 })
  } else {
    throw new Error("Failed Captcha")
  }
}
