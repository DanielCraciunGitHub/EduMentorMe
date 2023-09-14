import { cookies } from "next/headers"
import { env } from "@/env.mjs"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { TRPCError } from "@trpc/server"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

import { Database } from "@/types/supabase"
import { formatDateYMD } from "@/lib/utils"
import { tutorFormSchema } from "@/lib/validations/form"

import { publicProcedure, router } from "../trpc"

export const dynamic = "force-dynamic"

export const bookingRouter = router({
  sendBookingDataToDatabase: publicProcedure
    .input(tutorFormSchema)
    .mutation(async ({ input }) => {
      const supabase = createRouteHandlerClient<Database>({ cookies })

      const { booking_date, booking_time, email, name, phone, surname } = input

      const { error } = await supabase.from("bookings").insert({
        name,
        surname,
        email,
        phone_number: phone,
        date: formatDateYMD(booking_date),
        time: booking_time,
      })

      if (error) {
        throw new TRPCError({
          code: "CONFLICT",
          message:
            "A booking has already been made under this email/phone number.",
          cause: error,
        })
      }
    }),
  sendBookingEmail: publicProcedure
    .input(tutorFormSchema)
    .mutation(async ({ input }) => {
      const { booking_date, booking_time, email, name, phone, surname } = input

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: env.NODEMAILER_EMAIL,
          pass: env.NODEMAILER_PASSWORD,
        },
      })
      const mailOptions: Mail.Options = {
        from: env.NODEMAILER_EMAIL,
        to: input.email,
        cc: env.NODEMAILER_EMAIL,
        subject: `EduMentorMe Booking Confirmation`,
        text: `
        Dear ${name} ${surname},
        
        Below are your reservation details:
        
        Booking Date: ${booking_date}
        Booking Time: ${booking_time}
        
        Contact Information:
        Email: ${email}
        Phone: ${phone}
        
        If you have any questions or need to make changes to your reservation, please don't hesitate to contact us.
        
        Best regards,
        
        Daniel C. 
        
        EduMentorMe™
        `,
      }

      try {
        await transport.sendMail(mailOptions)
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to make booking, please try again later.",
          cause: error,
        })
      }
    }),
})
