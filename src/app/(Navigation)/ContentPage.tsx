import { FC } from "react"
import { client } from "@/app/lib/contentful"
import { TypePageSkeleton } from "@/types/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document } from "@contentful/rich-text-types"
import Image from "next/image"
import { Asset } from "contentful"

interface ContentPageProps {
  id: string
}
interface pageFields {
  body: Document
  title: string
  bannerImage?: Asset<undefined, string>
}

const ContentPage: FC<ContentPageProps> = async ({ id }) => {
  // consuming the contentful api, getting the page properties
  const page = await client.getEntry<TypePageSkeleton>(id)
  const { body, title, bannerImage } = page.fields as pageFields
  // rendering the data in the correct format
  return (
    <div className="flex flex-col space-y-7 items-center">
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
