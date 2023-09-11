import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import { staticMetadata } from "@/config/meta"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Mdx } from "@/components/Markdown/Mdx"

export const metadata: Metadata = {
  ...staticMetadata.about_us,
}

const page = () => {
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
          width="1200"
          height="630"
          className="my-5 rounded-md"
          priority
        />
      )}
      <Mdx code={doc.body.code} />
      <div className="mt-10 flex flex-col items-center space-y-5 sm:flex-row sm:justify-between">
        <div className="flex space-x-3">
          <Avatar>
            <AvatarImage src="emm.jpg" title="EMM" />
          </Avatar>
          <div className="flex flex-col">
            <p>Daniel Craciun</p>
            <p className="text-xs">Website Developer</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Avatar>
            <AvatarImage src="emm.jpg" title="EMM" />
          </Avatar>
          <div className="flex flex-col">
            <p>Yash Bhuwania</p>
            <p className="text-xs">Content Writer/UX</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default page
