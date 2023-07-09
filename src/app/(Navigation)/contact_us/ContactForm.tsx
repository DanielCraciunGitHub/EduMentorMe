"use client"

import { useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Form } from "@/app/components/ui/form"

import ReCAPTCHA from "react-google-recaptcha"
import supabase from "@/app/lib/supabase"
import { verifyCaptcha } from "@/app/auth/ServerActions"

import InputField from "@/app/components/InputField"
import SuccessAlert from "@/app/components/Alert"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  feedback: z.string().min(20, { message: "Enter at least 20 characters" }),
})

const ContactForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isVerified, setIsverified] = useState<boolean>(false)
  const [isFeedbackSent, setIsFeedbackSent] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  // once the captcha is submitted by the user, run this
  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false))
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // send feedback to the server
    await supabase
      .from("feedback")
      .insert({ email: values.email, body: values.feedback })

    // reset the form state to allow for new submissions
    recaptchaRef.current?.reset()
    form.reset({ email: "", feedback: "" })
    setIsFeedbackSent(true)
    setIsverified(false)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 w-2/3 md:w-1/2 lg:w-1/3"
      >
        <h1>Contact us</h1>
        <InputField
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          control={form.control}
        />
        <InputField
          name="feedback"
          label="Feedback"
          type="textarea"
          placeholder="Share your thoughts and suggestions here..."
          control={form.control}
        />
        <ReCAPTCHA
          sitekey="6LcLLQcnAAAAAMfvKjD_lKxykZMYpvQh7-2Pi7hH"
          ref={recaptchaRef}
          onChange={handleCaptchaSubmission}
        />
        <Button type="submit" disabled={!isVerified}>
          Submit feedback
        </Button>
        {isFeedbackSent && (
          <SuccessAlert
            name="Success"
            description="We appreciate you taking your time to fill in this form, we will
              get back to you shortly."
          />
        )}
      </form>
    </Form>
  )
}

export default ContactForm
