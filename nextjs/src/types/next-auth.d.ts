import { UserRole } from "@prisma/client"
import type { User as SessionUser } from "next-auth"
import "next-auth/jwt"

type UserId = string

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole
  }
}
declare module "next-auth" {
  interface Session {
    user: SessionUser & {
      role: UserRole
    }
  }
}
