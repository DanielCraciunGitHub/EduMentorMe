import { Button } from "@/app/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Separator } from "@/app/components/ui/separator"

import { CheckCircle } from "lucide-react"

import { FC } from "react"

interface SubCardProps {
  title: string
  theme: "green" | "orange" | "red"
  features: string[]
  price: string
  icon: React.ReactNode
}

const SubCard: FC<SubCardProps> = ({ title, features, price, icon, theme }) => {
  return (
    <Card className="w-[20rem] flex flex-col flex-grow space-y-2">
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
          <div key={feature} className="space-x-5 flex">
            <CheckCircle className="text-lime-400 flex-none" />
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
