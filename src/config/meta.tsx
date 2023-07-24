import { Metadata } from "next"

import { resourcesConfig } from "./resources"
import { siteConfig } from "./site"

export const baseMetadata: Metadata = {
  title: { default: "EduMentorMe", template: "%s | EduMentorMe" },
  description: "Learn GCSEs and A-Levels with us for free today!",
  icons: {
    icon: "/emm.jpg",
  },
  creator: "Daniel Craciun",
  keywords: [
    ...resourcesConfig.levels,
    ...resourcesConfig.subjects,
    ...resourcesConfig.examBoards,
    "Tutoring",
    "Mentoring",
    "Tutor",
    "Mentor",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "white",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "black",
    },
  ],
  openGraph: {
    title: { default: "EduMentorMe", template: "%s | EduMentorMe" },
    url: siteConfig.url,
    description: "Learn GCSEs and A-Levels with us for free today!",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/emm-og.jpg`,
        type: "image/jpg",
        width: 1200,
        height: 630,
        alt: "EMM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: { default: "EduMentorMe", template: "%s | EduMentorMe" },
    description: "Learn GCSEs and A-Levels with us for free today!",
    images: [
      {
        url: `${siteConfig.url}/emm-og.jpg`,
        type: "image/jpg",
        width: 1200,
        height: 630,
        alt: "EMM",
      },
    ],
  },
  metadataBase: new URL(siteConfig.url),
}

export const staticMetadata = {
  ...baseMetadata,
  search: {
    title: "Search",
    description:
      "Search through an abundance of high-quality educational resources.",
    openGraph: {
      ...baseMetadata.openGraph,
      url: "/search",
      title: "Search",
      description:
        "Search through an abundance of high-quality educational resources.",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Search",
      description:
        "Search through an abundance of high-quality educational resources.",
    },
  } satisfies Metadata,
  ...baseMetadata,
  login: {
    title: "Login",
    description: "Login to gain exclusive access to GCSE and A Level Resources",
    openGraph: {
      ...baseMetadata.openGraph,
      url: "/login",
      title: "Login",
      description:
        "Login to gain exclusive access to GCSE and A Level Resources",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Login",
      description:
        "Login to gain exclusive access to GCSE and A Level Resources",
    },
  } satisfies Metadata,
  sign_up: {
    title: "Sign Up",
    description:
      "Sign Up to gain exclusive access to GCSE and A Level Resources",
    openGraph: {
      ...baseMetadata.openGraph,
      url: "/sign_up",
      title: "Sign Up",
      description:
        "Sign Up to gain exclusive access to GCSE and A Level Resources",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Sign Up",
      description:
        "Sign Up to gain exclusive access to GCSE and A Level Resources",
    },
  } satisfies Metadata,
  about_us: {
    title: "About Us",
    description:
      "A tutoring platform that provides A Level and GCSE revision resources",
    openGraph: {
      ...baseMetadata.openGraph,
      url: "/about_us",
      title: "About Us",
      description:
        "A tutoring platform that provides A Level and GCSE revision resources",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "About Us",
      description:
        "A tutoring platform that provides A Level and GCSE revision resources",
    },
  } satisfies Metadata,
  account: {
    title: "Account",
    description: "Account page for EduMentorMe",
    openGraph: {
      ...baseMetadata.openGraph,
      url: "/account",
      title: "Account",
      description: "Account page for EduMentorMe",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Account",
      description: "Account page for EduMentorMe",
    },
  } satisfies Metadata,
  contact_us: {
    title: "Contact Us",
    description:
      "Contact Us about any questions or concerns related to our tutoring services or GCSE/A Level Resources.",
    openGraph: {
      ...baseMetadata.openGraph,
      url: "/contact_us",
      title: "Contact Us",
      description:
        "Contact Us about any questions or concerns related to our tutoring services or GCSE/A Level Resources.",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Contact Us",
      description:
        "Contact Us about any questions or concerns related to our tutoring services or GCSE/A Level Resources.",
    },
  } satisfies Metadata,
  products_and_services: {
    title: "Products And Services",
    description:
      "View details about any additional services to boost your exam grades",
    openGraph: {
      ...baseMetadata.openGraph,
      url: "/products_and_services",
      title: "Products And Services",
      description:
        "View details about any additional services to boost your exam grades",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Products And Services",
      description:
        "View details about any additional services to boost your exam grades",
    },
  } satisfies Metadata,
}
