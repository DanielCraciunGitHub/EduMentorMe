"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import supabase from "@/lib/supabase"

import InputField from "@/components/InputField"
import SuccessAlert from "@/components/Alert"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { verifyCaptchaAction } from "@/app/_actions/Captcha"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  feedback: z.string().min(20, { message: "Enter at least 20 characters" }),
})

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [isFeedbackSent, setIsFeedbackSent] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!executeRecaptcha) {
      return
    }
    // captcha verification
    const token = await executeRecaptcha("onSubmit")
    const verified = await verifyCaptchaAction(token)

    if (verified) {
      // send feedback to the server
      await supabase
        .from("feedback")
        .insert({ email: values.email, body: values.feedback })

      // reset the form state to allow for new submissions
      form.reset({ email: "", feedback: "" })
      setIsFeedbackSent(true)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 w-2/3 md:w-1/2 lg:w-1/3"
      >
        <h1>Contact Us</h1>
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
        <div>
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
          <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
          apply.
        </div>
        <Button type="submit">Submit feedback</Button>
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
