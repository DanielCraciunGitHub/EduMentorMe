"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import type { Database } from "@/types/supabase"
import { loginFormSchema } from "@/lib/validations/form"
import { useAuthState } from "@/hooks/useAuthState"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Alert from "@/components/Alert"
import InputField from "@/components/InputField"

type Inputs = z.infer<typeof loginFormSchema>

const LoginForm = () => {
  const supabase = createClientComponentClient<Database>()

  const { router, isError, setIsError } = useAuthState(false)

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

    if (error) {
      setIsError(true)
    } else {
      router.refresh()
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-1/2 flex-col justify-center space-y-8 md:w-1/3"
      >
        <div className="space-y-2">
          <h1 className="text-4xl">Login</h1>
          <p className="font-light">
            Join a fast growing community of successful students
          </p>
        </div>
        {isError && (
          <Alert
            name="Error"
            variant="destructive"
            description="Either this account doesn't exist or the password is incorrect."
          />
        )}

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
          Don't have an account? Sign up <Link href="/sign_up">here</Link>
        </div>
        <Button type="submit">Login</Button>
      </form>
    </Form>
  )
}

export default LoginForm
