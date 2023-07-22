import { Metadata } from "next"

import { staticMetadata } from "@/config/meta"
import { getDocFromParams } from "@/lib/utils"
import { Mdx } from "@/components/Mdx"

import ContactForm from "./ContactForm"

export const metadata: Metadata = {
  ...staticMetadata.contact_us,
}

const page = async () => {
  const doc = await getDocFromParams("contact_us")

  return (
    <article className="container relative max-w-4xl space-y-4 py-6 lg:py-10">
      <h1 className="inline-block text-4xl leading-tight lg:text-5xl">
        {doc.title}
      </h1>
      <Mdx code={doc.body.code} />
      <ContactForm />
    </article>
  )
}

export default page
