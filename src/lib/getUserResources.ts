import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { resourcesSchema } from "@/lib/validations/resources"

export async function getUserResources() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data } = await supabase.from("accounts").select("resources").single()

  const parsedData = resourcesSchema.parse(data?.resources)
  return parsedData
}
