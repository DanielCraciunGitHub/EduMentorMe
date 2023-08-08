import { HTMLAttributes } from "react"
import { cva, VariantProps } from "class-variance-authority"
import { CheckCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const subCardVariants = cva("", {
  variants: {
    theme: {
      green:
        "dark:border-green-500 border-green-500 bg-green-500 dark:bg-green-500",
      orange:
        "border-orange-500 dark:border-orange-500 bg-orange-500 dark:bg-orange-500",
      red: "border-red-500 dark:border-red-500 bg-red-500 dark:bg-red-500",
      blue: "border-blue-500 dark:border-blue-500 bg-blue-500 dark:bg-blue-500",
    },
    text: {
      green: "text-green-500",
      orange: "text-orange-500",
      red: "text-red-500",
      blue: "text-blue-500",
    },
  },
})
interface SubCardProps
  extends VariantProps<typeof subCardVariants>,
    HTMLAttributes<HTMLDivElement> {
  title: string
  features: string[]
  price: string
  icon: React.ReactNode
}

const SubCard = ({
  title,
  features,
  price,
  icon,
  theme,
  text = theme,
}: SubCardProps) => {
  return (
    <Card className="flex w-[20rem] flex-col space-y-2">
      <CardHeader className="space-y-4">
        <div className="flex flex-row justify-between">
          <CardTitle className="flex justify-center">{title}</CardTitle>
          {icon}
        </div>
        <hr className={cn(subCardVariants({ theme }), "rounded")} />
      </CardHeader>
      <CardContent className="space-y-3">
        {features.map((feature) => (
          <div key={feature} className="flex space-x-5">
            <CheckCircle className="flex-none text-lime-400" />
            <div>{feature}</div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex flex-row items-end">
          <h1 className={cn(subCardVariants({ text }), "text-4xl")}>{price}</h1>
          <p className="text-xs">/Month</p>
        </div>
        <Button type="submit" className={subCardVariants({ theme })}>
          Purchase
        </Button>
      </CardFooter>
    </Card>
  )
}
export default SubCard
