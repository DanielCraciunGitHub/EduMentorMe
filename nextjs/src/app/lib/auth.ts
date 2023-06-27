import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(req.body?.callbackUrl)
        // const user = await prisma.user.findFirst({
        //   where: { email: credentials?.email },
        // })
        const user = { id: "1" }
        if (user) {
          console.log("Success")
          return user
        } else {
          throw new Error("404")
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    newUser: "/",
  },
}
