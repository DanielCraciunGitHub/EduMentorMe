import { Metadata } from "next"
import { Crown, Rocket, Sun } from "lucide-react"

import { staticMetadata } from "@/config/meta"
import { Separator } from "@/components/ui/separator"

import SubCard from "./SubCard"

export const metadata: Metadata = {
  ...staticMetadata.products_and_services,
}

function page() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-3xl">Products & Services</div>
      <Separator />
      <div className="flex flex-col flex-wrap items-center justify-center gap-5 md:flex-row">
        <SubCard
          icon={<Sun className="text-yellow-500" />}
          theme="green"
          title="Basic Plan"
          features={["this feature", "that feature", "xyz feature"]}
          price="£19.99"
        />
        <SubCard
          icon={<Rocket className="text-orange-500" />}
          theme="orange"
          title="Advanced Plan"
          features={["this feature", "that feature", "xyz feature"]}
          price="£39.99"
        />
        <SubCard
          icon={<Crown className="text-yellow-500" />}
          theme="red"
          title="Master Plan"
          features={["this feature", "that feature", "xyz feature"]}
          price="£99.99"
        />
      </div>
    </div>
  )
}
export default page
