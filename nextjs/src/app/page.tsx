import { SearchForm } from "@/app/components/SearchForm"
import { FC } from "react"
import { subjects } from "@/app/lib/constants"

const page: FC = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center space-y-4 overflow-y-auto">
      <SearchForm />
    </div>
  )
}
export function generateStaticParams() {
  const examBoards = ["aqa", "ocr", "edexcel"]

  const combinations = []

  for (const subject of subjects) {
    for (const examBoard of examBoards) {
      combinations.push({
        params: {
          subject: subject,
          exam_board: examBoard,
        },
      })
    }
  }
  return combinations.map((combination) => Object.values(combination)[0])
}
export default page
