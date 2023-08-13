import * as z from "zod"

export const todosSchema = z
  .object({
    checked: z.boolean(),
    text: z.string().max(200),
  })
  .array()
  .nullable()
