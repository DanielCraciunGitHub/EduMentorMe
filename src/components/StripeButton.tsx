"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { stripeAction } from "@/app/_actions/stripe"

import { SpinnerButton } from "./SpinnerButton"
import { ButtonProps } from "./ui/button"

interface StripeButtonProps extends ButtonProps {
  name: string
}

const StripeButton = ({ className, name }: StripeButtonProps) => {
  const router = useRouter()
  const [isPurchasing, setIsPurchasing] = useState(false)

  const onSubmit = async () => {
    setIsPurchasing(true)
    const url = await stripeAction()

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
