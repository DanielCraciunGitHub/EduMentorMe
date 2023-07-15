import * as z from "zod"

export const userPrivateMetadataSchema = z.object({
  name: z.string(),
  is_admin: z.boolean().default(false),
})
