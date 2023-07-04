"use client"

import { useEffect, useState } from "react"

export function useUser() {
  const [name, setName] = useState<string>("")
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  useEffect(() => {
    const data = localStorage.getItem("local") as string
    const parsedData = JSON.parse(data)
    setName(parsedData["name"])
    setIsAdmin(parsedData["is_admin"])
  }, [])
  return { name, isAdmin }
}
