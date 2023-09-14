import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { resourcesSchema } from "@/lib/validations/resources"
import { sendError } from "@/app/_actions/discord"

export const dynamic = "force-dynamic"

export async function getRecentlyViewedResources() {
  const supabase = createServerComponentClient<Database>({ cookies })

  try {
    const { data } = await supabase
      .from("accounts")
      .select("resources")
      .single()

    return resourcesSchema.parse(data?.resources)
  } catch (err: any) {
    await sendError({ location: "getUserResources()", errMsg: err.message })
  }
}
