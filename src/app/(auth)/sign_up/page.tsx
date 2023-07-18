import { Metadata } from "next"

import { siteConfig } from "@/config/site"

import SignUpForm from "./SignUpForm"

export const metadata: Metadata = {
  title: "EduMentorMe | Sign Up",
  description: "Sign Up to gain exclusive access to GCSE and A Level Resources",
  openGraph: {
    ...siteConfig.openGraph,
    url: siteConfig.url + "sign_up",
    title: "EduMentorMe | Sign Up",
    description:
      "Sign Up to gain exclusive access to GCSE and A Level Resources",
  },
}

const page = () => {
  return <SignUpForm />
}

export default page
