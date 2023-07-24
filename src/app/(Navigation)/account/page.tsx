import { Metadata } from "next"

import { staticMetadata } from "@/config/meta"

import DeleteAccountButton from "./DeleteAccountButton"
import SignOutButton from "./SignOutButton"
import WelcomeUser from "./WelcomeUser"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  ...staticMetadata.account,
}

const page = () => {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col items-center space-y-10">
        <WelcomeUser />
        <div>
          <SignOutButton />
        </div>
      </div>
      <div className="flex justify-center">
        <DeleteAccountButton />
      </div>
    </div>
  )
}

export default page
