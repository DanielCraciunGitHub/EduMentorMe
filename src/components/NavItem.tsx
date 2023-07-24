"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"

interface NavItemProps extends ButtonProps {
  page: string
  text: string
}

export function NavItem(props: NavItemProps) {
  const segment = useSelectedLayoutSegment()

  const { page, text, className, ...restProps } = props
  return (
    <Link href={page}>
      <Button
        variant="ghost"
        className={cn(
          "rounded text-slate-500 hover:text-orange-500 hover:transition hover:ease-linear dark:text-gray-400 dark:hover:text-orange-500",
          page.startsWith(`/${segment}`) ? "text-black dark:text-white" : "",
          className
        )}
        {...restProps}
      >
        {text}
      </Button>
    </Link>
  )
}
