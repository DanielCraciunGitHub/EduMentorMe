"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import type { Database } from "@/types/supabase"
import { signUpFormSchema } from "@/lib/validations/form"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import InputField from "@/components/InputField"

type Inputs = z.infer<typeof signUpFormSchema>

const SignUpForm = () => {
  const { toast } = useToast()

  const supabase = createClientComponentClient<Database>()

  const form = useForm<Inputs>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  async function onSubmit(values: Inputs) {
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
      toast({
        title: "Success",
        description: "Check your email inbox to verify your account.",
        variant: "constructive",
      })
    } else {
      toast({
        title: "Error",
        description:
          "An account is already registered to this email, consider logging in.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-1/2 flex-col justify-center space-y-8 md:w-1/3"
      >
        <div className="space-y-2">
          <h1 className="text-4xl">Sign Up</h1>
          <p className="font-light">
            Join a fast growing community of successful students
          </p>
        </div>
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
        <div>
          Already have an account? Login{" "}
          <Link href="/login" className="text-blue-600 underline">
            here
          </Link>
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  )
}

export default SignUpForm
