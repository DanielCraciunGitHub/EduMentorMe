import { NavItem as navItem } from "@/types"

import { NavItem } from "@/components/NavItem"

interface DesktopBarProps {
  items: navItem[]
}

export function DesktopBar({ items }: DesktopBarProps) {
  return (
    <div className="hidden md:flex md:w-full md:justify-between md:p-6">
      <div className="flex items-center">
        {items.slice(0, items.length - 1).map((item, index) => (
          <NavItem
            key={item.name}
            page={item.href}
            text={item.name}
            className={index === 0 ? "text-4xl text-black dark:text-white" : ""}
          />
        ))}
      </div>
      <div className="flex items-center">
        <NavItem
          key={items[items.length - 1].name}
          page={items[items.length - 1].href}
          text={items[items.length - 1].name}
        />
      </div>
    </div>
  )
}
