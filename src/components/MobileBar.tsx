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
  return (
    <div className="flex flex-col items-center py-2 md:hidden">
      <NavItem
        key={items[0].name}
        page={items[0].href}
        text={items[0].name}
        className="text-4xl text-black dark:text-white"
      />
      <Sheet>
        <div className="flex w-full justify-end">
          <SheetTrigger className="p-2">
            <PanelRight className="dark:text-slate-300" />
            <span className="sr-only">Open Mobile Menu</span>
          </SheetTrigger>
        </div>
        <SheetContent className="flex flex-col items-center" side="right">
          {items.slice(1).map((item) => (
            <SheetClose asChild key={item.name}>
              <NavItem page={item.href} text={item.name} />
            </SheetClose>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  )
}
