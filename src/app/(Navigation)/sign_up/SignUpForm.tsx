"use client"

import { useAuthState } from "@/app/components/hooks/useAuthState"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/app/components/ui/button"
import { Form } from "@/app/components/ui/form"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import InputField from "@/app/components/InputField"
import Alert from "@/app/components/Alert"

import type { Database } from "@/types/supabase"

const formSchema = z.object({
  name: z.string().min(1, { message: "Enter Your Name" }),
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6, { message: "Invalid Password" }),
})

const SignUpForm = () => {
  const supabase = createClientComponentClient<Database>()
  const { isError, setIsError, isEmailVerify, setIsEmailVerify } =
    useAuthState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // checks if an email exists in db
    const { data: exists } = await supabase.rpc("email_exists", {
      email_param: values.email,
    })
    // if no email present in database
    if (!exists) {
      await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
          },
          emailRedirectTo: `${location.origin}/api/auth/callback`,
        },
      })
      setIsError(false)
      setIsEmailVerify(true)
    } else {
      setIsError(true)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 w-1/2 md:w-1/3 justify-center"
      >
        <div className="space-y-2">
          <h1 className="text-4xl">Sign Up</h1>
          <p className="font-light">
            Join a fast growing community of successful students
          </p>
        </div>
        {isError && (
          <Alert
            name="Error"
            description="An account is already registered to this email, consider logging in."
            variant="destructive"
          />
        )}
        {isEmailVerify && (
          <Alert
            name="Success"
            description="Check your email inbox to verify your account"
          />
        )}
        <InputField
          name="name"
          label="Name"
          placeholder="John Doe"
          control={form.control}
        />
        <InputField
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          control={form.control}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          description="Must be at least 6 characters long"
          placeholder="johndoe0!"
          control={form.control}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  )
}

export default SignUpForm
