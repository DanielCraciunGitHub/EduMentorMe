import Link from "next/link"

import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string
  disabled?: boolean
}

export function MdxCard({
  href,
  className,
  children,
  disabled,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-lg border border-muted-foreground/50 p-8 shadow-md transition-shadow hover:shadow-primary",
        disabled && "opacity-60 shadow-none",
        className
      )}
      {...props}
    >
      <div className="space-y-2 [&>h3]:!mt-0">{children}</div>

      {href && (
        <Link href={disabled ? "#" : href} className="absolute inset-0">
          <span className="sr-only">View</span>
        </Link>
      )}
    </div>
  )
}
