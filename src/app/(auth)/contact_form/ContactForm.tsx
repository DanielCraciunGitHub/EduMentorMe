"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { contactFormSchema } from "@/lib/validations/form"
import { Form } from "@/components/ui/form"
import InputField from "@/components/InputField"
import { SpinnerButton } from "@/components/SpinnerButton"

type Inputs = z.infer<typeof contactFormSchema>

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { executeRecaptcha } = useGoogleReCaptcha()

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

    const { toast } = await import("@/hooks/use-toast")
    setIsSubmitting(true)

    try {
      const token = await executeRecaptcha()

      const captchaRes = await fetch("/api/auth/captcha", {
        method: "POST",
        body: JSON.stringify(token),
      })

      if (!captchaRes.ok) {
        throw new Error("ReCaptcha verification failed")
      }

      const emailRes = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(values),
      })

      if (!emailRes.ok) {
        throw new Error("Failed to send email")
      }

      toast({
        title: "Success",
        description:
          "We appreciate you taking your time to fill in this form, we will get back to you shortly.",
        variant: "constructive",
      })
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong! Please try again later.",
        variant: "destructive",
      })
    } finally {
      form.reset()
      setIsSubmitting(false)
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
        <SpinnerButton
          name="Submit Feedback"
          state={isSubmitting}
          type="submit"
        />
      </form>
    </Form>
  )
}

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

export default ContactForm
