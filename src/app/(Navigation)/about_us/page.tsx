import Image from "next/image"

import { getDocFromParams } from "@/lib/utils"
import { Mdx } from "@/components/Mdx"

const page = async () => {
  const doc = await getDocFromParams("about_us")
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
