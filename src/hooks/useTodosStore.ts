import { Todo } from "@/types"
import { v4 as uuid } from "uuid"
import { create } from "zustand"

type Todos = Todo[] | null

interface TodosState {
  todos: Todos
  setTodos: (todos: Todos) => void
  updateTodoChecked: (id: string) => void
  updateTodoText: (id: string, text: string) => void
  removeTodo: (id: string) => void
  addTodo: () => void
}

export const useTodosStore = create<TodosState>((set) => ({
  todos: null,
  setTodos: (todos) => set(() => ({ todos })),
  removeTodo: (id) =>
    set(({ todos }) => {
      const updatedTodos = todos!.filter((todo) => todo.id !== id)
      return { todos: updatedTodos }
    }),
  addTodo: () =>
    set(({ todos }) => {
      const newTodo = { id: uuid(), text: "", checked: false }
      const todoCount = todos!.length
      if (todoCount < 10) {
        return { todos: [...todos!, newTodo] }
      } else if (todoCount === 10) {
        return { todos }
      }

      return { todos: [newTodo] }
    }),
  updateTodoText: (id, newText) =>
    set(({ todos }) => {
      const updatedTodos = todos!.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text: newText,
          }
        }
        return todo
      })

      return { todos: updatedTodos }
    }),
  updateTodoChecked: (id) =>
    set(({ todos }) => {
      const updatedTodos = todos!.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            checked: !todo.checked,
          }
        }
        return todo
      })

      return { todos: updatedTodos }
    }),
}))
