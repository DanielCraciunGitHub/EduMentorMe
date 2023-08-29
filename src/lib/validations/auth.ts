import * as z from "zod"

export const userPrivateMetadataSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  created_at: z.string(),
  is_admin: z.boolean(),
  stripe_current_period_end: z.string(),
  stripe_customer_id: z.string().nullable(),
  stripe_price_id: z.string().nullable(),
  stripe_subscription_id: z.string().nullable(),
})
export const googleReCaptchaSchema = z.object({
  success: z.boolean(),
  challenge_ts: z.string(),
  hostname: z.string(),
  score: z.number(),
  action: z.string().optional(),
})
