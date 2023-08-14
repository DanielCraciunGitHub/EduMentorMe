import { FC } from "react"
import { Todo as TodoType } from "@/types"

import { useTodosStore } from "@/hooks/useTodosStore"
import { Button } from "@/components/ui/button"

import Checkbox from "./Checkbox"
import TodoInput from "./TodoInput"

interface TodoProps {
  todo: TodoType
}

const Todo: FC<TodoProps> = ({ todo }) => {
  const { removeTodo } = useTodosStore()

  return (
    <div className="flex flex-row space-x-4">
      <Checkbox todo={todo} />
      <TodoInput todo={todo} />
      <Button
        className="text-red-500 dark:text-red-600"
        onClick={() => removeTodo(todo.id)}
      >
        X
      </Button>
    </div>
  )
}

export default Todo
