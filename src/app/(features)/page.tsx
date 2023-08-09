import { Metadata } from "next"
import { notFound } from "next/navigation"
import { allFeatures } from "contentlayer/generated"

import { baseMetadata } from "@/config/meta"
import { Mdx } from "@/components/Mdx"

export const metadata: Metadata = {
  ...baseMetadata,
}

const page = () => {
  const feature = allFeatures.find((feature) => feature.title === "EduMentorMe")

  if (!feature) {
    return notFound()
  }
  return <Mdx code={feature.body.code} />
}
export default page
