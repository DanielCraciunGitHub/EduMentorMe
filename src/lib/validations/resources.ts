import { z } from "zod"

export const resourceSchema = z.object({
  name: z.string(),
  link: z.string(),
})

export const resourcesSchema = z
  .object({
    name: z.string(),
    link: z.string(),
  })
  .array()
  .nullable()
