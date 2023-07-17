import * as z from "zod"

export const googleDriveDataSchema = z.object({
  name: z.string(),
  link: z.string(),
})
