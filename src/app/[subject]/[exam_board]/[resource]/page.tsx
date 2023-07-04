"use client"

import { FC, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface PageProps {
  params: { subject: string; exam_board: string; resource: string }
}

const Page: FC<PageProps> = ({ params }) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchFile = async () => {
      const { data } = await supabase.storage
        .from("files")
        .download("computer-science/Resume.pdf")

      if (data) {
        const url = URL.createObjectURL(data)
        setBlobUrl(url)
      }
    }

    fetchFile()
  }, [])

  return (
    <div>
      {blobUrl ? (
        <a href={blobUrl} target="_blank" rel="noopener noreferrer">
          Open file
        </a>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Page
