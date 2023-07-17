import type { FooterButton, NavItem, resources } from "@/types"

const links = {}

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Edu Mentor Me",
  description: "Learn GCSEs and A-Levels with us for free",
  url: "https://edumentorme.com",
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
  ] satisfies NavItem[],
  auth: [
    {
      name: "Login",
      href: "/login",
    },
    {
      name: "Sign Up",
      href: "/sign_up",
    },
  ],
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
