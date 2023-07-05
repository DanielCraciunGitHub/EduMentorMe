import { FC } from "react"
import { examBoards, subjects } from "@/app/lib/constants"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { notFound } from "next/navigation"

import ResourceLinks from "./ResourceLinks"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

interface pageProps {
  params: { subject: string; exam_board: string }
}

const page: FC<pageProps> = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies })

  const path = `${params.subject}/${params.exam_board}`

  const { data } = await supabase.storage.from("files").list(path)

  if (data?.length) {
    const filteredData = data.filter(
      (file) => file.metadata.mimetype === "application/pdf"
    )
    const names: string[] = filteredData.map((file) => file.name)
    return <ResourceLinks names={names} path={path} />
  } else {
    notFound()
  }
}
// export function generateStaticParams() {
//   const combinations = []

//   for (const subject of subjects) {
//     for (const examBoard of examBoards) {
//       combinations.push({
//         subject: subject,
//         exam_board: examBoard,
//       })
//     }
//   }
//   return combinations
// }
export default page
