"use client"

import { FC, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"

import ReCAPTCHA from "react-google-recaptcha"
import axios, { formToJSON } from "axios"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  body: z.string().min(20, { message: "Enter at least 20 characters" }),
})

const page: FC = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isVerified, setIsverified] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  // once the captcha is submitted by the user, run this
  async function handleCaptchaSubmission(token: string | null) {
    // sends a post request to a defined api route with the token as
    // the payload to verify request
    await axios
      .post(`${location.origin}/auth/captcha`, { token })
      .then(() => {
        setIsverified(true)
      })
      .catch(() => {
        setIsverified(false)
      })
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // receiving feedback logic here
    recaptchaRef.current?.reset()
    form.reset({ email: "", body: "" })
    setIsverified(false)
  }

  return (
    <div className="grid grid-cols-2 w-full">
      <div>Contact us page content here...</div>
      <div className="flex w-full justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8 w-2/3"
          >
            <h1>Contact us</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts and suggestions here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ReCAPTCHA
              sitekey="6Ld5XQInAAAAACYww0-PP9RfeIXOxj2T4NarpXjj"
              ref={recaptchaRef}
              onChange={handleCaptchaSubmission}
            />
            <Button type="submit" disabled={!isVerified}>
              Submit feedback
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default page
