import { Metadata } from "next"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { staticMetadata } from "@/config/meta"
import { getCurrentUser } from "@/lib/getCurrentUser"
import { todosSchema } from "@/lib/validations/todos"
import TodoComponent from "@/components/Todo/TodoComponent"

export const metadata: Metadata = {
  ...staticMetadata.todos,
}

const page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { email } = await getCurrentUser()

  const { data } = await supabase
    .from("todos")
    .select("todolist")
    .eq("email", email)
    .single()
  const parsedData = todosSchema.parse(data?.todolist)
  // TODO: make an error.tsx file to account for parsing errors etc.
  return <TodoComponent todos={parsedData} />
}

export default page
