"use client"
import { FC, useState } from "react"
import { Input } from "@/app/components/ui/input"
import { useSession } from "next-auth/react"
import { adminEmails } from "@/app/lib/constants"

interface pageProps {
  params: { subject: string; exam_board: string }
}

const page: FC<pageProps> = ({ params }) => {
  const { data } = useSession()
  const [selectedFile, setSelectedFile] = useState(null)
  const path = `/${params.subject}/${params.exam_board}`
  return (
    <div className="flex items-end">
      {data?.user.role === "ADMIN" ? (
        <Input
          type="file"
          onChange={(event: any) => setSelectedFile(event.target.files[0])}
        />
      ) : null}
    </div>
  )
}
export default page
