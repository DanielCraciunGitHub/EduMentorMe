import { FC } from "react"
import { notFound } from "next/navigation"
import { examBoards, subjects, levels } from "@/app/lib/constants"
import supabase from "@/app/lib/supabase"
import ResourceLinks from "./ResourceLinks"

// caches the downloaded pages and requests new data every 20 seconds
export const revalidate = 20

interface pageProps {
  params: { level: string; subject: string; exam_board: string }
}

const page: FC<pageProps> = async ({ params }) => {
  const path = `${params.level}/${params.subject}/${params.exam_board}`
  // gets all of the files from the user's path
  const { data } = await supabase.storage.from("files").list(path)

  if (data?.length) {
    // only look for pdf files
    const filteredData = data.filter(
      (file) => file.metadata.mimetype === "application/pdf"
    )
    // create an array of the file names, and send this to a child component along
    // with the path name for reference
    const names: string[] = filteredData.map((file) => file.name)

    // from all of the names, organise into three categories, worksheets, answers, extra
    const worksheets: string[] = names.filter((name) =>
      name.includes("worksheet")
    )
    const answers: string[] = names.filter((name) => name.includes("answer"))
    const extra: string[] = names.filter(
      (name) => !name.includes("worksheet") && !name.includes("answer")
    )

    return (
      <div className="md:grid md:grid-cols-3 md:gap-8 md:items-end flex flex-col space-y-4 items-center">
        <ResourceLinks names={worksheets} path={path} title="Worksheets" />
        <ResourceLinks names={answers} path={path} title="Answers" />
        <ResourceLinks names={extra} path={path} title="Extra Links" />
      </div>
    )
  } else {
    notFound()
  }
}
// NOTE: Make this an async function later on to not rely on /lib/constants.ts
export function generateStaticParams() {
  const combinations = []

  for (const level of levels) {
    for (const subject of subjects) {
      for (const examBoard of examBoards) {
        combinations.push({
          level: level,
          subject: subject,
          exam_board: examBoard,
        })
      }
    }
  }
  return combinations
}
export default page
