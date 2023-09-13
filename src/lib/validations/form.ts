import * as z from "zod"

export const contactFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid Email" })
    .max(320, { message: "Invalid Email" }),
  feedback: z
    .string()
    .min(20, { message: "Enter at least 20 characters." })
    .max(1200, { message: "Exceeded limit of 1200 characters." }),
})

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid Email" })
    .max(320, { message: "Invalid Email" }),
  password: z.string().min(6, { message: "Invalid Password" }),
})
export const signUpFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Enter Your Name" })
    .max(500, { message: "Please Enter A Shorter Name." }),
  email: z
    .string()
    .email({ message: "Invalid Email" })
    .max(320, { message: "Invalid Email" }),
  password: z.string().min(6, { message: "Invalid Password" }),
})
export const searchFormSchema = z.object({
  level: z.string(),
  subject: z.string(),
  examBoard: z.string(),
})
export const tutorFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Enter Your Name." })
    .max(50, { message: "Please Enter A Shorter Name." }),
  surname: z
    .string()
    .min(1, { message: "Enter Your Surname." })
    .max(50, { message: "Please Enter A Shorter Surname." }),
  email: z.string().email({ message: "Invalid Email." }),
  phone: z.string().regex(/^(?:\+44|0)[1-9]\d{8,12}$/, {
    message: "Invalid UK Phone Number.",
  }),
  booking_date: z.date({
    required_error: "A Booking Date Is Required.",
    coerce: true,
  }),
  booking_time: z.string(),
})
