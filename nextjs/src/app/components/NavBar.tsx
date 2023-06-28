"use client"

import { Button } from "@/app/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { nameToPath } from "@/app/lib/stringFuncs"
import { useSession } from "next-auth/react"

const navPages = [
  "About Us",
  "Contact Us",
  "Products And Services",
  "Login",
  "Sign Up",
  "Account",
]

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  return <nav>{isMobile ? <MobileBar /> : <DesktopBar />}</nav>
}
function MobileBar() {
  const { data: session, status } = useSession()
  return (
    <div className="flex flex-col items-center py-2">
      <Link href="/">
        <Button variant="ghost" className="text-4xl">
          CMT
        </Button>
      </Link>
      {status === "unauthenticated" ? (
        navPages.slice(0, 5).map((page) => (
          <Link href={nameToPath(page)} key={page}>
            <Button variant="ghost">{page}</Button>
          </Link>
        ))
      ) : (
        <div className="flex flex-col items-center">
          {navPages.slice(0, 3).map((page) => (
            <Link href={nameToPath(page)} key={page}>
              <Button variant="ghost">{page}</Button>
            </Link>
          ))}
          <Link href={nameToPath(navPages[5])} key={navPages[5]}>
            <Button variant="ghost">{navPages[5]}</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
function DesktopBar() {
  const { data: session, status } = useSession()
  return (
    <div>
      <div className="mx-auto w-full p-4 py-6 lg:py-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" className="text-4xl">
              CMT
            </Button>
          </Link>
          {navPages.slice(0, 3).map((page) => (
            <Link href={nameToPath(page)} key={page}>
              <Button variant="ghost">{page}</Button>
            </Link>
          ))}
        </div>
        <div className="flex items-center">
          {status === "unauthenticated" ? (
            navPages.slice(3, 5).map((page) => (
              <Link href={nameToPath(page)} key={page}>
                <Button variant="ghost">{page}</Button>
              </Link>
            ))
          ) : (
            <Link href={nameToPath(navPages[5])} key={navPages[5]}>
              <Button variant="ghost">{navPages[5]}</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
