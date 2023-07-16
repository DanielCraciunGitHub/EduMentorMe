import { Metadata } from "next"

import LoginForm from "./LoginForm"

export const metadata: Metadata = {
  title: "EduMentorMe | Login",
  description: "Login to gain exclusive access to GCSE and A Level Resources",
}

const page = () => {
  return <LoginForm />
}

export default page
