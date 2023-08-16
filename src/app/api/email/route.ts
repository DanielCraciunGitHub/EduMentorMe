import { NextResponse, type NextRequest } from "next/server"
import { env } from "@/env.mjs"
import { Logger } from "@/Logger"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

import { contactFormSchema } from "@/lib/validations/form"

export async function POST(request: NextRequest) {
  try {
    const { email, feedback } = contactFormSchema.parse(await request.json())

    Logger.debug(email, feedback)

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
  } catch (err: unknown) {
    Logger.debug(err)
    throw new Error("failed to send email!")
  }
}
