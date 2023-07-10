import { Metadata } from "next"
import SubCard from "./SubCard"
import { Separator } from "@/app/components/ui/separator"
import { Rocket } from "lucide-react"

export const metadata: Metadata = {
  title: "EduMentorMe | Products And Services",
  description:
    "View details about any additional services to boost your exam grades",
}

function page() {
  return (
    <div className="flex flex-col space-y-8 items-center">
      <div className="text-3xl">Test title</div>
      <Separator />
      <div className="flex flex-col md:flex-row justify-center items-center gap-5">
        <SubCard
          icon={<Rocket className="text-orange-500" />}
          title="Basic Plan"
          features={["this feature", "that feature", "xyz feature"]}
          price="19.99"
        />
      </div>
    </div>
  )
}
export default page

// separator style: className="h-[5px] w-1/4 bg-red-500 dark:bg-red-500 rounded"
