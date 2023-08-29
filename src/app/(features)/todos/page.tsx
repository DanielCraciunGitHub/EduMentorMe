import { Metadata } from "next"

import { staticMetadata } from "@/config/meta"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import TodoComponent from "@/components/Todo/TodoComponent"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  ...staticMetadata.todos,
}

const page = async () => {
  const user = await getCurrentUser()

  if (user) {
    const subscriptionPlan = await getUserSubscriptionPlan(user)

    let isCanceled = false
    if (subscriptionPlan.isOnPlan && subscriptionPlan.stripe_subscription_id) {
      const stripePlan = await stripe.subscriptions.retrieve(
        subscriptionPlan.stripe_subscription_id
      )
      isCanceled = stripePlan.cancel_at_period_end
    }

    let todosLimit: number
    if (isCanceled) {
      todosLimit = 10
    } else {
      todosLimit = 1000
    }
    return <TodoComponent userId={user.id} todosLimit={todosLimit} />
  } else {
    throw new Error()
  }
}

export default page
