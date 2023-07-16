import { z } from "zod"

import { userPrivateMetadataSchema } from "@/lib/validations/auth"

export interface NavItem {
  name: string
  href: string
}
export interface FooterButton {
  icon: React.ReactNode
  href: string
}

export interface resources {
  levels: string[]
  subjects: string[]
  examBoards: string[]
}
export type User = z.infer<typeof userPrivateMetadataSchema>
