import Link from "next/link"

import { getUserResources } from "@/lib/getUserResources"

const Resources = async () => {
  const resources = await getUserResources()

  return (
    <ul className="container flex list-decimal flex-col space-y-2">
      {resources?.map((resource) => (
        <li key={resource.link} className="break-all">
          <Link
            key={resource.link}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
            href={resource.link}
          >
            {resource.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Resources
