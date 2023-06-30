import { FC } from "react"
import { examBoards, subjects } from "@/app/lib/constants"

interface pageProps {
  params: { subject: string; exam_board: string }
}

const page: FC<pageProps> = ({ params }) => {
  const path = `/${params.subject}/${params.exam_board}`
  return <div>{path}</div>
}
export function generateStaticParams() {
  const combinations = []

  for (const subject of subjects) {
    for (const examBoard of examBoards) {
      combinations.push({
        subject: subject,
        exam_board: examBoard,
      })
    }
  }
  return combinations
}
export default page
