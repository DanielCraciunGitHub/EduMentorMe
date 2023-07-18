import { Metadata } from "next"

import { resourcesConfig } from "@/config/resources"
import { siteConfig } from "@/config/site"
import { SearchForm } from "@/components/SearchForm"

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: siteConfig.favicon,
}

const page = () => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <SearchForm resources={resourcesConfig} />
    </div>
  )
}
export default page
