import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { siteConfig } from "@/config/site"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function nameToPath(name: string): string {
  return `/${name.toLowerCase().replaceAll(" ", "_")}`
}
export function capitalizeWords(str: string): string {
  const words = str.split("-")
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  return capitalizedWords.join(" ")
}
export function formatDateSupabase(periodEndInSeconds: number) {
  return new Date(periodEndInSeconds * 1000)
    .toISOString()
    .replace("T", " ")
    .replace("Z", "+00")
}
export function baseUrl() {
  return process.env.NODE_ENV === "production"
    ? siteConfig.url
    : "http://localhost:3000"
}
