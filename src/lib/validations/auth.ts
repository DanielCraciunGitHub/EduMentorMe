import * as z from "zod"

export const userPrivateMetadataSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  is_admin: z.boolean(),
})
export const googleReCaptchaSchema = z.object({
  success: z.boolean(),
  challenge_ts: z.string(),
  hostname: z.string(),
  score: z.number(),
  action: z.string().optional(),
})
