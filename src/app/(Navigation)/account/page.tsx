import { Metadata } from "next"
import Link from "next/link"

import { staticMetadata } from "@/config/meta"
import DeleteAccountButton from "@/components/DeleteAccountButton"
import RecentlyViewedResources from "@/components/RecentlyViewedResources"
import SignOutButton from "@/components/SignOutButton"
import StripeButton from "@/components/StripeButton"
import SubjectSelection from "@/components/SubjectSelection"
import WelcomeUser from "@/components/WelcomeUser"
import { serverClient } from "@/app/_trpc/serverClient"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  ...staticMetadata.account,
}

const page = async () => {
  const subjectData = await serverClient.timerRouter.getSubjectsAndTimes()
  return (
    <div className="container flex flex-col justify-between space-y-4 pt-16">
      <div className="flex flex-1 flex-col items-center space-y-8">
        <WelcomeUser />
        <StripeButton name="💸 Manage Subscriptions 💸" />
        <SubjectSelection subjectData={subjectData} />
        <div className="container flex min-h-[12rem] grow flex-col items-center space-y-6 ">
          <h1 className="text-base md:text-2xl">
            Recently viewed{" "}
            <Link href="/search" className="text-blue-500 underline">
              resources
            </Link>{" "}
            ⬇️
          </h1>
          <RecentlyViewedResources />
        </div>
      </div>
      <div className="container flex w-fit flex-col space-y-6">
        <SignOutButton />
        <DeleteAccountButton />
      </div>
    </div>
  )
}

export default page
