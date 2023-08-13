import { FC } from "react"

import { Input } from "@/components/ui/input"

interface TodoInputProps {}

const TodoInput: FC<TodoInputProps> = ({}) => {
  return (
    <div>
      <Input maxLength={200} />
    </div>
  )
}

export default TodoInput
