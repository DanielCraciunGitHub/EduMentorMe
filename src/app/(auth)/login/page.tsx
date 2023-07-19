import { Metadata } from "next"

import { staticMetadata } from "@/config/meta"

import LoginForm from "./LoginForm"

export const metadata: Metadata = {
  ...staticMetadata.login,
}

const page = () => {
  return <LoginForm />
}

export default page
