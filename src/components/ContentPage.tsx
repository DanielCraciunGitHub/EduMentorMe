import Image from "next/image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document } from "@contentful/rich-text-types"
import { Asset } from "contentful"

import { TypePageSkeleton } from "@/types/contentful"
import { client } from "@/lib/contentful"

interface ContentPageProps {
  id: string
}
interface pageFields {
  body: Document
  title: string
  bannerImage?: Asset<undefined, string>
}

const ContentPage = async ({ id }: ContentPageProps) => {
  // consuming the contentful api, getting the page properties
  const page = await client.getEntry<TypePageSkeleton>(id)
  const { body, title, bannerImage } = page.fields as pageFields
  // rendering the data in the correct format
  return (
    <div className="flex flex-col items-center space-y-7">
      <div className="text-5xl">{title}</div>
      {bannerImage && (
        <Image
          src={"https:" + bannerImage?.fields.file?.url}
          alt="Test image"
          width={bannerImage?.fields.file?.details.image?.width}
          height={bannerImage?.fields.file?.details.image?.height}
        />
      )}
      <div className="w-2/3 space-y-3">{documentToReactComponents(body)}</div>
    </div>
  )
}

export default ContentPage
