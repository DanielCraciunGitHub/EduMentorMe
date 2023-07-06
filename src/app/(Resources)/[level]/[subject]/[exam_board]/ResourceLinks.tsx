import { FC } from "react"

import Link from "next/link"
import supabase from "@/app/lib/supabase"

interface ResourceLinksProps {
  names: string[]
  path: string
}

const ResourceLinks: FC<ResourceLinksProps> = ({ names, path }) => {
  const urls: string[] = []
  // pushes the url of each resource in the folder into the urls array
  for (let i = 0; i < names.length; i++) {
    const { data } = supabase.storage
      .from("files")
      .getPublicUrl(`${path}/${names[i]}`)

    if (data) {
      urls.push(data.publicUrl)
    }
  }
  // renders all of the links in a list
  return (
    <ul className="grid grid-flow-row grid-cols-6 grid-rows-6 gap-4 list-disc">
      {urls.map((url, i) => (
        <li key={i}>
          <Link
            key={i}
            className="text-blue-600 underline"
            target="_blank"
            href={url}
          >
            {names[i]}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ResourceLinks
