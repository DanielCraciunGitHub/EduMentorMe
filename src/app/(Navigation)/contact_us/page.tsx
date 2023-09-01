import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import { staticMetadata } from "@/config/meta"
import { Toaster } from "@/components/ui/toaster"
import { Mdx } from "@/components/Markdown/Mdx"

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
      <article className="container mt-6 max-w-4xl space-y-6">
        <h1 className="inline-block text-4xl leading-tight lg:text-5xl">
          {doc.title}
        </h1>
        <div>
          <Link
            href="contact_form"
            className="rounded text-xl text-blue-600 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
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
