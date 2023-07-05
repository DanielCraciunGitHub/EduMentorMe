import { Database } from "@/types/supabase"
import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
)

export default supabase
