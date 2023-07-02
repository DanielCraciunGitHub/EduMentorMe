import { SearchForm } from "@/app/components/SearchForm"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { FC } from "react"

const page: FC = () => {
  const supabase = createClientComponentClient()
  return (
    <div className="flex-grow flex flex-col items-center justify-center space-y-4 overflow-y-auto">
      <SearchForm />
    </div>
  )
}
export default page
