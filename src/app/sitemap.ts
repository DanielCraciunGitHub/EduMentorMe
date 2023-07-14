import { MetadataRoute } from "next"
import { examBoards, levels, subjects } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://edumentorme.com"
  const combinations = []

  for (const level of levels) {
    for (const subject of subjects) {
      for (const examBoard of examBoards) {
        combinations.push("/" + [level, subject, examBoard].join("/"))
      }
    }
  }
  const urls: { url: string; lastModified: Date }[] = combinations.map(
    (url) => ({ url: baseUrl + url, lastModified: new Date() })
  )

  return [
    {
      url: baseUrl + "/about_us",
      lastModified: new Date(),
    },
    {
      url: baseUrl + "/account",
      lastModified: new Date(),
    },
    {
      url: baseUrl + "/contact_us",
      lastModified: new Date(),
    },
    {
      url: baseUrl + "/login",
      lastModified: new Date(),
    },
    {
      url: baseUrl + "/sign_up",
      lastModified: new Date(),
    },
    ...urls,
  ]
}
