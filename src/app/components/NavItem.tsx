import Link from "next/link"
import { Button, ButtonProps } from "@/app/components/ui/button"

interface NavItemProps extends ButtonProps {
  page: string
  text: string
}

export function NavItem(props: NavItemProps) {
  const { page, text, ...restProps } = props
  return (
    <Link href={page}>
      <Button variant="ghost" {...restProps}>
        {text}
      </Button>
    </Link>
  )
}
