import { SearchForm } from "@/app/components/SearchForm"
import { FC } from "react"

const page: FC = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center space-y-4 overflow-y-auto">
      <SearchForm />
    </div>
  )
}
export default page
