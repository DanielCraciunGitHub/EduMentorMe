"use client"

import { FC, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"

interface ResourceLinksProps {
  names: string[]
  path: string
}

const ResourceLinks: FC<ResourceLinksProps> = ({ names, path }) => {
  const supabase = createClientComponentClient()
  const [blobUrls, setBlobUrls] = useState<string[]>([])
  // runs upon loading the page, downloads all files and stores blob urls in a state
  useEffect(() => {
    const fetchFiles = async () => {
      for (let i = 0; i < names.length; i++) {
        ;(async function (index) {
          const { data } = await supabase.storage
            .from("files")
            .download(`${path}/${names[index]}`)

          if (data) {
            const url = URL.createObjectURL(data)
            setBlobUrls((prevUrls) => [...prevUrls, url])
          }
        })(i)
      }
    }
    fetchFiles()
  }, [names, path])
  // renders all of the links in a list
  return (
    <div className="w-screen h-[30rem] flex flex-wrap">
      <ul className="list-disc list-inside flex flex-col space-y-3 flex-wrap">
        {blobUrls.map((blobUrl, i) => (
          <li key={i}>
            <Link
              key={i}
              className="text-blue-600 underline"
              target="_blank"
              href={blobUrl}
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
