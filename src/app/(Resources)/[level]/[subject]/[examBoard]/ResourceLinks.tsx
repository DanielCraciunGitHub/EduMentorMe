import Link from "next/link"
import { Files } from "@/types"

interface ResourceLinksProps {
  files: Files
  title: string
}

const ResourceLinks = ({ files, title }: ResourceLinksProps) => {
  return (
    <div className="flex flex-col items-center space-y-5">
      <h1>{title}</h1>
      <ul>
        {files.map((file) => (
          <li key={file.link}>
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
