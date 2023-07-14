import { Metadata } from "next"

import ContactForm from "./ContactForm"

export const metadata: Metadata = {
  title: "EduMentorMe | Contact Us",
  description:
    "Contact Us about any questions or concerns related to our tutoring services or GCSE/A Level Resources.",
}

const page = () => {
  return <ContactForm />
}

export default page
