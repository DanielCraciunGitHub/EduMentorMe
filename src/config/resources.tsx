import { resourceParams } from "@/types"

// Make sure to use lower casing and separate words using a dash
export const resourcesConfig = {
  levels: ["gcse", "a-level", "btec"],
  subjects: [
    "biology",
    "business",
    "chemistry",
    "computer-science",
    "economics",
    "english",
    "geography",
    "history",
    "maths",
    "physics",
    "politics",
    "psychology",
    "rs",
    "sociology",
  ],
  examBoards: ["aqa", "edexcel", "ocr"],
} satisfies resourceParams

export type ResourcesConfig = typeof resourcesConfig
