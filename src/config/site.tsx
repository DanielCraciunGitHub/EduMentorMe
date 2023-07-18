import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"
import type { FooterButton, NavItem } from "@/types"
import { Facebook, Twitter } from "lucide-react"

import { resourcesConfig } from "./resources"

const links = {
  twitter: "https://twitter.com",
  facebook: "https://facebook.com",
}

export const siteConfig = {
  name: "Edu Mentor Me",
  url: "https://edumentorme.com",
  description: "Learn GCSEs and A-Levels with us for free today!",
  favicon: "/emm.jpeg",
  keywords: [
    ...resourcesConfig.levels,
    ...resourcesConfig.subjects,
    ...resourcesConfig.examBoards,
    "Tutoring",
    "Mentoring",
    "Tutor",
    "Mentor",
  ] satisfies string[],
  openGraph: {
    title: "Edu Mentor Me",
    url: "https://edumentorme.com",
    description: "Learn GCSEs and A-Levels with us for free today!",
    type: "website",
    images: [
      {
        url: "https://edumentorme.com/emm.jpeg",
        width: 1200,
        height: 600,
        alt: "EMM",
      },
    ],
  } satisfies OpenGraph,
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
