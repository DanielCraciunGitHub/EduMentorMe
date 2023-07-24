import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import { staticMetadata } from "@/config/meta"
import { Mdx } from "@/components/Mdx"

export const metadata: Metadata = {
  ...staticMetadata.about_us,
}

const page = async () => {
  const doc = allDocs.find((doc) => doc.slugAsParams === "about_us")

  if (!doc) {
    return notFound()
  }

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <h1 className="inline-block text-4xl leading-tight lg:text-5xl">
        {doc.title}
      </h1>
      {doc.image && (
        <Image
          src={doc.image}
          alt={doc.title}
          width={1200}
          height={300}
          className="my-5 rounded-md"
          priority
        />
      )}
      <Mdx code={doc.body.code} />
    </article>
  )
}

export default page
