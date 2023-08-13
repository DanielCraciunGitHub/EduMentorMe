import { FC } from "react"

import { Button } from "@/components/ui/button"

interface AddTodoProps {}

const AddTodo: FC<AddTodoProps> = ({}) => {
  return (
    <div className="flex justify-end">
      <Button>Add Todo +</Button>
    </div>
  )
}

export default AddTodo
