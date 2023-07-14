import Link from "next/link"

import { Button, ButtonProps } from "@/components/ui/button"

interface NavItemProps extends ButtonProps {
  page: string
  text: string
}

export function NavItem(props: NavItemProps) {
  const { page, text, ...restProps } = props
  return (
    <Link
      href={page}
      className="rounded text-black hover:bg-orange-500 hover:transition hover:ease-linear dark:text-white"
    >
      <Button variant="ghost" {...restProps}>
        {text}
      </Button>
    </Link>
  )
}
