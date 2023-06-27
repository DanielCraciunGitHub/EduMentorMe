"use client"
import { FC, useState } from "react"
import { Input } from "@/app/components/ui/input"

interface pageProps {
  params: { subject: string; exam_board: string }
}

const page: FC<pageProps> = ({ params }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const path = `/${params.subject}/${params.exam_board}`

  return (
    <div className="flex items-end justify-center">
      <Input
        type="file"
        onChange={(event: any) => setSelectedFile(event.target.files[0])}
      />
    </div>
  )
}
export default page
