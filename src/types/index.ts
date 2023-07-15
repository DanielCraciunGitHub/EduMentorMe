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

type User = z.infer<typeof userPrivateMetadataSchema>
