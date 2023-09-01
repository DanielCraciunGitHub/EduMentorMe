import { User, UserSubscriptionPlan } from "@/types"

import { freePlan, standardPlan } from "@/config/subscriptions"

export async function getUserSubscriptionPlan(
  user: Pick<
    User,
    | "stripe_current_period_end"
    | "stripe_price_id"
    | "stripe_customer_id"
    | "stripe_subscription_id"
  >
): Promise<UserSubscriptionPlan> {
  let isOnPlan: boolean

  if (
    user.stripe_price_id &&
    new Date(user.stripe_current_period_end).getTime() + 86_400_000 > Date.now()
  ) {
    isOnPlan = true
  } else {
    isOnPlan = false
  }

  const plan = isOnPlan ? standardPlan : freePlan

  return {
    ...plan,
    isOnPlan: isOnPlan,
    stripe_customer_id: user.stripe_customer_id,
    stripe_subscription_id: user.stripe_subscription_id,
    stripeCurrentPeriodEnd: new Date(user.stripe_current_period_end).getTime(),
  }
}
