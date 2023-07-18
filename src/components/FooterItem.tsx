import Link from "next/link"
import { FooterButton } from "@/types"

import { Button } from "@/components/ui/button"

interface FooterItemProps extends FooterButton {}

const FooterItem = ({ href, icon }: FooterItemProps) => {
  return (
    <Button key={href} variant="outline" size="icon">
      <Link href={href} rel="noopener noreferrer" target="_blank">
        {icon}
      </Link>
    </Button>
  )
}

export default FooterItem
