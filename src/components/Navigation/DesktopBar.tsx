import { NavItem as navItem } from "@/types"

import { NavItem } from "@/components/Navigation/NavItem"

interface DesktopBarProps {
  items: navItem[]
}

export function DesktopBar({ items }: DesktopBarProps) {
  const leftItems = items.slice(0, -1)
  const rightItem = items[items.length - 1]

  return (
    <div className="hidden md:flex md:w-full md:justify-between md:p-6">
      <div className="flex items-center">
        {leftItems.map((item, index) => (
          <NavItem
            key={item.name}
            page={item.href}
            text={item.name}
            className={index === 0 ? "text-4xl text-foreground" : ""}
          />
        ))}
      </div>
      <div className="flex items-center">
        <NavItem
          key={rightItem.name}
          page={rightItem.href}
          text={rightItem.name}
        />
      </div>
    </div>
  )
}
