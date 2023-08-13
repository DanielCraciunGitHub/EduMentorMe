import { FC } from "react"
import { Todos } from "@/types"

import AddTodo from "./AddTodo"
import TodoList from "./TodoList"

interface TodoComponentProps {
  todos: Todos
}

const TodoComponent: FC<TodoComponentProps> = ({ todos }) => {
  console.log(todos)
  return (
    <div className="mt-4 flex flex-col space-y-2">
      <TodoList />
      <AddTodo />
    </div>
  )
}

export default TodoComponent
