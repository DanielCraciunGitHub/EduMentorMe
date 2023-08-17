import { Metadata } from "next"

import { staticMetadata } from "@/config/meta"
import { getCurrentUser } from "@/lib/getCurrentUser"
import TodoComponent from "@/components/Todo/TodoComponent"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  ...staticMetadata.todos,
}

const page = async () => {
  const user = await getCurrentUser()

  if (user) {
    return <TodoComponent userId={user.id} />
  } else {
    throw new Error()
  }
}

export default page
