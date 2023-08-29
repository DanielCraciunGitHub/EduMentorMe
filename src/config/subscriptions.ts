import { env } from "@/env.mjs"
import { SubscriptionPlan } from "@/types"

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 10 todos. Upgrade to the standard plan for a limit of 1000 todos.",
  stripePriceId: "",
}

export const standardPlan: SubscriptionPlan = {
  name: "Standard",
  description: "The standard plan has a limit of 1000 todos.",
  stripePriceId: env.STANDARD_PLAN_ID || "",
}
