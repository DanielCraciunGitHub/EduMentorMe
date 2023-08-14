import { FC } from "react"
import { Todo } from "@/types"

import { useTodosStore } from "@/hooks/useTodosStore"
import { Input } from "@/components/ui/input"

interface TodoInputProps {
  todo: Todo
}

const TodoInput: FC<TodoInputProps> = ({ todo }) => {
  const { updateTodoText } = useTodosStore()

  return (
    <div>
      <Input
        maxLength={200}
        value={todo.text}
        onChange={(e) => updateTodoText(todo.id, e.target.value)}
      />
    </div>
  )
}

export default TodoInput
