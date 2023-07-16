import { NavItem } from "@/types"

import { DesktopBar } from "@/components/DesktopBar"
import { MobileBar } from "@/components/MobileBar"

interface NavBarProps {
  items: NavItem[]
}
export default function NavBar({ items }: NavBarProps) {
  return (
    <nav>
      <MobileBar items={items} />
      <DesktopBar items={items} />
    </nav>
  )
}
