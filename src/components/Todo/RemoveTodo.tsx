import { FC } from "react"

import { Button } from "../ui/button"

interface RemoveTodoProps {}

const RemoveTodo: FC<RemoveTodoProps> = ({}) => {
  return (
    <div>
      <Button className="text-red-500 dark:text-red-600">X</Button>
    </div>
  )
}

export default RemoveTodo
