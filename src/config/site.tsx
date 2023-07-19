import type { FooterButton, NavItem } from "@/types"
import { Facebook, Twitter } from "lucide-react"

const links = {
  twitter: "https://twitter.com",
  facebook: "https://facebook.com",
}

export const siteConfig = {
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
