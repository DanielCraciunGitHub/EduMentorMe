import { Metadata } from "next"
import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import { staticMetadata } from "@/config/meta"

export const metadata: Metadata = {
  ...staticMetadata.contact_us,
}

const page = async () => {
  const ContactForm = (await import("./ContactForm")).default
  const { Toaster } = await import("@/components/ui/toaster")
  const { Mdx } = await import("@/components/Mdx")

  const doc = allDocs.find((doc) => doc.slugAsParams === "contact_us")

  if (!doc) {
    return notFound()
  }

  return (
    <div>
      <article className="container relative max-w-4xl space-y-4 py-6 lg:py-10">
        <h1 className="inline-block text-4xl leading-tight lg:text-5xl">
          {doc.title}
        </h1>
        <Mdx code={doc.body.code} />
        <ContactForm />
      </article>
      <Toaster />
    </div>
  )
}

export default page
