"use client"

import { FC } from "react"
import { useAuthState } from "@/app/components/hooks/useAuthState"
import Link from "next/link"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/app/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"

const formSchema = z.object({
  name: z.string().min(1, { message: "Enter Your Name" }),
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6, { message: "Invalid Password" }),
})

const page: FC = () => {
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
          emailRedirectTo: `${location.origin}/auth/callback`,
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
        {isError ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              An account is already registered to this email, consider{" "}
              <Link href="/login" className="underline text-blue-500">
                logging in
              </Link>
            </AlertDescription>
          </Alert>
        ) : null}
        {isEmailVerify ? (
          <Alert variant="default" className="bg-green-500 dark:bg-green-700">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Check your email inbox to verify your account
            </AlertDescription>
          </Alert>
        ) : null}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="john doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormDescription>
                Must be at least 6 characters long
              </FormDescription>
              <FormControl>
                <Input placeholder="johndoe0!" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  )
}

export default page
