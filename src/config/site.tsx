import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"
import type { FooterButton, NavItem, resources } from "@/types"
import { Facebook, Twitter } from "lucide-react"

const links = {
  twitter: "https://twitter.com",
  facebook: "https://facebook.com",
}

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

export const siteConfig = {
  name: "Edu Mentor Me",
  url: "https://edumentorme.com",
  description: "Learn GCSEs and A-Levels with us for free today!",
  keywords: [
    ...resourcesConfig.levels,
    ...resourcesConfig.subjects,
    ...resourcesConfig.examBoards,
    "Tutoring",
    "Mentoring",
    "Tutor",
    "Mentor",
  ],
  favicon: "/emm.jpeg",
  mainNav: [
    {
      name: "EMM",
      href: "/",
    },
    {
      name: "About Us",
      href: "/about_us",
    },
    {
      name: "Contact Us",
      href: "/contact_us",
    },
    {
      name: "Products And Services",
      href: "/products_and_services",
    },
    {
      name: "Account",
      href: "/account",
    },
    {
      name: "Login",
      href: "/login",
    },
    {
      name: "Sign Up",
      href: "/sign_up",
    },
  ] satisfies NavItem[],
  footer: [
    {
      href: links.facebook,
      icon: <Facebook />,
    },
    {
      href: links.twitter,
      icon: <Twitter />,
    },
  ] satisfies FooterButton[],
}

export type SiteConfig = typeof siteConfig
