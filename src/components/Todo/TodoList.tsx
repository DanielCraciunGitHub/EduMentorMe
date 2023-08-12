import { FC } from "react"

import Todo from "./Todo"

interface TodoListProps {}

const TodoList: FC<TodoListProps> = ({}) => {
  return (
    <div className="flex flex-col space-y-4">
      <Todo />
      <Todo />
      <Todo />
      <Todo />
      <Todo />
      <Todo />
      <Todo />
    </div>
  )
}

export default TodoList
