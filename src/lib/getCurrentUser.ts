import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { ZodError } from "zod"

import { Database } from "@/types/supabase"
import { userPrivateMetadataSchema } from "@/lib/validations/auth"
import { sendError } from "@/app/_actions/discord"

export async function getCurrentUser() {
  const supabase = createServerComponentClient<Database>({ cookies })

  try {
    const { data } = await supabase.from("users").select("*").single()

    const parsedData = userPrivateMetadataSchema.parse(data)
    return parsedData
  } catch (err: any) {
    if (err instanceof ZodError) {
      return
    }
    await sendError({ location: "getCurrentUser()", errMsg: err.message })
  }
}
