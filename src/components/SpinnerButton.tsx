import { Loader2 } from "lucide-react"

import { Button, ButtonProps } from "@/components/ui/button"

interface SpinnerButtonProps extends ButtonProps {
  state: boolean
  name: string
}

export const SpinnerButton = ({
  state,
  name,
  ...props
}: SpinnerButtonProps) => {
  return (
    <Button {...props}>
      {state ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <span>{name}</span>
      )}
    </Button>
  )
}
