import { z } from "zod"

import { userPrivateMetadataSchema } from "@/lib/validations/auth"
import { resourceSchema } from "@/lib/validations/resources"
import { todosSchema } from "@/lib/validations/todos"

export interface NavItem {
  name: string
  href: string
}
export interface FooterButton {
  name: string
  icon: React.ReactNode
  href: string
}

export interface resources {
  levels: string[]
  subjects: string[]
  examBoards: string[]
}

export type File = z.infer<typeof resourceSchema>
export type Files = File[]

export type Todos = z.infer<typeof todosSchema>
export type Todo = {
  id: string
  text: string
  checked: boolean
}

export type User = z.infer<typeof userPrivateMetadataSchema>
