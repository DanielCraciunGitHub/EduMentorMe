import { FC } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AlertProps {
  name: string
  description?: string
  variant?: "default" | "destructive"
}

const GenericAlert: FC<AlertProps> = ({
  name,
  description,
  variant = "default",
}) =>
  variant === "default" ? (
    <Alert variant="default" className="bg-green-500 dark:bg-green-700">
      <AlertTitle>{name}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  ) : (
    <Alert variant="destructive">
      <AlertTitle>{name}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )

export default GenericAlert
