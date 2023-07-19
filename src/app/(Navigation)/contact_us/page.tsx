import { Metadata } from "next"

import { staticMetadata } from "@/config/meta"

import ContactForm from "./ContactForm"

export const metadata: Metadata = {
  ...staticMetadata.contact_us,
}

const page = () => {
  return <ContactForm />
}

export default page
