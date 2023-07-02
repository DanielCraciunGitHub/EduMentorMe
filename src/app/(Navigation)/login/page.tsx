"use client"

import { FC } from "react"
import { useStateRouter } from "@/app/components/hooks/useStateRouter"
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
import { Card } from "@/app/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import type { Database } from "@/types/supabase"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(5, { message: "Invalid Password" }),
})

const page: FC = () => {
  const supabase = createClientComponentClient<Database>()

  const { router, isError, setIsError } = useStateRouter(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await supabase
      .from("users")
      .select("email")
      .eq("email", values.email)

    if (data?.length === 0) {
      setIsError(true)
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })
      // error is null when successful
      if (error) {
        setIsError(true)
      } else {
        router.push("/")
        router.refresh()
      }
    }
  }

  return (
    <Card className="flex w-full items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 w-1/2"
        >
          <div className="space-y-2">
            <h1 className="text-4xl">Login</h1>
            <p className="font-light">
              Join a fast growing community of successful students
            </p>
          </div>
          {isError ? (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                1. Either Account doesn't exist <br />
                2. Or password is incorrect
              </AlertDescription>
            </Alert>
          ) : null}
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
                  Must be at least 5 characters long
                </FormDescription>
                <FormControl>
                  <Input placeholder="johndoe0!" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </Card>
  )
}

export default page
