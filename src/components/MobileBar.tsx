import { NavItem as navItem } from "@/types"
import { PanelRight } from "lucide-react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavItem } from "@/components/NavItem"

interface MobileBarProps {
  items: navItem[]
}
export function MobileBar({ items }: MobileBarProps) {
  const [mainItem, ...navItems] = items

  return (
    <div className="flex flex-col items-center py-2 md:hidden">
      <NavItem
        key={mainItem.name}
        page={mainItem.href}
        text={mainItem.name}
        className="text-4xl text-foreground"
      />
      <Sheet>
        <div className="flex w-full justify-end">
          <SheetTrigger className="p-2">
            <PanelRight />
            <span className="sr-only">Open Mobile Menu</span>
          </SheetTrigger>
        </div>
        <SheetContent className="flex flex-col items-center" side="right">
          {navItems.map((item) => (
            <SheetClose asChild key={item.name}>
              <NavItem page={item.href} text={item.name} />
            </SheetClose>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  )
}
