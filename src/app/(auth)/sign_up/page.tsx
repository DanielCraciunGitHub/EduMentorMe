import { Metadata } from "next"

import SignUpForm from "./SignUpForm"

export const metadata: Metadata = {
  title: "EduMentorMe | Sign Up",
  description: "Sign Up to gain exclusive access to GCSE and A Level Resources",
}

const page = () => {
  return <SignUpForm />
}

export default page
