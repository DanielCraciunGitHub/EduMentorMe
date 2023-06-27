"use client"

import { FC, useState } from "react"

import { signIn, signOut, useSession } from "next-auth/react"

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
import { Separator } from "@/app/components/ui/separator"

const formSchema = z.object({
  name: z.string().min(1, { message: "Enter Your Name" }),
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(5, { message: "Invalid Password" }),
})

const page: FC = () => {
  const { data: session, status } = useSession()

  console.log(status)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn("credentials", {
      email: values.email,
      password: values.password,
    })
  }

  return (
    <Card className="flex w-full items-center justify-center">
      {/* TEST sign out button when authenticated */}
      {status === "authenticated" ? (
        <Button onClick={() => signOut()}>sign out test</Button>
      ) : null}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 w-1/2"
        >
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
                  Must be at least 5 characters long
                </FormDescription>
                <FormControl>
                  <Input placeholder="johndoe0!" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign up</Button>
          <Separator />
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("google")}
          >
            Sign up with Google
          </Button>
        </form>
      </Form>
    </Card>
  )
}

export default page
