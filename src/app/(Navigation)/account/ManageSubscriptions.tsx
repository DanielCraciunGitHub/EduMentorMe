"use client"

import { FC } from "react"

import { Button } from "@/components/ui/button"
import { stripeAction } from "@/app/_actions/stripe"

interface ManageSubscriptionsProps {}

const ManageSubscriptions: FC<ManageSubscriptionsProps> = ({}) => {
  const onSubmit = async () => {
    const url = await stripeAction()
    if (url) {
      window.location.href = url
    }
  }
  return (
    <Button type="submit" onClick={onSubmit}>
      Manage subscriptions
    </Button>
  )
}

export default ManageSubscriptions
