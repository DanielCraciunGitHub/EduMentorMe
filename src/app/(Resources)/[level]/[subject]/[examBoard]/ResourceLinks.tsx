import { FC } from "react"
import Link from "next/link"

import supabase from "@/lib/supabase"

interface ResourceLinksProps {
  names: string[]
  path: string
  title: string
}

const ResourceLinks: FC<ResourceLinksProps> = ({ names, path, title }) => {
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
    <div className="flex flex-col items-center space-y-5">
      <h1>{title}</h1>
      <ul>
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
    </div>
  )
}

export default ResourceLinks
