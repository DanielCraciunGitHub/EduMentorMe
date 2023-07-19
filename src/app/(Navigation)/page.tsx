import { resourcesConfig } from "@/config/resources"
import { SearchForm } from "@/components/SearchForm"

const page = () => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <SearchForm resources={resourcesConfig} />
    </div>
  )
}
export default page
