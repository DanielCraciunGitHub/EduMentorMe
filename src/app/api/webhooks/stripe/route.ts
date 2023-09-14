import { cookies, headers } from "next/headers"
import { env } from "@/env.mjs"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import Stripe from "stripe"

import { Database } from "@/types/supabase"
import { stripe } from "@/lib/stripe"
import { formatDateSupabase } from "@/lib/utils"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient<Database>(
    { cookies },
    { supabaseKey: env.NEXT_PRIVATE_SUPABASE_SERVICE_ROLE_KEY }
  )

  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await supabase
      .from("users")
      .update({
        stripe_subscription_id: subscription.id,
        stripe_customer_id: subscription.customer as string,
        stripe_price_id: subscription.items.data[0].price.id,
        stripe_current_period_end: formatDateSupabase(
          subscription.current_period_end
        ),
      })
      .eq("id", session?.metadata?.userId!)
      .single()
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await supabase
      .from("users")
      .update({
        stripe_price_id: subscription.items.data[0].price.id,
        stripe_current_period_end: formatDateSupabase(
          subscription.current_period_end
        ),
      })
      .eq("stripe_subscription_id", subscription.id)
      .single()
  }

  return new Response(null, { status: 200 })
}
