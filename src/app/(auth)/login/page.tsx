import { Metadata } from "next"

import { staticMetadata } from "@/config/meta"
import LoginForm from "@/components/Forms/LoginForm"

export const metadata: Metadata = {
  ...staticMetadata.login,
}

const page = () => {
  return <LoginForm />
}

export default page
