import { cookies } from "next/headers"
import { User } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export async function getCurrentUser() {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase
    .from("users")
    .select("name, is_admin")
    .single()
  if (error) {
    console.log(error.message)
    return
  }
  return data as User
}
