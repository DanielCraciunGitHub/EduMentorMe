import { FC } from "react"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface SubCardProps {
  title: string
  theme: "green" | "orange" | "red"
  features: string[]
  price: string
  icon: React.ReactNode
}

const SubCard: FC<SubCardProps> = ({ title, features, price, icon, theme }) => {
  return (
    <Card className="flex w-[20rem] flex-grow flex-col space-y-2">
      <CardHeader className="space-y-4">
        <div className="flex flex-row justify-between">
          <CardTitle className="flex justify-center">{title}</CardTitle>
          {icon}
        </div>
        <Separator
          className={`h-[5px] bg-${theme}-500 dark:bg-${theme}-500 rounded`}
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
