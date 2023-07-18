import { resources } from "@/types"

// Make sure to use lower casing and separate words using a dash
export const resourcesConfig = {
  levels: ["gcse", "a-level", "further-a-level"],
  subjects: [
    "biology",
    "chemistry",
    "computer-science",
    "economics",
    "english-language",
    "english-literature",
    "geography",
    "maths",
    "psychology",
    "physics",
  ],
  examBoards: ["aqa", "edexcel", "ocr"],
} satisfies resources

export type ResourcesConfig = typeof resourcesConfig
