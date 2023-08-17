import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { resourcesSchema } from "@/lib/validations/resources"
import { sendError } from "@/app/_actions/discord"

export async function getUserResources() {
  const supabase = createServerComponentClient<Database>({ cookies })

  try {
    const { data } = await supabase
      .from("accounts")
      .select("resources")
      .single()

    const parsedData = resourcesSchema.parse(data?.resources)
    return parsedData
  } catch (err: any) {
    await sendError({ location: "getUserResources()", errMsg: err.message })
  }
}
