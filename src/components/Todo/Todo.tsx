import { FC } from "react"

import Checkbox from "./Checkbox"
import Reminder from "./Reminder"
import RemoveTodo from "./RemoveTodo"
import TodoInput from "./TodoInput"

interface TodoProps {}

const Todo: FC<TodoProps> = ({}) => {
  return (
    <div className="flex flex-row space-x-4">
      <Checkbox />
      <TodoInput />
      <Reminder />
      <RemoveTodo />
    </div>
  )
}

export default Todo
