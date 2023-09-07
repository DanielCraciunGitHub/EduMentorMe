"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { trpc } from "@/app/_trpc/client"

import { SpinnerButton } from "./SpinnerButton"
import { ButtonProps } from "./ui/button"

interface StripeButtonProps extends ButtonProps {
  name: string
}

const StripeButton = ({ className, name }: StripeButtonProps) => {
  const router = useRouter()
  const [isPurchasing, setIsPurchasing] = useState(false)

  const { refetch } = trpc.paymentRouter.getStripeUrl.useQuery(undefined, {
    enabled: false,
  })

  const onSubmit = async () => {
    setIsPurchasing(true)
    const { data: url } = await refetch()

    if (url) {
      router.push(url)
    } else {
      router.push("/login?from=/products_and_services")
    }
    setIsPurchasing(false)
  }
  return (
    <SpinnerButton
      type="submit"
      onClick={onSubmit}
      className={className}
      state={isPurchasing}
      name={name}
    />
  )
}

export default StripeButton
