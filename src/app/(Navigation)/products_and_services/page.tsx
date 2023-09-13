import { Metadata } from "next"
import { Sun } from "lucide-react"

import { staticMetadata } from "@/config/meta"
import TutorForm from "@/components/Forms/TutorForm"
import SubscriptionCard from "@/components/SubscriptionCard"

export const metadata: Metadata = {
  ...staticMetadata.products_and_services,
}

function page() {
  return (
    <div className="container flex flex-col items-center space-y-8">
      <div className="text-3xl">1:1 Tutoring Services</div>
      <hr className="my-4 w-full border-muted-foreground dark:border-muted-foreground" />
      <TutorForm />

      <div className="text-3xl">
        <i>Grade-Boosting</i> Subscription Plans
      </div>
      <hr className="my-4 w-full border-muted-foreground dark:border-muted-foreground" />
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
