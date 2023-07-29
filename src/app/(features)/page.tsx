import { notFound } from "next/navigation"
import { allFeatures } from "contentlayer/generated"

import { Mdx } from "@/components/Mdx"

const page = () => {
  const feature = allFeatures.find((feature) => feature.title === "EduMentorMe")

  if (!feature) {
    return notFound()
  }
  return <Mdx code={feature.body.code} />
}
export default page
