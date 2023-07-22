"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { Database } from "@/types/supabase"
import { contactFormSchema } from "@/lib/validations/form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import SuccessAlert from "@/components/Alert"
import InputField from "@/components/InputField"
import { verifyCaptchaAction } from "@/app/_actions/Captcha"

type Inputs = z.infer<typeof contactFormSchema>

const GoogleNotice = () => {
  return (
    <div>
      This site is protected by reCAPTCHA and the Google{" "}
      <a
        href="https://policies.google.com/privacy"
        className="text-blue-600 underline"
      >
        Privacy Policy
      </a>{" "}
      and{" "}
      <a
        href="https://policies.google.com/terms"
        className="text-blue-600 underline"
      >
        Terms of Service
      </a>{" "}
      apply.
    </div>
  )
}

const ContactForm = () => {
  const supabase = createClientComponentClient<Database>()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [isFeedbackSent, setIsFeedbackSent] = useState<boolean>(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      feedback: "",
    },
  })

  async function onSubmit(values: Inputs) {
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
      form.reset()
      setIsFeedbackSent(true)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-2/3 flex-col justify-center space-y-8"
      >
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
        <GoogleNotice />
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
