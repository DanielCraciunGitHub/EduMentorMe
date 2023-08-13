import { FC } from "react"

import { Checkbox as CheckboxUI } from "@/components/ui/checkbox"

interface CheckboxProps {}

const Checkbox: FC<CheckboxProps> = ({}) => {
  return (
    <div className="flex items-center">
      <CheckboxUI />
    </div>
  )
}

export default Checkbox
