import { useState } from "react"
import { useRouter } from "next/navigation"

export const useAuthState = (initialErrorState: boolean) => {
  const [isError, setIsError] = useState(initialErrorState)
  const [isEmailVerify, setIsEmailVerify] = useState(initialErrorState)
  const router = useRouter()
  return { router, isError, setIsError, isEmailVerify, setIsEmailVerify }
}
