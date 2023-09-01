import { z } from "zod"

export const resourceSchema = z.object({
  name: z.string(),
  link: z.string(),
})

export const resourcesSchema = resourceSchema.array().nullable()
