import type { Metadata } from "next"

import "@/styles/globals.css"

import { Inter } from "next/font/google"

import Footer from "@/components/Footer"
import Navbar from "@/components/NavBar"
import { Provider } from "@/components/providers"

export const metadata: Metadata = {
  title: "Edu Mentor Me",
  description: "Learn GCSEs and A-Levels with us for free",
  keywords: ["tutoring", "tutor", "a level", "gcse"],
  icons: "/emm.jpeg",
}
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex min-h-screen flex-col">
        <Provider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex flex-grow justify-center">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
