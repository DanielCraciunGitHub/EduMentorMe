"use client"

import { FC, useEffect, useState } from "react"

import Link from "next/link"
import supabase from "@/app/lib/supabase"

interface ResourceLinksProps {
  names: string[]
  path: string
}

const ResourceLinks: FC<ResourceLinksProps> = ({ names, path }) => {
  const [blobUrls, setBlobUrls] = useState<string[]>([])
  // runs upon loading the page, downloads all files and stores blob urls in a state
  useEffect(() => {
    const fetchFiles = async () => {
      for (let i = 0; i < names.length; i++) {
        // runs an IIFE, downloading each file at the path and extracting the blob urls
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
    // clear urls on component unmount
    return () => {
      blobUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [names, path])
  // renders all of the links in a list
  return (
    <ul className="grid grid-flow-row grid-cols-6 grid-rows-6 gap-4 list-disc">
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
  )
}

export default ResourceLinks
