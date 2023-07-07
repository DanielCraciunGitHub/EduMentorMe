import { FC } from "react"
import { DarkModeButton } from "@/app/components/DarkModeButton"
import { Facebook, Twitter } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

const Footer: FC = () => {
  return (
    <footer>
      <div className="mx-auto w-full p-4 py-6 lg:py-6">
        <hr className=" my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex space-x-5 items-center">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
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
