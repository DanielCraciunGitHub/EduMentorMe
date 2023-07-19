import { Metadata } from "next"

import { staticMetadata } from "@/config/meta"

import SignUpForm from "./SignUpForm"

export const metadata: Metadata = {
  ...staticMetadata.sign_up,
}

const page = () => {
  return <SignUpForm />
}

export default page
