import { Metadata } from "next"

import { staticMetadata } from "@/config/meta"
import { Timer } from "@/components/Timer"

export const metadata: Metadata = {
  ...staticMetadata.study_timer,
}

const page = () => {
  return <Timer />
}

export default page
