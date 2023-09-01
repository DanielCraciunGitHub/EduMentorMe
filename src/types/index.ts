import { z } from "zod"

import { userPrivateMetadataSchema } from "@/lib/validations/auth"
import { resourceSchema } from "@/lib/validations/resources"

export interface NavItem {
  name: string
  href: string
}
export interface FooterButton {
  name: string
  icon: React.ReactNode
  href: string
}

export interface resourceParams {
  levels: string[]
  subjects: string[]
  examBoards: string[]
}

export type File = z.infer<typeof resourceSchema>
export type Files = File[]

export type Todo = {
  id: string
  text: string
  checked: boolean
}
export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type User = z.infer<typeof userPrivateMetadataSchema>

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripe_customer_id" | "stripe_subscription_id"> & {
    stripeCurrentPeriodEnd: number
    isOnPlan: boolean
  }
