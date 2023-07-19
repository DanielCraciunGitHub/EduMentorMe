import { Metadata } from "next"

import { staticMetadata } from "@/config/meta"
import ContentPage from "@/components/ContentPage"

export const metadata: Metadata = {
  ...staticMetadata.about_us,
}

const page = () => {
  return <ContentPage id="6Rmpximi4o9imiP5xaJCX3" />
}

export default page
