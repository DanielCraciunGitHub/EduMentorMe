import Link from "next/link"
import { Files } from "@/types"

interface ResourceLinksProps {
  files: Files
  title: string
}

const ResourceLinks = ({ files, title }: ResourceLinksProps) => {
  return (
    <div className="flex flex-col items-center space-y-5 rounded outline outline-orange-500">
      <h1 className="text-4xl">{title}</h1>
      <ul className="flex w-3/4 list-disc flex-col space-y-2">
        {files.map((file) => (
          <li key={file.link} className="break-all">
            <Link
              key={file.link}
              className="text-blue-600 underline"
              target="_blank"
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

export default ResourceLinks
