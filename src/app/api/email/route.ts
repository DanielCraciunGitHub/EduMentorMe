import { NextRequest, NextResponse } from "next/server"
import { env } from "@/env.mjs"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

import { contactFormSchema } from "@/lib/validations/form"
import { sendError } from "@/app/_actions/discord"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "60 m"),
})

export async function POST(request: NextRequest) {
  try {
    const { email, feedback } = contactFormSchema.parse(await request.json())

    const ip = request.headers.get("x-forwarded-for") ?? ""
    const { success } = await ratelimit.limit(ip)

    if (!success) {
      return new NextResponse("You can only send feedback once every hour.", {
        status: 429,
      })
    }

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.NODEMAILER_EMAIL,
        pass: env.NODEMAILER_PASSWORD,
      },
    })
    const mailOptions: Mail.Options = {
      from: env.NODEMAILER_EMAIL,
      to: env.NODEMAILER_EMAIL,
      subject: `Message from (${email})`,
      text: feedback,
    }

    await transport.sendMail(mailOptions)

    return NextResponse.json({})
  } catch (err: any) {
    await sendError({ location: "api/email", errMsg: err.message })
    throw new Error("Failed to send email!")
  }
}
