import { Metadata } from "next"
import Link from "next/link"

import { staticMetadata } from "@/config/meta"
import DeleteAccountButton from "@/components/DeleteAccountButton"
import RecentlyViewedResources from "@/components/RecentlyViewedResources"
import SignOutButton from "@/components/SignOutButton"
import StripeButton from "@/components/StripeButton"
import WelcomeUser from "@/components/WelcomeUser"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  ...staticMetadata.account,
}

const page = () => {
  return (
    <div className="container flex flex-col justify-between space-y-4">
      <div className="flex flex-1 flex-col items-center space-y-8">
        <WelcomeUser />
        <div>
          <SignOutButton />
        </div>
        <div className="container flex min-h-[12rem] flex-grow flex-col items-center space-y-6 ">
          <h1 className="text-md md:text-2xl">
            Recently viewed{" "}
            <Link href="/search" className="text-blue-500 underline">
              resources
            </Link>{" "}
            ⬇️
          </h1>
          <RecentlyViewedResources />
        </div>
      </div>
      <div className="flex flex-col justify-center space-y-6">
        <StripeButton name="💸 Manage Subscriptions 💸" />
        <DeleteAccountButton />
      </div>
    </div>
  )
}

export default page
