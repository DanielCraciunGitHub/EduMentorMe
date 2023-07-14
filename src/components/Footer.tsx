import { FC } from "react"
import Link from "next/link"
import { Facebook, Twitter } from "lucide-react"

import { DarkModeButton } from "@/components/DarkModeButton"

import { Button } from "./ui/button"

const Footer: FC = () => {
  return (
    <footer>
      <div className="mx-auto w-full p-4 py-6 lg:py-6">
        <hr className=" my-4 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center space-x-5">
            <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
              © 2023 (EMM) EduMentorMe™. All Rights Reserved
            </span>
            <Button variant="outline" size="icon">
              <Link href="/">
                <Facebook className="footerIcon" />
              </Link>
            </Button>
            <Button variant="outline" size="icon">
              <Link href="/">
                <Twitter className="footerIcon" />
              </Link>
            </Button>
          </div>
          <div>
            <DarkModeButton />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
