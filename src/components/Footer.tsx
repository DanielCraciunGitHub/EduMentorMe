import { siteConfig } from "@/config/site"
import { Separator } from "@/components/ui/separator"
import { DarkModeButton } from "@/components/DarkModeButton"

import FooterItem from "./FooterItem"

const Footer = () => {
  return (
    <footer>
      <div className="p-4 py-6">
        <Separator className="my-4 bg-gray-300 dark:bg-gray-700" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex w-full flex-col space-y-3">
            <div className="flex justify-between">
              <div className="space-x-3">
                {siteConfig.footer.map((footerItem) => (
                  <FooterItem
                    key={footerItem.href}
                    href={footerItem.href}
                    icon={footerItem.icon}
                  />
                ))}
              </div>
              <DarkModeButton />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              © 2023 (EMM) EduMentorMe™. All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
