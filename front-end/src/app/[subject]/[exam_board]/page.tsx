import Link from "next/link"
import { FC } from "react"

interface pageProps {
  params: { subject: string; exam_board: string }
}

const page: FC<pageProps> = ({ params }) => {
  const path = `/${params.subject}/${params.exam_board}`
  return path
}

export function generateStaticParams() {
  const subjects = [
    "a-level-maths",
    "a-level-physics",
    "a-level-computer-science",
  ]
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
