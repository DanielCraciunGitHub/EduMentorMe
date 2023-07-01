import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/prisma/db"
import bcrypt from "bcrypt"
import { User } from "@/types/types"

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // manages the user sign up and sign in via credentials method
      async authorize(credentials, req) {
        const { name, email, password } = credentials as User
        if (req.body?.callbackUrl.includes("login")) {
          const user = await prisma.user.findFirst({
            where: { email },
          })
          if (
            user &&
            (await bcrypt.compare(password as string, user.password))
          ) {
            return user
          } else {
            throw new Error("404")
          }
        } else {
          return await prisma.user
            .create({
              data: {
                name,
                email,
                password: await bcrypt.hash(password as string, 10),
                loginType: "credentials",
              },
            })
            .catch(() => {
              throw new Error("404")
            })
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/api/auth/error",
  },
}
