"use client"
import { Button } from "@/app/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"

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
  return (
    // conditional rendering of a mobile or desktop nav bar
    <nav>
      {isMobile ? (
        <div className="flex flex-col justify-center items-center py-2">
          <Link href="/">
            <Button variant="ghost" className="text-4xl">
              CMT
            </Button>
          </Link>
          <Link href="/about_us" className="whitespace-nowrap">
            <Button variant="ghost">About Us</Button>
          </Link>
          <Link href="/contact_us" className="whitespace-nowrap">
            <Button variant="ghost">Contact Us</Button>
          </Link>
          <Link href="/products_and_services" className="whitespace-nowrap">
            <Button variant="ghost">Products And Services</Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/sign_up">
            <Button variant="ghost">Sign Up</Button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="mx-auto w-full p-4 py-6 lg:py-8 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" className="text-4xl">
                  CMT
                </Button>
              </Link>
              <Link href="/about_us" className="whitespace-nowrap">
                <Button variant="ghost">About Us</Button>
              </Link>
              <Link href="/contact_us" className="whitespace-nowrap">
                <Button variant="ghost">Contact Us</Button>
              </Link>
              <Link href="/products_and_services" className="whitespace-nowrap">
                <Button variant="ghost">Products And Services</Button>
              </Link>
            </div>
            <div className="flex items-center">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/sign_up">
                <Button variant="ghost">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
