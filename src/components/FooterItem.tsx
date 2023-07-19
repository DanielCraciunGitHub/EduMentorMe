import Link from "next/link"
import { FooterButton } from "@/types"

import { buttonVariants } from "@/components/ui/button"

interface FooterItemProps extends FooterButton {}

const FooterItem = ({ href, icon }: FooterItemProps) => {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className={buttonVariants({ size: "icon", variant: "outline" })}
    >
      {icon}
    </Link>
  )
}

export default FooterItem
