import { Metadata } from "next"

import { siteConfig } from "@/config/site"

import LoginForm from "./LoginForm"

export const metadata: Metadata = {
  title: "EduMentorMe | Login",
  description: "Login to gain exclusive access to GCSE and A Level Resources",
  openGraph: {
    ...siteConfig.openGraph,
    url: siteConfig.url + "/login",
    title: "EduMentorMe | Login",
    description: "Login to gain exclusive access to GCSE and A Level Resources",
  },
}

const page = () => {
  return <LoginForm />
}

export default page
