"use client"

import { FC, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { debounce } from "lodash"

import { Database } from "@/types/supabase"
import { todosSchema } from "@/lib/validations/todos"
import { useTodosStore } from "@/hooks/useTodosStore"
import { Button } from "@/components/ui/button"

import Todo from "./Todo"

interface TodoComponentProps {
  email: string
}

const TodoComponent: FC<TodoComponentProps> = ({ email }) => {
  const supabase = createClientComponentClient<Database>()
  const { todos, setTodos, addTodo } = useTodosStore()

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await supabase
        .from("todos")
        .select("todolist")
        .eq("email", email)
        .single()

      const parsedData = todosSchema.parse(data?.todolist)

      setTodos(parsedData)
    }
    getTodos()
  }, [setTodos, email, supabase])

  debouncedSyncTodosWithDb(todos, email)

  return (
    <div className="mt-4 flex flex-col space-y-2">
      <div className="flex flex-col space-y-4">
        {todos?.map((todo) => <Todo key={todo.id} todo={todo} />)}
      </div>
      <div className="flex justify-end">
        <Button onClick={addTodo}>Add Todo +</Button>
      </div>
    </div>
  )
}

const debouncedSyncTodosWithDb = debounce(async (todos, email) => {
  const supabase = createClientComponentClient<Database>()

  await supabase.from("todos").update({ todolist: todos }).eq("email", email)
}, 600)

export default TodoComponent
