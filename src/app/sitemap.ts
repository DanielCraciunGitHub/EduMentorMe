import { MetadataRoute } from "next"

import { resourcesConfig } from "@/config/resources"
import { siteConfig } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const { levels, subjects, examBoards } = resourcesConfig
  const combinations = []

  for (const level of levels) {
    for (const subject of subjects) {
      for (const examBoard of examBoards) {
        combinations.push("/" + [level, subject, examBoard].join("/"))
      }
    }
  }
  const resourceUrls: { url: string; lastModified: Date }[] = combinations.map(
    (slug) => ({ url: siteConfig.url + slug, lastModified: new Date() })
  )

  return [
    ...siteConfig.mainNav.map((page) => ({
      url: siteConfig.url + page.href,
      lastModified: new Date(),
    })),
    ...siteConfig.features.map((page) => ({
      url: siteConfig.url + page.href,
      lastModified: new Date(),
    })),
    ...siteConfig.authPages.map((page) => ({
      url: siteConfig.url + page.href,
      lastModified: new Date(),
    })),
    ...resourceUrls,
  ]
}
