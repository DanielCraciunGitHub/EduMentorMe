import { Metadata } from "next"
import { notFound } from "next/navigation"
import { allFeatures } from "contentlayer/generated"

import { staticMetadata } from "@/config/meta"
import { resourcesConfig } from "@/config/resources"
import { Mdx } from "@/components/Mdx"
import { SearchForm } from "@/components/SearchForm"

export const metadata: Metadata = {
  ...staticMetadata.search,
}

const page = () => {
  const feature = allFeatures.find(
    (feature) => feature.slugAsParams === "search"
  )

  if (!feature) {
    return notFound()
  }

  return (
    <div className="container space-y-6 sm:w-1/2">
      <div className="mt-2 text-4xl lg:text-5xl">{feature.title}</div>
      <Mdx code={feature.body.code} />
      <SearchForm resources={resourcesConfig} />
    </div>
  )
}

export default page
