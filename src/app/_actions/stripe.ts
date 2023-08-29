"use server"

import { standardPlan } from "@/config/subscriptions"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"

const billingUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.edumentorme.com"
    : "http://localhost:3000"

export async function stripeAction(): Promise<undefined | string> {
  try {
    const user = await getCurrentUser()

    if (!user) {
      console.log("no user logged in")
      return undefined
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user)

    if (subscriptionPlan.isOnPlan && subscriptionPlan.stripe_customer_id) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripe_customer_id,
        return_url: billingUrl,
      })

      return stripeSession.url
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price: standardPlan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    })
    return stripeSession.url!
  } catch (err: any) {
    console.log(err.message)
  }
}
