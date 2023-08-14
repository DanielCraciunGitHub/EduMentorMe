import { Metadata } from "next"

import { staticMetadata } from "@/config/meta"
import { getCurrentUser } from "@/lib/getCurrentUser"
import TodoComponent from "@/components/Todo/TodoComponent"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  ...staticMetadata.todos,
}

const page = async () => {
  const { email } = await getCurrentUser()

  return <TodoComponent email={email} />
}

export default page
