import { FC } from "react"
import { DarkModeButton } from "@/app/components/DarkModeButton"

const Footer: FC = () => {
  return (
    <footer>
      <div className="mx-auto w-full p-4 py-6 lg:py-8">
        <hr className=" my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023 (CMT) Computing And Maths Tutor™. All Rights Reserved
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <DarkModeButton />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
