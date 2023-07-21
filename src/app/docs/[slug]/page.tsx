import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import { Mdx } from "@/components/Mdx"

import "@/styles/mdx.css"

interface pageProps {
  params: { slug: string }
}

async function getDocFromParams(slug: string) {
  const doc = allDocs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    notFound()
  }
  return doc
}
const page = async ({ params }: pageProps) => {
  const doc = await getDocFromParams(params.slug)
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
