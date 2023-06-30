import { useState } from "react"
import { useRouter } from "next/navigation"

export const useStateRouter = (initialErrorState: boolean) => {
  const [isError, setIsError] = useState(initialErrorState)
  const router = useRouter()

  return { router, isError, setIsError }
}
