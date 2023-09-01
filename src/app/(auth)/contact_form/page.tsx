import { Metadata } from "next"

import { staticMetadata } from "@/config/meta"
import ContactForm from "@/components/Forms/ContactForm"

export const metadata: Metadata = {
  ...staticMetadata.contact_us,
}

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl lg:text-5xl">Feedback</h1>
      <ContactForm />
    </div>
  )
}

export default page
