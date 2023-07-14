"use client"

import { useAuthState } from "@/hooks/useAuthState"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import InputField from "@/components/InputField"
import Alert from "@/components/Alert"

import type { Database } from "@/types/supabase"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6, { message: "Invalid Password" }),
})

const LoginForm = () => {
  const supabase = createClientComponentClient<Database>()

  const { router, isError, setIsError } = useAuthState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      setIsError(true)
    } else {
      router.push("/")
      router.refresh()
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 w-1/2 md:w-1/3 justify-center"
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
        <Button type="submit">Login</Button>
      </form>
    </Form>
  )
}

export default LoginForm
