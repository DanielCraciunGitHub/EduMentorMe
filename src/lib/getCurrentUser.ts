import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { userPrivateMetadataSchema } from "@/lib/validations/auth"

export async function getCurrentUser() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase
    .from("users")
    .select("name, is_admin, email")
    .single()

  const parsedData = userPrivateMetadataSchema.parse(data)
  return parsedData
}
