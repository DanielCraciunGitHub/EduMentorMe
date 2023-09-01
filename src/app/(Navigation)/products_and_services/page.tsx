import { Metadata } from "next"
import { Sun } from "lucide-react"

import { staticMetadata } from "@/config/meta"
import SubscriptionCard from "@/components/SubscriptionCard"

export const metadata: Metadata = {
  ...staticMetadata.products_and_services,
}

function page() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-3xl">Products & Services</div>
      <hr className="my-4 w-full border-gray-300 dark:border-gray-700" />
      <div className="flex flex-col flex-wrap items-center justify-center gap-5 md:flex-row">
        <SubscriptionCard
          icon={<Sun className="text-yellow-500" />}
          theme="green"
          title="Standard Plan"
          features={[
            "24/7 Q/A support from our staff",
            "1,000 todos limit",
            "Premium A-Level and GCSE resources",
          ]}
          price="£19.99"
        />
      </div>
    </div>
  )
}
export default page
