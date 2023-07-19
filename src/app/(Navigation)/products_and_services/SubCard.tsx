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
import { Separator } from "@/components/ui/separator"

const subCardVariants = cva("", {
  variants: {
    theme: {
      green: "dark:bg-green-500 bg-green-500 text-green-500",
      orange: "bg-orange-500 dark:bg-orange-500 text-orange-500",
      red: "bg-red-500 dark:bg-red-500 text-red-500",
      blue: "bg-blue-500 dark:bg-blue-500 text-blue-500",
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

const SubCard = ({ title, features, price, icon, theme }: SubCardProps) => {
  return (
    <Card className="flex w-[20rem] flex-col space-y-2">
      <CardHeader className="space-y-4">
        <div className="flex flex-row justify-between">
          <CardTitle className="flex justify-center">{title}</CardTitle>
          {icon}
        </div>
        <Separator
          className={cn(subCardVariants({ theme }), "h-[5px] rounded")}
        />
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
          <h1 className={`text-${theme}-500`}>{price}</h1>
          <p className="text-xs">/Month</p>
        </div>
        <Button
          type="submit"
          className={`bg-${theme}-500 dark:bg-${theme}-500`}
        >
          Purchase
        </Button>
      </CardFooter>
    </Card>
  )
}
export default SubCard
