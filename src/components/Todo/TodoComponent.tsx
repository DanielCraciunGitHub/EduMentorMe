"use client"

import { FC, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { debounce } from "lodash"
import { Loader2 } from "lucide-react"

import { Database } from "@/types/supabase"
import { todosSchema } from "@/lib/validations/todos"
import { useTodosStore } from "@/hooks/useTodosStore"
import { Button } from "@/components/ui/button"

import Todo from "./Todo"

interface TodoComponentProps {
  userId: string
  todosLimit: number
}

const TodoComponent: FC<TodoComponentProps> = ({ userId, todosLimit }) => {
  const supabase = createClientComponentClient<Database>()
  const { todos, setTodos, addTodo } = useTodosStore()

  useEffect(() => {
    setTimeout(() => {
      const getTodos = async () => {
        const { data } = await supabase
          .from("todos")
          .select("todolist")
          .eq("id", userId)
          .single()

        const parsedData = todosSchema.parse(data?.todolist)

        if (parsedData) {
          setTodos(parsedData)
        } else {
          setTodos([])
        }
      }
      getTodos()
    }, 300)
  }, [setTodos, userId, supabase])

  useEffect(() => {
    debouncedSyncTodosWithDb(todos, userId)
  }, [todos, userId])

  return (
    <div className="mt-4 flex flex-col space-y-2">
      {todos ? (
        <>
          <div className="flex flex-col space-y-4">
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={() => addTodo(todosLimit)}>Add Todo +</Button>
          </div>
        </>
      ) : (
        <div className="flex">
          <Loader2 className="h-24 w-24 animate-spin" />
        </div>
      )}
    </div>
  )
}

const debouncedSyncTodosWithDb = debounce(async (todos, userId) => {
  const supabase = createClientComponentClient<Database>()

  await supabase
    .from("todos")
    .update({ todolist: todos })
    .eq("id", userId)
    .single()
}, 600)

export default TodoComponent
