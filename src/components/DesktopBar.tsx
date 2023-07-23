import { NavItem as navItem } from "@/types"

import { NavItem } from "@/components/NavItem"

interface DesktopBarProps {
  items: navItem[]
}

export function DesktopBar({ items }: DesktopBarProps) {
  return (
    <div className="hidden md:flex md:w-full md:justify-between md:p-6">
      <div className="flex items-center">
        <NavItem
          key={items[0].name}
          page={items[0].href}
          text={items[0].name}
          className="text-4xl text-black dark:text-white"
        />
        {items.slice(1, 4).map((item) => (
          <NavItem key={item.name} page={item.href} text={item.name} />
        ))}
      </div>
      <div className="flex items-center">
        <NavItem
          key={items[4].name}
          page={items[4].href}
          text={items[4].name}
        />
      </div>
    </div>
  )
}
