"use client"

import { FC, useState } from "react"
import Link from "next/link"

import { signIn, useSession } from "next-auth/react"

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
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(5, { message: "Invalid Password" }),
})

const page: FC = () => {
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    }).then((response) => {
      if (response?.error === "404") {
        setIsError(true)
      } else {
        router.push("/")
      }
    })
  }

  return (
    <Card className="flex w-full items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 w-1/2"
        >
          {isError ? (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                This account doesnt exist, consider{" "}
                <Link href="/sign_up" className="underline text-blue-500">
                  signing up
                </Link>
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
                  <Input placeholder="example@example.com" {...field} />
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
          <FormDescription>
            <Link href="/sign_up" className="underline text-blue-500">
              Create an Account
            </Link>
          </FormDescription>
          <Button type="submit">Sign in</Button>
          <Separator />
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </Button>
        </form>
      </Form>
    </Card>
  )
}

export default page
