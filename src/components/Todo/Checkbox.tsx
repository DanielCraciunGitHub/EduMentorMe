import { FC } from "react"
import { Todo } from "@/types"

import { useTodosStore } from "@/hooks/useTodosStore"
import { Checkbox as CheckboxUI } from "@/components/ui/checkbox"

interface CheckboxProps {
  todo: Todo
}

const Checkbox: FC<CheckboxProps> = ({ todo }) => {
  const { updateTodoChecked } = useTodosStore()
  return (
    <div className="flex items-center">
      <CheckboxUI
        checked={todo.checked}
        onCheckedChange={() => updateTodoChecked(todo.id)}
      />
    </div>
  )
}

export default Checkbox
