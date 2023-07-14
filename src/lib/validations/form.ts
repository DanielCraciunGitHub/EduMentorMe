import * as z from "zod"

export const contactFormSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  feedback: z.string().min(20, { message: "Enter at least 20 characters" }),
})

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6, { message: "Invalid Password" }),
})
export const signUpFormSchema = z.object({
  name: z.string().min(1, { message: "Enter Your Name" }),
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6, { message: "Invalid Password" }),
})
export const searchFormSchema = z.object({
  level: z.string({}),
  subject: z.string({}),
  examboard: z.string({}),
})
