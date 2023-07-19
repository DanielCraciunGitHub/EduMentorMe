import { Metadata } from "next"

import { resourcesConfig } from "./resources"

export const baseMetadata: Metadata = {
  title: { default: "EduMentorMe", template: "%s | EduMentorMe" },
  description: "Learn GCSEs and A-Levels with us for free today!",
  icons: "/emm.jpeg",
  keywords: [
    ...resourcesConfig.levels,
    ...resourcesConfig.subjects,
    ...resourcesConfig.examBoards,
    "Tutoring",
    "Mentoring",
    "Tutor",
    "Mentor",
  ],
  openGraph: {
    title: { default: "EduMentorMe", template: "%s | EduMentorMe" },
    url: "https://edumentorme.com",
    description: "Learn GCSEs and A-Levels with us for free today!",
    type: "website",
    images: [
      {
        url: "https://edumentorme.com/emm.jpeg",
        width: 1200,
        height: 1200,
        alt: "EMM",
      },
    ],
  },
  metadataBase: new URL("https://edumentorme.com"),
}

export const staticMetadata = {
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
  } satisfies Metadata,
}
