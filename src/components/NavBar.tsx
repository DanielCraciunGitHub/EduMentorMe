import { NavItem } from "@/types"

import { DesktopBar } from "@/components/DesktopBar"
import { MobileBar } from "@/components/MobileBar"

interface NavBarProps {
  items: NavItem[]
}
export default function NavBar({ items }: NavBarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-background">
      <MobileBar items={items} />
      <DesktopBar items={items} />
    </nav>
  )
}
