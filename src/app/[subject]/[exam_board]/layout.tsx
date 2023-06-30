"use client"

import { Input } from "@/app/components/ui/input"
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const { data } = useSession()
  return (
    <div className="flex flex-col items-center w-full">
      <div className="h-5/6">{children}</div>
      <div className="flex h-1/6 items-end">
        {data?.user.role === "ADMIN" ? (
          <Input
            type="file"
            onChange={(event: any) => setSelectedFile(event.target.files[0])}
            className=""
          />
        ) : null}
      </div>
    </div>
  )
}
