import * as z from "zod"

export const todosSchema = z
  .object({
    id: z.string(),
    checked: z.boolean(),
    text: z.string().max(200),
  })
  .array()
  .nullable()
