import { z } from "zod"

import { userPrivateMetadataSchema } from "@/lib/validations/auth"
import { googleDriveDataSchema } from "@/lib/validations/files"

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
type File = z.infer<typeof googleDriveDataSchema>

export type Files = File[]
export type User = z.infer<typeof userPrivateMetadataSchema>
