import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import ContentPage from "@/components/ContentPage"

export const metadata: Metadata = {
  title: "EduMentorMe | About Us",
  description:
    "A tutoring platform that provides A Level and GCSE revision resources",
  openGraph: {
    ...siteConfig.openGraph,
    url: siteConfig.url + "/about_us",
    title: "EduMentorMe | About Us",
    description:
      "A tutoring platform that provides A Level and GCSE revision resources",
  },
}

const page = () => {
  return <ContentPage id="6Rmpximi4o9imiP5xaJCX3" />
}

export default page
