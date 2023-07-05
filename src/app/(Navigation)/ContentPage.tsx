import { FC } from "react"
import { client } from "@/app/lib/contentful"
import { TypePageSkeleton } from "@/types/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

interface ContentPageProps {
  id: string
}

const ContentPage: FC<ContentPageProps> = async ({ id }) => {
  // consuming the contentful api, getting the page properties
  const page = await client.getEntry<TypePageSkeleton>(id)
  const { body, title } = page.fields
  // rendering the data in the correct format
  return (
    <div className="flex flex-col space-y-7 items-center">
      <div className="text-5xl">{title}</div>
      <div className="w-2/3 space-y-3">{documentToReactComponents(body)}</div>
    </div>
  )
}

export default ContentPage
