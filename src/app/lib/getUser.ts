import { Database } from "@/types/supabase"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function getUser() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: user } = await supabase
    .from("users")
    .select("name, is_admin")
    .single()
  return { user }
}
