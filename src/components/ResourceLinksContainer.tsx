"use client"

import Link from "next/link"
import { Files } from "@/types"

import { trpc } from "@/app/_trpc/client"

interface ResourceLinksProps {
  files: Files
  title?: string
}

const ResourceLinksContainer = ({ files, title }: ResourceLinksProps) => {
  const saveResourceToAccount =
    trpc.resourceRouter.saveResourceToAccount.useMutation()

  return (
    <div className="flex min-h-[14rem] flex-col items-center space-y-5 rounded border border-primary">
      <h1 className="text-4xl">{title}</h1>
      <ul className="flex w-3/4 list-disc flex-col space-y-2">
        {files.map((file) => (
          <li
            key={file.link}
            className="break-all"
            onClick={() =>
              saveResourceToAccount.mutate({
                link: file.link,
                name: file.name,
              })
            }
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
