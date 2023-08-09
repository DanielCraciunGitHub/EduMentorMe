import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import { staticMetadata } from "@/config/meta"
import { Toaster } from "@/components/ui/toaster"
import { Mdx } from "@/components/Mdx"

export const metadata: Metadata = {
  ...staticMetadata.contact_us,
}

const page = async () => {
  const doc = allDocs.find((doc) => doc.slugAsParams === "contact_us")

  if (!doc) {
    return notFound()
  }

  return (
    <div>
      <article className="container max-w-4xl space-y-6 py-6">
        <h1 className="inline-block text-4xl leading-tight lg:text-5xl">
          {doc.title}
        </h1>
        <div>
          <Link href="contact_form" className="text-xl text-blue-600">
            Contact Form ✉️
          </Link>
        </div>
        <div>{doc.description}</div>
        <Mdx code={doc.body.code} />
      </article>
      <Toaster />
    </div>
  )
}

export default page
