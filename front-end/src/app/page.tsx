import { SearchForm } from "@/app/components/SearchForm"
import { FC } from "react"

interface pageProps {}

const page: FC<pageProps> = () => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center h-full space-y-4 overflow-y-auto">
      <SearchForm />
    </div>
  )
}

export default page
