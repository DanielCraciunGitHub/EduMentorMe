import { FC } from "react"

import AddTodo from "./AddTodo"
import TodoList from "./TodoList"

interface TodoComponentProps {}

const TodoComponent: FC<TodoComponentProps> = ({}) => {
  return (
    <div className="mt-4 flex flex-col space-y-2">
      <TodoList />
      <AddTodo />
    </div>
  )
}

export default TodoComponent
