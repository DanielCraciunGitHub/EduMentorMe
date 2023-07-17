import { Metadata } from "next"

import { resourcesConfig } from "@/config/site"
import { SearchForm } from "@/components/SearchForm"

export const metadata: Metadata = {
  title: "Edu Mentor Me",
  description: "Start learning with us today!",
  keywords: ["tutoring", "tutor", "a level", "gcse"],
  icons: "/emm.jpeg",
}

const page = () => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <SearchForm resources={resourcesConfig} />
    </div>
  )
}
export default page
