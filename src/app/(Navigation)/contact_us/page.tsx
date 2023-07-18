import { Metadata } from "next"

import { siteConfig } from "@/config/site"

import ContactForm from "./ContactForm"

export const metadata: Metadata = {
  title: "EduMentorMe | Contact Us",
  description:
    "Contact Us about any questions or concerns related to our tutoring services or GCSE/A Level Resources.",
  openGraph: {
    ...siteConfig.openGraph,
    url: siteConfig.url + "/contact_us",
    title: "EduMentorMe | Contact Us",
    description:
      "Contact Us about any questions or concerns related to our tutoring services or GCSE/A Level Resources.",
  },
}

const page = () => {
  return <ContactForm />
}

export default page
