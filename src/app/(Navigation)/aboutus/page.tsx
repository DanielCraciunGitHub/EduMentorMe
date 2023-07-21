import { getDocFromParams } from "@/lib/utils"
import { Mdx } from "@/components/Mdx"

import "@/styles/mdx.css"

const page = async () => {
  const doc = await getDocFromParams("aboutus")
  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <h1 className="font-heading mt-2 inline-block text-4xl leading-tight lg:text-5xl">
        {doc.title}
      </h1>
      <Mdx code={doc.body.code} />
    </article>
  )
}

export default page
