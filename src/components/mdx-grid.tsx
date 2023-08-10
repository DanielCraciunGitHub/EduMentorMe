import { HTMLAttributes } from "react"

interface GridProps extends HTMLAttributes<HTMLDivElement> {}

export const ResponsiveGrid = ({
  className,
  children,
  ...props
}: GridProps) => {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" {...props}>
      {children}
    </div>
  )
}
