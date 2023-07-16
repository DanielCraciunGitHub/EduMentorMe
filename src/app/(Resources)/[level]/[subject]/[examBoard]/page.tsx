import { FC } from "react"
import { Metadata } from "next"

import { resourcesConfig } from "@/config/site"
import supabase from "@/lib/supabase"

import ErrorPage from "./ErrorPage"
import ResourceLinks from "./ResourceLinks"

// caches the downloaded pages and requests new data every 20 seconds
export const revalidate = 20

interface pageProps {
  params: { level: string; subject: string; examBoard: string }
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  const { level, subject, examBoard } = params
  const path = `${level}/${subject}/${examBoard}`
  const { data } = await supabase.storage.from("files").list(path)
  // if there is no data at this page
  if (!data?.length) {
    return {
      title: "Not Found",
      description: "This resource is not available at the moment",
    }
  }
  // if the page is available
  return {
    title: level + " | " + subject + " | " + examBoard,
    description: `This is a resource for ${level} ${subject} and the exam board is ${examBoard}`,
  }
}

const page: FC<pageProps> = async ({ params }) => {
  const { level, subject, examBoard } = params
  const path = `${level}/${subject}/${examBoard}`
  // gets all of the files from the user's requested path
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
      <div className="flex flex-col items-center space-y-4 md:grid md:grid-cols-3 md:items-end md:gap-8">
        <ResourceLinks names={worksheets} path={path} title="Worksheets" />
        <ResourceLinks names={answers} path={path} title="Answers" />
        <ResourceLinks names={extra} path={path} title="Extra Links" />
      </div>
    )
  } else {
    return <ErrorPage />
  }
}
// NOTE: Make this an async function later on to not rely on /lib/constants.ts
export function generateStaticParams() {
  const { levels, subjects, examBoards } = resourcesConfig
  const combinations = []

  for (const level of levels) {
    for (const subject of subjects) {
      for (const examBoard of examBoards) {
        combinations.push({
          level,
          subject,
          examBoard,
        })
      }
    }
  }
  return combinations
}
export default page
