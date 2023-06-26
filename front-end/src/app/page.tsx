import { SearchForm } from "@/app/components/SearchForm"
import { FC } from "react"

interface pageProps {}

const page: FC<pageProps> = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center space-y-4 overflow-y-auto">
      <SearchForm />
    </div>
  )
}

export default page
