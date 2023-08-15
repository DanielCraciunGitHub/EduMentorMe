import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { userPrivateMetadataSchema } from "@/lib/validations/auth"

export async function getCurrentUser() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data } = await supabase
    .from("users")
    .select("id, email, name, is_admin")
    .single()

  const parsedData = userPrivateMetadataSchema.parse(data)
  return parsedData
}
