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

interface fileData {
  fileName: string
  pdfFile: Buffer
}
interface User {
  name: string
  email: string
  password?: string
  role?: string
  loginType?: string
}
