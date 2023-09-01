"use client"

import Link from "next/link"
import { File, Files } from "@/types"

interface ResourceLinksProps {
  files: Files
  title?: string
}

const ResourceLinksContainer = ({ files, title }: ResourceLinksProps) => {
  const saveResourceToAccount = async (link: string, name: string) => {
    const payload: File = { link, name }
    await fetch("/api/updateResources", {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
  }
  return (
    <div className="flex min-h-[14rem] flex-col items-center space-y-5 rounded border border-primary">
      <h1 className="text-4xl">{title}</h1>
      <ul className="flex w-3/4 list-disc flex-col space-y-2">
        {files.map((file) => (
          <li
            key={file.link}
            className="break-all"
            onClick={() => saveResourceToAccount(file.link, file.name)}
          >
            <Link
              key={file.link}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
              href={file.link}
            >
              {file.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ResourceLinksContainer
