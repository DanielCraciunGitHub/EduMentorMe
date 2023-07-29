"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { loginFormSchema } from "@/lib/validations/form"
import { Form } from "@/components/ui/form"
import InputField from "@/components/InputField"
import { SpinnerButton } from "@/components/SpinnerButton"

type Inputs = z.infer<typeof loginFormSchema>

const LoginForm = () => {
  const supabase = createClientComponentClient()
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)

  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: Inputs) {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    setIsLoggingIn(true)

    if (error) {
      const { toast } = await import("@/hooks/use-toast")

      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })

      setIsLoggingIn(false)
    } else {
      router.refresh()
      router.push("/account")
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-1/2 flex-col justify-center space-y-8 md:w-1/3"
      >
        <FormHeaderText />
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
          Don't have an account? Sign up{" "}
          <Link href="/sign_up" className="text-blue-600 underline">
            here
          </Link>
        </div>
        <SpinnerButton state={isLoggingIn} name="Login" type="submit" />
      </form>
    </Form>
  )
}

const FormHeaderText = () => {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl">Login</h1>
      <p className="font-light">
        Join a fast growing community of successful students
      </p>
    </div>
  )
}

export default LoginForm
