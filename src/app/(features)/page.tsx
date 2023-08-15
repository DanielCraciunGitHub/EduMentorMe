import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { allFeatures } from "contentlayer/generated"

import { baseMetadata } from "@/config/meta"
import { Mdx } from "@/components/Mdx"

export const metadata: Metadata = {
  ...baseMetadata,
  title: { absolute: "EduMentorMe" },
}

const page = () => {
  const feature = allFeatures.find((feature) => feature.title === "EduMentorMe")

  if (!feature) {
    return notFound()
  }

  return (
    <div className="mt-5 space-y-20">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src={feature.image!}
          alt="EduMentorMe Image"
          width="1200"
          height="630"
          className="rounded-md"
          priority
        />
        <p className="text-xl md:text-2xl">{feature.description}</p>
      </div>
      <div>
        <Mdx code={feature.body.code} />
      </div>
    </div>
  )
}
export default page
