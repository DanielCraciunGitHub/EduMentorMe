import { Metadata } from "next"
import { Files } from "@/types"

import { resourcesConfig } from "@/config/site"
import { getFiles } from "@/lib/googleDrive"

import ErrorPage from "./ErrorPage"
import ResourceLinks from "./ResourceLinks"

export const revalidate = 69

interface pageProps {
  params: { level: string; subject: string; examBoard: string }
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  const { level, subject, examBoard } = params
  const files = await getFiles(level, subject, examBoard)

  if (!files) {
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

const page = async ({ params }: pageProps) => {
  const { level, subject, examBoard } = params
  const files = await getFiles(level, subject, examBoard)

  if (files) {
    const worksheets: Files = files.filter((file) =>
      file.name.includes("worksheet")
    )
    const answers: Files = files.filter((file) => file.name.includes("answer"))
    const extra: Files = files.filter(
      (file) =>
        !file.name.includes("worksheet") && !file.name.includes("answer")
    )

    return (
      <div className="grid w-full md:grid-cols-3">
        <ResourceLinks files={worksheets} title="Worksheets" />
        <ResourceLinks files={answers} title="Answers" />
        <ResourceLinks files={extra} title="Extra Links" />
      </div>
    )
  } else {
    return <ErrorPage />
  }
}
// NOTE: Make this an async function later on to not rely on constants
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
