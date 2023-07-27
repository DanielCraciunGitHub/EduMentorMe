import { Metadata } from "next"

import { staticMetadata } from "@/config/meta"

import DeleteAccountButton from "./DeleteAccountButton"
import Resources from "./Resources"
import SignOutButton from "./SignOutButton"
import WelcomeUser from "./WelcomeUser"

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
        <div className="container flex flex-grow flex-col items-center space-y-6 rounded border dark:border-gray-500">
          <h1 className="text-2xl">Recently viewed resources ⬇️</h1>
          <Resources />
        </div>
      </div>
      <div className="flex justify-center">
        <DeleteAccountButton />
      </div>
    </div>
  )
}

export default page
