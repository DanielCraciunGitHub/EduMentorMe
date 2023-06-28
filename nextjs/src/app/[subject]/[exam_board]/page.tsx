"use client"
import { FC, useState } from "react"
import { Input } from "@/app/components/ui/input"
import { useSession } from "next-auth/react"
import { adminEmails } from "@/app/lib/constants"

interface pageProps {
  params: { subject: string; exam_board: string }
}

const page: FC<pageProps> = ({ params }) => {
  const { data: session, status } = useSession()
  const [selectedFile, setSelectedFile] = useState(null)
  const path = `/${params.subject}/${params.exam_board}`

  return (
    <div className="flex items-end">
      {status === "authenticated" &&
      adminEmails.includes(session.user?.email as string) ? (
        <Input
          type="file"
          onChange={(event: any) => setSelectedFile(event.target.files[0])}
        />
      ) : null}
    </div>
  )
}
export default page
